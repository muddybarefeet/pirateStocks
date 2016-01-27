//express server routes

//requiring the used middleware
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//defining the files that are required
// var auth = require('./auth');
var stocks = require('./stocks');
var matches = require('./matches');
var users = require('./users');
var trades = require('./trades');
var state = require('./state');

//require passport that contains the strategy to query facebook from ./auth file
var passport = require('./auth/index');

//export object that gets called from the express server ./../index.js
module.exports = function (services) {

  var router = express.Router();

  //middleware
  router.use(cookieParser());
  router.use(bodyParser());
  router.use(session({
    secret: 'stockDuel',
    resave: false,
    saveUninitialized: true
  }));
  // router.use(passport.initialize());
  // router.use(passport.session());

  //pass passport connections to the respective files
  // auth = auth(services);
  stocks = stocks(services);
  matches = matches(services);
  users = users(services);
  trades = trades(services);
  state = state(services);

  //defining the which route goes where
  // router.use('/auth', auth);
  router.use('/stocks', stocks);
  router.use('/matches', matches);
  router.use('/users', users);
  router.use('/trades', trades);
  router.use('/state', state);

  return router;

};
