/**
 * entry_SHARING.js
 *
 * Module for loading styles and scripts related to single posts only
 *
 */

var $ = require( "jquery" ), // require jQuery
    q = require( "Q" ); // require the Q Promise library

// Load in asynchronous code for Facebook and Google+ sharing
require("./config/async-sharing");

/* Load in styles related to single posts only
 * "posts.less" contains styles for all posts
 * "prism-styles.css" is only for posts with code samples
 *
 * TODO: see if posts without code samples can be recognized,
 * then have "prism-styles.css" load onto JUST those pages 
 */
require( "./posts.less" );
require( "./config/prism-styles.css" );

// Set a reference for the copy blog post's title currently on the page
var getPostTitle = document.getElementById( "blog-post-title" ).innerHTML,

    // Set a reference for the URL currently in the address bar
    getPostLink = window.location.href,

    /*
     * Remove any characters that come after the URL's last slash
     * UTM code, in-page anchor links, etc.
     */
    cleanLink = getPostLink.replace( /[^/]*$/g, "" );


/*
 * LOAD & CONFIGURE SOCIAL SHARING ELEMENT FOR SINGLE POSTS
 * ====================================================================
 * 
 * Once all content has been completely loaded and parsed in the DOM,
 * the social sharing element loads via an AJAX call wrapped in a Q
 * Promise. Once the Promise resolves, the element is placed above the
 * "more posts like this" section (the $( ".rp4wp-related-posts" ) 
 * element) and sharing elements are constructed on the page from
 * there.
 */

// Wait for the DOM to be ready to co
document.addEventListener( "DOMContentLoaded", function( event ) {

  // Set a reference for the sharing element
  var getData = "/wp-content/themes/kaidez-swiss/js/sharing-code.html";

  /*
   * kaidez.com uses jQuery 2.1.4, which use Promises that don't
   * conform to the Promises/A+ spec. wrap it in a Q return makes
   * jQuery spec-complaint. Note that Promises in jQuery 3.x are
   * Promises/A+ compliant.
   */
  return q( $.ajax({
    url: getData, 
    type: "GET"

  // Do things after the Promise resolves
  })).then( function ( data ) {

    // Load sharing element above the "more posts like this" section
    $( ".rp4wp-related-posts" ).before( data );
    
    // Reference the Twitter link that's on the web page by this point
    var linkElement = document.getElementById( "tweet-this-post" );

    // Set the Twitter links href attribute to be the cleaned up URL
    linkElement.setAttribute( "href", cleanLink );


    // Object that contains properties for the Facebook & Google+ links
    var socialSiteLinks = {
      "facebook" : {
        "getLink": "facebook-share-link",
        "linkHandle": "http://www.facebook.com/sharer.php?u="
      },
      "googlePlus": {
        "getLink": "googleplus-share-link",
        "linkHandle": "https://plus.google.com/share?url="
      } 
    };

    // Loop through object with the ES5 {}.getOwnPropertyNames() method
    Object.getOwnPropertyNames( socialSiteLinks ).forEach( function( value ) {
      var linkId = socialSiteLinks[value].getLink,
          pageLink = socialSiteLinks[value].linkHandle,
          pageElement = document.getElementById( linkId );

      pageElement.setAttribute( "title", getPostTitle );
      
      if( linkId === "facebook-share-link" ) {
        pageElement.setAttribute( "href", pageLink + getPostLink + "&t=" + getPostTitle );  
      } else {
        pageElement.setAttribute( "href", pageLink + getPostLink );  
      }
    }); 
  }, function ( xhr ) {
   console.log("The social sharing links failed to load...you may needs refresh the page.");
  });

}); // end "document.addEventListener()"

// END LOAD & CONFIGURE SOCIAL SHARING ELEMENT FOR SINGLE POSTS



// START "CLICK-TO-TWEET" CODE
$( "body" ).delegate( "#tweet-this-post", "click", function( event ){
  
  event.preventDefault();
  
  var tweetedLink = this.getAttribute( "href" );

  window.open( "http://twitter.com/intent/tweet?url=" + tweetedLink + "&text=" + getPostTitle + "&via=kaidez&", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0" );

});
// END "CLICK-TO-TWEET" CODE