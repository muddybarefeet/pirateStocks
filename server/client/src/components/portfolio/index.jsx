
var React = require('react');
var Link = require('react-router').Link;
var portfolioStore = require('./../../stores/portfolioStore.js');

var Portfolio = React.createClass({

  getInitialState: function () {
    return {};
  },

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
    console.log('portfolio',this.state);
  },


  render: function () {

    return (
      <div className="container">

        <h2>Portfolio Page</h2>
        <div>
          <Link to="/about">Return to Main Menu</Link>
        </div>
        <div>
          <Link to="/search">Check out yer pieces o{"'"} Eight</Link>
        </div>



      </div>
    );
  }

});

module.exports = Portfolio;