var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var requestHelper = require('./requestHelper.js');

var CreateMatchActions = {

  createMatch: function (userId, title, type, funds, start, end) {

    requestHelper
    .post('matches/', {userId: userId, title: title, type: type, funds: funds, start: start, end: end})
    .end(function(err, response){
      if (response) {
        response = response.body.data;
        AppDispatcher.handleServerAction({
          actionType: "CREATE_MATCH",
          data: response
        });
      } else {
        console.log('err', err);
      }
    });

  },

  getStartDate: function (date) {
    AppDispatcher.handleClientAction({
      actionType: "START_DATE",
      date: date
    });
  },

  getEndDate: function (date) {
    AppDispatcher.handleClientAction({
      actionType: "END_DATE",
      date: date
    });
  }

};


module.exports = CreateMatchActions;