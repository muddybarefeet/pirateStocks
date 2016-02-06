
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var requestHelper = require('./requestHelper.js');
var jwt = require('../constants.js').jwt;

var joinMatchActions = {

  getJoinableMatches: function () {

    requestHelper
    .get('matches/joinable', jwt)
    .end(function(err, response){
      if (response.status === 200) {
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

  joinMatch: function (matchId) {
    requestHelper
    .put('matches/join/' + matchId, jwt)
    .end(function (err, response) {
      console.log('response from join', response);
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
  }

};


module.exports = joinMatchActions;


 



