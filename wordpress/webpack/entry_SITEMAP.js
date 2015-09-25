/**
 * entry_SITEMAP.js
 *
 * Module for loading styles and scripts related to the Site Map
 *
 */

var $ = require( "jquery" ); // require jQuery

// Wait for the DOM to be ready before loading in JSON
document.addEventListener( "DOMContentLoaded", function( event ) {

  var getPosts = "/wp-json/posts", // post data
      getPages = "/wp-json/pages"; // page data

  getSitemapData( getPosts );
  getSitemapData( getPages );

}); // end addEventListener


function getSitemapData( getdata ) {
  /*
   * Load in post content data with $.getJSON()
   * Refer to this data as "data" inside the $.getJSON call
   */
  $.getJSON( getdata ).done( function( data ) {
    
    var getLink,
        getTitle;

    for( var dataKey in data ) {

      
      // Run hasOwnPropertyCheck for the for..in loop
      if( data.hasOwnProperty( dataKey ) ) {

        getTitle = data[dataKey].title; // Get post/page title
        getLink = data[dataKey].link; // Get post/page link
        console.log(getTitle);
        console.log(getLink);
      } //End "for...in" loop's hasOwnProperty() check

    } // End "for...in" LOOP 
      
  }); // end $.getJSON()
}
