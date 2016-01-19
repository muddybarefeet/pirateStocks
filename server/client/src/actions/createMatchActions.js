var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var requestHelper = require('./requestHelper.js');

var CreateMatchActions = {

  createMatch: function (title, type, funds, start, end) {

    requestHelper
    .post('matches/', {userId: 13, title: title, type: type, funds: funds, start: start, end: end})
    .end(function(err, userMatch){
      if (userMatch) {
        userMatch = userMatch.body.data;
        AppDispatcher.handleServerAction({
          actionType: "CREATE_MATCH",
          matchId: userMatch.m_id,
          title: userMatch.title,
          type: userMatch.type,
          challengee: userMatch.challengee,
          creatorId: userMatch.creator_id,
          startDate: userMatch.startdate,
          endDate: userMatch.enddate,
          startingFunds: userMatch.starting_funds,
          status: userMatch.status,
          winner: userMatch.winner,
          createdAt: userMatch.created_at
        });
      } else {
        console.log('err', err);
      }
    });

  }

};


module.exports = CreateMatchActions;