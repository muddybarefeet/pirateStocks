
var React = require('react');
var Link = require('react-router').Link;
var matchActions = require('./../../actions/matchActions.js');
var matchesStore = require('./../../stores/matchesStore.js');

var Matches = React.createClass({

  getInitialState: function () {
    return {};
  },

  componentWillMount: function () {
    matchActions.getUserMatches(localStorage.userId);
  },

  componentDidMount: function () {
    matchesStore.addChangeListener(this._onChangeEvent);
  },

  componentWillUnmount: function () {
    matchesStore.removeChangeListener(this._onChangeEvent);
  },

  _onChangeEvent: function () {
    this.setState({
      matches: matchesStore.getMatchData().matches
    });
  },

  handleClick: function (event) {
    var match = event.target.value.split(',');
    var matchId = match[match.length-1];
    localStorage.setItem("matchId", matchId);
    //trigger the store to get the correct match
    // window.location.hash="#/matches/portfolio";
  },

  render: function () {

    var arrayOfMatches = [];
    var toDisplay;
    var matchTable = 
      (<div>
        <h2 className="centreTitle">Battles</h2>           
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
                                <td><button value={match} type="button" className="btn btn-primary" ><Link to="matches/portfolio">To Portfolio</Link></button></td>
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