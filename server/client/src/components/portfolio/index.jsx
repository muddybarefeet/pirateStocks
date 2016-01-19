
var React = require('react');
var Link = require('react-router').Link;
var portfolioStore = require('./../../stores/portfolioStore.js');

var Portfolio = React.createClass({

  getInitialState: function () {
    return {};
  },

  componentWillMount: function () {
    //send off a request to actions to get the match details but need the match wanted details..?
    var match = portfolioStore.getMatchData().match; //return array of the detals of the current match
    return this.setState({
      match: match 
    });
    console.log('portfolio',this.state);
  },

  //not sure if the below three methods relevent
  componentDidMount: function () {
    portfolioStore.addChangeListener(this._onChangeEvent);
  },

  componentWillUnmount: function () {
    portfolioStore.removeChangeListener(this._onChangeEvent);
  },

  _onChangeEvent: function () {
    var match = portfolioStore.getMatchData();
    this.setState({
      match: match
    });
  },


  render: function () {

    return (
      <div className="container">

        <h2>Portfolio Page</h2>
        <Link to="/about">Return to Main Menu</Link>



      </div>
    );
  }

});

module.exports = Portfolio;