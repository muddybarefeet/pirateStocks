var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var utils = require('./utils');

module.exports = function (services) {

  router
    .param('symbol', function (req, res, next, symbol) {
      req.symbol = symbol;
      next();
    })
    .param('date', function (req, res, next, date) {
      req.date = date;
      next();
    });

//Stock Search Route :)
//-----------------------------------
  router.route('/')
    .get(function (req, res) {
      var search = req.query.search;
      services.db.stocks.searchStock(search)
        .then(function (response) {
          res.json({
            data: response
          });
        });
    });

//Update Prices Route DEPRECATED
//-----------------------------------
  // router.route('/update')
  //   .post(function (req, res) {
  //     var list = req.body;
  //     services.db.updatePrices(list)
  //       .then(function (stockArray) {
  //         res.status(200).json({
  //           data: stockArray
  //         });
  //       })
  //       .catch(function (err) {
  //         res.status(400).json({
  //           message: err
  //         });
  //       });
  //   });

//Get Stock Route :)
//-----------------------------------
  router.route('/:symbol')
    .get(function (req, res) {
      var symbol = req.symbol;
      services.db.stocks.getStock(symbol).then(function (response) {
        if (response === null) {
          res.sendStatus(404);
        } else {
          res.json({
            data: response
          });
        }
      });
    });

//Get Specific Stock Data from Yahoo API route
//--------------------------------------------
//route returns a csv which includes dates and close prices for a specific stock
//the last letter on the url denotes that we ask for the weekly close prices(not day or year)
//MOVE TO SERVICES YAHOO
  router.route('/history/:symbol/:date')
    .get(function (req, res) {

      var stockSymbol = req.symbol;
      var startDate = new Date(req.date);
      
      services.yahoo.getStockData(stockSymbol, startDate)
      .then(function (stockData) {
        res.json({
          data: response
        });
      })
      .catch(function (err) {
        res.status(400).json({
          message: err
        });
      });



    });

  return router;
};
