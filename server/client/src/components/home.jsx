
var React = require('react');
var Link = require('react-router').Link;

var Home = React.createClass({

  handleLoginClick: function(i) {
    console.log('You clicked');

  },

  render: function () {

    return (
      <div className="container headerPaddingTop">
        <div className="centreTitle marginUnder">
          <h2>StockDuel</h2>
          <h6>Fantasy Stock Trading</h6>
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
        <Link to="/about">App</Link>
        <div className="centreTitle" >
          <button type="button" className="btn btn-primary">Facebook Login</button>
        </div>
        <div className="centreTitle" >
          <button type="button" className="btn btn-warning" onClick={this.handleLoginClick}><Link to="login">Signup/ Login</Link></button>
        </div>

      </div>
    );
  }

});

module.exports = Home;

//image to be added
//<img className="homeLogo" src="../assets/images/logo.png" alt="stockSuel logo black" />