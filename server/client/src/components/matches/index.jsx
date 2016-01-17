
var React = require('react');
var Link = require('react-router').Link;
var MatchesStore = require('./../../stores/matchesStore.js');
// var matchActions = require('./../actions/matchActions.js');

var Matches = React.createClass({

  getInitialState: function () {
      return MatchesStore.getMatchData();
  },

  componentWillMount: function () {
    this.getInitialState();  
  },

  componentDidMount: function () {
    MatchesStore.addChangeListener(this._onChangeEvent);
    console.log('this state matches', this.state);
  },

  componentWillUnmount: function () {
    MatchesStore.removeChangeListener(this._onChangeEvent);
  },

  _onChangeEvent: function () {
    console.log('change got!!!', MatchesStore.getMatchData());
    return MatchesStore.getMatchData();
    console.log('component matches',this.state);
  },

  render: function () {

    var arrayOfMatches = [];
    if (Object.keys(this.state.matches).length === 0) {
      arrayOfMatches.push(<li key={0}>Oh arr! Ye {"'"}ave nah created or joined any matches yet, get t{"'"} t{"'"} it handsomely!</li>);
    } /*else {
      for (var key in this.state.matches) {
        console.log('trying to key', this.state.matches);
        arrayOfMatches.push(<li key={key} >{this.state.matches[key]}</li>);
      }*/
    // }

    return (
      <div className="container">

        <h2>Matches Page</h2>
        <Link to="/about">Return to Main Menu</Link>

        <ul>{arrayOfMatches}</ul>


      </div>
    );
  }

});

module.exports = Matches;