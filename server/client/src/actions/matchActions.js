var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var requestHelper = require('./requestHelper.js');

var matchActions = {

  getUserMatches: function (userId) {

    requestHelper
    .get('matches/user/'+ userId)
    .end(function(err, matches){

      matches = matches.data;
      matches.forEach(function (match) {
        AppDispatcher.handleServerAction({
          actionType: "GET_USER_MATCHES",
          matchId: match.m_id,
          title: match.title,
          type: match.type,
          challengee: match.challengee,
          creator_id: match.creator_id,
          startdate: match.startdate,
          enddate: match.enddate,
          starting_funds: match.starting_funds,
          status: match.status,
          winner: match.winner,
          created_at: match.created_at
        });
      });

    });

  }

};


module.exports = matchActions;


 



