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
While this code can work *outside* of WordPress, it's meant to work dynamically. The Click to Tweet functionality discussed here uses JavaScript (and SOME jQuery) to find already-existing web page elements, add attributes to them and set up click events...very dynamic. If you want to hard-code a Click to Tweet link, I suggest reading [Guillaume Piot's excellent tutorial](http://gpiot.com/blog/elegant-twitter-share-button-and-dialog-with-jquery/ "Read Guillaume Piot's Click to Tweet tutorial"), which was the main source of inspiration for my code.

I'm assuming that you'll be able to apply this Click to Tweet code to whatever you're using to create a dynamic site is: WordPress, Drupal, Jekyll, Joomla, etc. In the case of my WordPress site, I'll have to (at the bare minimum) create a custom `footer.php` file for single posts to prevent certain console error messages on non-post pages. All this requires creating custom code which you may not want to do. If this describes your situation, you may want to use a plugin like [Click To Tweet for WordPress](https://wordpress.org/plugins/click-to-tweet-by-todaymade/ "Review the Click To Tweet plugin for WordPress").

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

The `<a>` tag is our "Click to Tweet" link.
<a name="simple-link"></a>
## The Simplest Way To Build the Click To Tweet Link
The final code I'm using is a little complex...there is a simple way to create this link



<a name="conclusion"></a>
## Conclusion