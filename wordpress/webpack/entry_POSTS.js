/**
 * entry_POSTS.js
 *
 * Module for loading styles and scripts related to single posts only
 *
 */

var $ = require( "jquery" ), // require jQuery
    PostAds = require( "./config/postAds" ); // require ads


/*
 * Dynamically position the first paragraph in a single post
 * ====================================================================
 */

// Store a reference to the "view the demo" btn that may be on the page
 var getDemoButton = document.querySelector( ".demo-link" );

/*
 * Pages with demo buttons are in the first <p> of a post page content
 * element, which is ".entry-content". They throw off ad alignment so
 * check to see if a post as this button and if it does, use jQuery to
 * add styling that prevents the "throwing off"
 */
if ( getDemoButton ) {
  $( ".entry-content p" ).first().css( "display", "inline-table" );
}