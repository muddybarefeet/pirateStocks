var express = require('express');
var router = express.Router();
var checkAuth = require('./../../../services/jwts/index.js').checkAuth;


module.exports = function (services) {

  router
    .param('matchId', function (req, res, next, matchId) {
      req.matchId = matchId;
      next();
    });

  router.use(checkAuth);

  //Get all of a Users Matches :) done
  //--------------------------
  router.route('/user')
    .get(function (req, res) {

      services.db.matches.getUsersMatches(req.__userId)
        .then(function (matches) {
          res.status(200).json({
            data: matches
          });
        })
        .catch(function (err) {
          res.status(404).json({
            message: err.message
          });
        });

    });

  router.route('/joinable')
  //Get All Joinable Matches :) done
  //-------------------------
  .get(function (req, res) {
    services.db.matches.getAllJoinableMatches(req.__userId)
      .then(function (matches) {
        res.status(200).json({
          data: matches
        });
      })
      .catch(function (err) {
        res.status(404).json({
          message: err
        });
      });

  });

  //Join match :)
  //-------------------------
  router.route('/join/:matchId')
    .put(function (req, res) {

      services.db.matches.joinMatch(req.matchId, req.__userId)
        .then(function (match) {
          console.log('match', match);
          if (match === null) {
            res.status(400).json({
              message: 'unable to join match. Please try another'
            });
          } else {
            res.status(200).json({
              data: match
            });
          }
        });

    });

  //Post New Match Details :)
  //----------------------
  router.route('/create')
    .post(function (req, res) {

      var startFunds = req.body.funds;
      var startDate = req.body.start;
      var endDate = req.body.end;
      var type = req.body.type;
      var title = req.body.title;
      
      services.db.matches.createMatch(req.__userId, startFunds, type, startDate, endDate, title)
        .then(function (match) {
          return res.status(200).json({
            data: match
          });
        })
        .catch(function (err) {
          return res.status(400).json({
            message: err
          });
        });

    });

  return router;
};
