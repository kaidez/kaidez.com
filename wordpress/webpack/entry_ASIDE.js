/**
 * entry_SHARING.js
 *
 * Module for loading styles/scripts loading related to the loading in
 * the aside/footer content via AJAX
 *
 */

var $ = require( "jquery" ), // require jQuery
    q = require( "Q" ), // require the Q Promise library
    enquire = require("enquire.js"); // require.js media query library
    

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

// getSidebar(): loads sidebar on all pages using enquire.js
function getSidebar() {

  // Variable reference to the footer content that gets AJAX'ed in
  var getAside = "/wp-content/themes/kaidez-swiss/js/aside-code.html";

  // Set a base media query value that enquire.js always checks
  enquire.register( "(min-width: 768px)", {

    // On pageload, load in content via AJAX just once & hide it
    setup : function() {

      $( "#aside-id" ).load( getAside ).addClass( "aside-hide" );
      
    },

    /*
     * If the viewport matches the base media query value, toggle
     * show/hide so the <aside> is SHOWN
     */
    match : function() {
      
      $( "#aside-id" )
        .addClass( "aside-show" )
        .removeClass( "aside-hide" );
          
    },

    /*
     * If the viewport matches the base media query value, toggle
     * show/hide so the <aside> is HIDDEN
     */
    unmatch : function() {

      $( "#aside-id" )
        .addClass( "aside-hide" )
        .removeClass( "aside-show" );
      
    }

  });

}