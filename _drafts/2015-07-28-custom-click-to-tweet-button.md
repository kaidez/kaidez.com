---
title: "TUTORIAL: Create A Custom 'Click to Tweet' link with JavaScript"
comments: true
author: Kai Gittens
layout: post
meta-excerpt: "Create an optimized, dynamic Click to Tweet link with JavaScript. Includes a demo and code samples."
permalink: /click-to-tweet-link/
has-home-img: click-to-tweet.jpg
category: tutorial
cat-name: "Tutorials"
tags: [tutorials]
---
"Click to Tweet" links are a highly-recommended method for promoting your site's content. Placing a link at the end of your content that politely asks readers to Tweet it through their personal Twitter accounts has proven to be an effective way of spreading your message.

I'm redesigning my blog with WordPress at the time of this post and am adding this functionality to the new design. I want the code optimized to run as fast as possible, so I'm using JavaScript to create this functionality instead of depending on a WordPress plugin...yes, __this code can work outside of WordPress__.

<h2 style="clear:both;">Table of Contents</h2>

1. [Some Notes](#notes)
2. [How Is This Code Optimized?](#optimized)
3. [Build A Simple Click To Tweet Link](#simple-link)
4. [Review The HTML & CSS](#html-css)
5. [What About Complicated URLs?](#complicated-url)
6. [Clean Up The Link With A Regular Expression](#regex)
7. [BONUS: Add Twitter UTM Tracking](#utm-tracking)
8. [Conclusion](#conclusion)

<a name="notes"></a>
## Some Notes
If you follow along with this tutorial and create this code, it won't work unless it runs on some sort of web server setup. Getting this code to work properly requires loading the link you want to Tweet in a popup Twitter window...that won't happen if you just navigate to `index.html` from a web browser and then open it. So you'll need to either run the code on an actual website or simulate a web server on your local machine using something like [MAMP for Mac](https://www.mamp.info/ "Learn more about MAMP for Mac"), [WAMP for Windows](http://www.wampserver.com/ "Learn more about WAMP for Windows") or [XAMMP, which is cross-platform](https://www.apachefriends.org/index.html, "Learn more about XAMMP for Windows, Mac and Linux").

Because of how I build my blog posts, my final JS code required a regular expression. It's a simple one but it still may be too complex for your needs; therefore, you may want to go directly to [the part of the post with the simple Click to Tweet code](#simple-link). But I do suggest reading the whole tutorial at some point to learn some cool coding tricks.

Also, while this code can work *outside* of WordPress, it's meant to work dynamically. The Click to Tweet functionality discussed here uses JavaScript (and SOME jQuery) to find already-existing web page elements, add attributes to them and set up click events...very dynamic. If you want to hard-code a Click to Tweet link, I suggest reading [Guillaume Piot's excellent tutorial](http://gpiot.com/blog/elegant-twitter-share-button-and-dialog-with-jquery/ "Read Guillaume Piot's Click to Tweet tutorial"), which was the main source of inspiration for my code.

And I'm assuming that you'll be able to apply this Click to Tweet code to whatever you're using to create a site: WordPress, Drupal, Jekyll, etc. In the case of my WordPress site, I'll have to (at the bare minimum) create a custom `footer.php` file for use only on single posts to prevent certain errors on non-post pages. All this requires creating custom WordPress PHP code, which you may not want to do. If this describes your situation, you may want to just use a plugin like [Click To Tweet for WordPress](https://wordpress.org/plugins/click-to-tweet-by-todaymade/ "Review the Click To Tweet plugin for WordPress").

<a name="optimized"></a>
## How Is This Code Optimized?
There are two ways in which this code optimized to run as fast as possible:

1. __No need to use widgets.js:__ `widgets.js` is the core Twitter file for creating various kinds of Twitter buttons on a site. Not using it for this code means that my site will make one *less* server request.

2. __No need for plugins:__ No need for any jQuery plugins, WordPress plugins, Drupal plugins or whatever. This code creates a very small footprint.

<a name="html-css"></a>
## Review The HTML & CSS
The HTML and CSS for this is pretty basic.  Looking at the HTML first...

{% prism markup %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Click to Tweet Link - Sample 1</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Click to Tweet Link</h1>
  <h2 id="blog-post-title">Click to Tweet Link Tutorial - Sample 1</h2>

  <div>
    This is an example for building a really simple "Click To Tweet" link. Learn how to build it <a href="/click-to-tweet/">here</a>.
  </div>

  <div>
    <a id="tweet-this-post" class="tweet-post-class">would you like to tweet this page?</a>
  </div>

  <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
  <script src="tweetButton.js"></script>
</body>
</html>
{% endprism %}

There are two key page elements: the `<h2>` tag with an id of `blog-post-title` and the `<a>` tag with an id of `tweet-this-post`.

The `<h2>` represents this blog post's title. We'll use the copy inside this tag for the copy of our Tweet.

The `<a>` tag is our "Click to Tweet" link. We'll use JavaScript to bind functionality to the tag that builds our Tweet whenever it's clicked.

Then we're linking jQuery to our site and are also linking a file called `tweetButton.js`. This file will contain the Click to Tweet code and will be our main focus throughout this tutorial.

Then there's the CSS...
{% prism markup %}
body {
  font-family: Helvetica, Arial, sans-serif;
}

.tweet-post-class {
  display: block;
  height: auto;
  width: 280px;
  margin: 50px auto 0;
  padding: 10px;
  border-radius: 5px;

  background-color: #ED327F;
  text-align: center;
  cursor: pointer;
}

a.tweet-post-class{
  color:#fff;
  text-decoration:none
}

a.tweet-post-class:visited{
  color:#fff
}

a.tweet-post-class:active,
a.tweet-post-class:hover{
  color:#fff;
  background-color:#55acee
}
{% endprism %}

The Click to Tweet link is styled nicely, but there's not much else here.

<a name="simple-link"></a>
## Build A Simple Click To Tweet Link
Again, the final JavaScript code I'm using is a bit complex. There is a simple way to create this link that we'll look at first...it's based on the Guillaume Piot code mentioned above.

{% prism javascript %}
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
{% endprism %}

Breaking down the code...
{% prism javascript %}
(function(){
...
})();
{% endprism %}

All the code is wrapped in an [Immediately-Invoked Function Expression (IIFE)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/ "Learn more about Immediately-Invoked Function Expressions"), meaning it will run as soon as `tweetButton.js` loads in the browser.

{% prism javascript %}
var getPostTitle = document.getElementById( "blog-post-title" ).innerHTML,
    linkElement = document.getElementById( "tweet-this-post" ),
    getPostLink = window.location.href;
{% endprism %}

Three variables are defined in a single var pattern. Using the id attributes for bot the `<h2>` and `<a>` tags just discussed, we're referencing them inside the first two JavaScript variables called `getPostTitle` and `linkElement`.

The third variable, `getPostLink`, stores whatever URL is in the browser's address bar on page-load.
{% prism javascript %}
linkElement.setAttribute( "href", getPostLink );
{% endprism %}

Find the `<a>` tag (referenced by the `linkElement` variable) and set its `href` attribute. This attribute's value will be `getPostLink` which is the URL in the address bar we just grabbed.

At this point, the code for the Click to Tweet already on the web page has been updated to look like this:
{% prism markup %}
<!-- An 'href' value has been added -->
<a id="tweet-this-post" class="tweet-post-class" href="http://kaidez.com/samples/click-to-tweet/01/">would you like to tweet this page?</a>
{% endprism %}

Looking at the rest of the JavaScript...
{% prism javascript %}
$( linkElement ).on( "click", function( event ){
  event.preventDefault();
  ...
})();
{% endprism %}

Once the IIFE runs, we're using `jQuery.on()` to bind click functionality to `linkElement`, which is how our code references the `<a>` tag. That tag will eventually contain a link, meaning that end-users will be forwarded to that link if it's clicked.

Because of how our code needs to work, we need to stop that forwarding. We do this by passing an `event` parameter to the function, then run `event.preventDefault()` inside the `jQuery.on()` method.

{% prism javascript %}
var tweetedLink = this.getAttribute( "href" );

window.open( "http://twitter.com/intent/tweet?url=" + tweetedLink + "&text=" + getPostTitle + "&via=kaidez&", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0" );
{% endprism %}

When the link is clicked, it will get whatever the value is of its `href` attribute and store it in a variable called `tweetedLink`. The click also opens a popup window with a URL built with [Twitter Web Intents](https://dev.twitter.com/web/intents#retweet-intent "Learn more about Twitter Web intents") which, as per its documentation, "provide[s] popup-optimized flows for working with Tweets & Twitter Users: Tweet, Reply, Retweet, Favorite, and Follow."

There's a lot of things built into this URL, all coming after the query string (`?`). The three main things are:

1. The `url=" + tweetedLink"` value that comes at the start of the query string. Here, the `tweetedLink` variable containing the `href` value of our Click to Tweet is built into the URL.

2. The `"&text=" + getPostTitle` value that comes next. Here, the `getPostTitle` variable we defined at the top of our code is also built into the URL and, again, it stores the name of our blog post.

3. The `&via=kaidez` value that come next. Setting `via` equal to your Twitter handle (or mine in this example) means that the handle will be passed into the Tweet.

In the rest of the URL, the `twitterwindow` value just creates the popup window with Twitter branding. It then sets its height and width and builds the window without a toolbar, address (location) bar, menu bar, bookmark bar and scrollbar.

The `url`, `text` and `via` values are optional. But if you give them values then, using this section's demo code as an example, the popup will look similar to this:

<div style="margin:0 auto; max-width: 700px;">
  <img src="/img/click-to-tweet-sample-01.jpg" class="imgBorder" alt="sample of a Tweet Box" />
</div>

As mentioned above, this implementation is simple enough to work on your site. But my site had functionality that required a more complex code structure.
<a name="complicated-url"></a>
## What About Complicated URLs?

<a name="regex"></a>
## Clean Up The Link With A Regular Expression

<a name="utm-tracking"></a>
## BONUS: Add Twitter UTM Tracking

<a name="conclusion"></a>
## Conclusion