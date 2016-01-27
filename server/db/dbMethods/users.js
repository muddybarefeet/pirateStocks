var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

module.exports = function (knex) {

  var module = {};

//Select all User Details NOT SURE WHERE USED
//---------------------------
  // module.getUsers = function () {
  //   return knex.select().table('users')
  //     .catch(function (err) {
  //       return null;
  //     });
  // };

//Get a Specific Users Details Deprecated
//------------------------------

  // module.getUser = function (userId) {
  //   return knex.select().table('users').where('u_id', '=', userId)
  //     .then(function (response) {
  //       if (response.length === 0) {
  //         throw new Error('no user found');
  //       }
  //       return response[0];
  //     })
  //     .catch(function (err) {
  //       return null;
  //     });
  // };

//Search Users for anything to match input Deprecated
//-----------------------------------------
  // module.searchUsers = function (search) {
  //   var searchLike = search + '%';
  //   return knex('users')
  //     .where(knex.raw('UPPER(username) like UPPER(?)', [searchLike]))
  //     .orWhere(knex.raw('UPPER(name) like UPPER(?)', [searchLike]));
  // };

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

    console.log('about to login');
    
    var id;
    var userEmail;
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
        return { id: id, email: userEmail, username: user_name };
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
      return { id: insertedUser[0].u_id, email: insertedUser[0].email, username: insertedUser[0].username };
    })
    .catch(function (err) {
      throw new Error("Email already exists");
    });

  };


  return module;

};