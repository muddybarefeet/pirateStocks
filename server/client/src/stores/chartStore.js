
var AppDispatcher = require('./../dispatchers/appDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = "change";

var _chartData = {
  close: null,
  dates: null
};

var chartStore = Object.assign(new EventEmitter(), {
  
  getChartData: function(){
    return _chartData;
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
  
  if(action.actionType === "STOCK_CHART_DATA") {

    _chartData.close = action.data.close;
    _chartData.dates = action.data.dates;
    console.log('store',_chartData, action.data);

    chartStore.emitChange();
  }

});

module.exports = chartStore;



