/* eslint-disable */
// const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackShellPlugin = require('./shell');
var WatchIgnorePlugin = require("webpack").WatchIgnorePlugin;

module.exports = {
  entry: ['./src/vendor.js', './src/main.js'],
  output: {
    path: helpers.root('dist'),
    filename: 'bundle.js'
  },

  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css',  '.less'],
    alias: {
      shared: __dirname + '/../src/app/shared',
      src: __dirname + '/../src',
      app: __dirname + '/../src/app',
    },
    modulesDirectories: ['node_modules', 'bower_components']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        // loaders: [
        //
        //   'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'
        // ]
        loader: 'babel-loader',
        query: {
          presets: [
            'babel-preset-es2015',
            'babel-preset-react',
            'babel-preset-stage-0',
          ].map(require.resolve)
        }
      },

      { test: /\.html$/, loader: 'html' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.css$/, exclude: helpers.root('src'), loader: ExtractTextPlugin.extract('style', 'css?sourceMap') },
      { test: /\.css$/, include: helpers.root('src'), loader: 'raw' },
      { test: /\.less$/, include: helpers.root('src'), loader: "style!css!less?strictMath&noIeCompat" },

      { test: /\.(png|jpe?g|gif|svg|ico)$/, loader: 'url'},
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=src/assets/fonts/[name].[ext]'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new CopyWebpackPlugin([{
      from: 'src/assets'
    }]),
    // new WebpackShellPlugin({
    //      onBuildEnd: ['npm run trad']
    //     //  onBuildEnd: ['echo "goodbye world"']
    // }),
    // new WatchIgnorePlugin([
    //     helpers.root('src/app/shared/messages/locales'),
    // ]),
  ],

  postcss: function() {
    return [autoprefixer({
      browsers: ['last 3 versions']
    }), precss];
  }
}
