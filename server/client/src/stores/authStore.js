
// var AppDispatcher = require('./../dispatchers/AppDispatcher');
// var EventEmitter = require('events').EventEmitter;
// // var merge = require('react-addons-update');

// var CHANGE_EVENT = 'change';

// var _data = {

// };

// var AppStore = Object.assign(EventEmitter.prototype, {
  
//   getData: function(){
//     return _data;
//   },

//   init: function() {
//   },

//   emitChange: function(){
//     this.emit(CHANGE_EVENT);
//   },

//   addChangeListener: function(callback){
//     this.on(CHANGE_EVENT, callback);
//   },

//   removeChangeListener: function(callback){
//     this.removeListener(CHANGE_EVENT, callback);
//   }

// });

// AppDispatcher.register( function (payload){ //'subscribes' to the dispatcher. Store wants to know if it does anything. Payload 
//   var action = payload.action;//payload is the object of data coming from dispactcher //action is the object passed from the actions file

//   if(action.actionType === "USER_LOGIN") {
//     console.log('in user login store')
//     // AppStore.emitChange();//emit change event PUT AFTER EACH IF!!
//   }

//   if(action.actionType === "USER_SIGNUP") {
//     console.log('in user signup store');
//     // AppStore.emitChange();
//   }


// });


// module.exports = AppStore;

