//function to convert csv into json
var jwt = require('jwt-simple');
var secret = 'noffleThePenguin';


module.exports = {

  csvJSON: function (csv) {
    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");

    for(var i=1;i<lines.length;i++){
      var obj = {};
      var currentline=lines[i].split(",");
      for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }

    return JSON.stringify(result);
  },

  decode: function (userJwt) {
    var decoded = jwt.decode(userJwt, secret);
    console.log('decoded jwt',decoded);
    return decoded.id;
  }

};