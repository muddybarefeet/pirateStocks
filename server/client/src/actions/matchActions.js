var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var requestHelper = require('./requestHelper.js');

var matchActions = {

  getUserMatches: function (userId) {

    requestHelper
    .get('matches/user/'+ userId)
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

  getMatchPortfolio: function (userId, matchId) {

    requestHelper
    .get('trades/'+ matchId + '/' + userId)
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

  makeTrade: function (userId, matchId, qty, symbol, action) {

    requestHelper
    .post('trades/' + matchId + '/' + userId, {userId: userId, matchId: matchId, numShares: qty, symbol: symbol, action: action })// /matchId/userId
    .end(function (err, response) {
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


 



