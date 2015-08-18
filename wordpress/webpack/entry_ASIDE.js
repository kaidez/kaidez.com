/**
 * entry_SHARING.js
 *
 * Module for loading styles and scripts related to single posts only
 *
 */

var $ = require( "jquery" ), // require jQuery
    q = require( "Q" ), // require the Q Promise library
    enquire = require( "enquire.js" ); // require the Q Promise library

// Wait for the DOM to be ready before loading content
document.addEventListener( "DOMContentLoaded", function( event ) {

  var getAside = "/wp-content/themes/kaidez-swiss/js/aside-code.html";

  return q( $.ajax({
    url: getAside, 
    type: "GET"
  })).then(function(){
    $( ".loading" ).remove();
  }, function ( xhr ) {
    // If the Promise fails, send a certain console message
   console.log( "The aside failed to load...you may needs refresh the page." );
  });
});