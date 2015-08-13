var $ = require("jquery"),
    Q = require("Q");

// Loads in async sharing code for Facebook & Google+
require("./config/async-sharing");


// Require styles related to single posts ONLY!!!!
// Loads in via the "loader" module in webpack.config.js
require( "./posts.less" );
require("./config/prism-styles.css");


var getPostTitle = document.getElementById( "blog-post-title" ).innerHTML;
// START FACEBOOK & GOOGLE+ SHARING CODE

document.addEventListener("DOMContentLoaded", function(event) {

  var getData = "/wp-content/themes/kaidez-swiss/js/sharing-code.html";

  return Q($.ajax({
    url: getData, 
    type: "GET"
   })).then(function (data) {

    $(".rp4wp-related-posts").before( data );
    
    var linkElement = document.getElementById( "tweet-this-post" ),
        getPostLink = window.location.href,
        cleanLink = getPostLink.replace( /[^/]*$/g, "" ),
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