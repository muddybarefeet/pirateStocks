
var React = require('react');
var Link = require('react-router').Link;

var Search = React.createClass({

  render: function () {

    return (
      <div className="container">

        <h2>Search Stocks Page</h2>
        <Link to="/about">Return to Main Menu</Link>

      </div>
    );
  }

});

module.exports = Search;