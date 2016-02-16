
var React = require('react');
var Link = require('react-router').Link;
var portfolioStore = require('./../../stores/portfolioStore.js');
var portfolioActions = require('./../../actions/portfolioActions.js');
var StockGraph = require('./graphs/stockGraph.jsx');
var PortfolioDonut = require('./graphs/portfolioDonut.jsx');
var numeral = require('numeral');
var moment = require('moment');

var Portfolio = React.createClass({

  numberInput: null,

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
        portfolioActions.getMatchPortfolio(this.state.portfolioId); 
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

    var match = portfolioStore.getMatchData();
    if (this.state.errorMessage !== null) {
      this.state.errorMessage = null;
    }
    this.setState({
      totalValue: match.totalValue,
      availableCash: match.availableCash,
      stocks: match.stocks,
      matchTitle: match.matchTitle,
      startDate: match.startDate,
      endDate: match.endDate,
      errorMessage: match.errorMessage
    }, function () {
      this.render();
    });
  },

  handleSellStocksChange: function (eventNum) {
    this.setState({
      qtySell: eventNum.target.value
    })
    numberInput = eventNum.target.value;
  },

  handleSellClick: function (event) {
    var numSharesHave = event.target.parentElement.childNodes[7].textContent;
    numSharesHave = parseInt(numSharesHave.split(": ")[1]);
    var symbol = event.target.parentElement.childNodes[1].textContent;
    portfolioActions.makeTrade(this.state.portfolioId, this.state.qtySell, symbol, 'sell', numSharesHave);
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

  handleErr: function () {
    var that = this;
    setTimeout(function () {
      that.setState({
        errorMessage: null
      });
    }, 2000);
  },

  render: function () {

    var errorToDisplay;
    var date;
    var arrayOfStocks;
    var stocksDonut;
    var time;

    if (moment(this.state.endDate).isBefore(new Date())) {
      time = (<h5 className="centreTitle">Ended: {moment(this.state.endDate).fromNow()}</h5>);
    } else if (moment(this.state.startDate).isBefore(new Date())) {
      time = (<h5 className="centreTitle">Ends in: {moment(this.state.endDate).fromNow()}</h5>);
    } else if (moment(this.state.startDate).isAfter(new Date())) {
      time = (<h5 className="centreTitle">Starts in: {moment(this.state.startDate).fromNow()}</h5>);
    }

    if (this.state.stocks) {
      stocksDonut = (<PortfolioDonut stocks={this.state.stocks} availableCash={this.state.availableCash} />);
    }

    var error = (
      <div className="alert alert-danger" role="alert">{this.state.errorMessage}</div>
    );

    if (this.state.errorMessage !== null) {
      errorToDisplay = error;
      this.handleErr();
    }

    if (this.state.startDate) {
      date = this.state.startDate;
    }


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
                          <hr></hr>
                          <div className="row">

                            <div className="col-md-3">

                              <p className="card-text">Ask: ${stock[2]}</p>
                              <p className="card-text">Gain/Loss: ${stock[3]}</p>
                              <p className="card-text">Market Value: ${stock[4]}</p>
                              <p className="card-text">Percentage Change: {stock[5]}</p>
                              <p className="card-text">Price: ${stock[6]}</p>
                              <p className="card-text">Number of Stocks: {stock[7]}</p>

                              <div className="form-group">
                                <label>Qty:</label>
                                <input className="amountSell" type="text" ref="amountSell" className="form-control" onChange={that.handleSellStocksChange} />
                              </div>
                              <button type="button" className="btn btn-primary" onClick={that.handleSellClick} >Sell</button>

                            </div>

                            <div className="col-md-9">
                              <StockGraph symbol={stock[1]} startDate={date}/>

                            </div>

                          </div>

                        </div>

                      </li>
                    </ul>
                  
                </div>
              </div>);
      });
    }

    return (
      <div className="container centreTitle">

        <h1>Yer be dabblin{"'"} in {this.state.matchTitle}</h1>
        {time}
        <div>
          <Link to="/matches">Return to Yer Battles</Link>
        </div>
        <div>
          <Link to={"/matches/portfolio/" + this.state.portfolioId + "/search"}>Check out yer pieces o{"'"} Eight</Link>
        </div>

        <h4>Yer {"'"}ave ${numeral(this.state.availableCash).format('0,0.00')} gold ter spend</h4>
        <h4>Yer current chest o{"'"} gold values ${numeral(this.state.totalValue).format('0,0.00')}</h4>

        {stocksDonut}

        {errorToDisplay}

        {arrayOfStocks}


      </div>
    );
  }

});

module.exports = Portfolio;