
var React = require('react');
var DateTimeField = require('react-bootstrap-datetimepicker');

var DateTimePicker = React.createClass ({
  
  getInitialState: function () {
    return {
      date: "1990-06-05",
      format: "YYYY-MM-DD",
      inputFormat: "DD/MM/YYYY",
      mode: "date"
    };
  },

  handleChange: function () {
    console.log("newDate", newDate);
    return this.setState({date: newDate});
  },

  render: function () {
    return (<DateTimeField
      dateTime={this.state.date}
      format={this.state.format}
      inputFormat={this.state.inputFormat}
      onChange={this.handleChange}
      viewMode={this.state.mode} />);
  }
});

module.exports = DateTimePicker;