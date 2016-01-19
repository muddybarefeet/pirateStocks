var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var requestHelper = require('./requestHelper.js');

var matchActions = {

  getUserMatches: function (userId) {

    requestHelper
    .get('matches/user/'+ userId)
    .end(function(err, matches){
      if (matches) {
        matches = matches.body.data;
        matches.forEach(function (match) {
          AppDispatcher.handleServerAction({
            actionType: "GET_USER_MATCHES",
            matchId: match.m_id,
            title: match.title,
            type: match.type,
            challengee: match.challengee,
            creatorId: match.creator_id,
            startDate: match.startdate,
            endDate: match.enddate,
            startingFunds: match.starting_funds,
            status: match.status,
            winner: match.winner,
            createdAt: match.created_at
          });
        });

      } else {
        console.log('err', err);
      }

    });
  },


  getMatchPortfolio: function (userId, matchId) {
    console.log('in actions', userId, matchId);
    requestHelper
    .get('trades/'+ matchId + '/' + userId)
    .end(function (err, match) {
      console.log('back from server', match);
      if (match) {
        match = match.body.data;
        AppDispatcher.handleServerAction({
            actionType: "GET_USER_MATCH",
            matchId: matchId,
            availableCash: match.available_cash,
            totalValue: match.totalValue,
            stocks: match.stocks
          });
      } else {
        console.log('err', err);
      }
    });
  }

};


module.exports = matchActions;


 



