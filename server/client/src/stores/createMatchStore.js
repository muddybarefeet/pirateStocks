
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var EventEmitter = require('events').EventEmitter;
// require('events').EventEmitter.prototype._maxListeners = 10;
var CHANGE_EVENT = "change";
var merge = require('merge');

var _userMatches = {
};

var CreateMatchStore = merge(EventEmitter.prototype, {
  
  getUserData: function(){
    return _userMatches;
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
  
  if(action.actionType === "CREATE_MATCH") {
    console.log('in user creatMatch store', action);
    _userMatches[action.title] = action;
    console.log('store', _userMatches);
    CreateMatchStore.emitChange();
  }


});


module.exports = CreateMatchStore;



