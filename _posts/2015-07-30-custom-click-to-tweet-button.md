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
"Click to Tweet" links are a highly-recommended way of promoting your site content. Politely asking readers to Tweet the content through their personal Twitter accounts often leads to them doing so when you give them an easy way to do it: it's proven to be an effective way of spreading your message.

I'm redesigning my blog with WordPress at the time of this post and am adding this functionality to the new design. I want the code optimized to run as fast as possible, so I'm using JavaScript to create this functionality instead of depending on a WordPress plugin...yes, __this code can work outside of WordPress__.

<h2 style="clear:both;">Table of Contents</h2>

1. [Some Notes](#notes)
2. [This Code Is Optimized](#optimized)
3. [A Simple Click To Tweet Link](#simple-link)
4. [Review The HTML & CSS](#html-css)
5. [Dealing with Complicated URLs](#complicated-url)
6. [Clean Up The Link With A Regular Expression](#regex)
7. [Conclusion](#conclusion)

<a name="notes"></a>
## Some Notes
This code only works if it runs on some sort of web server setup. So if you want to test it, you'll need to either run it on an actual website or simulate a web server on your local machine using something like [MAMP for Mac](https://www.mamp.info/ "Learn more about MAMP for Mac"), [WAMP for Windows](http://www.wampserver.com/ "Learn more about WAMP for Windows") or [XAMMP, which is cross-platform](https://www.apachefriends.org/index.html, "Learn more about XAMMP for Windows, Mac and Linux").

Due to how I build my posts, my final JS code requires a regular expression. It's a simple one but it still may be too complex for your needs; therefore, you may want to go directly to [the part of the post with the simple Click to Tweet code](#simple-link).

This Click to Tweet code is meant to work dynamically: it uses JavaScript (and SOME jQuery) to find elements on a web page, add attributes to one of them and set up click events...very dynamic. If you want to hard-code a Click to Tweet link, I suggest reading [Guillaume Piot's excellent tutorial](http://gpiot.com/blog/elegant-twitter-share-button-and-dialog-with-jquery/ "Read Guillaume Piot's Click to Tweet tutorial"), which was the main source of inspiration for my code.

Lastly, if you're using something like WordPress, Drupal or Jekyll to build a site, I'm assuming you can figure out how to use this code within it. In the case of my WordPress site, I'll have to (at the bare minimum) create a custom `footer.php` file for the single posts that's different from the one used for the non-post pages. All this requires creating custom WordPress PHP code, which you may not want to do. If this describes your situation, you may want to just use a plugin like [Click To Tweet for WordPress](https://wordpress.org/plugins/click-to-tweet-by-todaymade/ "Review the Click To Tweet plugin for WordPress").

<a name="optimized"></a>
## This Code Is Optimized
This code optimized to run as fast as possible in two ways:

1. __No need to use widgets.js:__ `widgets.js` is the core Twitter file for creating various kinds of Twitter buttons on a site. Not using it for this code means that my site will make one *less* server request. I should point out that Twitter prefers that your site use this file if it has any sort of Tweet sharing functionality, but it seems to work fine without it.

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

The two key page elements are: 1) the `<h2>` tag with an id of `blog-post-title`, and 2) the `<a>` tag with an id of `tweet-this-post`.

The `<h2>` represents the blog post's title. We'll use the copy inside of it for the copy of our Tweet.

The `<a>` tag is our "Click to Tweet" link. We'll use JavaScript to bind functionality to the tag that builds our Tweet whenever it's clicked.

Then we're linking jQuery to our site and are also linking a file called `tweetButton.js`. The latter file will contain the Click to Tweet code, and will be our main focus throughout this tutorial.

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

a.tweet-post-class {
  color:#fff;
  text-decoration:none
}

a.tweet-post-class:visited {
  color:#fff
}

a.tweet-post-class:active,
a.tweet-post-class:hover {
  color:#fff;
  background-color:#55acee
}
{% endprism %}

The Click to Tweet link is styled nicely, but there's not much else here.

<a name="simple-link"></a>
## A Simple Click To Tweet Link
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

Three variables are defined in a single var pattern. Using the id attributes for both the `<h2>` and `<a>` tags just discussed, we're referencing each one with the first two JavaScript variables, respectively named `getPostTitle` and `linkElement`.

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

Once the IIFE runs, we're using `jQuery.on()` to bind click functionality to `linkElement`, our code's reference to the `<a>` tag. That tag has an `href` attribute, meaning that end-users will be forwarded to a web page when clicked.

This is a link's default behavior and because of how our code needs to works, we need to prevent it. We do this by passing an `event` parameter to the function, then run `event.preventDefault()` inside the `jQuery.on()` method.

{% prism javascript %}
var tweetedLink = this.getAttribute( "href" );

window.open( "http://twitter.com/intent/tweet?url=" + tweetedLink + "&text=" + getPostTitle + "&via=kaidez&", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0" );
{% endprism %}

When the link is clicked, it will grab whatever the value is of its `href` attribute and store it in a variable called `tweetedLink`. The click also opens a popup window pointing to a page built with [Twitter Web Intents](https://dev.twitter.com/web/intents#retweet-intent "Learn more about Twitter Web intents") which, as per its documentation, "provide[s] popup-optimized flows for working with Tweets & Twitter Users: Tweet, Reply, Retweet, Favorite, and Follow."

A URL is built with important things coming after the query string (`?`). The three main things are:

1. The `url=" + tweetedLink"` value that comes at the start of the query string. Here, the `tweetedLink` variable containing the `href` value of our Click to Tweet is built into the URL.

2. The `"&text=" + getPostTitle` value that comes next. Here, the `getPostTitle` variable we defined at the top of our code is also built into the URL and, again, it stores the name of our blog post.

3. The `&via=kaidez` value that come next. Setting `via` equal to your Twitter handle (or mine in this example) means the handle will be passed into the Tweet.

For the rest of the code, the `twitterwindow` value just creates the popup window with Twitter branding. It then sets its height and width and builds the window without a toolbar, address (location) bar, menu bar, bookmark bar and scrollbar.

The `url`, `text` and `via` values are optional. But if you give them values then, using this section's demo code as an example, the popup will look similar to this:

<div style="margin:0 auto; max-width: 700px;">
  <img src="/img/click-to-tweet-sample-01.jpg" class="imgBorder" alt="sample of a Tweet Box" />
</div>

As mentioned above, this implementation is simple enough to work on your site. But my site had functionality that required a more complex code structure.
<a name="complicated-url"></a>
## Dealing with Complicated URLs
There are some case with my blog posts where there's extra things after their URLS: For example:

Many of posts, including this one, have a Table of Contents section that lets you jump to certain sections. So if you got to this section of the post by clicking on its anchor link, the browser's address bar would be updated to look like this:
{% prism markup %}
http://kaidez.com/click-to-tweet-link/#complicated-url
{% endprism %}

And if, for some reason, you hit the Click to Tweet link from there, the URL in the Tweet window looked like this:
<div style="margin:0 auto; max-width: 700px;">
  <img src="/img/click-to-tweet-sample-02.jpg" class="imgBorder" alt="sample of a Tweet Box" />
</div>

Also, there are times when I use Urchin Traffic Monitor (UTM) codes in my post links to track their social network click-thru rates via Google Analytics. So if you got to this post via a link I posted on Facebook, the link would look like this:
{% prism markup %}
http://kaidez.com/click-to-tweet-link/?utm_source=facebook&utm_medium=link&utm_click-to-tweet
{% endprism %}

And if, for some reason, you hit the Click to Tweet link from there, the URL in the Tweet window looked like this:
<div style="margin:0 auto; max-width: 700px;">
  <img src="/img/click-to-tweet-sample-03.jpg" class="imgBorder" alt="sample of a Tweet Box" />
</div>

Note that the UTM link wasn't truncated so the post is over 140 characters.  All this is a problem.
<a name="regex"></a>
## Clean Up The Link With A Regular Expression
The solution is to clean up the link in the address bar with a regular expression. Update the beginning of `tweetButton.js` so it looks like this:
{% prism javascript %}
(function(){

  var linkElement = document.getElementById( "tweet-this-post" ),
      getPostTitle = document.getElementById( "blog-post-title" ).innerHTML,
      getPostLink = window.location.href,
      cleanLink = getPostLink.replace( /[^/]*$/g, "" );
  
  linkElement.setAttribute( "href", cleanLink );
  ...
  // The code below this point stays the same

})();
{% endprism %}
We've added a `cleanLink` variable to our single var pattern. This variable looks at the characters that make up the `getPostlink` variable (which is the URL in the browser's address bar), finds all the characters that come AFTER the last forward-slash (/) and uses JavaScript's `replace()` method to replace them with whatever is passed to the second parameter ("")...which is absolutely nothing!

Before, we set the `href` value `linkElement` (the `<a>` tag) to just be the complete URL in full...that was represented by the `getPostLink` variable. We now set the `href` to be `cleanLink`, which is our cleaned-up URL.

<a name="conclusion"></a>
## Conclusion
I haven't put a "Click to Tweet" link on my live site at the time of this post, but I'm told it works.  It'll be really satisfying if it works but I'm already satisfied by the fact that I coded all this myself with out a plug-in.