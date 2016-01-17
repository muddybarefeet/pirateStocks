var baseUrl = require('./../constants.js').BASE_URL;

var rp = require('request-promise');

var displayErrorMsg = function(msg){
  //display error message on screen
  //remove error message after XYZ seconds
};

var requestHelper = {
  
  post: function(url, body){

    var options = {
      uri: baseUrl + url,
      body: body || {},
      json: true
    };

    return rp.post(options);
    
  }/*,*/

  // get: function(url){

  // },

  // put: function(url, body){

  // },

  // delete: function(url, body){

  // }

};

module.exports = requestHelper;