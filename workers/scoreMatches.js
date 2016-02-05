
var moment = require('moment');

module.exports = function (services) {
  
  setTimeout(function () {
    console.log('kicking off match scoring job');
    //formulate the date to look for
    var date = new Date();
    // var date = providedDate || new Date(today.getFullYear(), today.getMonth(), today.getDate(), 21);
    //get all matches that are active and ending on the provided date
    return services.db.scoreMatches.selectCompletingMatches(date)
    .then( function (matches) {
      console.log('main return matches', matches);
      if (matches.length > 0) {
        return services.db.scoreMatches.determineWinners(matches);
      }
    })
    .catch( function ( err ) {
      console.error(err);
    });
    
  }, 3000);//60000

};
