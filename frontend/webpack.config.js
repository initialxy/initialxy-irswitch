const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob-all');

module.exports = {
  entry: glob.sync(['./js/Entry.js', './css/**/*.css']),
  devtool: 'source-map',
  output: {
    path: './out',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: [
            [
              'env',
              {'targets': {'browsers': ['last 2 versions']}}
            ],
            'react'
          ]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?url=false'
        )
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ]
};
