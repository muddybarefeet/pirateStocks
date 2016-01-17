var rp = require('request-promise');
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var requestHelper = require('./requestHelper.js');

var CreateMatchActions = {

  createMatch: function (title, type, funds, start, end) {

    console.log('ACTIONS create!!',title, type, funds, start, end);
    requestHelper
    .post('matches/', {userId: 13, title: title, type: type, funds: funds, start: start, end: end})
    .then(function(userData){
      if (userMatch.data) {
        userMatch = userMatch.data;
        console.log('userData create', userMatch);
        AppDispatcher.handleServerAction({
          actionType: "CREATE_MATCH",
          id: userMatch.id,
          email: userMatch.email,
          username: userMatch.username
        });
      }
    })
    .catch(function (err) {
      console.log('creatematch err', err);
    });

  }

};


module.exports = CreateMatchActions;