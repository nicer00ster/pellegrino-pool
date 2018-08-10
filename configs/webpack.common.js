const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
const help = require('../helpers');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 2
            },
          },
        ]
      },
      // {
      //   test: /\.scss$/,
      //   loader: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           'sourceMap': true,
      //           'importLoaders': 1
      //         }
      //       },
      //       {
      //         loader: 'postcss-loader',
      //         options: {
      //           plugins: () => [autoprefixer]
      //         }
      //       },
      //       'sass-loader'
      //     ]
      //   })
      // }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      template: help.root('frontend/public/index.html'),
      inject: 'body'
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
      disable: !prod
    })
  ]
};
