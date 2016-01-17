var rp = require('request-promise');
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var constants = require('../constants.js');
var requestHelper = require('./requestHelper.js');

var CreateMatchActions = {

  createMatch: function (title, type, funds, start, end) {

    console.log('ACTIONS create!!',title, type, funds, start, end);



  }

};


module.exports = CreateMatchActions;