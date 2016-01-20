
var React = require('react');
var ReactDOM = require('react-dom');
var reactRouter = require('react-router');
var Route = require('react-router').Route;
var Router = require('react-router').Router;
var hashHistory = require('react-router').hashHistory;

var Link = require('react-router').Link;
var IndexRoute = require('react-router').IndexRoute;

// var App = require('./components/index.jsx');
var Home = require('./components/home.jsx');
var Login = require('./components/login.jsx');

var Create = require('./components/createMatch.jsx');
var Portfolio = require('./components/portfolio/index.jsx');
var Search = require('./components/portfolio/searchStocks/index.jsx');
var Join = require('./components/toJoin/index.jsx');
var Matches = require('./components/matches/index.jsx');


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
              <Link to="/home">Pirate Stocks</Link>
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
        <div>
          <div>
            <Link to="/create">Create Match</Link>
          </div>
          <div>
            <Link to="/join">Join a New Match</Link>
          </div>
          <div>
            <Link to="/matches">Your Matches</Link>
          </div>
        </div>
      </div>
    )
  }
});

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="home" component={Home} />
      <Route path="login" component={Login} />
        <Route path="about" component={About} />
        <Route path="create" component={Create} />
        <Route path="matches" component={Matches} />
          <Route path="portfolio" component={Portfolio}/>
            <Route path="search" component={Search} />
        <Route path="join" component={Join} />
    </Route>
  </Router>
, document.getElementById('app'));




