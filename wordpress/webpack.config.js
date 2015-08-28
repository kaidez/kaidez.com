// Set up some variables to get webpack working...

// require webpack so plugins can be used
var webpack = require( "webpack" ),
    
    /*
     * Bring in the common chunks plugin so shared JS code is broken
     * out into a file called "common.js"
     */
    commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin( "common.js" ),
    
    // Bring in the uglify plugin to minify all .js files
    UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    });

// Configure webpack
module.exports = {

  // Define multiple entry points to build out multiple files
  entry: {
    
    // Compile out a "home.js" file with specific modules
    home: [
      "./webpack/entry_GLOBALS",
      "./webpack/entry_ASIDE",
      "./webpack/entry_HOMEPAGE",
    ],
    
    // Compile out a "posts.js" file with specific modules
    posts: [
      "./webpack/entry_GLOBALS",
      "./webpack/entry_ASIDE",
      "./webpack/entry_SHARING",
      "./webpack/config/async-sharing",
      "./webpack/config/prism",
      "./webpack/config/comment-reply"
    ],

    // Compile out a "regular.js" file with specific modules
    regular: [
      "./webpack/entry_GLOBALS",
      "./webpack/entry_ASIDE"
    ]
  },

  /*
   * Output the files to the WordPress /js folder & name them based on
   * their array name
   */
  output: {
    path: "wp-content/themes/kaidez-swiss/js/",
    filename: "[name].js"
  },

  // Setup modules, which are basically plugins for webpack
  module: {
    loaders: [
      
      // Load style modules into a <style> tag
      {test: /\.css$/, loader: "style-loader!css-loader"},
      
      // Preprocess SASS files
      {test: /\.scss$/,loader: 'style!css!sass'}
    ]
  },

  // Configure some internal webpack modules as plugins
  plugins: [
    commonsChunkPlugin, // Split out shared JS code into common chunks
    UglifyJsPlugin // Minify the .js files that webpack builds out
  ]
};