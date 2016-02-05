
var React = require('react');
var Link = require('react-router').Link;
var numeral = require('numeral');
var moment = require('moment');
var matchesStore = require('./../../stores/matchesStore.js');
var createMatchActions = require('./../../actions/createMatchActions.js');
var DateTimeField = require('react-bootstrap-datetimepicker');
var DateTimePicker = require('./dateTimePicker.js');


var Create = React.createClass({

  getInitialState: function() {
    return {
      matches: matchesStore.getMatchData().matches,
      startDate: matchesStore.getMatchData().startDate,
      endDate: matchesStore.getMatchData().endDate,
      clicked: false
    }
  },

  componentDidMount: function () {
    matchesStore.addChangeListener(this._onChangeEvent);
  },

  componentWillUnmount: function () {
    matchesStore.removeChangeListener(this._onChangeEvent);
  },

  _onChangeEvent: function () {
    this.setState({
      matches: matchesStore.getMatchData().matches,
      startDate: matchesStore.getMatchData().startDate,
      endDate: matchesStore.getMatchData().endDate
    })
    if (this.state.clicked) {
      this.setState({
        clicked: false
      });
      var lastMatch = this.state.matches[this.state.matches.length-1];
      var matchId = lastMatch[lastMatch.length-1];
      window.location.hash="#/matches/portfolio/" + matchId;
    }
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
    createMatchActions.createMatch(this.state.matchTitle, this.state.typeOfMatch, this.state.totalFunds, this.state.startDate, this.state.endDate);
    this.setState({
      clicked: true
    })
  },

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
                      <DateTimePicker start="startDate"/>
                      <h4>Finish Date:</h4>
                      <DateTimePicker end="endDate" />
                    </div>

                    <div className="col-sm-4" onChange={this.handleTypeChange}>
                      <h4>Type of Match:</h4>
                      <label className="checkbox-inline">
                        <input type="checkbox" id="inlineCheckbox1" value="solo" />Solo
                      </label>

                      <label className="checkbox-inline">
                        <input type="checkbox" id="inlineCheckbox2" value="head to head" />Head to Head
                      </label>
                      
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

