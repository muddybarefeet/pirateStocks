var moment = require('moment');

var areTimesInDiffQuarts = function (time1, time2) {

  if (time1 && time2) {

    var tableTime;
    var currentTime;

    console.log('in function to find the hour quart in', time1, time2);

    var firstQuart = moment().startOf("hour").add(15, 'minutes');
    var secondQuart = moment().startOf("hour").add(30, 'minutes');
    var thirdQuart = moment().startOf("hour").add(45, 'minutes');
    var fourthQuart = moment().endOf("hour");

    if (moment(new Date(time1)).isSame(new Date(time2), "hour")) {

      if (moment(new Date(time1)).isBefore(firstQuart)) {
        tableTime = firstQuart;
      } else if (moment(new Date(time1)).isBefore(secondQuart)) {
        tableTime = secondQuart;
      } else if (moment(new Date(time1)).isBefore(thirdQuart)) {
        tableTime = thirdQuart;
      } else {
        tableTime = fourthQuart;
      }

      if (moment(new Date(time2)).isBefore(firstQuart)) {
        currentTime = firstQuart;
      } else if (moment(new Date(time2)).isBefore(secondQuart)) {
        currentTime = secondQuart;
      } else if (moment(new Date(time2)).isBefore(thirdQuart)) {
        currentTime = thirdQuart;
      } else {
        currentTime = fourthQuart;
      }

      if ((tableTime).isSame(currentTime)) {
        return false;
      } else {
        return true;
      }

    } else {
      return true;
    }

  } else {
    return false;
  }

};

var getStockData = function (stocks, services) {
  var LIMIT = 100;
  var stockData = [];
  for (var i = 0; i < stocks.length; i += LIMIT) {
    batch = stocks.slice(i, i + LIMIT);
    stockData.push(services.yahoo.getPrices(batch));
  }
  return Promise.all(stockData);
};

//update the stock_prices table and re-insert the time into the schedule schema table
var updateStockPricesToLatest = function (services) {
  //call yahoo get data to stocks table
  return services.db.stocks.getStockSymbols()
  .then(function (symbols) {
    return getStockData(symbols, services);
  })
  .then(function (priceData) {
    var stockData = parseStockData(priceData);//return the formatted data
    services.db.stocks.updateAllStockPrices(stockData);
  })
  .then(function (updated) {
    console.log('updated price data -------->', updated);
    services.db.metaTable.upsert("Latest_Stock_Update", {
      timeStamp: new Date().toString()
    });
  })
  .catch(function (err) {
    console.log('err getting yahoo api price data', err);
  });

};

var parseStockData = function (prices) {
  return [].concat.apply([], prices) //do I need apply!?
    .map(function (stock) {
      return {
        symbol: stock.symbol,
        bid: stock.Bid,
        ask: stock.Ask,
        change: stock.Change,
        days_low: stock.DaysLow,
        days_high: stock.DaysHigh,
        year_low: stock.YearLow,
        year_high: stock.YearHigh,
        earnings_share: stock.EarningsShare,
        eps_estimate_current_year: stock.EPSEstimateCurrentYear,
        eps_estimate_next_year: stock.EPSEstimateNextYear,
        market_capitalization: stock.MarketCapitalization,
        ebitda: stock.EBITDA,
        days_range: stock.DaysRange,
        open: stock.open,
        previous_close: stock.PreviousClose,
        pe_ratio: stock.PERatio,
        peg_ratio: stock.PEGRatio,
        volume: stock.PEGRatio,
        percent_change: stock.PercentChange
      };
    });
};

module.exports = function (services) {
  setInterval(function () {
    //check if time to update and update
    services.db.metaTable.get("Latest_Stock_Update")
    .then(function (data) {
      //if data then need use moment to see how long ago.
      if (data && areTimesInDiffQuarts(data, new Date().toString())) {
        //if the time is up to change
        updateStockPricesToLatest(services);
      } else {
        updateStockPricesToLatest(services);
      }

    })
    .catch(function (err) {
      console.log('err', err);
    });

  }, 5000); //change this to play with maybe every 30 secs 60000

};