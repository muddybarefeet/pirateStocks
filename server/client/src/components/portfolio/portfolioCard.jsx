
var React = require('react');


var PortfolioCard = React.createClass({

  render: function () {

    return (
      <div className="container">

        {this.props}

      </div>
    );
  }

});

module.exports = PortfolioCard;