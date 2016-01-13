var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config');

module.exports = {
  entry: {
    bundle: './src/main.js',
    vendor: config.entry.vendor
  },
  output: {
    path: path.join(__dirname, 'public', 'static'),
    publicPath: '/static/',
    filename: '[name].js'
  },
  externals: {
    'falcor': 'falcor',
    'falcor-http-datasource': 'falcor.HttpDataSource',
    'lodash': '_',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-bootstrap': 'ReactBootstrap'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'APP_ENV': JSON.stringify('browser')
      }
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
        loader: 'style!css!sass'
      }
    ]
  }
};
