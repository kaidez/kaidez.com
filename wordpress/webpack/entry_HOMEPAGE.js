/**
 * entry_HOMEPAGE.js
 *
 * Module for loading styles and scripts related to the home page only
 *
 */

var $ = require( "jquery" ), // require jQuery
    q = require( "Q" ); // require the Q Promise library

// Wait for the DOM to be ready before loading in JSON
document.addEventListener( "DOMContentLoaded", function( event ) {
  var getURL = "/wp-json/posts?filter[orderby]=date&filter[posts_per_page]=10";

  /*
   * Load in post content with $.getJSON()
   * Refer to the content as "posts" inside the $.getJSON call
   */
  $.getJSON( getURL ).done( function( posts ) {

    var articleSection = document.getElementById( "all-articles" ),
        articlePost = document.createElement( "article" ),
        articleTitle = document.createElement( "h1" ),
        articleExcerpt = document.createElement( "p" );
        
  });

}); // end addEventListener call