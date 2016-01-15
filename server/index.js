//this index is the express server for our app
var express = require('express');
var knex = require('./db/index.js');
var router = require('./routes/index');

//morgan logs the requests to the server and body parser
//populate the req.body property with the parsed body
var morgan = require('morgan');
var bodyParser = require('body-parser');

//define a port
var port = process.env.PORT || 3000;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());


//serving the static files
// app.use('/documentation', express.static(pathToDocumentation));

//connection to the routes in ./routes folder
app.use('/api', router(knex));

//wild card route to anything not starting /api
//send html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

//then make all client file assests available
app.use('/', express.static(__dirname + '/client'));

app.listen(port);
console.log("Express server listening on port", port);

//export app for testing routes
module.exports = app;
