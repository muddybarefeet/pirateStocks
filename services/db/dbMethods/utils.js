var jwt = require('jwt-simple');
var secret = 'noffleThePenguin';

var now = new Date();
current = new Date(now.getFullYear(), now.getMonth()+1, now.getDate());

var encryptJwt = function (jwtObj) {
  jwtObj.exp = current;
  return jwt.encode(jwtObj, secret);
};

module.exports = encryptJwt;