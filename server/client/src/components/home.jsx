
var React = require('react');
var Link = require('react-router').Link;

var Home = React.createClass({

  handleLoginClick: function () {
    window.location.hash = '#/login';
  },

  render: function () {

    var signupLoginShow;

    var authButton = (
      <button type="button" className="btn btn-warning" onClick={this.handleLoginClick}>Signup/ Login</button>
    );

    //if the jot is present then dont show the sign in button
    if (!localStorage.jwt) {
      signupLoginShow = authButton;
    }

    return (
      <div className="container font">
        <div className="centreTitle marginUnder">
          <h1>Pirate Stocks</h1>
          <h6>Fantasy Stock Trading for Pirates and Penguins: because every pirate has an inner penguin</h6>
        </div>
        <div className="container">
          <div className="font">
            <h5 className="font">
              1. Join or make a Battle
            </h5> 
            <h5>
              2. Collect Treasure
            </h5>
            <h5>
              {"3. Beat yer opponent"}
            </h5>
          </div>
        </div>
        <div className="centreTitle" >
          {signupLoginShow}
        </div>

      </div>
    );
  }

});

module.exports = Home;

/*  <div className="centreTitle" >
          <a href="http://localhost:3000/api/auth/facebook"><img className="imgWidth" src='./../../assets/images/login.png' alt="facebook login button" /></a>
        </div>*/
