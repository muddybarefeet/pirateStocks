//sweep through the matches for the day and update status and check if the winner needs to be updated
//Daily_Update
var moment = require('moment');

module.exports = function (services) {
  setTimeout(function () {
  //in the schedule table have a Daily_Update key in the table
  //check this every hour
    // services.db.metaTable.get("Latest_Stock_Update") //----------->CHANGE THIS WHEN WORKED OUT HOW!!!
    // .then(function (date) {
    //   //want to insert a new row in the table Latest_Status_Update
    //   var iscurrentDay = moment(new Date(date)).isSame(new Date(), "day");
    //   if (!iscurrentDay) {
    //     return services.db.startMatches.selectPendingMatches(date)
    //     .then(function (pending) {
    //       console.log('pending', pending);
    //       return;
    //     });
      //   }
    console.log('kicking off match starting job');
    //formulate date to look for
    var date = new Date();
    //get all matches that should start today
    // var date = providedDate || new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 30);
    //get all matches that should start today
    return services.db.startMatches.selectPendingMatches(date)
    .then( function(matches){
      return services.db.startMatches.updateMatchState(matches);
    })
    .catch( function (err) {
      console.error(err);
    });

  }, 3000);//60000 HOURLY 3600000ms

};