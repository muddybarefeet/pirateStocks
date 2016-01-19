
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = "change";

var _stocks = {
  current: null,
  oneStock:[]
};

var searchStore = Object.assign(new EventEmitter(), {
  
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
    searchStore.emitChange();

  }

  if (action.actionType === "GET_ONE_STOCK") {

    var stock = [
      action.data.name,
      action.data.symbol,
      action.data.industry,
      action.data.sector,
      action.data.exchange,
      action.data.percentChange,
      action.data.yearHigh,
      action.data.yearLow,
      action.data.ask
    ];

    _stocks.oneStock.push(stock);
    searchStore.emitChange();

  }

});


module.exports = searchStore;




