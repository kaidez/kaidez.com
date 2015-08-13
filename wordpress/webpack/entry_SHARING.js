/**
 * entry_SHARING.js
 *
 * Module for loading styles and scripts related to single posts only
 *
 */

 var $ = require( "jquery" ), // require jQuery
     Q = require( "Q" ); // require the Q Promise library

// Load in asynchronous code for Facebook and Google+ sharing
require("./config/async-sharing");

/* Load in styles related to single posts only
 * "posts.less" contains styles for all posts
 * "prism-styles.css" is only for posts with code samples
 *
 * TODO: see if there's away to distinguish posts without code samples,
 * then have "prism-styles.css" just load onto those pages 
 */
require( "./posts.less" );
require("./config/prism-styles.css");

// Set a 
var getPostTitle = document.getElementById( "blog-post-title" ).innerHTML,
    getPostLink = window.location.href,
    cleanLink = getPostLink.replace( /[^/]*$/g, "" );


// START FACEBOOK & GOOGLE+ SHARING CODE

document.addEventListener("DOMContentLoaded", function(event) {

  var getData = "/wp-content/themes/kaidez-swiss/js/sharing-code.html";

  return Q($.ajax({
    url: getData, 
    type: "GET"
   })).then(function (data) {

    $(".rp4wp-related-posts").before( data );
    
    var linkElement = document.getElementById( "tweet-this-post" ),
        socialSiteLinks;

    linkElement.setAttribute( "href", cleanLink );

    socialSiteLinks = {
      "facebook" : {
        "getLink": "facebook-share-link",
        "linkHandle": "http://www.facebook.com/sharer.php?u="
      },
      "googlePlus": {
        "getLink": "googleplus-share-link",
        "linkHandle": "https://plus.google.com/share?url="
      } 
    };

    Object.getOwnPropertyNames( socialSiteLinks ).forEach(function( value ) {
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
  }, function (xhr) {
   console.log("The social sharing links failed to load...you may needs refresh the page.");
  });

});
// END FACEBOOK & GOOGLE+ SHARING CODE

// START "CLICK-TO-TWEET" CODE
// Bind jQuery.click() to the Tweet link
$( "body" ).delegate( "#tweet-this-post", "click", function( event ){
  event.preventDefault();
  
  var tweetedLink = this.getAttribute( "href" );

  window.open( "http://twitter.com/intent/tweet?url=" + tweetedLink + "&text=" + getPostTitle + "&via=kaidez&", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0" );

});
// END "CLICK-TO-TWEET" CODE