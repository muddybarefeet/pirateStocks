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

var checkcreateMatchDetails = function (startDate, endDate, type, title, funds) {
  this.title = capitalizeTitle(title);
  this.funds = funds;
  this.type = type;
  this.startDate = checkStart(startDate);
  this.endDate = checkEndDate(endDate, startDate);
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

module.exports = classes;