
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = "change";

var _currentMatch = {
  totalValue: null,
  availableCash: null,
  stocks: null,
  matchTitle: null
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
    
    var capFirstLetter  = function (matchTitle) {
      return matchTitle.charAt(0).toUpperCase() + matchTitle.slice(1);
    };

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

    _currentMatch.totalValue = action.data.totalValue;
    _currentMatch.availableCash = action.data.available_cash;
    _currentMatch.matchTitle = capFirstLetter(action.data.title);

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

    _currentMatch.totalValue = action.data.portfolio.totalValue;
    _currentMatch.availableCash = action.data.portfolio.available_cash;
    _currentMatch.matchTitle = action.data.portfolio.title;
    
    portfolioStore.emitChange();
  }

});


module.exports = portfolioStore;


