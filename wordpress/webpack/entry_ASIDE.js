/**
 * entry_SHARING.js
 *
 * Module for loading styles/scripts loading related to the loading in
 * the aside/footer content via AJAX
 *
 */

var $ = require( "jquery" ), // require jQuery
    q = require( "Q" ), // require the Q Promise library
    enquire = require("enquire.js"), // require.js media query library
    getAside = "/wp-content/themes/kaidez-swiss/js/aside-code.html";

// Load <aside>-specific CSS, which is preprocessed out with SASS.
require("./config/aside.scss");

// Wait for the DOM to be ready before loading content
document.addEventListener( "DOMContentLoaded", function( event ) {

  /*
   * kaidez.com uses jQuery 2.1.4, which use Promises that don't
   * conform to the Promises/A+ spec. wrap it in a Q return makes
   * jQuery spec-complaint. Note that Promises in jQuery 3.x are
   * Promises/A+ compliant.
   */

  /*
   * Remove the AJAX-y animated .gif that's already on the page, then
   * return a Promise
   */
  return q( $( ".loading" ).remove() )
  .then(function(){
    
    // Run "getSidebar()", which loads the footer content
    getSidebar();
  }, function ( xhr ) {
    
    // If the Promise fails, send a certain console message
   console.log( "The aside failed to load...you may needs refresh the page." );
  });

});

function getSidebar() {

  enquire.register( "(min-width: 768px)", {

    setup : function() {

      // Load in content via AJAX (just the once)
      $( "#aside-id" ).load( getAside ).addClass( "aside-hide" );
      
    },

    match : function() {
      
      // Show sidebar
      $( "#aside-id" )
        .addClass( "aside-show" )
        .removeClass( "aside-hide" );
          
    },

    unmatch : function() {
      
      // Hide sidebar
      $( "#aside-id" )
        .addClass( "aside-hide" )
        .removeClass( "aside-show" );
      
    }

  });

}