
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
var Matches = require('./components/matches/index.jsx');


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
    //WAY TO NOT SHOW NAV WHEN SIGNED IN JOTS??
    var pills = (
      <div className="container">
        <ul className="nav nav-pills">
          <li className="active"><Link to="/matches">Yer Battles</Link></li>
          <li><Link to="/join">Join a New Battle</Link></li>
          <li><Link to="/create">Design a Battle</Link></li>
          <li><a href="#">Past Battles</a></li>
        </ul>
      </div>
    )

    var logoutButton = (
      <button style={{"float":"right", marginTop: '10px'}} type="button" className="btn btn-primary" onClick={this.logout}>Logout</button>
    );


    if (localStorage.jwt) {
      toShowNav = pills;
      logout = logoutButton;
    }

    if (localStorage.username) {
      userGreeting = (<div style={{marginTop: '24px', marginRight: '10px', fontSize: "15px", textDecoration: "none", color: "white", float:'right'}}>Ahoy: {localStorage.username}</div>);
    }

    return (

      <div>
        <nav className="navbar navbar-fixed-top" style={{backgroundImage: 'url('+'./../assets/images/woodHeader2.jpg'+')', height:"60px"}}>
          <div className="container-fluid">
            <div className="navbar-header" style={{marginTop: '20px'}}>
              <Link to="/home" style={{fontSize: "22px", textDecoration: "none", color: "white"}}>Pirate Stocks</Link>
            </div>
            {logout}
            {userGreeting}
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
      <Route path="/matches/portfolio/:id" component={Portfolio} />
      <Route path="/matches/portfolio/:id/search" component={Search} />
      <Route path="create" component={Create} />
    </Route>
  </Router>
, document.getElementById('app'));



