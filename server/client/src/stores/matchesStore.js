
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var moment = require('moment');
var CHANGE_EVENT = "change";

var _userMatches = {
  matches: [],
  pastMatches: [],
  startDate: null,
  endDate: null,
  errorMessage: null
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

  var formatMatch = function (match) {
    return [
      match.title,
      match.type,
      match.startdate,
      match.enddate,
      match.duration,
      match.starting_funds,
      match.userCash,
      match.opponentCash,
      match.winner,
      match.status,
      match.m_id
    ];
  };

  if(action.actionType === "CREATE_MATCH") { //needed??

    _userMatches.matches.push([
      action.data.title,
      action.data.type,
      moment(action.data.startdate).fromNow(),
      moment(action.data.enddate).fromNow(),
      action.data.starting_funds,
      action.data.challengee,
      action.data.winner,//-----------------> to be updated
      action.data.status,
      action.data.m_id
    ]);

    localStorage.setItem('matchId', action.data.m_id);
    matchesStore.emitChange();
  }

  if(action.actionType === "GET_USER_MATCHES") {

    var matches = [];
    var past = [];

    action.data.forEach(function (match, index) {

      if (match.status === 'pending' || match.status === 'active') {
        matches.push(formatMatch(match));
      } else if (match.status === 'complete') {
        past.push(formatMatch(match));

      }

    });

    _userMatches.matches = matches;
    _userMatches.pastMatches = past;

    matchesStore.emitChange();

  }

  if (action.actionType === "START_DATE") {

    _userMatches.startDate = action.date;
    matchesStore.emitChange();

  }

  if (action.actionType === "END_DATE") {

    _userMatches.endDate = action.date;
    matchesStore.emitChange();

  }

  if (action.actionType === "CREATE_MATCH_ERR") {
    _userMatches.errorMessage = action.message;
    matchesStore.emitChange();
  }

});


module.exports = matchesStore;



