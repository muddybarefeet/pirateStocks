
var express = require('express');
var router = express.Router();

module.exports = function (services) {

  //Post user
  //-----------------------------------
  router.route('/login')
    .post(function (req, res) {
      
      var email = req.body.email;
      var password = req.body.password;
      console.log('request sent', email, password);
      services.db.users.login(email, password)
      .then(function(response) {
        console.log('response in login from db encrypt', response);
        res.json({
          data: response
        });
      })
      .catch(function(err){
        res.status(404).json({
            message: err.message
        });
      });

    });

  //Add user
  //-----------------------------------
  router.route('/signup')
    .post(function (req, res) {

      var username = req.body.username;
      var email = req.body.email;
      var password = req.body.password;

      services.db.users.signup(username, email, password)
      .then(function (response) {
        console.log('response in signup from db want encrypt', response);
        res.json({
          data: response
        });
      })
      .catch(function(err){
        res.status(404).json({
            message: err.message
        });
      });

    });


  return router;
};
