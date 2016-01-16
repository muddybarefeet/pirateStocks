var rp = require('request-promise');
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var $ = require('jquery');

var authActions = {

  sendLogin: function (email, password) {

    console.log('ACTIONS login!!',email, password);

    $.post('/api/users/login',{email: email, password: password}, function () {
      console.log(arguments);
    });

  },

  sendSignup: function (email, password) {

    console.log('ACTIONS Signup!!',email, password);
    var options = {
        method: 'POST',
        uri: "http://localhost:3000/api/users/signup",

    };

    rp(options)
      .then(function (data) {
        console.log('data success',data);
      })
      .catch(function (err) {
        console.log('err',err);
      });

  }

};


module.exports = authActions;


    // AppDispatcher.handleServerAction({ //serverAction
    //   actionType: "USER_SIGNUP",//descript what happened CAPS
    //   id: res.id,
    // });

    // AppDispatcher.handleServerAction({ //serverAction
    //   actionType: "USER_LOGIN",//descript what happened CAPS
    //   id: res.id,
    // });


