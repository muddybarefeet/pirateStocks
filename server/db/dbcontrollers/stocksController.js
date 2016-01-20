var classes = require('./classes.js');

module.exports = function (knex) {
  var module = {};

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
      return new classes.SingleStock(res.name, res.symbol, res.industry, res.sector, res.exchange, res.ask, res.percent_change, res.year_high, res.year_low);
    })
    .catch(function (err) {
      return null;
    });

  };

//Query the database for anything like the input search (for search page on the front end)
//------------------------------------------------------------------------------------------
  module.searchStock = function (search) {
    var searchLike = search + '%';
    return knex('stocks').where(function() {
        this.where(knex.raw('stocks.symbol like UPPER(?)', [searchLike]))
            .orWhere(knex.raw('UPPER(stocks.name) like UPPER(?)', [searchLike]))
      })
      .whereNotNull('ask')
      .join('stock_prices', 'stocks.symbol', '=', 'stock_prices.symbol')
      .limit(20)
      .orderBy('name', 'asc')
    .then(function(stocks) {
      return stocks.map(function (stock) {
        return new classes.Search(stock.name, stock.symbol, stock.ask);
      });
    })
    .then(function (formattedStocks) {
      return formattedStocks;
    });
  };

//Update Prices Controller. Deprecated.
//------------------------------
//pass in array of objects contaning symbol,shares,and price 
//query stock_prices and update price if needed and return
  module.updatePrices = function (stockArr) {
    return knex.select('symbol','ask')
      .from('stock_prices')
    .then(function (dataArr) {
      return stockArr.map(function (stockObj) {
        var price;
        for (var i = 0; i < dataArr.length; i++) {
          if (dataArr[i].symbol === stockObj.stockSymbol) {
            if (dataArr[i].ask !== stockObj.price) {
              stockObj.price = dataArr[i].ask;
            }
          }
        }
        return stockObj;
      });

    });

  };


  return module;

};
