var Promise = require('bluebird');

var config = require('./../config.js');
var ENV = process.env.ENVIRONMENT || 'development';

var db = config.db[ENV];
