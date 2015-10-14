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

enquire.register( "only screen and (min-width: 768px)", {

  setup : function() {
    var targetElement;
  },

  match : function() {
    
    /*
     * Use a for/in loop against the object in "PostAds"
     */
    for ( key in PostAds ) {

      // Perform a standard hasOwnProperty() check against the object
      if( PostAds.hasOwnProperty( key ) ) {

        targetElement = document.getElementById( key );        

          // If the target element doesn't exist, return null
          if( !targetElement ) {
            null;
          } else {
            // If it does, load the ad into the target element
            targetElement.innerHTML = PostAds[key];
            
            /*
             * A "return this" needs to happen to get this code to
             * work. Why? I don't know.
             */
            return this;
          }

      } // end the hasOwnProperty() check

    } // end the for/in loop

  },

  unmatch : function() {
    targetElement.innerHTML = "";
  }

});});