var knex = require('knex');
var config = require('./../../../config.js');

var ENV = process.env.ENVIRONMENT || 'development';
var db = knex(config.db[ENV]);

module.exports = db;
