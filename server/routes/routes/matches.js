var express = require('express');
var router = express.Router();
var checkAuth = require('./../../../services/jwts/index.js').checkAuth;
var classes = require('./classes.js');
var titleGenerator = require('./titleGenerator.js');

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

  //Create New Match :)
  //----------------------
  router.route('/create')
    .post(function (req, res) {
      

      var validate = new classes.checkcreateMatchDetails(req.body.start, req.body.end, req.body.type, req.body.title, req.body.funds);

      if(!validate.endDate && !validate.startDate) {
        return res.status(400).json({
          message: "Yer Battle dates be nah possible, 'ave another skewer at it!"
        });
      }

      if(!validate.endDate) {
        return res.status(400).json({
          message: "End date can nah occur afore start date."
        });
      }

      if(!validate.startDate) {
        return res.status(400).json({
          message: "Start date can nah occur afore today."
        });
      }

      services.db.matches.createMatch(req.__userId, validate.funds, validate.type, validate.startDate, validate.endDate, validate.title)
      .then(function (match) {
        console.log('route make match', match);
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

    //generate random match title
    router.route('/title')
    .get(function (req, res) {
      
      res.status(200).json({
        data: titleGenerator.getTitle()
      });

    });

  return router;
};
