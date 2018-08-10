const webpack = require('webpack');
const merge = require('webpack-merge');

const config = require('./webpack.common.js');

module.exports = merge(config, {
  devtool: 'cheap-module-source-map',
  mode: 'development',
  entry: {
    'app': [
      'webpack-hot-middleware/client?reload=true'
    ]
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: '[id].chunk.js'
  },
  devServer: {
    contentBase: './frontend/public',
    historyApiFallback: true,
    stats: 'minimal'
  }
})
