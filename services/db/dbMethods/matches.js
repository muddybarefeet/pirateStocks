var Promise = require('bluebird');

var tradesMethods = require('./trades.js');
var utils = require('./utils.js');

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
    .then(function (matches) {
      //now want to map thought them and find the opponent and get their portfolio value
      matches.map(function (match) {

        var opponentId;

        if (match.creator_id !== userId) { //if the creator is not the user then use this id to get the opponents portfolio value
          opponentId = match.creator_id;
        } else { //challangee is the id you need to use to get the opponents portfolio value
          opponentId = match.challangee;
        }
        // var x = tradesMethods.getPortfolio(userId, match.m_id);
        //want to call the function to get the opponents portfolio and get their available cash and do the same for the user
        console.log('tradesMethods', utils.getPortfolio(userId, match.m_id));
        // return x;
        // return tradesMethods.getPortfolio(userId, match.m_id)
        // .then(function (portfolio) {
        //   console.log('userPortfolio', portfolio);
        //   match.userVal = portfolio.available_cash;
        //   return null;
        // })
        // .then(function () {
        //   return tradesMethods.getPortfolio(opponentId, match.m_id);
        // })
        // .then(function (opponentPortfolio) {
        //   console.log('opponentPortfolio', opponentPortfolio);
        //   match.opponentVal = opponentPortfolio.available_cash;
        //   return;
        // });
        //MAY WANT TO EDIT THE MONEY HERE TO 2DP??

      })
      .catch(function (err) {
        console.log('err in get user matches', err);
      });

    });

  };

  return module;

};
