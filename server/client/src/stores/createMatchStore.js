
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var EventEmitter = require('events').EventEmitter;
// require('events').EventEmitter.prototype._maxListeners = 10;
var CHANGE_EVENT = "change";
var merge = require('merge');

var _userDetails = {
  userId: null,
  userEmail: null,
  username: null
};

var CreateMatchStore = merge(EventEmitter.prototype, {
  
  getUserData: function(){
    return {};
  },

  emitChange: function (){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register( function (payload){ //'subscribes' to the dispatcher. Store wants to know if it does anything. Payload 
  var action = payload.action;//payload is the object of data coming from dispactcher //action is the object passed from the actions file

  if(action.actionType === "USER_SIGNUP") {
    console.log('in user signup store', action);
    _userDetails.userId = action.id;
    _userDetails.userEmail = action.email;
    _userDetails.username = action.username;
    CreateMatchStore.emitChange();
  }

  if (action.actionType === "USER_LOGIN") {
    _userDetails.userId = action.id;
    _userDetails.userEmail = action.email;
    _userDetails.username = action.username;
    console.log('in user login store', _userDetails);
    CreateMatchStore.emitChange();
  }


});


module.exports = CreateMatchStore;

