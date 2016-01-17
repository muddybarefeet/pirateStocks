var rp = require('request-promise');
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var requestHelper = require('./requestHelper.js');

var matchActions = {

  getUserMatches: function (userId) {

    requestHelper
    .get('matches/user/'+ userId)
    .then(function(matches){

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

    })
    .catch(function (err) {
      console.log('err login', err);
    });

  }

};


module.exports = matchActions;


 



