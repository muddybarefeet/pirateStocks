//start the app/server

var services = require('./services/index.js');

var app = require('./server/index.js')(services);
