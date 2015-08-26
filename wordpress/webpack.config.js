var webpack = require( "webpack" ),
    commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin( "common.js" ),
    UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    });

module.exports = {

  entry: {
    
    // Create a file called "home.js" with specific modules
    home: [
      "./webpack/entry_GLOBALS",
      "./webpack/entry_ASIDE",
      "./webpack/entry_HOMEPAGE",
      ],
    
    // Create a file called "posts.js" with specific modules
    posts: [
      "./webpack/entry_GLOBALS",
      "./webpack/entry_ASIDE",
      "./webpack/entry_SHARING",
      "./webpack/config/async-sharing",
      "./webpack/config/prism",
      "./webpack/config/comment-reply"
    ],

    // Create a file called "regular.js" with specific modules
    regular: [
      "./webpack/entry_GLOBALS",
      "./webpack/entry_ASIDE"
    ]
  },

  output: {
    path: "wp-content/themes/kaidez-swiss/js/",
    filename: "[name].js"
  },

  module: {
    loaders: [
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.scss$/,loader: 'style!css!sass'}
    ]
  },

  plugins: [
    commonsChunkPlugin,
    UglifyJsPlugin
  ]
};