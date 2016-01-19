
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = "change";

var _currentMatch = {
};

var portfolioStore = Object.assign(new EventEmitter(), {
  
  getMatchData: function(){
    return _currentMatch;
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
  
  if(action.actionType === "GET_USER_MATCH") {
    var match = [];
    console.log('in portfolio actions', action);
    match.push(action.matchId);
    match.push(action.availableCash);
    match.push(action.totalValue);
    match.push(action.stocks);

    _currentMatch.match = match;
    match = [];
    portfolioStore.emitChange();

  }

});


module.exports = portfolioStore;


