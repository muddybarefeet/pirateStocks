//TODO: relace get data with refs so i can empty the text fields??

var React = require('react');
var Link = require('react-router').Link;
var authActions = require('./../actions/authActions.js');
var authStore = require('./../stores/authStore.js');
var matchActions = require('./../actions/matchActions.js');

var Login = React.createClass({

  getInitialState: function() {
    return authStore.getUserData();
  },

  componentDidMount: function () {
    authStore.addChangeListener(this._onChangeEvent);
  },

  componentWillUnmount: function () {
    authStore.removeChangeListener(this._onChangeEvent);
  },

  _onChangeEvent: function () {
    console.log('jwt in component', localStorage.jwt)
    window.location.hash="#/matches";
  },

  //-------methods for login-------
  handleLoginEmailChange: function(event) {
    this.setState({emailLogin: event.target.value});
  },

  handleLoginPasswordChange: function (event) {
    this.setState({passLogin: event.target.value});
  },

  handleLoginClick: function (i) {
    authActions.sendLogin(this.state.emailLogin, this.state.passLogin);
    this.setState({emailLogin: "", passLogin: ""});
    //want to empty the text box
  },

  //-------methods for signup-------
  handleSignupUsernameChange: function (event) {
    this.setState({usernameSignup: event.target.value});
  },

  handleSignupEmailChange: function(event) {
    var that = this;
    this.setState({emailSignup: event.target.value});
  },

  handleSignupPasswordChange: function(event) {
    var that = this;
    this.setState({passSignup: event.target.value});
  },

  handleSignupClick: function (i) {
    authActions.sendSignup(this.state.usernameSignup, this.state.emailSignup, this.state.passSignup);
    this.setState({usernameSignup: "", emailSignup: "", passSignup: ""});
    //want to empty the text box
  },

  render: function () {

    return (
      <div className="container">
        
        <div className="row">

          <div className="col-md-6">

            <h1>Login</h1>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="usr" onChange={this.handleLoginEmailChange} />
            </div>
            <div className="form-group">
              <label htmlFor="usr">Password:</label>
              <input type="password" className="form-control" id="pwd" onChange={this.handleLoginPasswordChange} />
            </div>

            <div>
              <button type="button" className="btn btn-warning" onClick={this.handleLoginClick}>Login</button>
            </div>

          </div>

          <div className="col-md-6">

            <h1>Signup</h1>

            <div className="form-group">
              <label htmlFor="userName">Username:</label>
              <input type="userName" className="form-control" id="usrname" onChange={this.handleSignupUsernameChange} />
            </div>
            <div className="form-group">
              <label htmlFor="usr">Email:</label>
              <input type="text" className="form-control" id="usr" onChange={this.handleSignupEmailChange} />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password:</label>
              <input type="password" className="form-control" id="pwd" onChange={this.handleSignupPasswordChange} />
            </div>

            <div>
              <button type="button" className="btn btn-warning" onClick={this.handleSignupClick}>Signup</button>
            </div>

          </div>

        </div>

      </div>
    );
  }

});

module.exports = Login;
