var Promise = require('bluebird');
var classes = require('./classes.js');

module.exports = function (knex) {

  var module = {};

  var BUY = 'buy';
  var SELL = 'sell';

//Create Trade: insert a trade into the trades table
//------------------------------------------------------
  var createTrade = function (trade) {
    return knex.insert(trade, '*').into('trades')
      .then(function (response) {
        return response[0];
      });
  };

//Get a specific trade. userId {string} matchId {string}
//-------------------------------------------------------
  module.getTrades = function (userId, matchId) {
    return knex.select()
      .table('trades')
      .where('user_id', '=', userId)
      .andWhere('match_id', '=', matchId)
      .orderBy('created_at', 'desc');
  };

//Get the stock of a certain symbol
//-------------------------------------
  module.getStock = function (symbol) {
    return knex('stocks')
    .join('stock_prices', 'stocks.symbol', '=', 'stock_prices.symbol')
    .where(knex.raw('stocks.symbol = UPPER(?)', [symbol]))
    .then(function (response) {
      if (response.length !== 1) {
        throw new Error('unexepected response length: ' +
          response.length);
      }
      res = response[0];
      return new classes.SingleStock(
        res.name,
        res.symbol,
        res.industry,
        res.sector,
        res.exchange,
        res.ask,
        res.percent_change,
        res.year_high,
        res.year_low
      );
    });

  };

//Buy Controller. userId {string} matchId {string} numShares {int} stockTicker {stockTicker}
//--------------------------------------------------------------------------------------------
  module.buy = function (userId, matchId, numShares, stockTicker) {

    var trade;

    return Promise.all([
        //get the details of the stock you want to buy and gets the users portfolio
        module.getStock(stockTicker),
        generatePortfolio(userId, matchId)
      ])
      //takes results and checks user authorised to buy specified stock/stock symbol is valid
      //if all is allowed then new buy is inserted into the trades table with the available_funds updated
      .then(function (tuple) {

        var stock = tuple[0];
        var portfolio = tuple[1];

        var available_cash = portfolio.available_cash;

        available_cash -= stock.ask * numShares.toFixed(2);

        if (stock === null) {
          console.log('in err than stock is null');
          throw new Error('Treasure symbol does nah exist.');
        }

        return createTrade({
          user_id: userId,
          match_id: matchId,
          symbol: stockTicker,
          shares: numShares,
          action: BUY,
          price: stock.ask,
          available_cash: available_cash
        });

      })
      .then(function(resp){
        //the trade that just occured is stored and the newly updated portfolio is got again from the database
        trade = resp;
        return module.getPortfolio(userId, matchId);
      })
      .then(function(portfolio){
        //return both the trade that occured and the new portfolio
        return {
          trade: trade,
          portfolio: portfolio
        };
      });
  };

//Buy Controller. userId {string} matchId {string} numShares {int} stockTicker {stockTicker}
//--------------------------------------------------------------------------------------------
  module.sell = function (userId, matchId, numShares, stockTicker) {

    var trade;
    console.log('in sell');
    return Promise.all([
        //get information for a specific stock and the users portfolio for the match
        module.getStock(stockTicker),
        generatePortfolio(userId, matchId)
      ])
      //take the return data and check that the trade is valid/stock exists
      //if all fine the avaiable cash updated and data is inserted
      .then(function (tuple) {
        console.log('TUPLE', tuple);
        var stock = tuple[0];
        var portfolio = tuple[1];
        var stocks = portfolio.stocks;
        var available_cash = portfolio.available_cash;

        if (stock === null) {
          throw new Error('stock symbol does not exist');
        }

        if (stocks[stock.symbol] === undefined ||
          stocks[stock.symbol].shares < numShares) {
          throw new Error('number of shares to sell exceeds number of shares owned');
        }
        
        available_cash += stock.ask * numShares;

        return createTrade({
          user_id: userId,
          match_id: matchId,
          symbol: stockTicker,
          shares: numShares,
          action: SELL,
          price: stock.ask,
          available_cash: available_cash.toFixed(2)
        });
      })
      .then(function(resp){
        //the trade is returned after it has been inserted
        //and the newly updated portfolio is generated
        trade = resp;
        return module.getPortfolio(userId, matchId);
      })
      .then(function(port){
        //trade and portfolio sent back to the user
        console.log('return from sell', trade, port);
        return {
          trade: trade,
          portfolio: port
        };
      });
  };

//Get specific match and all trades with the corresponding stock data
  var getAllTradesWithStockData = function (userId, matchId) {
    return knex('trades').where({
        user_id: userId,
        match_id: matchId
      })
      .join('stock_prices', 'trades.symbol', '=', 'stock_prices.symbol')
      .join('stocks', 'trades.symbol', '=', 'stocks.symbol')
      .orderBy('created_at', 'ASC');
  };

//Cost Average for calculating the stock price in reduceTradesToPortfolio 
  var costAverage = function (currentPrice, currentShares, newPrice, newShares) {
    var cost = (currentPrice * currentShares + newPrice * newShares) / (currentShares + newShares);
    return Number(cost.toFixed(2));
  };

//Rolls up the users trades for a specific match into a portfolio
  module.reduceTradesToPortfolio = function (trades, startingFunds,title, startDate, endDate) {

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
      title: matchTitle,
      startDate: startDate,
      endDate: endDate
    };

  };

//Gets/calculates the various number related fields of the stock
  var generatePortfolioMetrics = function (portfolio) {

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

    var totVal = portfolioValue + availableCash;
    return {
      totalValue: totVal.toFixed(2),
      available_cash: availableCash,
      stocks: stocks,
      title: title,
      startDate: portfolio.startDate,
      endDate: portfolio.endDate
    };

  };

//Function that calls generatePortfolio and then the generatePortfolioMetrics function: called by buy and sell to compile a users portfolio
  module.getPortfolio = function (userId, matchId) {
    console.log('in get trade');
    return generatePortfolio(userId, matchId)
      .then(function (portfolio) {
        return generatePortfolioMetrics(portfolio);
      })
      .then(function (data) {
        return data;
      });
  };

//Get a Specific Match from the Matches Table
  var getMatch = function (matchId) {
    return knex.select()
      .table('matches').where('m_id', '=', matchId)
      .then(function (match) {
        return match[0];
      });
  };

//Generate the Users Portfolio
  var generatePortfolio = function (userId, matchId) {

    return Promise.all([
        //get specific match and all trades with the corresponding stock data
        getMatch(matchId),
        getAllTradesWithStockData(userId, matchId)
      ])
      //pass the results from above to the reduceTradesToPortfolio which returns a users portfolio for the match in
      .then(function (tuple) {
        var matchTitle = tuple[0].title;
        var startDate = tuple[0].startdate;
        var endDate = tuple[0].enddate;

        var match = tuple[0];
        var trades = tuple[1];
        return module.reduceTradesToPortfolio(trades, match.starting_funds, matchTitle, startDate, endDate);
      });
  };

  return module;
};
