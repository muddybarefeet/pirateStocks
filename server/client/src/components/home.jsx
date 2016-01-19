
var React = require('react');
var Link = require('react-router').Link;

var Home = React.createClass({

  handleLoginClick: function () {
    window.location.hash = '#/login';
  },

  render: function () {

    return (
      <div className="container headerPaddingTop">
        <div className="centreTitle marginUnder">
          <h2>Pirate Stocks</h2>
          <h6>Fantasy Stock Trading for Pirates and Penguins: because every pirate has an inner penguin</h6>
        </div>
        <div className="container">
          <div>
            <h5>
              1. Join or make a match
            </h5> 
            <h5>
              2. Create a portfolio
            </h5>
            <h5>
              {"3. Beat your opponent's portfolio"}
            </h5>
          </div>
        </div>
        <div className="centreTitle" >
          <a href="http://localhost:3000/api/auth/facebook"><img className="imgWidth" src='./../../assets/images/login.png' alt="facebook login button" /></a>
        </div>
        <div className="centreTitle" >
          <button type="button" className="btn btn-warning" onClick={this.handleLoginClick}>Signup/ Login</button>
        </div>

      </div>
    );
  }

});

module.exports = Home;
