//sweep through the matches for the day and update status and check if the winner needs to be updated
//Daily_Update
var moment = require('moment');

module.exports = function (services) {
  setTimeout(function () {
  //in the schedule table have a Daily_Update key in the table
  //check this every hour
    services.db.metaTable.get("Latest_Stock_Update") //----------->CHANGE THIS WHEN WORKED OUT HOW!!!
    .then(function (date) {
      //want to insert a new row in the table Latest_Status_Update
      var iscurrentDay = moment(new Date(date)).isSame(new Date(), "day");
      if (!iscurrentDay) {
        return services.db.startMatches.selectPendingMatches(date)
        .then(function (pending) {
          console.log('pending', pending);
          return;
        });
      }

    });

  }, 3000);//60000

};