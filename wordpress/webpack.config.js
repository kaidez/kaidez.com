var webpack = require("webpack"),
    commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin("common.js");

module.exports = {
  entry: {
    globals: "./webpack/entry_GLOBALS",
    posts: "./webpack/entry_POSTS"
  },
  output: {
    path: "wp-content/themes/kaidez-swiss/js/",
    filename: "[name].js"
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: "style!css!autoprefixer-loader?browsers=last 2 versions"},
      {test: /\.less$/, loader: "style!css!less"}
    ]
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