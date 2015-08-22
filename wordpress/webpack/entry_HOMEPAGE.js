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

  /*
   * Load in post content with $.getJSON()
   * Refer to the post content as "posts" inside the $.getJSON call
   */
  $.getJSON( "/wp-json/posts" ).done( function( posts ) {
    console.log( posts[0].excerpt );
  });

}); // end addEventListener call