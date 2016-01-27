//TODO: relace get data with refs so i can empty the text fields??

var React = require('react');
var Link = require('react-router').Link;
var authActions = require('./../actions/authActions.js');
var joinMatchStore = require('./../stores/joinMatchStore.js');
var joinMatchActions = require('./../actions/joinMatchActions.js');
var matchActions = require('./../actions/matchActions.js');

var MatchesToJoin = React.createClass({

  getInitialState: function() {
    return joinMatchStore.getMatchData();
  },

  componentWillMount: function () {
    //trigger action to get the data from the db
    joinMatchActions.getJoinableMatches(localStorage.userId);  
  },

  componentDidMount: function () {
    joinMatchStore.addChangeListener(this._onChangeEvent);
  },

  componentWillUnmount: function () {
    joinMatchStore.removeChangeListener(this._onChangeEvent);
  },

  _onChangeEvent: function () {
    this.setState({
      matches: joinMatchStore.getMatchData().matches
    });
  },

  handleJoinClick: function (event) {
    var match = event.target.value.split(',');
    var matchId = match[match.length-1];
    joinMatchActions.joinMatch(matchId, localStorage.userId);

    window.location.hash="#/matches/portfolio/" + matchId;
  },

  render: function () {

    var toDisplay;
    var arrayOfMatches = [];

    var matchTable = 
      (<div>
        <h1 className="centreTitle">Battles ter Join</h1>           
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Start Funds</th>
                <th>Status</th>
                <th>My Portfolio Value</th>
                <th></th>
                {/*<th>Opponents Portfolio Value</th>*/}
              </tr>
            </thead>
            <tbody>
              {arrayOfMatches}
            </tbody>
          </table>
        </div>);

    if (!(this.state.matches)) {
      toDisplay = (<p key={0}>Oh arr! There aint nah any battles to be joined, get t{"'"} t{"'"} it handsomely and make yer own!</p>);
    } else {
      var that = this;
      this.state.matches.map(function (match, index) {
        arrayOfMatches.push(<tr key={index}>
                              <td>{match[0]}</td>
                              <td>{match[1]}</td>
                              <td>{match[2]}</td>
                              <td>{match[3]}</td>
                              <td>{match[4]}</td>
                              <td>{match[5]}</td>
                              <td>To be worked out</td>
                              <td><button value={match} type="button" className="btn btn-primary" onClick={that.handleJoinClick}>To Portfolio</button></td>
                            </tr>);
      });
      toDisplay = matchTable;
    }

    return (
      <div className="container">

        {toDisplay}

      </div>
    );
  }

});

module.exports = MatchesToJoin;
