
var React = require('react');
var Link = require('react-router').Link;
var searchActions = require('./../../../actions/searchActions.js');
var searchStore = require('./../../../stores/searchStore.js');

var Search = React.createClass({

  getInitialState: function () {
    return {
      clicked: false
    };
  },

  search: function (event) {
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
      qtyBuy: event.target.value
    });
  },

  handleBuyClick: function (event) {
    //trigger action to trades and return data stored
    //on return to the page render the portfolio we are in with the stock in
    console.log('symbol',this.state.oneStock[1]);
    searchActions.buyStock(this.state.qtyBuy, this.state.oneStock[1]);
  },

  render: function () {

    var stocks = [];

    if (this.state.current && !this.state.clicked) {
      var that = this;
      stocks = this.state.current.map(function (stock, index) {
        return (<div key={index} onClick={that.handleClick}><li>{stock}</li></div>);
      });
    }

    var stockInfo;

    if (this.state.oneStock) {
      var that = this;
      stockInfo = this.state.oneStock.map(function (stock, index) {
        return (
          <div key={index}>
            <div className="card card-block">
              <h4 className="card-title">{stock[0]}</h4>
              <span className="card-text">{stock[1]}</span>
              <span className="card-text">{stock[2]}</span>
              <span className="card-text">{stock[3]}</span>
              <span className="card-text">{stock[4]}</span>
              <span className="card-text">{stock[5]}</span>
              <span className="card-text">{stock[6]}</span>
              <span className="card-text">{stock[7]}</span>
              <span className="card-text">{stock[8]}</span>
            {/*div to show cost of the stocks you want to buy*/}
              <div className="form-group">
                <label htmlFor="amount">Qty:</label>
                <input type="amount" className="form-control" onChange={that.handleBuyStocksChange} />
              </div>
              <button type="button" className="btn btn-primary" onClick={that.handleBuyClick} >Buy</button>
            </div>
          </div>
          );
      })
    }

    return (
      <div className="container">

        <h2>Search Stocks Page</h2>
        <Link to="/about">Return to Main Menu</Link>

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

