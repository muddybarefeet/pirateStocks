
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
    var stocks = searchStore.getStocksData().current;
    this.setState({
      currentSearch: stocks
    });
    this.render();
  },

  handleClick: function (event) {
    var symbolClicked = event.target.parentElement.childNodes[1].innerHTML;
    var nameClicked = event.target.parentElement.childNodes[0].innerHTML;
    console.log('clicked', symbolClicked, nameClicked);
    this.refs.stockName.value = nameClicked;
    this.setState({
      clicked: true
    })
    this.render();
  },

  render: function () {

    var stocks = [];

    if (this.state.currentSearch && !this.state.clicked) {
      var that = this;
      stocks = this.state.currentSearch.map(function (stock, index) {
        return (<div key={index} onClick={that.handleClick}><li>{stock}</li></div>);
      });
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
        

      </div>
    );
  }

});

module.exports = Search;

