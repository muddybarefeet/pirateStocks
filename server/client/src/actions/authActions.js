
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var requestHelper = require('./requestHelper.js');

var authActions = {

  sendLogin: function (email, password) {
    
    requestHelper
    .post('users/login', {email: email, password: password})
    .end(function (err, response) {
      if (response.status === 200) {
        userData = response.body.data;
        AppDispatcher.handleServerAction({
          actionType: "USER_LOGIN",
          data: userData
        });
      } else {
        AppDispatcher.handleServerAction({
          actionType: "USER_LOGIN_ERROR",
          data: userData
        });
      }
    });

  },

  sendSignup: function (username, email, password) {
    
    requestHelper
    .post('users/signup', {username: username, email: email, password: password})
    .end(function (err, response) {
      if (response.status === 200) {
        userData = response.body.data;
        AppDispatcher.handleServerAction({
          actionType: "USER_SIGNUP"
        });
      } else {
        AppDispatcher.handleServerAction({
          actionType: "USER_SIGNUP_ERROR"
        });
      }
    });

  }

};


module.exports = authActions;


 



