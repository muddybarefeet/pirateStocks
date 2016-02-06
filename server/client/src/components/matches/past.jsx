
var React = require('react');
var Link = require('react-router').Link;
var matchActions = require('./../../actions/matchActions.js');
var matchesStore = require('./../../stores/matchesStore.js');

var PastMatches = React.createClass({

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
    var newMatches = matchesStore.getMatchData().pastMatches;
    if (newMatches.length !== 0) {
      this.setState({
        pastMatches: matchesStore.getMatchData().pastMatches
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
          <table className="table">
            <thead>
              <tr>
                <th>Name of Yer Battle</th>
                <th>Type</th>
                <th>Date Finished</th>
                <th>Duration</th>
                <th>Final Treasure</th>
                <th>Opponents Treasure</th>
                <th>The Victor</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {arrayOfMatches}
            </tbody>
          </table>
        </div>);

      if (!this.state.pastMatches) {
        toDisplay = (<p key={0}>Oh arr! Ye {"'"}ave nah any past battles</p>);
      } else {
        var that = this;
        this.state.pastMatches.map(function (match, index) {
          arrayOfMatches.push(<tr key={index}>
                                <td>{match[0]}</td>
                                <td>{match[1]}</td>
                                <td>{match[3]}</td>
                                <td>{match[4]}</td>
                                <td>{match[6]}</td>
                                <td>{match[7]}</td>
                                <td>{match[8]}</td>
                                <td></td>
                                <td><button value={match} type="button" className="btn btn-primary" onClick={that.handleClick}>To Portfolio</button></td>
                              </tr>);
        });
        toDisplay = matchTable;
      }

    return (
      <div className="container">
        <h1 className="centreTitle">Past Battles</h1>     

        {toDisplay}
        
      </div>
    );
  }

});

module.exports = PastMatches;