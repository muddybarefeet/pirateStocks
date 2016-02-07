//function to convert csv into json
var moment = require('moment');

var classes = {};

  // csvJSON: function (csv) {
  //   var lines=csv.split("\n");
  //   var result = [];
  //   var headers=lines[0].split(",");

  //   for(var i=1;i<lines.length;i++){
  //     var obj = {};
  //     var currentline=lines[i].split(",");
  //     for(var j=0;j<headers.length;j++){
  //       obj[headers[j]] = currentline[j];
  //     }
  //     result.push(obj);
  //   }

  //   return JSON.stringify(result);
  // }

//check that the match dates are valid
var checkcreateMatchDetails = function (startDate, endDate, type, title, funds) {
  this.title = capitalizeTitle(title);
  this.funds = funds;
  this.type = type;
  this.startDate = checkStart(startDate);
  this.endDate = checkEndDate(endDate, startDate);
};

//check that the user's sell is valid(that they own the number of shares thay they are trying to sell)
var checkTradeShares = function (userId, matchId, numShares, action, symbol, numSharesHave) {
  this.userId = userId;
  this.matchId = matchId;
  this.numShares = numShares;
  this.action = action;
  this.stockTicker = symbol;
  this.err = doesUserHaveEnoughShares(numShares, numSharesHave);
};

//helper functions for above methods
var doesUserHaveEnoughShares = function (toSell, owns) {
  if (toSell > owns) {
    return "Ye do nah 'ave this amount o' booty t' sell.";
  } else if (toSell <= 0) {
    return "Ye cannot sell less than naught or naught shares! Oggle yer input, 'n try again.";
  } else {
    return null;
  }
};

var checkStart = function (startDate) {
  if (moment(new Date (startDate)).isAfter(moment(new Date ())) ) {
    return startDate;
  } else {
    return null;
  }
};

var checkEndDate = function (endDate, startDate) {
  if (moment(new Date (endDate)).isAfter(moment(new Date (startDate)))) {
    return endDate;
  } else {
    return null;
  }
};

var capitalizeTitle = function (title) {
  //split at the spaces and cap first letter
  return title.split(' ').map(function (word) {
    return word.slice(0,1).toUpperCase()+word.slice(1);
  }).toString().replace(/,/g, ' ');
};

classes.checkcreateMatchDetails = checkcreateMatchDetails;
classes.checkTradeShares = checkTradeShares;

module.exports = classes;