var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var jwt = require('../constants.js').jwt;
var requestHelper = require('./requestHelper.js');

var CreateMatchActions = {

  createMatch: function (title, type, funds, start, end) {

    requestHelper
    .post('matches/create', {title: title, type: type, funds: funds, start: start, end: end}, jwt)
    .end(function(err, response){
      if (response.status !== 200) {
        console.log('response from create', response);
        response = response.body.message;
        AppDispatcher.handleServerAction({
          actionType: "CREATE_MATCH_ERR",
          message: response
        });
      } else {
        console.log('response from create2', response);
        response = response.body.data;
        AppDispatcher.handleServerAction({
          actionType: "CREATE_MATCH",
          data: response
        });
      }
    });

  },

  randomTitle: function () {
    requestHelper
    .get('matches/title', jwt)
    .end(function (err, response) {
      AppDispatcher.handleClientAction({
        actionType: "MATCH_TITLE",
        data: response.body.data
      });
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