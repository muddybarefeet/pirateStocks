var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var requestHelper = require('./requestHelper.js');

var searchActions = {

  searchStockDb: function (queryStr) {
    requestHelper
    .get('stocks/?search=' + queryStr, localStorage.jwt)
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
    .get('stocks/'+ symbol, localStorage.jwt)
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
  }

};


module.exports = searchActions;






 



