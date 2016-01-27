var knex = require('knex');
var config = require('./../../config.js');

//if there is an environmental variable set (this will be the word 'deployment') then the envirnment will be deployment
var ENV = process.env.ENVIRONMENT || 'development';
var db = knex(config.db[ENV]);

var methods = {};

methods.users = require('./dbMethods/users')(db); //pass knex to file when evaluating it so knex it run in it too
methods.matches = require('./dbMethods/matches')(db);
methods.stocks = require('./dbMethods/stocks')(db);
methods.trades = require('./dbMethods/trades')(db);

module.exports = methods;
