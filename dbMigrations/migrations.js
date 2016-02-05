//Knex Migrations file to build and tear down the database tables in one command
//--------------------------------------------------------------------------------
var stocks = require('./schemas/stocks.js');
var stockprices = require('./schemas/stockPrices.js');
var matches = require('./schemas/matches.js');
var trades = require('./schemas/trades.js');
var users = require('./schemas/users.js');
var schedule = require('./schemas/schedule.js');

exports.up = function (knex, Promise) {
  //do with thens then seed with the data insert
  return Promise.all([
    stocks(knex),
    stockprices(knex),
    matches(knex),
    users(knex),
    trades(knex),
    schedule(knex)
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('stock_prices'),
    knex.schema.dropTable('trades'),
    knex.schema.dropTable('matches'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('stocks'),
    knex.schema.dropTable('schedule')
  ]);
};

/* index think sbout order can be used for both up and down
Promise.mapSync[require('./schemas/stocks.js'),
require('./schemas/stockPrices.js'),
require('./schemas/matches.js'),
require('./schemas/trades.js'),
require('./schemas/users.js'),
require('./schemas/schedule.js')], function(table){
    return table(knex);
});
*/