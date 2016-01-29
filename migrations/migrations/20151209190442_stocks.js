//Knex Migrations file to build and tear down the database tables in one command
//--------------------------------------------------------------------------------
var stocks = require('../schema/stockSchema.js');
var stockprices = require('../schema/stockPriceSchema.js');
var matches = require('../schema/matchesSchema.js');
var trades = require('../schema/tradesSchema.js');
var users = require('../schema/usersSchema.js');
var schedule = require('../schema/schedule.js');

exports.up = function (knex, Promise) {
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
