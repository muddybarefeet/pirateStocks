var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var jwt = require('../constants.js').jwt;
var requestHelper = require('./requestHelper.js');

var matchActions = {

  getUserMatches: function () {

    requestHelper
    .get('matches/user', jwt)
    .end(function(err, response){
      console.log('response', response);
      if (!err) {
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
      if (response) {
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

  makeTrade: function (matchId, qty, symbol, action) {

    requestHelper
    .post('trades/' + matchId, {matchId: matchId, numShares: qty, symbol: symbol, action: action }, jwt)
    .end(function (err, response) {
      console.log('in trade', response);
      if (!err) {
        response = response.body.data;
        AppDispatcher.handleServerAction({
          actionType: "MAKE_TRADE",
          data: response
        });
      } else {
        console.log('err', err);
      }
    });
  
  }

};


module.exports = matchActions;


 



