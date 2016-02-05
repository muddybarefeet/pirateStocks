var knex = require('knex');
var config = require('./../../config.js');
var rp = require('request-promise');

//if there is an environmental variable set (this will be the word 'deployment') then the envirnment will be deployment

var yahooMethods = {};

yahooMethods.getPrices = function (stockSymbols) {

  var api = 'https://query.yahooapis.com/v1/public/yql';

  return new Promise(function (resolve, reject) {

    var symbolQuery = stockSymbols.map(function (stock) {
      return stock.symbol;
    }).join(',%20');

    var query = api +
      '?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in("' +
      symbolQuery +
      '")&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback=';

    rp(query)
    .then(function (returnData) {
      if (returnData) {
        resolve(JSON.parse(returnData).query.results.quote);
      }
    })
    .catch(function (err) {
      reject(err);
    });


  });
};

yahooMethods.getStockData = function (stockSymbol, startDate) {

  var dateNow;
  var dateYearBefore;
  dateNow = Date.now();

  //change dateYearBefore to look at the start date of the match and substract a year of milliseconds from it
  dateYearBefore = Date.now(startDate) - 31536000000;

  //make variables for the current date
  var yearNow = new Date(dateNow).getFullYear();
  var monthNow = new Date(dateNow).getMonth();
  var dayNow = new Date(dateNow).getDate();

  //variables for the start date
  var yearStart = new Date(dateYearBefore).getFullYear();
  var monthStart = new Date(dateYearBefore).getMonth();
  var dayStart = new Date(dateYearBefore).getDate();

  var url = 'http://ichart.yahoo.com/table.csv?s='+stockSymbol+'&a='+monthStart+'&b='+dayStart+'&c='+yearStart+'&d='+monthNow+'&e='+dayNow+'&f='+yearNow+'&g=w';
  
  //send request out to the yahoo api with correct variables
  return rp(url)
  .then(function (body) {

    var data = {};
    var dates = [];
    var close = [];

    var returnObj = {};
    var jsonForm = utils.csvJSON(body);
    jsonForm = JSON.parse(jsonForm);

    //make array of objects of closes and dates
    jsonForm.forEach(function (row) {
      for (var key in row) {
        if (row.Date.length !== 0 && row.Close.length !== 0) {
          var date1 = row.Date;
          data[date1] = row.Close;
        }
      }
    });

    //make array of dates in order of current to olderst
    jsonForm.forEach(function (row) {
      for (var key in row) {
        if (dates.indexOf(row.Date) === -1 && row.Date.length !== 0) {
          dates.push(row.Date);
        }
      }
    });

    //make an array of close prices in date order (current to oldest)
    for (var i = 0; i < dates.length; i++) {
      close.push(data[dates[i]]);
    }

    //reverse date arrays so earliest data is at the start
    returnObj.dates = dates.reverse();
    returnObj.close = close.reverse();

    return returnObj;

  });

};

module.exports = yahooMethods;
