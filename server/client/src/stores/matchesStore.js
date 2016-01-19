
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var moment = require('moment');
var CHANGE_EVENT = "change";

var _userMatches = {
  matches: []
};

var matchesStore = Object.assign(new EventEmitter(), {
  
  getMatchData: function(){
    return _userMatches;
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
  
  if(action.actionType === "CREATE_MATCH") {
    _userMatches.matches.push(action);
    matchesStore.emitChange();
  }

  if(action.actionType === "GET_USER_MATCHES") {
    var match = [];

    match.push(action.title);
    match.push(action.type);
    match.push(moment(action.startDate).fromNow());
    match.push(moment(action.endDate).fromNow());
    match.push(action.startingFunds);
    match.push(action.status);
    
    match.push(action.challengee);
    match.push(action.creatorId);
    match.push(action.winner);
    match.push(action.createdAt);
    match.push(action.matchId);

    _userMatches.matches.push(match);
    match = [];
    localStorage.setItem("matchId", action.matchId);
    matchesStore.emitChange();

  }

});


module.exports = matchesStore;



