//Take the stocks seed data and insert it into the stocks table
//--------------------------------------------------------------------------
var fs = require('fs');
var Promise = require('bluebird');

var readFile = Promise.promisify(fs.readFile);
var writeFile = Promise.promisify(fs.writeFile);

var INPUT = __dirname + '/seed_files/stocklist.json'; //may not be correct?


exports.seed = function (knex, Promise) {

  return knex('stocks').del() //delete any stocks in the file
  .then(function (numDelCels) { //then read /../seed_files/stocklist.json
    return readFile(INPUT);
  })
  .then(function (jsonString) { //take the hosepipe reaponse and insert the data into the db
    return knex('stocks').insert(JSON.parse(jsonString));
  });

};
