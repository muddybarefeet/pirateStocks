
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

    _userMatches.matches.push([
      action.data.title,
      action.data.type,
      moment(action.data.startdate).fromNow(),
      moment(action.data.enddate).fromNow(),
      action.data.starting_funds,
      action.data.status,
      action.data.challengee,
      action.data.creator_id,
      action.data.winner,
      action.data.created_at,
      action.data.m_id
    ]);
    console.log('create match store', _userMatches.matches);
    matchesStore.emitChange();
  }

  if(action.actionType === "GET_USER_MATCHES") {

    var matches = action.data.forEach(function (match) {
      _userMatches.matches.push([
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
      ]);
    });

    matchesStore.emitChange();

  }

});


module.exports = matchesStore;



