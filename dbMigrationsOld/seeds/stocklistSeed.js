//Take the stock_prices seed data and insert it into the stock_prices table
var fs = require('fs');
var Promise = require('bluebird');

var readFile = Promise.promisify(fs.readFile);
var writeFile = Promise.promisify(fs.writeFile);

var INPUT = __dirname + '/seed_files/stocklistPrices.json'; //may not be correct?

// Deletes ALL existing entries and then fills
exports.seed = function (knex, Promise) {


    return knex('stock_prices').del()
    .then(function (numDelCels) {
      return readFile(INPUT);
    })
    .then(function (jsonString) {
      return knex('stock_prices').insert(JSON.parse(jsonString));
    });


    // readFile(INPUT).then(function (jsonString) {
    //   return Promise.map(JSON.parse(jsonString), function (stock) {
    //     return knex('stock_prices').insert(stock);
    //   });
    // })

};
