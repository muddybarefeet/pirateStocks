var express = require('express');
var router = express.Router();

module.exports = function (db) {

  router
    .param('matchId', function (req, res, next, matchId) {
      req.matchId = matchId;
      next();
    })
    .param('userId', function (req, res, next, userId) {
      req.userId = userId;
      next();
    });

//Get Portfolio :)
//-----------------------------------
  router.route('/:matchId/:userId')
    .get(function (req, res) {
      db.trades.getPortfolio(req.userId, req.matchId)
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

//Buy and Sell Route :)
//-----------------------------------
  .post(function (req, res) {

    var userId = req.userId;
    var matchId = req.matchId;
    var numShares = req.body.numShares;
    var action = req.body.action;
    var stockTicker = req.body.symbol;

    var actions = {
      'buy': db.trades.buy,
      'sell': db.trades.sell
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
