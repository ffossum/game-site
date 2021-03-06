var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    vendor: [
      'classnames',
      'falcor',
      'falcor-http-datasource',
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
      __DEVELOPMENT__: true,
      'process.env': {
        'APP_ENV': JSON.stringify('browser')
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: [
            ["react-transform", {
              "transforms": [
                {
                  "transform": "react-transform-hmr",
                  "imports": ["react"],
                  "locals": ["module"]
                }, {
                  "transform": "react-transform-catch-errors",
                  "imports": ["react", "redbox-react"]
                }
              ]
            }]
          ]
        }
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'style!css!sass?sourceMap',
      }
    ]
  }
};
