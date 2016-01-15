
var React = require('react');
var ReactDOM = require('react-dom');
var reactRouter = require('react-router');
var Route = require('react-router').Route;
var Router = require('react-router').Router;

var Link = require('react-router').Link;
var IndexRoute = require('react-router').IndexRoute;

var App = require('./components/index.jsx');
var Home = require('./components/home.jsx');
var Login = require('./components/auth/login.jsx');



var App = React.createClass({

  componentDidMount: function() {
    // This doesn't refer to the `span`s! It refers to the children between
    // last line's `<App></App>`, which are undefined.
    // console.log(this.props.children);
  },

  render: function render() {
    return (

      <div>
        <nav className="navbar navbar-fixed-top navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/home">Stock Duel</Link>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>

    )
  }

});

var About = React.createClass({
  render() {
    return (
      <div className="container">
        <h3>About</h3>
        <p>Time to get this routing working</p>
      </div>
    )
  }
});

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="home" component={Home} />
      <Route path="about" component={About} />
      <Route path="login" component={Login} />
    </Route>
  </Router>
, document.getElementById('app'));




