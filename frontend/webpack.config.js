module.exports = {
  entry: './js/entry.js',
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
      }
    ]
  }
};