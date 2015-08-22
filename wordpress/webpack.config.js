var webpack = require("webpack"),
    commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin("common.js"),
    UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    home: [
      "./webpack/entry_GLOBALS",
      "./webpack/entry_ASIDE",
      "./webpack/entry_HOMEPAGE",
      ],
    posts: [
      "./webpack/entry_GLOBALS",
      "./webpack/entry_ASIDE",
      "./webpack/entry_SHARING",
      "./webpack/config/prism",
      "./webpack/config/comment-reply"
    ]
  },
  output: {
    path: "wp-content/themes/kaidez-swiss/js/",
    filename: "[name].js"
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: "style-loader!css-loader"},
      // {test: /\.css$/, loader: "style!css!autoprefixer-loader?browsers=last 2 versions'"},
      {test: /\.less$/, loader: "style!css!less"}
    ]
  },

  plugins: [
    commonsChunkPlugin,
    UglifyJsPlugin,
    new ExtractTextPlugin("styles.css", {
        allChunks: true
      })
  ]
};