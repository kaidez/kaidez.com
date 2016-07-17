var getPostTitle = document.getElementById("blog-post-title").innerHTML,
  linkElement = document.getElementById("tweet-this-post");

$(linkElement).click(function(event){

  event.preventDefault();

  var tweetedLink;

  if(!window.location.origin) {
  	tweetedLink = window.location.protocol + "//" + window.location.hostname + window.location.pathname;
  } else {
  	tweetedLink = window.location.origin + window.location.pathname;
  }

  window.open("http://twitter.com/intent/tweet?url=" + tweetedLink + "&text=" + getPostTitle + "&via=kaidez&", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0");

});