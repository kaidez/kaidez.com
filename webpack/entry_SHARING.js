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
var getPostTitle = document.getElementById( "blog-post-title" ).innerHTML;



/*
 * "getSharingElements()"
 * LOAD/CONFIGURE SOCIAL SHARING ELEMENT FOR SINGLE POSTS
 * ====================================================================
 *
 * Load the social sharing element loads via an AJAX call wrapped in a
 * Q Promise. Once the Promise resolves, the element is placed above
 * the "more posts like this" section (the $( ".rp4wp-related-posts" )
 * element) and sharing elements are constructed on the page from
 * there. This function will run in the "DOMContentLoaded" element
 * below it.
 */
function getSharingElements() {

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
} // end "getSharingElements()"


/* Single posts have a "sharing buttons" component at the bottom of
 * the article text. This isn't needed right away because people
 * (probably) won't share the article until they get to the end of it.
 * So if the DOM is done loading content, AJAX's this component into
 * its containing element already on the page, which is
 * ".rp4wp-related-posts". The buttons will load in when the window's
 * current top position is equal to 500 pixels less of whatever the
 * sharing containing element current top position is, which a little
 * before one gets to the end of the article.
 */

// Wait for the DOM to be done loading content before running code...
document.addEventListener( "DOMContentLoaded", function( event ) {

  "use strict";

  var

      // jQuery reference to the window object
      $window = $( window ),

      // The sharing button containing element's top position
      sharingElementTopPosition = $( ".rp4wp-related-posts" ).offset().top,

      // How much to subtract from the sharing element's top position
      reduceSharingElementTopPosition = 500;

  /*
   * Use jQuery.scroll() to do stuff as the browser window's top
   * position changes
   */
  $window.scroll( function(){
    // Start doing stuff...

    // Get the browser window's top position with jQuery.scrollTop()
    var windowTopPosition = $window.scrollTop();

    /*
     * Check if the window's current top position is greater than or
     * equal to 500 pixels LESS of whatever the sharing button
     * containing element's current top position is.
     */
    if( windowTopPosition >= sharingElementTopPosition - reduceSharingElementTopPosition ) {

      /*
       * If it is, AJAX the sharing buttons into the sharing button
       * containing element using the above-created
       * getSharingElements() function.
       */
      getSharingElements();

      /*
       * We're still watching window scrolling at this point, so the
       * sharing element will load in again and again if we keep
       * scrolling. Stop watching window scrolling with jQuery.off().
       */
      $window.off( "scroll" );
    }
  });

}); // end "document.addEventListener()"

// END LOAD & CONFIGURE SOCIAL SHARING ELEMENT FOR SINGLE POSTS




// Start loading the big WP ad by the sharing code
// Need an enquire function...can I start making a reusable one?
function loadSharingAd() {
  var sharingAdCode = $( "#sharing-ad" );
}







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
 */
$( "body" ).delegate( "#tweet-this-post", "click", function( event ){

  // Don't load the link in the address bar when clicked.
  event.preventDefault();

  // Grab the "click-to-tweet" link's "href" attribute when clicked.
  var tweetedLink = window.location.protocol + "//" + window.location.host + window.location.pathname;

  /*
   * Open the popup window and setup the Tweet-out interface. A link
   * needs to be built out that contains both the "click-to-tweet"
   * link's "href" attribute and the title of the blog post. The
   * latter is stored in the "getPostTitle" variable.
   */
  window.open( "http://twitter.com/intent/tweet?url=" + tweetedLink + "&text=" + getPostTitle + "&via=kaidez&", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0" );

});
// END CLICK-TO-TWEET CODE