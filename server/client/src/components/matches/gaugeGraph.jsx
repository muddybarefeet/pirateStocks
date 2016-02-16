'use strict';
//two gauges made on reflection could have made one
var React = require('react');
var ReactDOM = require('react-dom');
// var { toJS } = require('immutable');
var c3 = require('c3');

var Gauge = React.createClass({

  componentDidMount(){
    //working out the percentage of the user funds
    console.log();
    var you = parseFloat(this.props.cashValue.substr(1));
    var opponent = parseFloat(this.props.opponentValue.substr(1));
    var total = you + opponent;
    var yourPercent = (you/total) * 100;
    var opponentPercent = (you/total)*100;
    //call with the date to build the gauge chart
    this.buildChart(yourPercent.toFixed(2), opponentPercent.toFixed(2));

  },

  buildChart(you, opponent) {
    c3.generate({
      bindto: ReactDOM.findDOMNode(this.refs.chart),
      data: {
        columns: [
          ['Me', you]
        ],
        type: 'gauge'
      },
      color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
          values: [30, 60, 90, 100]
        }
      },
      size: {
          height: 90
      }
    })
  },
  
  render(){
    return (
      <div ref="chart"></div>
    )
  }

});

module.exports = Gauge;