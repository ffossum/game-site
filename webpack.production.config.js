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
    filename: '[name].js'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false
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
