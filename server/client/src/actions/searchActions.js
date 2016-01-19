var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var requestHelper = require('./requestHelper.js');

var searchActions = {

  searchStockDb: function (queryStr) {
    requestHelper
    .get('stocks/?search=' + queryStr)
    .end(function(err, response){
      if (response) {
        response = response.body.data;
        AppDispatcher.handleServerAction({
          actionType: "SEARCH_STOCK_DATA",
          data: response
        });
      } else {
        console.log('err', err);
      }

    });
  }

};


module.exports = searchActions;






 



