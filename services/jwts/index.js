var jwt = require('jwt-simple');
var secret = 'noffleThePenguin';

var now = new Date();
current = new Date(now.getFullYear(), now.getMonth()+1, now.getDate());

module.exports = {

  encode: function (jwtObj) {
    jwtObj.exp = current;
    return jwt.encode(jwtObj, secret);
  },

  checkAuth: function (req, res, next) {
    if (req.headers.authorization) {
      var decoded = jwt.decode(req.headers.authorization, secret);
      req.__userId = decoded.id;
      next();
    } else {
      res.status(401).json({
        message: "You are not authorized to view this page"
      });
    }

  }

};
