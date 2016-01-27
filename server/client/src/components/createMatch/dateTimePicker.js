
var React = require('react');
var moment = require('moment');
var DateTimeField = require('react-bootstrap-datetimepicker');
var createMatchActions = require('./../../actions/createMatchActions.js');

var DateTimePicker = React.createClass ({
  
  getInitialState: function () {
    return {
      date: moment().format("YYYY-MM-DD"),
      inputFormat: "DD/MM/YYYY",
      mode: "date"
    };
  },

  handleChange: function (e) {
    if (this.props.start) {
      this.setState({
        startDate: new Date(e)
      }, function () {
        createMatchActions.getStartDate(this.state.startDate);
      });
    } else if (this.props.end) {
      this.setState({
        endDate: new Date (e)
      }, function () {
        createMatchActions.getEndDate(this.state.endDate);
      });
    }
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