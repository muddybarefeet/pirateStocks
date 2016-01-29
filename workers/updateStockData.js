var moment = require('moment');

var areTimesInDiffQuarts = function (time1, time2) {

  var tableTime;
  var currentTime;

  var firstQuart = moment().startOf("hour").add(15, 'minutes');
  var secondQuart = moment().startOf("hour").add(30, 'minutes');
  var thirdQuart = moment().startOf("hour").add(45, 'minutes');
  var fourthQuart = moment().endOf("hour");

  if (moment(time1).isSame(time2, "hour")) {

    if (moment(time1).isBefore(firstQuart)) {
      tableTime = firstQuart;
    } else if (moment(time1).isBefore(secondQuart)) {
      tableTime = secondQuart;
    } else if (moment(time1).isBefore(thirdQuart)) {
      tableTime = thirdQuart;
    } else {
      tableTime = fourthQuart;
    }

    if (moment(time2).isBefore(firstQuart)) {
      currentTime = firstQuart;
    } else if (moment(time2).isBefore(secondQuart)) {
      currentTime = secondQuart;
    } else if (moment(time2).isBefore(thirdQuart)) {
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

};

var updateStockPricesToLatest = function (services) {
  //call yahoo get data to stocks table
  return services.db.stocks.getStockSymbols()
  .then(function (symbols) {
    services.yahoo.getPrices(symbols);
  })
  .then(function (priceData) {
    var stockData = parseStockData(priceData);//return the formatted data
    services.db.stock.updateAllStockPrices(stockData);
  })
  .then(function (updated) {
    services.db.metaTable.upsert("Latest_Update_Time", {
      value: new Date().toString()
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
    services.metaTable.get("Latest_Update_Time")
    .then(function (data) {
      //if data then need use moment to see how long ago.
      if (data) {
        //if the time is up to change
        if (areTimesInDiffQuarts(data.value, new Date().toString())) {
          updateStockPricesToLatest();
        }
      } else {
        updateStockPricesToLatest();
      }

    })
    .catch(function (err) {
      console.log('err', err);
    });

  }, 60000); //change this to play with maybe every 30 secs

};