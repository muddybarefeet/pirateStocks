var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var requestHelper = require('./requestHelper.js');

var matchActions = {

  getUserMatches: function (jwt) {

    requestHelper
    .get('matches/user', jwt)
    .end(function(err, response){
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

  getMatchPortfolio: function (jwt, matchId) {

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

  makeTrade: function (jwt, matchId, qty, symbol, action) {

    requestHelper
    .post('trades/' + matchId, {matchId: matchId, numShares: qty, symbol: symbol, action: action }, jwt)
    .end(function (err, response) {
      console.log('err in trade', response);
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


 



