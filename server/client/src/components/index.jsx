//index (top of tree for all the children components)

var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

var Home = require('./home.jsx');

var App = React.createClass({
  
  render: function(){

    return (
      
      <div>

        <h1>This is app!</h1>

      </div>

      );
  }

});

module.exports = App;





