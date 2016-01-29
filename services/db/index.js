var knex = require('knex');
var config = require('./../../config.js');

//if there is an environmental variable set (this will be the word 'deployment') then the envirnment will be deployment
var ENV = process.env.ENVIRONMENT || 'development';
var knex = knex(config.db[ENV]);

var methods = {};

methods.users = require('./dbMethods/users')(knex); //pass knex to file when evaluating it so knex it run in it too
methods.matches = require('./dbMethods/matches')(knex);
methods.stocks = require('./dbMethods/stocks')(knex);
methods.trades = require('./dbMethods/trades')(knex);
methods.metaTable = require('./dbMethods/metaTable')(knex);

module.exports = methods;
