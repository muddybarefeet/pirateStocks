
var React = require('react');
var Link = require('react-router').Link;
var matchActions = require('./../../actions/matchActions.js');
var matchesStore = require('./../../stores/matchesStore.js');

var Matches = React.createClass({

  getInitialState: function () {
    return {};
  },

  componentWillMount: function () {
    matchActions.getUserMatches();
  },

  componentDidMount: function () {
    matchesStore.addChangeListener(this._onChangeEvent);
  },

  componentWillUnmount: function () {
    matchesStore.removeChangeListener(this._onChangeEvent);
  },

  _onChangeEvent: function () {
    var newMatches = matchesStore.getMatchData().matches;
    if (newMatches.length !== 0) {
      this.setState({
        matches: matchesStore.getMatchData().matches
      });
    }
  },

  handleClick: function (event) {
    var match = event.target.value.split(',');
    var matchId = match[match.length-1];
    //trigger the store to get the correct match
    window.location.hash="#/matches/portfolio/" + matchId;
  },

  render: function () {

    var arrayOfMatches = [];
    var toDisplay;
    var matchTable = 
      (<div>
        <h1 className="centreTitle">Battles</h1>           
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>Duration</th>
                <th>Starting Gold</th>
                <th>My Portfolio Value</th>
                <th>Opponents Portfolio Value</th>
                <th>Gauge</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {arrayOfMatches}
            </tbody>
          </table>
        </div>);

      if (!this.state.matches) {
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
                                <td></td>
                                <td>{match[5]}</td>
                                <td></td>
                                <td><button value={match} type="button" className="btn btn-primary" onClick={that.handleClick}>To Portfolio</button></td>
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

module.exports = Matches;


