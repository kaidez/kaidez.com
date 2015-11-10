(function(){

  var linkElement = document.getElementById( "tweet-this-post" ),
      getPostTitle = document.getElementById( "blog-post-title" ).innerHTML,
      getPostLink = window.location.href,
      cleanLink = getPostLink.replace( /[^/]*$/g, "" );
  
  linkElement.setAttribute( "href", cleanLink );

  $( linkElement ).on( "click", function( event ){

    event.preventDefault();

    var tweetedLink = this.getAttribute( "href" );

    window.open( "http://twitter.com/intent/tweet?url=" + tweetedLink + "&text=" + getPostTitle + "&via=kaidez&", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0" );

  });

})();