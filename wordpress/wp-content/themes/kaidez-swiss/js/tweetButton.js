// Based on cool-ass code at http://gpiot.com/blog/elegant-twitter-share-button-and-dialog-with-jquery/

// Cool Regex code:
// http://stackoverflow.com/questions/4058923/get-all-characters-after-character
// http://stackoverflow.com/questions/3780696/javascript-string-replace-with-regex-to-strip-off-illegal-characters


var linkElement = document.getElementById( "tweet-this-post" );

$( linkElement ).on( "click", function( event ){

  // Bind jQuery.click() to the Tweet link
  event.preventDefault();
  
  var getPostTitle = document.getElementById( "blog-post-title" ).innerHTML,
      getPostLink = window.location.href,
      cleanLink = getPostLink.replace( /[^/]*$/g, "" ),
      tweetedLink;

  linkElement.setAttribute( "href", cleanLink );

  tweetedLink = this.getAttribute( "href" );

  window.open( "http://twitter.com/intent/tweet?url=" + tweetedLink + "&text=" + getPostTitle + "&via=kaidez&", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0" );

});