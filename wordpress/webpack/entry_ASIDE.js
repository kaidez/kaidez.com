/**
 * entry_SHARING.js
 *
 * Module for loading styles and scripts related to single posts only
 *
 */

var $ = require( "jquery" ), // require jQuery
    q = require( "Q" ), // require the Q Promise library
    enquire = require("enquire.js"), // require.js media query library
    getAside = "/wp-content/themes/kaidez-swiss/js/aside-code.html";

require("./config/aside.scss");

// Wait for the DOM to be ready before loading content
document.addEventListener( "DOMContentLoaded", function( event ) {

  return q( $( ".loading" ).remove() )
  .then(function(){
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
      $( "#aside-id" ).load( getAside ).addClass( "aside-hide" )
      
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


