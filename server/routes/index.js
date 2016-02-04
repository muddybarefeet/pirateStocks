//express server routes
//ALL ROUTES NEED TO DECRYPT JWTS EXCEPT USERS
var fs = require('fs');

//requiring the used middleware
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var utils = require('./routes/utils');

//require passport that contains the strategy to query facebook from ./auth file
// var passport = require('./auth/index');

//export object that gets called from the express server ./../index.js
module.exports = function (services) {

  var router = express.Router();
  router.use(bodyParser());

  router.use(function(req, res, next) {
    if (req.header.authorization) {
      var id = utils.decode(req.headers.authorization);
      req.headers.decoded = id;
      console.log('MIDDLEWARE',req.headers)
    }
    next();
  });

  //middleware for facebook auth
  // router.use(cookieParser());
  // router.use(session({
  //   secret: 'stockDuel',
  //   resave: false,
  //   saveUninitialized: true
  // }));
  // router.use(passport.initialize());
  // router.use(passport.session());

  var routes = [];

  fs.readdirSync(__dirname + '/routes').forEach(function (fileName) {  //array of all file and folder names here
    if (fileName !== '.DS_Store' && fileName !== 'utils.js') {
      routes.push(fileName);
    }
  });

  routes.forEach(function (fileName) {
    var file = require('./routes/' + fileName)(services);
    var newName = fileName.split('.')[0];
    router.use('/' + newName, file);
  });

  return router;
  
};

  


