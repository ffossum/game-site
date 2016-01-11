var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    vendor: [
      'classnames',
      'falcor',
      'falcor-http-datasource',
      'history',
      'isomorphic-fetch',
      'lodash',
      'react',
      'react-dom',
      'react-bootstrap',
      'react-document-title',
      'react-redux',
      'react-router',
      'redux',
      'redux-simple-router',
      'redux-thunk',
      'socket.io-client'
    ],
    bundle: ['./src/main.js', 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr']
  },
  output: {
    path: path.join(__dirname, 'public', 'static'),
    publicPath: 'http://localhost:3000/static',
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel']
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'style!css!sass?sourceMap'
      }
    ]
  }
};
