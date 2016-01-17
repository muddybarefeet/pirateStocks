
var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');
var DateTimeField = require('react-bootstrap-datetimepicker');
var createMatchActions = require('./../actions/createMatchActions.js');

var Create = React.createClass({

  getInitialState: function() {
    return {};
  },

  //methods to add form fields data to the state
  handleTitleChange: function(event) {
    this.setState({matchTitle: event.target.value});
  },

  handleTypeChange: function (event) {
    this.setState({typeOfMatch: event.target.value});
  },

  handleFundsChange: function (event) {
    this.setState({funds: event.target.value});
  },

  //get the date with refs can I add them on the state? Would be neater REVISIT!
  handleClick: function (action) {
    var start = this.refs.startDate.value;
    var end = this.refs.finishDate.value;
    createMatchActions.createMatch(this.state.matchTitle, this.state.typeOfMatch, this.state.funds, start, end)
  },

  render: function () {

    return (
      <div className="container">

        <h2>Create Match</h2>
        <Link to="/about">Return to Main Menu</Link>
        

        <div className="container">
          <label htmlFor="title">Match Title:</label>
          <input type="title" id="email" onChange={this.handleTitleChange}/>
        </div>

        <div className="container">
           <h5>Start Date:</h5>
           <input className="datePicker" type="date" name="start" ref="startDate" />
            <h5>Finish Date:</h5>
           <input className="datePicker" type="date" name="finish" ref="finishDate" />
        </div>

        <div className="container" onChange={this.handleTypeChange}>
          <h5>Type of Match:</h5>
          <label className="checkbox-inline">
            <input type="checkbox" id="inlineCheckbox1" value="solo" />Solo
          </label>

          <label className="checkbox-inline">
            <input type="checkbox" id="inlineCheckbox2" value="head" />Head to Head
          </label>
        </div>

        <div className="container">
          <label htmlFor="Funds">Funds:</label>
          <select onChange={this.handleFundsChange}>
            <option>Pick Your Start Funds</option>
            <option>$500</option>
            <option>$1,000</option>
            <option>$5,000</option>
          </select>
        </div>

        <div>
          <button type="submit" className="btn btn-default" onClick={this.handleClick}>Submit</button>
        </div>


      </div>
    );
  }

});

module.exports = Create;