var $ = require("jquery"),
    prism = require("./config/prism"),
    sharin = require("./config/async-sharing"),
    comment = require("./config/comment-reply");

// Require styles related to single posts ONLY!!!!
require( "style!css!./posts.css" ); 


// START "CLICK-TO-TWEET" CODE

var linkElement = document.getElementById( "tweet-this-post" ),
    getPostLink = window.location.href,
    getPostTitle = document.getElementById( "blog-post-title" ).innerHTML;

// Bind jQuery.click() to the Tweet link
$( linkElement ).on( "click", function( event ){
  event.preventDefault();
  
  // getPostLink = window.location.href,
  var cleanLink = getPostLink.replace( /[^/]*$/g, "" ),
      tweetedLink;

  linkElement.setAttribute( "href", cleanLink );

  tweetedLink = this.getAttribute( "href" );

  window.open( "http://twitter.com/intent/tweet?url=" + tweetedLink + "&text=" + getPostTitle + "&via=kaidez&", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0" );

});
// END "CLICK-TO-TWEET" CODE



// START FACEBOOK & GOOGLE+ SHARING CODE

document.addEventListener("DOMContentLoaded", function(event) {

  var socialSiteLinks = {
    "facebook" : {
      "getLink": "facebook-share-link",
      "linkHandle": "http://www.facebook.com/sharer.php?u="
    },
    "googlePlus": {
      "getLink": "googleplus-share-link",
      "linkHandle": "https://plus.google.com/share?url="
    } 
  },
    linkId,
    pageLink,
    pageElement;

  Object.getOwnPropertyNames( socialSiteLinks ).forEach(function( value ) {

    linkId = socialSiteLinks[value].getLink;
    pageLink = socialSiteLinks[value].linkHandle;
    pageElement = document.getElementById( linkId );
    pageElement.setAttribute( "title", getPostTitle );

    if( linkId === "facebook-share-link" ) {
      pageElement.setAttribute( "href", pageLink + getPostLink + "&t=" + getPostTitle );  
    } else {
      pageElement.setAttribute( "href", pageLink + getPostLink );  
    }
  });

});
// END FACEBOOK & GOOGLE+ SHARING CODE