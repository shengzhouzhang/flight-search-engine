
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/browser/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist', 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  devtool: '#source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /(node_modules|bower_components)/, loaders: [ 'babel' ] },
      { test: /\.json$/, loader: 'json-loader' },
    ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
