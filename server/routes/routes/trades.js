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

//Get all of the users portfolios
//-----------------------------------
  router.route('/')

    .get(function (req, res) {

      var userId = req.user.u_id;
      services.db.matches.getUsersPortfolios(userId).then(function (matches) {
          // return object with keys that conform to redux state object
          res.json({
            currentMatchId: '',
            error: null,
            userId: userId,
            matches: matches
          });
        })
        .catch(function (err) {
          res.status(400).json({
            message: err
          });
        });

    });

  //Get Portfolio :) done
  //-----------------------------------
  router.route('/:matchId')
    .get(function (req, res) {

      services.db.trades.getPortfolio(req.__userId, req.matchId)
        .then(function (portfolio) {
          res.status(200).json({
            data: portfolio
          });
        })
        .catch(function (err) {
          res.status(400).json({
            message: err
          });
        });
        
    })

  //Buy and Sell Route :) done
  //-----------------------------------
    .post(function (req, res) {

      console.log('in post route', req.__userId, req.body.numShares);

      var userId = req.__userId;
      var matchId = req.matchId;
      var numShares = req.body.numShares;
      var action = req.body.action;
      var stockTicker = req.body.symbol;

      var actions = {
        'buy': services.db.trades.buy,
        'sell': services.db.trades.sell
      };

      if (actions[action] === undefined) {
        res.status(400).json({
          message: 'Not a valid action'
        });
      }

      actions[action](userId, matchId, numShares, stockTicker)
        .then(function (data) {
          res.status(200).json({
            data: data
          });
        })
        .catch(function (err) {
          res.status(400).json({
            message: err
          });
        });

    });

  return router;

};
