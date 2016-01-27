var knex = require('knex');
var config = require('./../../config.js');

//if there is an environmental variable set (this will be the word 'deployment') then the envirnment will be deployment
var ENV = process.env.ENVIRONMENT || 'development';
var db = knex(config.db[ENV]);



module.exports = db;
