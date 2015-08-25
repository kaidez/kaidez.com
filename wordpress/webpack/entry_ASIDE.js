/**
 * entry_SHARING.js
 *
 * Module for loading styles/scripts loading related to the loading in
 * the aside/footer content via AJAX
 *
 */

var $ = require( "jquery" ), // require jQuery
    q = require( "Q" ), // require the Q Promise library
    enquire = require("enquire.js"); // enquire.js media query library
    
require("./posts.scss");

// Load <aside>-specific CSS, which is preprocessed out with SASS.

// Variable reference to the footer content that gets AJAX'ed in
var getAside = "/wp-content/themes/kaidez-swiss/js/aside-code.html";

// Wait for the DOM to be ready before loading content
$("#load-footer-btn").click( function( event ) {

  event.preventDefault();
  $( this ).hide();




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
  
    // Define the state of the sidebar, saying it's visible
    $("body").addClass( "isSidebar" );

    // Load footer content via AJAX and make sure it's visible
    $( "#aside-footer" ).load( getAside );
    document.getElementById("aside-footer").style.display = "block";

  }, function ( xhr ) {

    // If the Promise fails, send a certain console message
   console.log( "The aside failed to load...you may needs refresh the page." );
  });

});


// An IIFE that loads sidebar using enquire.js to check certain states
(function(){

  $( ".loading" ).remove();

  // Set a base media query value that enquire.js always checks
  enquire.register( "(min-width: 768px)", {

    // Do nothing on pageload...for now
    setup : function() {},

    /*
     * If the viewport matches the base media query value, toggle
     * load the aside/footer content
     */
    match : function() {
      
      $( "#aside-footer" ).load( getAside );
          
    },

    /*
     * If the viewport does NOT match the base media query value,
     * check to see if <body> has the "isSidebar" class. If it does
     * NOT, it means that "click to see the footer content" element
     * hasn't been clicked on to show the sidebar. So let's assume
     * that it should remain hidden.  
     */
    unmatch : function() {
      
      var sidebarIsVisible = $( "body" ).hasClass( "isSidebar" );
      if( !sidebarIsVisible ) {
        document.getElementById("aside-footer").style.display = "none";
      }
      
    }

  });

})();