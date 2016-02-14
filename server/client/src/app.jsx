
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

var Create = require('./components/createMatch/createMatch.jsx');
var Portfolio = require('./components/portfolio/index.jsx');
var Search = require('./components/portfolio/searchStocks/index.jsx');
var Join = require('./components/matchesToJoin.jsx');
var Matches = require('./components/matches/current.jsx');
var PastMatches = require('./components/matches/past.jsx');
var PendingMatches = require('./components/matches/pending.jsx');

var App = React.createClass({

  componentDidMount: function() {
    // This doesn't refer to the `span`s! It refers to the children between
    // last line's `<App></App>`, which are undefined.
    // console.log(this.props.children);
  },

  logout: function () {
    localStorage.clear();
    window.location.hash = "#/home";
  },

  render: function render() {

    var toShowNav;
    var logout;
    var userGreeting;

    var logoutButton = (
      <button style={{"float":"right", marginTop: '10px'}} type="button" className="btn btn-primary" onClick={this.logout}>Logout</button>
    );


    if (localStorage.jwt) {
      logout = logoutButton;
    }

    if (localStorage.username) {
      userGreeting = (<div style={{textDecoration: "none", color: "white"}}>Ahoy: {localStorage.username + "!"}</div>);
    }

    return (
      <div>
        <nav className="navbar navbar-fixed-top navbar-default" style={{backgroundImage: 'url('+'./../assets/images/woodHeader2.jpg'+')'}}>
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/home">Pirate Stocks</Link>
            </div>
            <div className="nav navbar-nav navbar-left" role="search">
              {userGreeting}
            </div>
            
            <div className="nav navbar-nav navbar-right" role="search">


              <li><Link to="/join">Join a New Battle</Link></li>
              <li><Link to="/create">Design a Battle</Link></li>
              
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Battles
                <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#/matches">Current</a></li>
                  <li><a href="#/pendingMatches">Pending</a></li>
                  <li><a href="#/pastMatches">Past</a></li> 
                </ul>
              </li>

              {logout}
            </div>
          </div>
        </nav>
        {toShowNav}
        {this.props.children}
      </div>
    )
  }

});


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="join" component={Join}/>
      <Route path="/matches" component={Matches} />
      <Route path="/pendingMatches" component={PendingMatches} />
      <Route path="/pastMatches" component={PastMatches} />
      <Route path="/matches/portfolio/:id" component={Portfolio} />
      <Route path="/matches/portfolio/:id/search" component={Search} />
      <Route path="create" component={Create} />
    </Route>
  </Router>
, document.getElementById('app'));

/* */

