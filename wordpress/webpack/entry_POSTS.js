var $ = require("jquery"),
    prism = require("./config/prism"),
    sharin = require("./config/async-sharing"),
    comment = require("./config/comment-reply");

// Require styles related to single posts ONLY!!!!
require( "style!css!./posts.css" ); 


// START "CLICK-TO-TWEET" CODE

var linkElement = document.getElementById( "tweet-this-post" ),
    getPostLink = window.location.href;

// Bind jQuery.click() to the Tweet link
$( linkElement ).on( "click", function( event ){
  event.preventDefault();
  
  var getPostTitle = document.getElementById( "blog-post-title" ).innerHTML,
      // getPostLink = window.location.href,
      cleanLink = getPostLink.replace( /[^/]*$/g, "" ),
      tweetedLink;

  linkElement.setAttribute( "href", cleanLink );

  tweetedLink = this.getAttribute( "href" );

  window.open( "http://twitter.com/intent/tweet?url=" + tweetedLink + "&text=" + getPostTitle + "&via=kaidez&", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0" );

});
// END "CLICK-TO-TWEET" CODE



// START FACEBOOK & GOOGLE+ SHARING CODE

document.addEventListener("DOMContentLoaded", function(event) {

  var socialSiteLinks = {
    "facebook" : "facebook-share-link",
    "googlePlus": "googleplus-share-link" 
  },
  linkId;

  Object.getOwnPropertyNames( socialSiteLinks ).forEach(function( value ) {
    linkId = socialSiteLinks[value];
    console.log( getPostLink );
    var pageElement = document.getElementById( linkId );
  });

});
// END FACEBOOK & GOOGLE+ SHARING CODE