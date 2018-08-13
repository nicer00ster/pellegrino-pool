const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
const help = require('../helpers');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const prod = NODE_ENV === 'production';


module.exports = {
  entry: {
    'app': ['babel-polyfill', help.root('frontend/app/index.js')]
  },
  output: {
    path: help.root('dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss', '.html'],
    alias: { 'app': 'frontend/app' }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: help.root('frontend'),
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        // NODE_ENV: JSON.stringify(NODE_ENV)
        NODE_ENV: JSON.stringify('production') // Uncomment for production build
      }
    }),
    new HtmlWebpackPlugin({
      template: help.root('frontend/public/index.html'),
      inject: 'body'
    }),
  ],
};
