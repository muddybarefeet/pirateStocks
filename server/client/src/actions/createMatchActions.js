var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var requestHelper = require('./requestHelper.js');

var CreateMatchActions = {

  createMatch: function (title, type, funds, start, end) {

    requestHelper
    .post('matches/', {userId: 13, title: title, type: type, funds: funds, start: start, end: end})
    .end(function(err, response){
      if (response) {
        console.log('response', response)
        response = response.body.data;
        AppDispatcher.handleServerAction({
          actionType: "CREATE_MATCH",
          data: response
        });
      } else {
        console.log('err', err);
      }
    });

  }

};


module.exports = CreateMatchActions;