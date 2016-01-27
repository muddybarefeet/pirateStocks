//database connection
//facebook auth keys
var knex = require('knex');

var config = {

  db: {
    
    development: {
      client: 'pg',
      connection: {
        host: "127.0.0.1",
        database: 'stockduel'
      }
    },

    deployment: {
      client: 'pg',
      connection: {
        host: "127.0.0.1",
        database: 'stockduel',
        user: 'postgres',
        password: 'postgres'
      }
    }

  }

};

module.exports = config;