var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var jwt = require('../constants.js').jwt;
var requestHelper = require('./requestHelper.js');

var CreateMatchActions = {

  createMatch: function (title, type, funds, start, end) {

    requestHelper
    .post('matches/create', {title: title, type: type, funds: funds, start: start, end: end}, jwt)
    .end(function(err, response){
      console.log('response from create', response);
      if (response.status === 200) {
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