
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = "change";

var _stocks = {
};

var portfolioStore = Object.assign(new EventEmitter(), {
  
  getStocksData: function(){
    return _stocks;
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
  
  if(action.actionType === "SEARCH_STOCK_DATA") {

    var stocks = action.data.map(function (data) {
      return [data.name, data.symbol, data.ask];
    });
    _stocks.current = stocks;
    portfolioStore.emitChange();

  }

});


module.exports = portfolioStore;


