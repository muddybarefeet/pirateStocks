var fs = require('fs');

var services = {};

fs.readdirSync(__dirname).forEach(function (fileName) {  //array of all file and folder names here
  if (fileName.indexOf('.') < 0) {
    services[fileName] = require(__dirname + '/' + fileName + '/index.js');
  }
});


module.exports = services;