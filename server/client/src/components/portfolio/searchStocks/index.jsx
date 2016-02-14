
var React = require('react');
var Link = require('react-router').Link;
var searchActions = require('./../../../actions/searchActions.js');
var matchActions = require('./../../../actions/matchActions.js');
var searchStore = require('./../../../stores/searchStore.js');
var portfolioStore = require('./../../../stores/portfolioStore.js');
var numeral = require('numeral');
var StockChart = require('./../stockChart.jsx');

var Search = React.createClass({

  getInitialState: function () {
    return {
      clicked: false,
      portfolioId: this.props.location.pathname.split('/').splice(-2, 1).toString()
    };
  },

  componentDidMount: function () {
    matchActions.getMatchPortfolio(this.state.portfolioId);
     this.setState({
      matchId: this.props.location.pathname.split('/').splice(-2, 1)
    });
    searchStore.addChangeListener(this._onChangeEvent);
    portfolioStore.addChangeListener(this._onPortfolioChangeEvent);
  },

  search: function (event) {

    if (this.state.clicked) {
      this.state.clicked = false;
      this.state.oneStock = null;
      this.state.current = null;
      this.render();
    }

    var input = event.target.value;

    var oncePerSec = function () {
      searchActions.searchStockDb(input); 
    }

    if (fnCalled) {
      //if the function has already been called then need to restart the timer
      clearTimeout(fnCalled);
    }
    var fnCalled = setTimeout(oncePerSec, 1000);
  },

  componentWillUnmount: function () {
    searchStore.removeChangeListener(this._onChangeEvent);
    portfolioStore.removeChangeListener(this._onPortfolioChangeEvent);
  },

  _onChangeEvent: function () {
    var stocks = searchStore.getStocksData();
    this.setState({
      current: stocks.current,
      oneStock: stocks.oneStock
    });
    this.render();
  },

  _onPortfolioChangeEvent: function () {
    this.setState({
      availableCash: portfolioStore.getMatchData().availableCash
    });
    this.render();
  },

  handleClick: function (event) {
    var symbolClicked = event.target.parentElement.childNodes[1].innerHTML;
    var nameClicked = event.target.parentElement.childNodes[0].innerHTML;
    searchActions.getOneStocksDetails(symbolClicked);
    this.refs.stockName.value = nameClicked;
    this.setState({
      clicked: true
    })
    this.render();
  },

  handleBuyStocksChange: function (event) {
    var that = this;
    this.setState({
      qtyBuy: parseFloat(event.target.value),
      total: (parseFloat(event.target.parentElement.previousSibling.children[1].innerHTML) * parseFloat(event.target.value)).toFixed(2)
    }, function () {
      if(that.state.availableCash < parseInt(that.state.total,10)) {
        that.setState({
          errorMessage: "Ye do nah 'ave enough doubloons t' buy this number o' stocks"
        }, function () {
          that.render();
        });
      } else {
        that.setState({
          errorMessage: null
        });
      }
    });
  },

  handleBuyClick: function (event) {
    if (!this.state.errorMessage) {
      matchActions.makeTrade(this.state.matchId[0], this.state.qtyBuy, this.state.oneStock[0][1], 'buy');
      //trigger action to trades and return new portfolio to the portfolio store
      var location = this.props.location.pathname.split('/').splice(-2,1);
      window.location.hash = "#/matches/portfolio/"+location;
    }
  },

  render: function () {

    var stocks = [];
    var stockInfo;
    var totalCost;
    var userCash;
    var errorMessage;

    if (this.state.errorMessage) {
      errorMessage = (
        <div className="alert alert-danger" role="alert">{this.state.errorMessage}</div>
      );
    }

    if (this.state.current && !this.state.clicked) {
      var that = this;
      stocks = this.state.current.map(function (stock, index) {
        return (<div key={index} onClick={that.handleClick}><li>{stock}</li></div>);
      });
    }

    //to be implemented when know how to get the ask price!! :( )
    if (this.state.total > 0) {
      totalCost = (<div>
        <p className="card-text">Total Cost: ${numeral(this.state.total).format('0,0.00')}</p>
      </div>);
    }

    if (this.state.availableCash) {
      userCash = (<div>
        <p className="card-text">Yer Gold: ${numeral(this.state.availableCash).format('0,0.00')}</p>
      </div>);
    }

    if (this.state.oneStock && this.state.clicked) {
      var that = this;
      stockInfo = this.state.oneStock.map(function (stock, index) {
        return (
          <div className="card" key={index}>
            <div className="card-block">
              
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div>
                    {userCash}

                    <h4 className="card-title centreTitle">{stock[0]}</h4>
                    <h6 className="card-subtitle text-muted centreTitle">{stock[1]}</h6>
                    
                    <div className="row">
                    
                      <div className="col-md-3">
                        <p className="card-text">Industry: {stock[2]}</p>
                        <p className="card-text">Sector: {stock[3]}</p>
                        <p className="card-text">Exchange:{stock[4]}</p>
                        <p className="card-text">Percentage High: {stock[5]}</p>
                        <p className="card-text">Year High: {"$"+stock[6]}</p>
                        <p className="card-text">Year Low: {"$"+stock[7]}</p>
                        <p className="card-text">Ask: {"$"+stock[8]}</p>

                        <div className="form-group">
                          <label htmlFor="number">Qty:</label>
                          {totalCost}
                          <input className="form-control" onChange={that.handleBuyStocksChange} />
                        </div>

                        <button type="button" className="btn btn-primary" onClick={that.handleBuyClick} >Buy</button>
                        
                      </div>

                      <div className="col-md-9">

                        <StockChart symbol={stock[1]} startDate={new Date()}/>

                      </div>

                    </div>

                  </div>
                </li>
              </ul>
            
            </div>
          </div>
          );
      })
    }

    return (
      <div className="container">

        <h1>Search Stocks Page</h1>
        <Link to={"/matches/portfolio/"+this.state.matchId}>Return to Yer Gold</Link>

        <div className="form-group">
          <label htmlFor="search">Oggle th{"'"} stocks ye can lay yer dirty hands on:</label>
          <input type="search" ref="stockName" className="form-control" onKeyUp={this.search} />
        </div>
        {errorMessage}
        <ul>{stocks}</ul>

        {stockInfo}


      </div>
    );
  }

});

module.exports = Search;

