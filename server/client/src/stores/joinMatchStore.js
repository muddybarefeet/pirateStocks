
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var moment = require('moment');
var CHANGE_EVENT = "change";

var _joinableMatches = {
  matches: null
};

var joinMatchStore = Object.assign(new EventEmitter(), {
  
  getMatchData: function(){
    return _joinableMatches;
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
  
  if(action.actionType === "GET_JOINABLE_MATCHES") {

    _joinableMatches.matches = action.data.map(function (match) {
      return [
        match.title,
        match.type,
        moment(match.startdate).fromNow(),
        moment(match.enddate).fromNow(),
        match.starting_funds,
        match.status,
        match.challengee,
        match.creator_id,
        match.winner,
        match.created_at,
        match.m_id
      ];
    });

    joinMatchStore.emitChange();
  }

});

module.exports = joinMatchStore;



