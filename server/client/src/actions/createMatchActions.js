var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var requestHelper = require('./requestHelper.js');

var CreateMatchActions = {

  createMatch: function (title, type, funds, start, end) {

    requestHelper
    .post('matches/', {userId: 13, title: title, type: type, funds: funds, start: start, end: end})
    .end(function(err, userMatch){
      console.log('userData create', userMatch);
      userMatch = userMatch.data;
      AppDispatcher.handleServerAction({
        actionType: "CREATE_MATCH",
        matchId: userMatch.m_id,
        title: userMatch.title,
        type: userMatch.type,
        challengee: userMatch.challengee,
        creator_id: userMatch.creator_id,
        startdate: userMatch.startdate,
        enddate: userMatch.enddate,
        starting_funds: userMatch.starting_funds,
        status: userMatch.status,
        winner: userMatch.winner,
        created_at: userMatch.created_at
      });
    });

  }

};


module.exports = CreateMatchActions;