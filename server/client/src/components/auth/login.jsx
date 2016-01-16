
var React = require('react');
var Link = require('react-router').Link;
var authActions = require('./../../actions/authActions.js');
var authStore = require('./../../stores/authStore.js');

var Login = React.createClass({

  getInitialState: function() {
    return {};
  },

  // componentDidMount: function () {
  //   authStore.addChangeListener(this.onChangeEvent);
  // },

  // onChangeEvent: funtion () {
  //   var userId = authStore.getUID();
  // },

  //-------methods for login-------
  handleLoginEmailChange: function(event) {
    var that = this;
    this.setState({emailLogin: event.target.value});
  },

  handleLoginPasswordChange: function (event) {
    var that = this;
    this.setState({passLogin: event.target.value});
  },

  handleLoginClick: function (i) {
    authActions.sendLogin(this.state.emailLogin, this.state.passLogin);
  },

  //-------methods for signup-------
  handleSignupEmailChange: function(event) {
    var that = this;
    this.setState({emailSignup: event.target.value});
  },

  handleSignupPasswordChange: function(event) {
    var that = this;
    this.setState({passSignup: event.target.value});
  },

  handleSignupClick: function (i) {
    authActions.sendSignup(this.state.emailSignup, this.state.passSignup);
  },

  render: function () {

    return (
      <div className="container">
        
        <div className="row">

          <div className="col-md-6">

            <h2>Login</h2>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="usr" onChange={this.handleLoginEmailChange} />
            </div>
            <div className="form-group">
              <label htmlFor="usr">Password:</label>
              <input type="password" className="form-control" id="pwd" onChange={this.handleLoginPasswordChange} />
            </div>

            <div className="centreTitle" >
              <button type="button" className="btn btn-warning" onClick={this.handleLoginClick}>Login</button>
            </div>

          </div>

          <div className="col-md-6">

            <h2>Signup</h2>

            <div className="form-group">
              <label htmlFor="usr">Email:</label>
              <input type="text" className="form-control" id="usr" onChange={this.handleSignupEmailChange} />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password:</label>
              <input type="password" className="form-control" id="pwd" onChange={this.handleSignupPasswordChange} />
            </div>

            <div className="centreTitle" >
              <button type="button" className="btn btn-warning" onClick={this.handleSignupClick}>Signup</button>
            </div>

          </div>

        </div>

      </div>
    );
  }

});

module.exports = Login;
