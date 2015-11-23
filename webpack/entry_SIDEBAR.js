/**
 * entry_SIDEBAR.js
 *
 * Module for loading styles/scripts loading related to the loading in
 * the sidebar content via AJAX
 *
 */

var $ = require( "jquery" ), // require jQuery
    enquire = require( "enquire.js" ); // enquire media query library

// Wait for the DOM to be ready before loading content
document.addEventListener("DOMContentLoaded", function( event ) {

  // Variable reference to the sidebar content that gets AJAX'ed in
  var getSidebar = "/wp-content/themes/kaidez-swiss/js/sidebar-code.html";

  // Set a base media query value that enquire.js always checks
  enquire.register( "(min-width: 992px)", {

    // Do nothing on pageload...for now
    setup : function() {},

    /*
     * If the viewport matches the base media query value, toggle
     * load the aside/footer content
     */
    match : function() {
      
      $( "#sidebar" ).load( getSidebar );
      document.getElementById("sidebar").style.display = "block";
          
    },

    /*
     * If the viewport does NOT match the base media query value,
     * hide the sidebar.  
     */
    unmatch : function() {
      
      document.getElementById("sidebar").style.display = "none";

    }

  });

});