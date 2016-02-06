var Promise = require('bluebird');
var moment = require('moment');

var tradesMethods = require('./trades.js');

module.exports = function (knex) {
  var module = {};

  var PENDING = 'pending';
  var ACTIVE = 'active';
  var SOLO = 'solo';

  // ensure start dates are stored consistently in db
  function standardizeStart(date){
    var START_HOUR = 14;
    var START_MIN = 30;
    var newDate = new Date(date);
    var start = new Date( Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), START_HOUR, START_MIN) );
    return start.toISOString();
  }

  // ensure end dates are stored consistently in db 
  function standardizeEnd(date){
    var END_HOUR = 21;
    var newDate = new Date(date);
    var end = new Date( Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), END_HOUR) );
    return end.toISOString();
  }

  /* A match requires a creater (userId) {string}, starting funds {number}
   the type (solo or head to head) {string}, start date {date}, end date
   {date} */

  //Create a Match: insert a user into the previously null challengee matches table field. matchId {string}, userId {string}
  //-------------------------------------------------------------------------------------   

  module.createMatch = function (userId, startFunds, type, startDate, endDate, title) {
    console.log('in db methods', startDate);
    var challengee = null;
    var today = standardizeStart(Date.now());
    var status = PENDING;

    startDate = standardizeStart(startDate);
    endDate = standardizeEnd(endDate);

    if (startDate >= endDate){
      throw new Error('End date can not occur before start date.');
    }

    if (startDate < today){
      throw new Error('Start date can be before today.');
    }

    if (type === SOLO) {
      challengee = userId;
      if (startDate === today){
        status = ACTIVE;
      }
    }

    console.log(startDate);

    return knex('matches').insert({
      'creator_id': userId,
      'starting_funds': startFunds,
      'startdate': startDate,
      'enddate': endDate,
      'status': status,
      'challengee': challengee,
      'title': title,
      'type': type
    }, '*')
    .then(function (match) {
      console.log('returned inserted', match);
      return match[0];
    });

  };

//Join a Match: insert a user into the previously null challengee matches table field. matchId {string}, userId {string}
//-------------------------------------------------------------------------------------
  module.joinMatch = function (matchId, userId) {
    return knex('matches')
    .where({
      challengee: null,
      m_id: matchId,
      status: PENDING,
      type: 'head to head'
    })
    .update({
      challengee: userId
    }, '*')
    .then(function (match) {
      if (match.length < 1) {
        return null;
      }
      return match[0];
    });
  };

//Return all joinable matches
//----------------------------------
  module.getAllJoinableMatches = function (userId) {
    return knex('matches').where({
      'status': PENDING,
      'challengee': null
    })
    .andWhereNot('creator_id', userId);
  };

// Return all portfolios for a user. userId {string}
//--------------------------------------------------------
  module.getUsersPortfolios = function (userId) {
    return module.getUsersMatches(userId)
      .then(function (matches) {
        return Promise.map(matches, function (match) {
          return tradesMethods.getPortfolio(userId, match.m_id)
            .then(function (portfolio) {
              match.portfolio = portfolio;
              return match; // returns match object with all match info + corresponding portfolio
            });
        });
      });
  };

// Get all matches for a user. userId {string}
//----------------------------------------------
  module.getUsersMatches = function (userId) {

    return knex.select()
    .table('matches')
    .where('creator_id', userId)
    .orWhere('challengee', userId)
    .orderBy('startdate', 'desc')
    .then(function (matches) { //sort and get the available cash
      //now want to map thought them and find the opponent and get their portfolio value
      return Promise.map(matches, function (match) {

        var opponentId;
        if (match.creator_id !== userId) { //if the creator is not the user then use this id to get the opponents portfolio value
          opponentId = match.creator_id;
        } else { //challangee is the id you need to use to get the opponents portfolio value
          opponentId = match.challangee;
        }

        //select all from the trades table for the user and opponent in order and return the newest then add as prop to match
        return knex.select()
        .from('trades')
        .where('user_id', opponentId)
        .orderBy('created_at', 'desc')//check this is in the right order!!! not need asc!!
        .limit(1)
        .then(function (trade) {
          if (trade.length > 0) {
            match.opponentCash = '$' + trade.available_cash.toFixed(2);
          } else {
            match.opponentCash = '$' + match.starting_funds;
          }
          return null;
        })
        .then(function () {
          return knex.select()
          .from('trades')
          .where('user_id', userId)
          .orderBy('created_at', 'desc')
          .limit(1)
          .then(function (trade) {
            if (trade.length === 1) {
              if (trade.available_cash) {//for the moment until sort out the sell function
                match.userCash = '$' + trade.available_cash.toFixed(2);
              }
            } else {
              match.userCash = '$' + match.starting_funds;
            }
            //format the rest of the data
            match.starting_funds = '$' + match.starting_funds;
            //find duration
            match.duration = getDuarion(match.startdate, match.enddate);
            match.startdate = moment(new Date (match.startdate)).fromNow();
            return match;
          });
        });

      })
      .catch(function (err) {
        console.log('err in get user matches', err);
      });

    });

  };

  var getDuarion = function (startDate, endDate) {
    var start = moment(new Date (startDate));
    var end = moment(new Date(endDate));
    var diff = end.diff(start, "days");
    console.log('diff', diff);
    if (diff === 1) {
      return diff + " day";
    } else {
      return diff + " days";
    }
  };

  return module;

};
