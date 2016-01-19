
var React = require('react');
var Link = require('react-router').Link;
var authStore = require('./../../stores/authStore.js');
var matchActions = require('./../../actions/matchActions.js');
var matchesStore = require('./../../stores/matchesStore.js');

var Matches = React.createClass({

  getInitialState: function () {
    return matchesStore.getMatchData();
  },

  componentDidMount: function () {
    matchesStore.addChangeListener(this._onChangeEvent);
  },

  componentWillUnmount: function () {
    matchesStore.removeChangeListener(this._onChangeEvent);
  },

  _onChangeEvent: function () {
    var matches = matchesStore.getMatchData();
    this.setState({
      matches: matches
    });
  },

  handleClick: function (event) {
    var match = event.target.value.split(',');
    var matchId = match[match.length-1];
    //trigger the store to get the correct match
    var userId = authStore.getUserData().userId;
    matchActions.getMatchPortfolio(userId, matchId);
    window.location.hash="#/portfolio";
  },

  render: function () {

    console.log('this.state', this.state)
    var arrayOfMatches = [];

    var matchTable = 
      (<div>
        <h2>Matches</h2>           
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

      var toDisplay;

      if (Object.keys(this.state.matches).length === 0) {
        toDisplay = (<p key={0}>Oh arr! Ye {"'"}ave nah created or joined any matches yet, get t{"'"} t{"'"} it handsomely!</p>);
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
                                <td><button value={match} type="button" className="btn btn-primary" onClick={that.handleClick}>To Portfolio</button></td>
                              </tr>);
        });
        toDisplay = matchTable;
      }

    return (
      <div className="container">

        <h2>Matches Page</h2>
        <Link to="/about">Return to Main Menu</Link>

        {toDisplay}
        
      </div>
    );
  }

});

module.exports = Matches;