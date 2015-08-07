var webpack = require("webpack"),
    commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin("init.js");

module.exports = {
  entry: {
    globals: "./webpack/entry_GLOBALS",
    posts: "./webpack/entry_POSTS"
  },
  output: {
    path: "wp-content/themes/kaidez-swiss/js/",
    filename: "[name].js"
  },
  plugins: [
    commonsChunkPlugin,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })  
  ]
};