
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  output: {
    filename: 'index.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        path.join(__dirname),
        path.join(__dirname, '../src')
      ]
    }]
  },
  devServer: {
    open: true,
    port: 9901
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'index.html') }      
    ])
  ]
}