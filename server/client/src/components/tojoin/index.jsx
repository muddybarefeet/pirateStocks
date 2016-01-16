
var React = require('react');
var Link = require('react-router').Link;

var Join = React.createClass({

  render: function () {

    return (
      <div className="container">

        <h2>Join Matches</h2>
        <Link to="/about">Return to Main Menu</Link>

      </div>
    );
  }

});

module.exports = Join;

//image to be added
//<img className="JoinLogo" src="../assets/images/logo.png" alt="stockSuel logo black" />