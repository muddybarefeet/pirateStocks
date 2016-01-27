var path = require('path');
var webpack = require('webpack');

var webpackConfig = {
  entry: './server/client/src/app.jsx',
  output: {
    path: './server/client/build',
    publicPath: './server/client/build',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
      exclude: /node_modules/,
      loader: 'babel-loader', // The module to load. "babel" is short for "babel-loader"
      query: {
        presets: ["react"]
      }
    }]
  },
  browser: {
    net: false,
    tls: false
  },
  node: {
    net: "empty",
    tls: "empty"
  },
  watch: true
};

module.exports = webpackConfig;