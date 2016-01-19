var baseUrl = require('./../constants.js').BASE_URL;

var rp = require('superagent');

var displayErrorMsg = function(msg){
  //display error message on screen
  //remove error message after XYZ seconds
};

var requestHelper = {
  
  post: function(url, body){

    return rp
      .post(baseUrl + url)
      .send(body);
    
  },

  get: function(url){

    return rp(baseUrl + url);

  }

};

module.exports = requestHelper;