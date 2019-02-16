const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
      background: './background.js',
      content_script: './content_script.js'
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "manifest.json", to: path.resolve(__dirname, 'build')},
      { from: "jquery.min.js", to: path.resolve(__dirname, 'build')},
      { from: "icons", to: path.resolve(__dirname, 'build/icons'), asType: "dir"}
    ], { })
  ]
};
