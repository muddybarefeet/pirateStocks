
var React = require('react');
var DateTimeField = require('react-bootstrap-datetimepicker');
var moment = require('moment');

var DateTimePicker = React.createClass ({
  
  getInitialState: function () {
    return {
      date: moment().format("YYYY-MM-DD"),
      inputFormat: "DD/MM/YYYY",
      mode: "date"
    };
  },

  handleChange: function (e) {
    console.log("newDate", e);
    return this.setState({date: e});
  },

  render: function () {
    return (<DateTimeField
      dateTime={this.state.date}
      format={"YYYY-MM-DD"}
      inputFormat={this.state.inputFormat}
      onChange={this.handleChange}
      viewMode={this.state.mode} />);
  }
});

module.exports = DateTimePicker;