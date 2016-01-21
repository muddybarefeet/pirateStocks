
var React = require('react');
var Link = require('react-router').Link;
var portfolioStore = require('./../../stores/portfolioStore.js');
// var PortfolioCard = require('./portfolioCard.jsx');
var matchActions = require('./../../actions/matchActions.js');

var Portfolio = React.createClass({

  getInitialState: function () {
    return {
      totalValue: portfolioStore.getMatchData().totalValue,
      availableCash: portfolioStore.getMatchData().availableCash,
      stocks: portfolioStore.getMatchData().stocks,
      matchTitle: portfolioStore.getMatchData().matchTitle,
      qtySell: "", 
      total: null
    }
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
      matchTitle: portfolioStore.getMatchData().matchTitle,
      qtySell: ""
    })
    this.render();
  },

  handleSellStocksChange: function (event) {
    this.setState({
      qtySell: event.target.value
    })
  },

  handleSellStocksClick: function (event) {
    this.setState({
      qtySell: ""
    })
    this.refs.amountSell.value = "";
    var symbol = event.target.parentElement.childNodes[1].textContent;
    matchActions.makeTrade(localStorage.userId, localStorage.matchId, this.state.qtySell, symbol, 'sell');
  },

  render: function () {

    var arrayOfStocks;

    if (this.state.stocks) {
      var that = this;
      arrayOfStocks = this.state.stocks.map(function (stock, index) {
        return (<div className="card" key={index}>
                    <div className="card-block">
                      
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <div>
                            <h4 className="card-title centreTitle">{stock[0]}</h4>
                            <h6 className="card-subtitle text-muted centreTitle">{stock[1]}</h6>
                            <p className="card-text">Ask: ${stock[2]}</p>
                            <p className="card-text">Gain/Loss: ${stock[3]}</p>
                            <p className="card-text">Market Value: ${stock[4]}</p>
                            <p className="card-text">Percentage Change: {stock[5]}</p>
                            <p className="card-text">Price: ${stock[6]}</p>
                            <p className="card-text">Number of Stocks: {stock[7]}</p>

                            <div className="form-group">
                              <label htmlFor="number">Qty:</label>
                              <input type="number" ref="amountSell" className="form-control" onChange={that.handleSellStocksChange} />
                            </div>
                            <button type="button" className="btn btn-primary" onClick={that.handleSellStocksClick} >Sell</button>

                          </div>
                        </li>
                      </ul>
                    
                </div>
              </div>);
      });
    }

    return (
      <div className="container">

        <h2>Yer be dabblin{"'"} in {this.state.matchTitle}</h2>
        <div>
          <Link to="/matches">Return to Yer Battles</Link>
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