/**
 * entry_HOMEPAGE.js
 *
 * Module for loading styles and scripts related to the home page only
 *
 */

var $ = require( "jquery" ), // require jQuery
    q = require( "Q" ); // require the Q Promise library

document.addEventListener( "DOMContentLoaded", function( event ) {

  $.getJSON( "/wp-json", function( data ) {
    console.log("getting!");
  }).then(function(){
    console.log("got it!");
  });

}); // end addEventListener call

