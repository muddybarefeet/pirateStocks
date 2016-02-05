var knex = require('knex');
var Promise = require('bluebird');

var config = require('./../config.js');


var ENV = process.env.ENVIRONMENT || 'development';
var db = config.db[ENV];


var dbCommands = require('...');

dbCommands.down();//with correct inputs

// var migrations = {};

// migrations.stocksSeed = require('./seeds/stocksSeed')(knex, Promise);
// migrations.stocklistSeed = require('./seeds/stocklistSeed')(knex, Promise);

module.exports = db;

//"dbdown": "dbMigrations/dbDown.js" in package.json

