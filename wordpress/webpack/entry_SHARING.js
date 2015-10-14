/**
 * entry_SHARING.js
 *
 * Module for loading styles and scripts related to single posts only
 *
 */

var $ = require( "jquery" ), // require jQuery
    q = require( "Q" ); // require the Q Promise library

require("./posts.scss");


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

// Wait for the DOM to be ready before loading content
document.addEventListener( "DOMContentLoaded", function( event ) {

  // Set a reference for the sharing element
  var getSharingModule = "/wp-content/themes/kaidez-swiss/js/sharing-code.html";

  /*
   * kaidez.com uses jQuery 2.1.4, which use Promises that don't
   * conform to the Promises/A+ spec. wrap it in a Q return makes
   * jQuery spec-complaint. Note that Promises in jQuery 3.x are
   * Promises/A+ compliant.
   */
  return q( $.ajax({
    // Load in the sharing module
    url: getSharingModule, 
    type: "GET"

  // Do things after the Promise resolves
  })).then( function ( data ) {

    loadSharingAd(); 

    // Load sharing element above the "more posts like this" section
    $( ".rp4wp-related-posts" ).before( data );
    
    // Reference the Twitter link that's on the web page by this point
    var linkElement = document.getElementById( "tweet-this-post" );

    // Set the Twitter links href attribute to be the cleaned up URL
    linkElement.setAttribute( "href", cleanLink );

    /*
     * Object that contains properties for the Facebook & Google+ links
     * These links are already on the web page at this point
     * "getLink" is the id of the link already on the page
     */
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

      /*
       * Do the following on each loop iteration:
       *
       * -get object's "getLink" property & store it in linkId var
       * -get object's "linkHandle" property & store it in pageLink var
       * -let the "getLink" property be the id of the button
       */
      var linkId = socialSiteLinks[value].getLink,
          pageLink = socialSiteLinks[value].linkHandle,
          pageElement = document.getElementById( linkId );

      // Set the "title" property of the link to be the blog post title
      pageElement.setAttribute( "title", getPostTitle );
      
      // Let the href property look one way for FB and another for G+
      if( linkId === "facebook-share-link" ) {
        pageElement.setAttribute( "href", pageLink + getPostLink + "&t=" + getPostTitle );  
      } else {
        pageElement.setAttribute( "href", pageLink + getPostLink );  
      }

    }); 
  }, function ( xhr ) {
    // If the Promise fails, send a certain console message
    console.log( "The social sharing links failed to load...you may needs refresh the page." );
  });

}); // end "document.addEventListener()"



// Start loading the big WP ad by the sharing code
// Need an enquire function...can I start making a reusable one?
function loadSharingAd() {
  var sharingAdCode = $( "#sharing-ad" );
}

// END LOAD & CONFIGURE SOCIAL SHARING ELEMENT FOR SINGLE POSTS


/*
 * START CLICK-TO-TWEET CODE
 * ====================================================================
 * 
 * If the "click-to-tweet" link is clicked, create a pop-up interface
 * for Tweeting out the link.
 */

/*
 * The "click-to-tweet" link is not on the page on initial page load,
 * so $.click() wont work on it. Instead, use $.delegate() to bind a
 * click event to the link.
 * Based on cool-ass code at:
 * http://gpiot.com/blog/elegant-twitter-share-button-and-dialog-with-jquery/
 * Cool Regex code:
 * http://stackoverflow.com/questions/4058923/get-all-characters-after-character
 * http://stackoverflow.com/questions/3780696/javascript-string-replace-with-regex-to-strip-off-illegal-characters
 */
$( "body" ).delegate( "#tweet-this-post", "click", function( event ){
  
  // Don't load the link in the address bar when clicked.
  event.preventDefault();
  
  // Grab the "click-to-tweet" link's "href" attribute when clicked.
  var tweetedLink = this.getAttribute( "href" );

  /*
   * Open the popup window and setup the Tweet-out interface. A link
   * needs to be built out that contains both the "click-to-tweet"
   * link's "href" attribute and the title of the blog post. The
   * latter is stored in the "getPostTitle" variable.
   */
  window.open( "http://twitter.com/intent/tweet?url=" + tweetedLink + "&text=" + getPostTitle + "&via=kaidez&", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0" );

});
// END CLICK-TO-TWEET CODE