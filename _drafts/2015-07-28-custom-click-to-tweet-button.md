---
title: "TUTORIAL: Create Custom 'Click to Tweet' link with JavaScript"
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
<a href="#" class="demoLink" target="blank">VIEW THE DEMO</a>
"Click to Tweet" links are a highly-recommended method for promoting your site's content. Placing a link at the end of your content that politely asks readers to Tweet it through their personal Twitter accounts has proven to be an effective way of spreading your message.

I'm redesigning my blog with WordPress at the time of this post and am adding this functionality to the new design. I want the code optimized to run as fast as possible, so I'm using JavaScript to create this functionality instead of depending on a WordPress plugin...yes, __this code can work outside of WordPress__.

<h2 style="clear:both;">Table of Contents</h2>

1. [Some Notes](#notes)
2. [How Is This Click To Tweet Code Optimized?](#optimized)
3. [The Simplest Way To Build the Click To Tweet Link](#simple-link)
4. [Review The HTML & CSS](#html-css)
10. [Conclusion](#conclusion)

<a name="notes"></a>
## Some Notes
If you use this code to follow along with this tutorial, it will have to run on some sort of web server setup to work properly. You can't just navigate to `index.html` to test things because the link you're Tweeting won't load in the Tweet box. You will need to either run the code on an actual website or simulate a web server on your local machine using something like MAMP, WAMP or XAMMP.

Because of how I build my blog posts, the final code I used required my using a regular expression. This may be too complex for your needs so [there's a section in this post that displays a simpler version of the code](#simple-link). But I do suggest reading the whole tutorial at some point to learn some cool coding tricks.

Also, while this code can work *outside* of WordPress, it's meant to work dynamically. The Click to Tweet functionality discussed here uses JavaScript (and SOME jQuery) to find already-existing web page elements, add attributes to them and set up click events...very dynamic. If you want to hard-code a Click to Tweet link, I suggest reading [Guillaume Piot's excellent tutorial](http://gpiot.com/blog/elegant-twitter-share-button-and-dialog-with-jquery/ "Read Guillaume Piot's Click to Tweet tutorial"), which was the main source of inspiration for my code.

Finally, I'm assuming that you'll be able to apply this Click to Tweet code to whatever you're using to create a dynamic site is: WordPress, Drupal, Jekyll, Joomla, etc. In the case of my WordPress site, I'll have to (at the bare minimum) create a custom `footer.php` file for single posts to prevent certain console error messages on non-post pages. All this requires creating custom code which you may not want to do. If this describes your situation, you may want to use a plugin like [Click To Tweet for WordPress](https://wordpress.org/plugins/click-to-tweet-by-todaymade/ "Review the Click To Tweet plugin for WordPress").

<a name="optimized"></a>
## How Is This Click To Tweet Code Optimized?
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

The `<a>` tag is our "Click to Tweet" link. We'll use JavaScript to bind functionality that builds our tweet whenever this tag is clicked.

Then we're linking jQuery to our site and are also linking a file called `tweetButton.js`. The `tweetButton.js` file will contain the Click to Tweet code and will be the file we focus on throughout this tutorial.

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

The Click to Tweet link is styled nicely, butt there's not much else here.

<a name="simple-link"></a>
## The Simplest Way To Build the Click To Tweet Link
For the JavaScript, the final code I'm using is a little complex. There is a simple way to create this link that we'll look at first...it's based on the Guillaume Piot code mentioned above.

{% prism javascript %}
(function(){

  var getPostTitle = document.getElementById( "blog-post-title" ).innerHTML,
      linkElement = document.getElementById( "tweet-this-post" );

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

All the code is wrapped in an [Immediately-Invoked Function Expression (IIFE)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/ "Learn more about Immediately-Invoked Function Expressions"), meaning it will run as soon as the `tweetButton.js` loads in the browser.

{% prism javascript %}
var getPostTitle = document.getElementById( "blog-post-title" ).innerHTML,
    linkElement = document.getElementById( "tweet-this-post" );
})();
{% endprism %}

Using the id attributes of the `<h2>` and `<a>` tags we just discussed, we're referencing them inside two JavaScript variables called `getPostTitle` and `linkElement`.

{% prism javascript %}
$( linkElement ).on( "click", function( event ){
  event.preventDefault();
  ...
})();
{% endprism %}

Once the IIFE runs, we're using `jQuery.on()` to bind click functionality to `linkElement`, which is how our code references the `<a>` tag. That tag will eventually contain an actually `href` attribute, meaning that end-users will be forwarded to that link if it's clicked.

We need to prevent that due to how our code needs to work. We prevent it by passing an `event` parameter to the function, then run event.preventDefault() inside the `jQuery.on()` method.
<a name="conclusion"></a>
## Conclusion