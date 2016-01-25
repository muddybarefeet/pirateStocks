
var React = require('react');
var Link = require('react-router').Link;
var createMatchActions = require('./../../actions/createMatchActions.js');
var numeral = require('numeral');
var moment = require('moment');
var matchesStore = require('./../../stores/matchesStore.js');
var DateTimeField = require('react-bootstrap-datetimepicker');
var DateTimePicker = require('./dateTimePicker.js');


var Create = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function () {
    matchesStore.addChangeListener(this._onChangeEvent);
  },

  componentWillUnmount: function () {
    matchesStore.removeChangeListener(this._onChangeEvent);
  },

  _onChangeEvent: function () {
    window.location.hash="#/portfolio";
  },

  //methods to add form fields data to the state
  handleTitleChange: function(event) {
    this.setState({
      matchTitle: event.target.value
    });
  },

  handleTypeChange: function (event) {
    this.setState({
      typeOfMatch: event.target.value
    });
  },

  handleFundsChange: function (event) {
    var funds = numeral().unformat(event.target.value);
    this.setState({
      totalFunds: funds
    });
  },

  //get the date with refs can I add them on the state? Would be neater REVISIT!
  handleClick: function (action) {
    var start = this.refs.startDate.value;
    var end = this.refs.finishDate.value;
    createMatchActions.createMatch(localStorage.userId, this.state.matchTitle, this.state.typeOfMatch, this.state.totalFunds, new Date(start), new Date(end));
  },

  // handleChange: function () {
  //   console.log("newDate", newDate);
  //   return this.setState({date: newDate});
  // },

  render: function () {

    return (
      <div className="container">

        <div className="container">
          <h1 className=" centreTitle">Create Match</h1>
            
          <div className="card-block">
            <ul className="list-group list-group-flush">
              <li className="list-group-item container">
                <div>

                  <div className="form-group">
                    <h4>Match Title:</h4>
                    <input type="email" className="form-control" onChange={this.handleTitleChange} />
                  </div>

                  <div className="row">
                    <div className="col-sm-4">
                       <h4>Start Date:</h4>
                       <input className="datePicker" type="date" name="start" ref="startDate" />
                        <h4>Finish Date:</h4>
                       <input className="datePicker" type="date" name="finish" ref="finishDate" />
                    </div>

                    <div className="col-sm-4" onChange={this.handleTypeChange}>
                      <h4>Type of Match:</h4>
                      <label className="checkbox-inline">
                        <input type="checkbox" id="inlineCheckbox1" value="solo" />Solo
                      </label>

                      <label className="checkbox-inline">
                        <input type="checkbox" id="inlineCheckbox2" value="head" />Head to Head
                      </label>
                      
                      <DateTimePicker />
                      
                      </div>

                    <div className="col-sm-4 form-group">
                      <h4>Funds:</h4>
                      <select className="form-control" onChange={this.handleFundsChange}>
                        <option>Pick Your Start Funds</option>
                        <option>$500</option>
                        <option>$1,000</option>
                        <option>$5,000</option>
                      </select>
                    </div>

                  </div>

                  <div>
                    <button type="submit" className="btn btn-default shiftRight" onClick={this.handleClick}>Submit</button>
                  </div>

                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    );
  }

});

module.exports = Create;

