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

  getSitemapData( getPosts, "posts" );
  getSitemapData( getPages, "pages" );

}); // end addEventListener


function getSitemapData( getdata, linkElement ) {
  /*
   * Load in post content data with $.getJSON()
   * Refer to this data as "data" inside the $.getJSON call
   */
  $.getJSON( getdata ).done( function( data ) {

    for( var dataKey in data ) {

      // Run hasOwnPropertyCheck for the for..in loop
      if( data.hasOwnProperty( dataKey ) ) {

        var
            // Get post/page link
            getLink = data[dataKey].link;

            // Get post/page title
            getTitle = data[dataKey].title;

            // create an <a> tag for the sitemap link
            sitemapLink = document.createElement( "a" );

            // create a <p> tag for the sitemap link
            sitemapLinkParagragh = document.createElement( "p" );

            // create a <p> tag for the sitemap link 
            targetElement = document.getElementById( linkElement );

            // create a document fragment tag for the sitemap link
            docFrag = document.createDocumentFragment();

            if( getTitle !== "Front Page" && getTitle !== "Site Map" )   {

              sitemapLink.setAttribute( "href", getLink );
              sitemapLink.innerHTML = getTitle;

              sitemapLinkParagragh.appendChild( sitemapLink );
              docFrag.appendChild( sitemapLinkParagragh );
            }

      } // end "for...in" loop's hasOwnProperty() check

      /*
       * Load the full document fragment in to the element defined by
       * the targetElement
       */
      targetElement.appendChild( docFrag );

    } // end "for...in" LOOP 
      
  }); // end $.getJSON()
}
