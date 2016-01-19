
var React = require('react');
var Link = require('react-router').Link;

var Search = React.createClass({

  render: function () {

    return (
      <div className="container">

        <h2>Search Stocks Page</h2>
        <Link to="/about">Return to Main Menu</Link>

        <div className="form-group">
          <label htmlFor="email">Oggle th{"'"} stocks ye can lay yer dirty hands on:</label>
          <input type="email" className="form-control" id="usr" onChange={this.handleLoginEmailChange} />
        </div>

        

      </div>
    );
  }

});

module.exports = Search;