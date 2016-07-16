var getPostTitle = document.getElementById("blog-post-title").innerHTML,
  linkElement = document.getElementById("tweet-this-post");

$(linkElement).click(function(event){

  event.preventDefault();

  var tweetedLink,
  		windowOriginLink = window.location.origin + window.location.pathname,
  		oldLink = window.location.protocol + "//" + window.location.host + window.location.pathname;

  if(!window.location.origin) {
  	tweetedLink = oldLink;
  } else {
  	tweetedLink = windowOriginLink;
  }

  window.open("http://twitter.com/intent/tweet?url=" + tweetedLink + "&text=" + getPostTitle + "&via=kaidez&", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0");

});