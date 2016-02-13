
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

  componentWillMount: function () {
    createMatchActions.randomTitle();
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
      endDate: matchesStore.getMatchData().endDate, 
      errorMessage: matchesStore.getMatchData().errorMessage,
      title: matchesStore.getMatchData().title
    }, function () {
      if (this.state.clicked && this.state.errorMessage === null ) {
        this.setState({
          clicked: false
        });
        var lastMatch = this.state.matches[this.state.matches.length-1];
        var matchId = lastMatch[lastMatch.length-1];
        window.location.hash="#/matches/portfolio/" + matchId;
      }
    })
  },

  //methods to add form fields data to the state
  handleTitleChange: function(event) {
    this.setState({
      matchTitle: event.target.value
    });
  },

  handleFundsChange: function (event) {
    var funds = numeral().unformat(event.target.value);
    this.setState({
      totalFunds: funds
    });
  },

  handleTypeChange: function (event) {
    var type = event.target.value;
    if (type === "Head to Cutlass") {
      type = 'head';
    } else {
      type = 'solo';
    }
    this.setState({
      typeOfMatch: type
    });
  },

  handleClick: function (action) {
    if (!this.state.typeOfMatch || !this.state.totalFunds || !this.state.startDate || !this.state.endDate) {
      //need to throw an err if any of the fields do not hold a value
      this.setState({
        errorMessage: "Remember t' pick all yer battle details, 'n look t' it lively!"
      });
    } else {
      createMatchActions.createMatch(this.state.title, this.state.typeOfMatch, this.state.totalFunds, this.state.startDate, this.state.endDate);
      this.setState({
        clicked: true
      })
    }
  },

  handleErr: function () {
    var that = this;
    setTimeout(function () {
      that.setState({
        errorMessage: null
      });
    }, 3000);
    // this.render();
  },

  render: function () {

    var showErrDiv;
    var err = (
      <div className="alert alert-danger" role="alert">{this.state.errorMessage}</div>
    );

    if (this.state.errorMessage) {
      showErrDiv = err;
      this.handleErr();
    }

    return (
      <div className="container">

        <div className="container">
          <h1 className=" centreTitle">Create Match</h1>
            {showErrDiv}
          <div className="card-block">
            <ul className="list-group list-group-flush">
              <li className="list-group-item container">
                <div>

                  <div className="form-group">
                    <h4>Ahoy! Yer next battle be : {this.state.title}</h4>
                  </div>

                  <div className="row container">
                    <div className="col-sm-4">
                      <h4>Start Date:</h4>
                      <DateTimePicker start="startDate" />
                      <h4>Type o{"'"} Battle:</h4>
                      <select className="form-control" onChange={this.handleTypeChange}>
                        <option>Chose Yer Battle Type</option>
                        <option>Solo</option>
                        <option>Head to Cutlass</option>
                      </select>
                    </div>

                    <div className="col-sm-4 form-group">
                      <h4>Finish Date:</h4>
                      <DateTimePicker end="endDate" />
                      <h4>Starting Gold:</h4>
                      <select className="form-control" onChange={this.handleFundsChange}>
                        <option>Pick Yer Starting Gold</option>
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


