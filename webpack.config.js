const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
      background: './background.js',
      content_script: './content_script.js',
      "sidebar/sidebar": './sidebar/sidebar.js'
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "manifest.json", to: path.resolve(__dirname, 'build')},
      { from: "jquery.min.js", to: path.resolve(__dirname, 'build')},
      { from: "icons", to: path.resolve(__dirname, 'build/icons'), asType: "dir"},
      { from: "sidebar/sidebar.html", to: path.resolve(__dirname, 'build/sidebar')},
    ], { }),
    new VueLoaderPlugin()
  ],

  module: {
      rules: [
        // ... other rules
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
    }
};
