
var React = require('react');
var Link = require('react-router').Link;

var Portfolio = React.createClass({

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