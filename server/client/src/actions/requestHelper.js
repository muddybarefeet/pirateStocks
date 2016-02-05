var baseUrl = require('./../constants.js').BASE_URL;

var rp = require('superagent');

var displayErrorMsg = function(msg){
  //display error message on screen
  //remove error message after XYZ seconds
};

var requestHelper = {
  
  post: function (url, body, jwt) {
    return rp
      .post(baseUrl + url)
      .set('authorization', jwt)
      .send(body);
  },

  get: function (url, jwt) {
    return rp(baseUrl + url)
      .set('authorization', jwt);
  },

  put: function(url, body) {
    return rp
      .put(baseUrl + url)
      .send(body);
  }

};

module.exports = requestHelper;