var baseUrl = require('./../constants.js').BASE_URL;

var rp = require('superagent');

var displayErrorMsg = function(msg){
  //display error message on screen
  //remove error message after XYZ seconds
};

var requestHelper = {
  
  post: function (url, body) {

    return rp
      .post(baseUrl + url)
      .send(body);
    
  },

  get: function (url, jwt) {

    return rp(baseUrl + url);

  },

  put: function(url, body) {

    return rp
      .put(baseUrl + url)
      .send(body);

  }

};

module.exports = requestHelper;