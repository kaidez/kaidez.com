// Based on cool-ass code at http://gpiot.com/blog/elegant-twitter-share-button-and-dialog-with-jquery/

// We bind a new event to our link
$("#tweet-this-post").click(function(e){

  //We tell our browser not to follow that link
  e.preventDefault();

  var getPostTitle = document.getElementById('blog-post-title').innerHTML,
    getPostLink = window.location.href;

  //Trigger a new window with the Twitter dialog
  window.open('http://twitter.com/share?url=' + getPostLink + '&text=' + getPostTitle + '&', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');

});