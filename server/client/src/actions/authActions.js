var rp = require('request-promise');
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var requestHelper = require('./requestHelper.js');

var authActions = {

  sendLogin: function (email, password) {
    console.log('clicked to login');
    requestHelper
    .post('users/login', {email: email, password: password})
    .then(function(userData){
      debugger;
      console.log('action response recieved.');
      userData = userData.data;
      if (userData) {
        AppDispatcher.handleServerAction({
          actionType: "USER_LOGIN",
          id: userData.id,
          email: userData.email,
          username: userData.username
        });
      }
    })
    .catch(function (err) {
      debugger;
      console.log('err login', err);
    });

  },

  sendSignup: function (username, email, password) {
    
    requestHelper
    .post('users/signup', {username: username, email: email, password: password})
    .then(function(userData){
      userData = userData.data;
      if (userData) {
        AppDispatcher.handleServerAction({
          actionType: "USER_SIGNUP",
          id: userData.id,
          email: userData.email,
          username: userData.username
        });
      }
    })
    .catch(function (err) {
      console.log('err signup', err);
    });

  }

};


module.exports = authActions;


 



