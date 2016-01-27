// var express = require('express');
// var router = express.Router();


// //passport holds info for how to query facebook from ./auth/facebookStrategy
// module.exports = function (db, passport) {

//   //checks passport token with facebook token for the user
//   router.get('/facebook', passport.authenticate('facebook', {
//     scope: ['email']
//   }));

//   //if the user redirected to facebook if no token and return with fail or success
//   router.get('/facebook/callback', passport.authenticate('facebook', {
//     successRedirect: '/#/about',
//     failureRedirect: '/'
//   }));

//   router.post('/logout', function (req, res) {
//     req.logout();
//     res.redirect('/');
//   });

//   return router;

// };
