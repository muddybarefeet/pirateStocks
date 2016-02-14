
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var requestHelper = require('./requestHelper.js');
var jwt = require('../constants.js').jwt;


var chartActions = {

  getStockHistory: function (symbol, startDate) {
    //request.get('/stocks/history/'+this.props.symbol+'/'+this.props.startdate)
    requestHelper
    .get('stocks/history/'+symbol+'/'+startDate, jwt)
    .end(function (err, response) {
      if (response.status === 200) {
        
        console.log('graph response',response);
        AppDispatcher.handleServerAction({
          actionType: "STOCK_CHART_DATA",
          data: response.body.data
        });

      } else {

        console.log('response', response, 'err', err);
        
      }
    });

  }

};


module.exports = chartActions;


 



