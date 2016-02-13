
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = "change";
var numeral = require('numeral');

var _currentMatch = {
  totalValue: null,
  availableCash: null,
  stocks: null,
  matchTitle: null,
  errorMessage: null
};

var portfolioStore = Object.assign(new EventEmitter(), {
  
  getMatchData: function(){
    return _currentMatch;
  },

  emitChange: function (){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.addListener(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register( function (payload){ //'subscribes' to the dispatcher. Store wants to know if it does anything. Payload 
  var action = payload.action;//payload is the object of data coming from dispactcher //action is the object passed from the actions file
  
  if(action.actionType === "GET_USER_MATCH") {

    if (action.data.stocks) {
      _currentMatch.stocks = action.data.stocks.map(function (stock) {
        return [
          stock.name,
          stock.symbol,
          stock.ask,
          stock.gain_loss,
          stock.marketValue,
          stock.percent_change,
          stock.price,
          stock.shares
        ];
      });
    }


    _currentMatch.totalValue = numeral(action.data.totalValue).format('0,0.00');
    _currentMatch.availableCash = numeral(action.data.available_cash).format('0,0.00');
    _currentMatch.matchTitle = action.data.title;

    portfolioStore.emitChange();

  }

  if(action.actionType === "MAKE_TRADE") {
    var stocks = action.data.portfolio.stocks;
    _currentMatch.stocks = stocks.map(function (stock) {
      return [
        stock.name,
        stock.symbol,
        stock.ask,
        stock.gain_loss,
        stock.marketValue,
        stock.percent_change,
        stock.price,
        stock.shares
      ];
    });

    _currentMatch.totalValue = numeral(action.data.portfolio.totalValue).format('0,0.00');
    _currentMatch.availableCash = numeral(action.data.portfolio.available_cash).format('0,0.00');
    _currentMatch.matchTitle = action.data.portfolio.title;
    
    portfolioStore.emitChange();
  }

  if (action.actionType === "MAKE_SELL_ERROR") {
    _currentMatch.errorMessage = action.message;
    portfolioStore.emitChange();
  }

});


module.exports = portfolioStore;


