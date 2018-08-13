const webpack = require('webpack');
const merge = require('webpack-merge');

const config = require('./webpack.common');

module.exports = merge(config, {
  mode: 'production',
  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      },
      output: {
        comments: false
      }
    })
  ]
});
