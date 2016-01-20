
var React = require('react');
var Link = require('react-router').Link;
var portfolioStore = require('./../../stores/portfolioStore.js');
// var PortfolioCard = require('./portfolioCard.jsx');
var matchActions = require('./../../actions/matchActions.js');

var Portfolio = React.createClass({

  getInitialState: function () {
    return portfolioStore.getMatchData();
  },

  componentWillMount: function () {
    //get the matchId and trigger update
    matchActions.getMatchPortfolio(localStorage.userId, localStorage.matchId); 
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
      totalValue: portfolioStore.getMatchData().totalValue,
      availableCash: portfolioStore.getMatchData().availableCash,
      stocks: portfolioStore.getMatchData().stocks,
      matchTitle: portfolioStore.getMatchData().matchTitle
    })
    this.render();
  },

  handleSellStocksChange: function (event) {
    this.setState({
      qtySell: event.target.value
    })
  },

  handleSellStocksClick: function (event) {
    var symbol = event.target.parentElement.childNodes[1].textContent.split(':')[1];
    matchActions.makeTrade(localStorage.userId, localStorage.matchId, this.state.qtySell, symbol, 'sell');
    this.setState({
      qtySell: ""
    })
  },

  render: function () {

    var arrayOfStocks;

    if (this.state.stocks) {
      var that = this;
      arrayOfStocks = this.state.stocks.map(function (stock, index) {
        return (<div key={index}>
                  <div className="card card-block container">

                    <h3 className="card-title">{stock[0]}</h3>

                    <p className="card-text">Symbol:{stock[1]}</p>
                    <p className="card-text">Ask: ${stock[2]}</p>
                    <p className="card-text">Gain/Loss: ${stock[3]}</p>
                    <p className="card-text">Market Value: ${stock[4]}</p>
                    <p className="card-text">Percentage Change: {stock[5]}</p>
                    <p className="card-text">Price: ${stock[6]}</p>
                    <p className="card-text">Number of Stocks: {stock[7]}</p>


                    <div className="form-group">
                      <label htmlFor="number">Qty:</label>
                      <input type="number" ref="qtySell" className="form-control" onChange={that.handleSellStocksChange} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={that.handleSellStocksClick} >Sell</button>
                  </div>
                </div>);
      });
    }

    return (
      <div className="container">

        <h2>Ye be dabblin{"'"} in {this.state.matchTitle}</h2>
        <div>
          <Link to="/about">Return to Main Menu</Link>
        </div>
        <div>
          <Link to="/search">Check out yer pieces o{"'"} Eight</Link>
        </div>

        <h4>Yer {"'"}ave ${this.state.availableCash} gold ter spend</h4>
        <h4>Yer current chest o{"'"} gold values ${this.state.totalValue}</h4>

        {arrayOfStocks}

      </div>
    );
  }

});

module.exports = Portfolio;