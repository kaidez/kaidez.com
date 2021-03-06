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
    
    // Compile out a "home.js" file w/ specific CommonJS modules
    home: [
      "./webpack/entry_GLOBALS",
      "./webpack/entry_ASIDE",
      "./webpack/entry_HOMEPAGE",
      "./webpack/entry_FRONTPAGE_ADS_AMD"
    ],
    
    // Compile a "posts.js" file w/ specific CommonJS modules
    posts: [
      "./webpack/entry_GLOBALS",
      "./webpack/entry_ASIDE",
      "./webpack/entry_SIDEBAR",
      "./webpack/entry_SHARING",
      "./webpack/entry_POSTS",
      "./webpack/config/async-sharing",
      "./webpack/config/prism",
      "./webpack/config/comment-reply"
    ],

    // Compile a "codePage.js" file w/ specific CommonJS modules
    codePage: [
      "./webpack/entry_GLOBALS",
      "./webpack/entry_ASIDE",
      "./webpack/entry_SIDEBAR",
      "./webpack/entry_PAGECODE",
      "./webpack/config/prism"
    ],

    // Compile a "sitemap.js" file w/ specific CommonJS modules
    sitemap: [
      "./webpack/entry_GLOBALS",
      "./webpack/entry_ASIDE",
      "./webpack/entry_SIDEBAR",
      "./webpack/entry_SITEMAP"
    ],

    // Compile a "blog.js" file w/ specific CommonJS modules
    blog: [
      "./webpack/entry_GLOBALS",
      "./webpack/entry_ASIDE",
      "./webpack/entry_PAGINATION",
      "./webpack/entry_SIDEBAR"
    ],

    // Compile a "categoriesSearch.js" file w/ specific CommonJS modules
    categoriesSearch: [
      "./webpack/entry_GLOBALS",
      "./webpack/entry_ASIDE",
       "./webpack/entry_PAGINATION"
    ],

    // Compile a "regular.js" file w/ specific CommonJS modules
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

  // Set up loaders, which are basically plugins for webpack
  module: {
    loaders: [
      
      // Inject style modules into a <style> tag
      { test: /\.css$/, loader: "style-loader!css-loader" },
      
      // Preprocess SASS files
      { test: /\.scss$/,loader: 'style!css!sass' }, 

      // Expose jQuery to the window object with expose-loader
      { test: /jquery\.js$/, loader: 'expose?jQuery' },

      // Expose enquire.js to the window object with expose-loader
      { test: /enquire\.js$/, loader: 'expose?enquire' }
    ]
  },

  // Configure some internal webpack modules as plugins
  plugins: [
    commonsChunkPlugin, // Split out shared JS code into common chunks
    UglifyJsPlugin // Minify the .js files that webpack builds out
  ]
};