var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var encode = require('./../../jwts/index.js').encode;

module.exports = function (knex) {

  var module = {};

//Creates/Check a Users Details used from facebook auth route
//---------------------------------------------------------------
  module.findOrCreateUser = function (username, name, email) {

    return knex.select()
      .table('users')
      .where('email', '=', email)
      .then(function (user) {
        //if the user is already in the table then return the user
        if (user.length > 0) {
          return user;
        }
        return knex.insert({
          'username': username,
          'name': name,
          'email': email
        }, '*').into('users');
      })
      .then(function (user) {
        return user[0];
      });
  };


//Takes login info and checks password
//-------------------------------------
  module.login = function (email, password) {
    
    var id;
    var user_name;
    return knex('users').where('email', email)
    .then(function (data) {
      id = data[0].u_id;
      userEmail = data[0].email;
      user_name = data[0].username;
      return bcrypt.compareAsync(password, data[0].password);
    })
    .then(function (userVerified) {
      //userVerified returns true/false
      if (userVerified) {
        //return the user a jwt plus username
        var obj = {};
        obj.jwt = encode({id: id, exp: current});
        obj.username = user_name;
        console.log('from db methods',obj);
        return obj;
      } else {
        throw new Error("User Not Verified");
      }
    });

  };


//save new user data to the db
//-------------------------------------
  module.signup = function (username, email, password) {

    return bcrypt.genSaltAsync(10)
    .then(function(salt) {
      return bcrypt.hashAsync(password, salt);
    })
    .then(function(hash) {
      return knex('users')
      .insert({
        username: username,
        password: hash,
        email: email
      }, '*');
    })
    .then(function (insertedUser) {
      console.log('inserted data', insertedUser);
      //make an encoded jwt to send back to client plus username
      var obj = {};
      obj.jwt = encode({id: insertedUser[0].u_id});
      obj.username = insertedUser[0].username;
      console.log('return obj', obj);
      return obj;
    })
    .catch(function (err) {
      // console.log('Error', err);
      throw new Error("Email already exists");
    });

  };


  return module;

};