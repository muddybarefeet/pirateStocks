var knex = require('knex');

module.exports = {

//Function that calls generatePortfolio and then the generatePortfolioMetrics function: called by buy and sell to compile a users portfolio
  getPortfolio: function (userId, matchId) {
    return this.generatePortfolio(userId, matchId)
      .then(function (data) {
        return this.generatePortfolioMetrics(data);
      });
  },

  //Generate the Users Portfolio
  generatePortfolio: function (userId, matchId) {

    return Promise.all([
        //get specific match and all trades with the corresponding stock data
        this.getMatch(matchId),
        this.getAllTradesWithStockData(userId, matchId)
      ])
      //pass the results from above to the reduceTradesToPortfolio which returns a users portfolio for the match in
      .then(function (tuple) {
        //WHAT TO RETURN THE MATCH TITLE IN THIS ROUTE!!!
        var matchTitle = tuple[0].title;
        var match = tuple[0];
        var trades = tuple[1];
        return module.reduceTradesToPortfolio(trades, match.starting_funds, matchTitle);
      })
      .catch(function (err) {
        console.error(err);
        return null;
      });
  },

//Get a Specific Match from the Matches Table
  getMatch: function (matchId) {
    return knex.select()
      .table('matches').where('m_id', '=', matchId)
      .then(function (match) {
        return match[0];
      });
  },


//Get specific match and all trades with the corresponding stock data
  getAllTradesWithStockData: function (userId, matchId) {
    return knex('trades').where({
        user_id: userId,
        match_id: matchId
      })
      .join('stock_prices', 'trades.symbol', '=', 'stock_prices.symbol')
      .join('stocks', 'trades.symbol', '=', 'stocks.symbol')
      .orderBy('created_at', 'ASC');
  },

//Rolls up the users trades for a specific match into a portfolio
  reduceTradesToPortfolio: function (trades, startingFunds,title) {
    var availableCash = startingFunds;
    var matchTitle = title;

    var stocks = trades.reduce(function (portfolio, trade) {

      var stock = portfolio[trade.symbol];

      if (stock === undefined) {
        portfolio[trade.symbol] = {};
        stock = portfolio[trade.symbol];
        stock.symbol = trade.symbol;
        stock.shares = 0;
        stock.price = 0;
        stock.bid = trade.bid;
        stock.ask = trade.ask;
        stock.name = trade.name;
        stock.percent_change = trade.percent_change;
      }

      if (trade.action === BUY) {
        availableCash -= (trade.price * trade.shares);
        stock.price = costAverage(stock.price, stock.shares, trade.price, trade.shares);
        stock.shares += trade.shares;
      } else if (trade.action === SELL) {
        availableCash += (trade.price * trade.shares);
        stock.price = costAverage(stock.price, stock.shares, trade.price, trade.shares);
        stock.shares -= trade.shares;
      } else {
        throw new Error('unsupported action type. expected buy or sell');
      }

      // remove stocks with 0 shares after selling
      if (stock.shares === 0) {
        delete portfolio[trade.symbol];
      }

      return portfolio;
    }, {});

    return {
      available_cash: availableCash,
      stocks: stocks,
      title: matchTitle
    };

  },

  //Gets/calculates the various number related fields of the stock
  generatePortfolioMetrics: function (portfolio) {
    var portfolioValue = 0;
    var availableCash = portfolio.available_cash;
    var title = portfolio.title;

    var stocks = Object.keys(portfolio.stocks).map(function (stockSymbol) {
      var stockData = portfolio.stocks[stockSymbol];
      stockData.marketValue = Number((stockData.bid * stockData.shares).toFixed(2));
      portfolioValue += stockData.marketValue;
      stockData.gain_loss = Number((stockData.marketValue - stockData.price * stockData.shares).toFixed(2));
      return stockData;
    });

    return {
      totalValue: portfolioValue + availableCash,
      available_cash: availableCash,
      stocks: stocks,
      title: title
    };

  }

};