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




/*
 * LOAD ADS
 * ====================================================================
 * This code loops through an object the "PostAds" module that
 * contains a listing of all the available ads. These ads appear at the
 * top of the posts, where text wraps around them. The key in each
 * post needs to match the ID of an element already on the page and if
 * it does, the key's value is what gets load into this element
 */

/*
 * Use a for/in loop against the object in "PostAds"
 */
for ( key in PostAds ) {

  // Perform a standard hasOwnProperty check against the object
  if( PostAds.hasOwnProperty( key ) ) {

    var targetElement = document.getElementById( key );

    if( !targetElement ) {
      null;
    } else {
      targetElement.innerHTML = PostAds[key];
    }

  } // end the hasOwnProperty check

} // end the for/in loop