var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var requestHelper = require('./requestHelper.js');

var searchActions = {

  searchStockDb: function (queryStr) {
    requestHelper
    .get('stocks/?search=' + queryStr)
    .end(function (err, response){
      if (!err) {
        response = response.body.data;
        AppDispatcher.handleServerAction({
          actionType: "SEARCH_STOCK_DATA",
          data: response
        });
      } else {
        console.log('err', err);
      }

    });
  },

  getOneStocksDetails: function (symbol) {
    requestHelper
    .get('stocks/'+ symbol)
    .end(function (err, response) {
      if (!err) {
        response = response.body.data;
        AppDispatcher.handleServerAction({
          actionType: "GET_ONE_STOCK",
          data: response
        });
      } else {
        console.log('err', err);
      }
    });
  },

  buyStock: function (userId, matchId, qty, symbol) {
    console.log('symbol', symbol);
    requestHelper
    .post('trades/' + matchId + '/' + userId, {userId: userId, matchId: matchId, numShares: qty, symbol: symbol, action: 'buy'})// /matchId/userId
    .end(function (err, response) {
      console.log('response buy', response);
      if (!err) {
        response = response.body.data;
        AppDispatcher.handleServerAction({
          actionType: "BUY_STOCK",
          data: response
        });
      } else {
        console.log('err', err);
      }
    });
  }

};


module.exports = searchActions;






 



