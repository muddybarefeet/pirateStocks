
//start up services
var services = require('./services/index.js');

//start server
var app = require('./server/index.js')(services);

//start workers
var workers = require('./workers/index.js')(services);
