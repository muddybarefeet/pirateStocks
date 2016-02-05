var moment = require('moment');

//If the match has no challengee it can't start so reject it

module.exports = function (knex) {

  var module = {};

  //Select all pending matches that start on passed in date (when used this is looking for all matches starting today)
  module.selectPendingMatches = function (date) {
    console.log('finding pending matches');
    return knex('matches')
      .where('status', 'pending')
      .then( function(matches) {
        return matches.filter(function(match) {
          return Date.parse(match.startdate) <= Date.parse(date);
        });
      });
  };

  //Decide if a match can become active or not depending on whether it has a chalengee
  module.updateMatchState = function (matches) {
    console.log('updating match states');
    return Promise.map(matches, function (match) {
      if( match.challengee ) {
        return module.activateMatch(match);
      } else {
        return module.rejectMatch(match);
      }
    });
  };
  
  var rejectMatch = function (match) {
    return knex('matches')
    .where('m_id', '=', match.m_id)
    .andWhere('status', '=', 'pending')
    .andWhere({challengee: null})
    .update({status: 'rejected'}, '*')
    .then( function (rejectedMatch) {
      console.log('rejecting match', rejectedMatch[0]);
      return rejectedMatch[0];
    })
    .catch( function (err) {
      console.error(err);
    });
  };

  //Update the status of a match if it starts today and it has a challengee
  var activateMatch = function (match) {
    console.log('active matches', match);
    return knex('matches')
    .where('m_id', '=', match.m_id)
    .andWhere('status', '=', 'pending')
    .andWhereNot({challengee: null})
    .update({status: 'active'}, '*')
    .then( function (match) {
      console.log('activating match', match[0]);
      return match[0];
    })
    .catch( function (err) {
      console.error(err);
    });
  };


  // module.selectPendingMatches = function (date) {
  //   return knex('matches')
  //   .where('status', 'pending')
  //   .orderBy('startdate', 'desc')
  //   .then( function(matches) {
  //     //now select any which start today
  //     return matches.map(function (match) {
        
  //       var startToday = moment(match.startdate).isSame(moment( new Date('2016-02-11T14:30:00.000Z') ), "day");

  //       if(startToday) {
  //         if (!match.challengee) { //can't start as noone to play against
  //           return rejectMatch(match);
  //         } else {
  //           console.log('---->', activateMatch(match));
  //           return activateMatch(match);
  //         }
  //       }

  //     });
  //   });
  // };

  return module;

};
