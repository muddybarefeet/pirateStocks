
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var EventEmitter = require('events').EventEmitter;
// require('events').EventEmitter.prototype._maxListeners = 10;
var CHANGE_EVENT = "change";


var _userDetails = {
  userName: null,
  signupError: null,
  loginError: null
};

var authStore = Object.assign(new EventEmitter (), {
  
  getUserData: function(){
    return _userDetails;
  },

  emitChange: function (){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.addListener(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register( function (payload){ //'subscribes' to the dispatcher. Store wants to know if it does anything. Payload 
  var action = payload.action;//payload is the object of data coming from dispactcher //action is the object passed from the actions file

  if(action.actionType === "USER_SIGNUP") {
    localStorage.setItem('jwt', action.data.jwt);
    localStorage.setItem("username", action.data.username);
    authStore.emitChange();
  }

  if (action.actionType === "USER_LOGIN") {
    localStorage.setItem("jwt", action.data.jwt);
    localStorage.setItem("username", action.data.username);
    authStore.emitChange();
  }

  if (action.actionType === "USER_LOGIN_ERROR") {
    _userDetails.loginError = "User details were nah found. Try loggin' yer details again or make a new account yer scurvy nave!";
    authStore.emitChange();
  }

  if (action.actionType === "USER_SIGNUP_ERROR") {
    _userDetails.signupError = "Thar was an error makin' yer account, me deepest appologies. Try yer luck again.";
    authStore.emitChange();
  }


});


module.exports = authStore;

