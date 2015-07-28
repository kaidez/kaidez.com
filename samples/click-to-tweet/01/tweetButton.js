(function(){

  var getPostTitle = document.getElementById( "blog-post-title" ).innerHTML,
      linkElement = document.getElementById( "tweet-this-post" ),
      getPostLink = window.location.href;

  linkElement.setAttribute( "href", getPostLink );

  $( linkElement ).on( "click", function( event ){

    event.preventDefault();

    var tweetedLink = this.getAttribute( "href" );

    window.open( "http://twitter.com/intent/tweet?url=" + tweetedLink + "&text=" + getPostTitle + "&via=kaidez&", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0" );

  });

})();