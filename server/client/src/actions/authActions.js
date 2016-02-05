
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var requestHelper = require('./requestHelper.js');

var authActions = {

  sendLogin: function (email, password) {
    
    requestHelper
    .post('users/login', {email: email, password: password})
    .end(function (err, response) {
      console.log('response', response);
      if (response) {
        userData = response.body.data;
        AppDispatcher.handleServerAction({
          actionType: "USER_LOGIN",
          data: userData
        });
      } else {
        console.log('err', err);
      }
    });

  },

  sendSignup: function (username, email, password) {
    
    requestHelper
    .post('users/signup', {username: username, email: email, password: password})
    .end(function (err, userData) {
      if (userData) {
        userData = userData.body.data;
        AppDispatcher.handleServerAction({
          actionType: "USER_SIGNUP",
          response: userData
        });
      } else {
        console.log('err', err);
      }
    });

  }

};


module.exports = authActions;


 



