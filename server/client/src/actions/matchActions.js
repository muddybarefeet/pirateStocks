var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var jwt = require('../constants.js').jwt;
var requestHelper = require('./requestHelper.js');

var matchActions = {

  getUserMatches: function () {

    requestHelper
    .get('matches/user', jwt)
    .end(function(err, response){
      if (response.status === 200) {
        response = response.body.data;
        AppDispatcher.handleServerAction({
          actionType: "GET_USER_MATCHES",
          data: response
        });
      } else {
        console.log('err', err);
      }

    });
  },

  getMatchPortfolio: function (matchId) {

    requestHelper
    .get('trades/'+ matchId, jwt)
    .end(function (err, response) {
      if (response.status === 200) {
        response = response.body.data;
        AppDispatcher.handleServerAction({
            actionType: "GET_USER_MATCH",
            data: response
          });
      } else {
        console.log('err', err);
      }
    });

  },

  makeTrade: function (matchId, qty, symbol, action, numSharesHave) {
    var actionType = "MAKE_"+action.toUpperCase()+"_ERROR";
    requestHelper
    .post('trades/' + matchId, {matchId: matchId, numShares: qty, symbol: symbol, action: action, numSharesHave: numSharesHave}, jwt)
    .end(function (err, response) {
      console.log('in trade RESPONSE', response);
      if (response.status !== 200) {
      console.log('in trade RESPONSE err', response);
        response = response.body.message;
        AppDispatcher.handleServerAction({
          actionType: actionType,
          message: response
        });
      } else {
        response = response.body.data;
        AppDispatcher.handleServerAction({
          actionType: "MAKE_TRADE",
          data: response
        });
      }
    });
  
  }

};


module.exports = matchActions;


 



