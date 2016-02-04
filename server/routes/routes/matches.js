var express = require('express');
var router = express.Router();

module.exports = function (services) {

  router
    .param('matchId', function (req, res, next, matchId) {
      req.matchId = matchId;
      next();
    })
    .param('userId', function (req, res, next, userId) {
      req.userId = userId;
      next();
    });

router.route('/:userId')
//Get All Joinable Matches :) //make this /joinable (use jwts for userId)
//-------------------------
.get(function (req, res) {

  services.db.matches.getAllJoinableMatches(req.userId)
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

router.route('/join/:matchId')
//Join match :)
//-------------------------
.put(function (req, res) {
  services.db.matches.joinMatch(req.matchId, req.body.userId)
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
  

router.route('/user/:userId')
//Get all of a Users Matches :) //move to be in '/'
//--------------------------
.get(function (req, res) {
  console.log('in get function route')
  services.db.matches.getUsersMatches(req.userId)
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

router.route('/')
//Post New Match Details :)
//----------------------
.post(function (req, res) {

  var userId = req.body.userId;
  var startFunds = req.body.funds;
  var startDate = req.body.start;
  var endDate = req.body.end;
  var type = req.body.type;
  var title = req.body.title;
  
  services.db.matches.createMatch(userId, startFunds, type, startDate, endDate, title)
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


  // router.route('/match/:matchId')

    //Get a certain match DEPRECATED
    //----------------------
//       .get(function (req, res) {
//         services.db.getMatch(req.matchId)
//           .then(function (match) {
//             res.status(200).json({
//               data: match
//             });
//           })
//           .catch(function (err) {
//             res.status(404).json({
//               message: err
//             });
//           });
//       });

  return router;
};
