
var React = require('react');
var Link = require('react-router').Link;
var portfolioStore = require('./../../stores/portfolioStore.js');
var matchActions = require('./../../actions/matchActions.js');
var numeral = require('numeral');

var Portfolio = React.createClass({

  // numberInput: null,

  getInitialState: function () {
    return {
      totalValue: portfolioStore.getMatchData().totalValue,
      availableCash: portfolioStore.getMatchData().availableCash,
      stocks: portfolioStore.getMatchData().stocks,
      matchTitle: portfolioStore.getMatchData().matchTitle,
      qtySell: "", 
      total: null,
      portfolioId: this.props.location.pathname.split('/').splice(-1, 1).toString()
    }
  },

  componentDidMount: function () {
    if (this.state.portfolioId) {
      this.setState({
        portfolioId: this.props.location.pathname.split('/').splice(-1, 1).toString()
      }, function () {
        matchActions.getMatchPortfolio(this.state.portfolioId); 
      });
    } /*else {*/
      //MAKE A NOT FOUND PAGE
      // window.location.hash = "#/notFound";
    // }
    portfolioStore.addChangeListener(this._onChangeEvent);
  },

  componentWillUnmount: function () {
    portfolioStore.removeChangeListener(this._onChangeEvent);
  },

  _onChangeEvent: function () {
    var match = portfolioStore.getMatchData();//getPortfolioData
    if (this.state.errorMessage !== null) {
      this.state.errorMessage = null;
    } else {
      this.state.errorMessage = match.errorMessage;
    }
    this.setState({
      totalValue: match.totalValue,
      availableCash: match.availableCash,
      stocks: match.stocks,
      matchTitle: match.matchTitle,
      qtySell: ""
    });
    this.render();
  },

  handleSellStocksChange: function (eventNum) {
    this.setState({
      qtySell: eventNum.target.value
    })
    // numberInput = eventNum.target.value;
  },

  handleSellClick: function (event) {
    var numShares = event.target.parentElement.childNodes[7].textContent;
    numShares = parseInt(numShares.split(": ")[1]);
    var symbol = event.target.parentElement.childNodes[1].textContent;
    matchActions.makeTrade(this.state.portfolioId, this.state.qtySell, symbol, 'sell', numShares);
    this.setState({
      qtySell: ""
    });
    this.scrollToTop(10);
  },

  scrollToTop: function (scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15),
      scrollInterval = setInterval(function(){
      if ( window.scrollY != 0 ) {
          window.scrollBy( 0, scrollStep );
      }
      else clearInterval(scrollInterval); 
    },15);
  },

  render: function () {

    var errorToDisplay;
    var error = (
      <div className="alert alert-danger" role="alert">{this.state.errorMessage}</div>
    );

    if (this.state.errorMessage !== null) {
      errorToDisplay = error;
    }

    var arrayOfStocks;

    if (this.state.stocks) {
      var that = this;
      arrayOfStocks = this.state.stocks.map(function (stock, index) {
        return (
          <div className="card" key={index}>
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
                            <input className="amountSell" type="number" ref="amountSell" className="form-control" onChange={that.handleSellStocksChange} />
                          </div>
                          <button type="button" className="btn btn-primary" onClick={that.handleSellClick} >Sell</button>

                        </div>
                      </li>
                    </ul>
                  
                </div>
              </div>);
      });
    }

    return (
      <div className="container">

        <h1>Yer be dabblin{"'"} in {this.state.matchTitle}</h1>
        <div>
          <Link to="/matches">Return to Yer Battles</Link>
        </div>
        <div>
          <Link to={"/matches/portfolio/" + this.state.portfolioId + "/search"}>Check out yer pieces o{"'"} Eight</Link>
        </div>

        <h4>Yer {"'"}ave ${numeral(this.state.availableCash).format('0,0.00')} gold ter spend</h4>
        <h4>Yer current chest o{"'"} gold values ${numeral(this.state.totalValue).format('0,0.00')}</h4>

        {errorToDisplay}

        {arrayOfStocks}


      </div>
    );
  }

});

module.exports = Portfolio;