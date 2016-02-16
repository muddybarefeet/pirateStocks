
var React = require('react');
var ReactDOM = require('react-dom');
var c3 = require('c3');
var chartActions = require('./../../../actions/chartActions.js');
var chartStore = require('./../../../stores/chartStore.js');

//Chart used in each stock card to show the stock performance over the last year
var StockGraph = React.createClass ({

  getInitialState: function () {
    return {
      close: null,
      dates: null
    };
  },

  //call the server to send a request to yahoo to get the data for each trade day over the last x weeks
  componentDidMount: function () {

    chartActions.getStockHistory(this.props.symbol, this.props.startDate);
    chartStore.addChangeListener(this._onChangeEvent);

  },

  componentWillUnmount: function () {
    chartStore.removeChangeListener(this._onChangeEvent);
  },

  _onChangeEvent: function () {
    var that = this;
    this.setState({
      close: chartStore.getChartData().close,
      xAxis: chartStore.getChartData().dates
    }, function () {
      this.render();
      //send the data to the chartBuild method
      that.buildChart(this.state.close, this.state.xAxis);
    })

  },

  buildChart: function (close, xAxis) {
    c3.generate({
      bindto: ReactDOM.findDOMNode(this.refs.chart),
      //data to pass to the graph
      data: {
        x: 'x',
        columns: [
          xAxis,
          close
        ]
      },
      axis: {
        y: {
          //define the axis label and position
          label: {
            text: 'Closing Price in $',
            position: 'outer-middle'
          }
        },
        x: {
          //define the fields on the x axis
          type: 'timeseries',
          tick: {
            format: '%Y-%m'
          },
          //define the axis label and position
          label: {
            text: 'Date',
            position: 'outer-middle'
          }
        }
      }
    });
  },
  
  render(){
    return (
      <div ref="chart" className="c3Line" ></div>
    )
  }
});

module.exports = StockGraph;