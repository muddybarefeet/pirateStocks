var rp = require('request-promise');
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var $ = require('jquery');

var CreateMatchActions = {

  createMatch: function (state) {

    console.log('ACTIONS create!!',state);

  }

};


module.exports = CreateMatchActions;