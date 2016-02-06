// var knex = require('knex');
var Promise = require('bluebird');

var config = require('./../config.js');
var ENV = process.env.ENVIRONMENT || 'development';

var db = config.db[ENV];

var dbCommands = require('./migrations.js')(db, Promise);//object with the correct properties

module.exports = dbCommands.down();

//"dbdown": "dbMigrations/dbDown.js" in package.json
// "knex migrate:rollback --knexfile dbMigrations/index.js"