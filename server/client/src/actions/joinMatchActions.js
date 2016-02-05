
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var requestHelper = require('./requestHelper.js');

var joinMatchActions = {

  getJoinableMatches: function (userId) {

    requestHelper
    .get('matches/joinable')
    .end(function(err, response){
      if (!err) {
        response = response.body.data;
        AppDispatcher.handleServerAction({
          actionType: "GET_JOINABLE_MATCHES",
          data: response
        });
      } else {
        console.log('err', err);
      }

    });
  },

  joinMatch: function (matchId, userId) {
    requestHelper
    .put('matches/join/' + matchId, {userId: userId})
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
  }

};


module.exports = joinMatchActions;


 



