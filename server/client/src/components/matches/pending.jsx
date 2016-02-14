
var React = require('react');
var Link = require('react-router').Link;
var matchActions = require('./../../actions/matchActions.js');
var matchesStore = require('./../../stores/matchesStore.js');
var numeral = require('numeral');

var PendingMatches = React.createClass({

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
    var newMatches = matchesStore.getMatchData().pendingMatches;
    if (newMatches.length !== 0) {
      this.setState({
        pendingMatches: matchesStore.getMatchData().pendingMatches
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
                <th>Battle Starts</th>
                <th>Length o{"'"} Battle</th>
                <th>Starting Gold</th>
                <th>Yer Treasure{"'"}s Value</th>
                <th>Opponents Treasure</th>
                <th>Gauge</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {arrayOfMatches}
            </tbody>
          </table>
        </div>);

      if (!this.state.pendingMatches) {
        toDisplay = (<p key={0}>Oh arr! Ye {"'"}ave nah created or joined any battles yet, get t{"'"} t{"'"} it handsomely!</p>);
      } else {
        var that = this;
        this.state.pendingMatches.map(function (match, index) {
          arrayOfMatches.push(<tr key={index}>
                                <td>{match[0]}</td>
                                <td>{match[1]}</td>
                                <td>{match[2]}</td>
                                <td>{match[4]}</td>
                                <td>{'$'+numeral(match[5]).format('0,0')}</td>
                                <td>{'$'+numeral(match[6]).format('0,0.00')}</td>
                                <td>{'$'+numeral(match[7]).format('0,0.00')}</td>
                                <td></td>
                                <td><button value={match} type="button" className="btn btn-primary" onClick={that.handleClick}>To Portfolio</button></td>
                              </tr>);
        });
        toDisplay = matchTable;
      }

    return (
      <div className="container">

        <h1 className="centreTitle">Yer Pending Battles</h1>  

        {toDisplay}
        
      </div>
    );
  }

});

module.exports = PendingMatches;

