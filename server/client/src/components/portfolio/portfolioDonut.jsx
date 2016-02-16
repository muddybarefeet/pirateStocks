
//used on a users portfolio page
var React = require('react');
var ReactDOM = require('react-dom');
var c3 = require('c3');

var PortfolioDonut = React.createClass ({
  //take the names of the stocks that you have and their values and pass them to the bar graph
  componentDidMount() {
    var portfolio = this.props.stocks.reduce(function(portfolio, stock){
      portfolio[stock[0]] = (parseFloat(stock[6]))*(stock[7]);
      return portfolio;
    }, {}) 
    portfolio['cash'] = this.props.availableCash.toFixed(2);
    //trigger the function to render the donut
    this.buildChart(portfolio);
  },

  // above repeated in componentDidUpdate so that on refresh the data stays on the page
  componentDidUpdate() {
    var portfolio = this.props.stocks.reduce(function(portfolio, stock){
      portfolio[stock[0]] = (parseFloat(stock[6]))*(stock[7]);
      return portfolio;
    }, {}) 
    portfolio['cash'] = this.props.availableCash.toFixed(2);
    this.buildChart(portfolio);
  },

  buildChart(portfolio) {
    c3.generate({
      bindto: ReactDOM.findDOMNode(this.refs.donut),
      data: {
        json : portfolio,
        type : 'donut'        
      },
      donut: {
        title: "Portfolio"
      }
    });
  },
  
  render(){
    return (
      <div ref="donut"></div>
    )
  }

});

module.exports = PortfolioDonut;