var Promise = require('bluebird');

module.exports = function (knex) {

  var module = {};

  module.selectCompletingMatches = function (date) {
    console.log('grabbing matches to evaluate');
    return knex('matches')
    .where('status', 'active')
    .then(function (matches) {
      console.log('matches 1', matches);
      return matches.filter(function (match) {
        return Date.parse(match.enddate) <= Date.parse(date);
      });
    });
  };

  module.determineWinners = function (matches) {
    return Promise.map(matches, function (match) {
      if( match.creator_id === match.challengee ) {
           return module.recordWinner(match.m_id, match.creator_id);
      } else {
        //get creator's portfolio
        return module.getPortfolio(match.creator_id, match.m_id)
        .then (function (creatorPortfolio) {
          //get challengee's portfolio
          return module.getPortfolio(match.challengee, match.m_id)
          .then (function (challengeePortfolio) {
            //evaluate portfolio values against each other
            if( creatorPortfolio.totalValue > challengeePortfolio.totalValue ) {
              return module.recordWinner(match.m_id, match.creator_id);
            } else if ( challengeePortfolio.totalValue > creatorPortfolio.totalValue ) {
              return module.recordWinner(match.m_id, match.challengee);
            } else {
              //if there's a tie, we will leave winner null
              return module.recordWinner(match.m_id, null);
            }
          });
        });
      }
    });
  };

  module.getPortfolio = function (userId, matchId) {
    return tradesController.getPortfolio(userId, matchId);
  };

  module.recordWinner = function (matchId, userId) {
    return knex('matches')
    .where('m_id', '=', matchId)
    .update({
      status: 'complete',
      winner: userId
    }, '*')
    .then(function (match) {
      console.log('winner recorded', match[0]);
      return match[0];
    });
  };

  return module;

};