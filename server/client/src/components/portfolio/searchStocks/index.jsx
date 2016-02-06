
var React = require('react');
var Link = require('react-router').Link;
var searchActions = require('./../../../actions/searchActions.js');
var searchStore = require('./../../../stores/searchStore.js');
var matchActions = require('./../../../actions/matchActions.js');

var Search = React.createClass({

  getInitialState: function () {
    return {
      clicked: false
    };
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

  componentDidMount: function () {
    this.setState({
      matchId: this.props.location.pathname.split('/').splice(-2, 1)
    });
    searchStore.addChangeListener(this._onChangeEvent);
  },

  componentWillUnmount: function () {
    searchStore.removeChangeListener(this._onChangeEvent);
  },

  _onChangeEvent: function () {
    var stocks = searchStore.getStocksData();
    this.setState({
      current: stocks.current,
      oneStock: stocks.oneStock
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
    this.setState({
      qtyBuy: parseFloat(event.target.value),
      total: (parseFloat(event.target.parentElement.previousSibling.children[1].innerHTML) * parseFloat(event.target.value)).toFixed(2)
    });
    this.render();
  },

  handleBuyClick: function (event) {
    //trigger action to trades and return new portfolio to the portfolio store
    matchActions.makeTrade(this.state.matchId, this.state.qtyBuy, this.state.oneStock[0][1], 'buy');
    var location = this.props.location.pathname.split('/').splice(-2,1);
    window.location.hash = "#/matches/portfolio/"+location;
  },

  render: function () {

    var stocks = [];
    var stockInfo;
    var totalCost;

    if (this.state.current && !this.state.clicked) {
      var that = this;
      stocks = this.state.current.map(function (stock, index) {
        return (<div key={index} onClick={that.handleClick}><li>{stock}</li></div>);
      });
    }

    //to be implemented when know how to get the ask price!! :( )
    if (this.state.total > 0) {
      totalCost = (<div>
        <p className="card-text">Total Cost: ${this.state.total}</p>
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
                    <h4 className="card-title centreTitle">{stock[0]}</h4>
                    <h6 className="card-subtitle text-muted centreTitle">{stock[1]}</h6>
                    <p className="card-text">Industry: {stock[2]}</p>
                    <p className="card-text">Sector: {stock[3]}</p>
                    <p className="card-text">Exchange:{stock[4]}</p>
                    <p className="card-text">Percentage High: {stock[5]}</p>
                    <p className="card-text">Year High: {stock[6]}</p>
                    <p className="card-text">Year Low: {stock[7]}</p>
                    <p className="card-text">Ask: {stock[8]}</p>

                    <div className="form-group">
                      <label htmlFor="number">Qty:</label>
                      {totalCost}
                      <input className="form-control" onChange={that.handleBuyStocksChange} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={that.handleBuyClick} >Buy</button>
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
        <Link to="/portfolio">Return to Yer Gold</Link>

        <div className="form-group">
          <label htmlFor="search">Oggle th{"'"} stocks ye can lay yer dirty hands on:</label>
          <input type="search" ref="stockName" className="form-control" onKeyUp={this.search} />
        </div>

        <ul>{stocks}</ul>

        {stockInfo}


      </div>
    );
  }

});

module.exports = Search;

