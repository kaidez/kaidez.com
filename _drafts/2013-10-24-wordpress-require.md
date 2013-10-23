---
title: RequireJS & WordPress
comments: true
author: Kai Gittens
layout: post
meta-excerpt: Read about methods for managing RequireJS in WordPress
permalink: /requirejs-wordpress/
category: coding-best-practices
cat-name: "Code Tips"
has-home-img: require-wordpress.jpg
tags: [RequireJS, Wordpress, jQuery]
---
As mentioned in [my 2013 site redesign post](/site-redesign-2013/ "A walk-through of how kaidez.com was redesigned"), I started redesigning this site on top of [WordPress](http://wordpress.org/ "Go to WordPress.org") but eventually switched over to [Jekyll](http://jekyllrb.com/ "Go to the Jekyll blog engine site"). This was because I set a goal for myself to use [RequireJS](http://requirejs.org/ "Go to requirejs.org") to control all the site JavaScript in a specific way, and WordPress kept me from doing this *exactly* how I wanted to.

The issue: my RequireJS setup needed to treat [jQuery](http://jquery.com/ "Check out the jQuery library") as a dependency for certain code modules. But inside WordPress, jQuery and the other JavaScript stuff must be managed in a manner that both benefits and protects the WP ecosystem: a manner that imposed limits on what I needed RequireJS to do.

RequireJS can still be used inside of WordPress with caveats.  This post discusses some of these caveats.

## Table of Contents
1. [Assumptions &amp; Notes](#assumptions-notes)
2. [What Is RequireJS?](#what-is-requirejs)
3. [A RequireJS Example](#quick-requirejs-example)
4. [How WordPress Manages JavaScript Files Behind the Scenes](#javascript-wordpress)
5. [jQuery and the WordPress Default Install](#jquery-wordpress-default-install)

<a name="assumptions-notes"></a>
## Assumptions &amp; Notes
I'm assuming that you understand a few things:

   * This post is a high-level discussion about taking a theme that's included in a default WordPress install and customizing it with a child theme, a well-defined WP best practice. This post assumes that you understand the very simple technical work required to create a child theme: if not, [the Child Theme docs in the WordPress Codex ](http://codex.wordpress.org/Child_Themes "How to create a child theme in WordPress")clearly describes how it's done. 

   * I'm not assuming that you know either RequireJS or the Asynchronous Module Definition (AMD) specification that it's based upon, so I'll be using sample code to walk through the process. But it's only a walk-through and RequireJS can do much more than the tasks I describe. Therefore, I'm assuming that you have a passion for JS and have no problem reading up on a few things, such as the [RequireJS API](http://requirejs.org/docs/api.html "Read the RequireJS API") and the [AMD spec](https://github.com/amdjs/amdjs-api/wiki/AMD "Learn more about the Asynchronous Module Definition").

There's only one thing to note: this post should *not* be looked as my stating that "WordPress is bad." WordPress is AWESOME and I will continue to use it, but was not the way to go in order to meet the RequireJS-related goal I set for myself with this redesign. [I discuss this at great length in my site redesign post](/site-redesign-2013/#jekyll "Read about why kaidez.com switched from WordPress to Jekyll").

That being said, let's start things off by describing RequireJS...
<a name="what-is-requirejs"></a>
## What is RequireJS?
RequireJS is a script loader that creates a JavaScript dependency management system within your website or web app. It's based on the previously-mentioned AMD spec which defines a code pattern for loading JS files in organized, non-blocking, asynchronous fashion.

Generally speaking, a RequireJS setup consists of two parts:

1. __Modules__: singular units of JavaScript code that execute either one task or a small group of closely-related tasks. You can create multiple modules, with each module performing a different task or tasks.

2. __Configurations__: settings you pass to RequireJS so it can properly manage all the modules within your site or app, making sure everything works seamlessly and without conflict.

The modules contain not only the code needed to run your task(s), but also references to the dependencies the code needs to run the task(s). These dependencies are things like the core jQuery library and plugins.

*(Side note: if you're skeptical about setting up your JavaScript like this, read this [RequireJS discussion on GitHub](https://gist.github.com/desandro/4686136 "Read about the benefits of RequireJS") that nicely outlines the benefits of such a setup.)*

Let's get some RequireJS perspective by looking at a quick example of how it works on this site.

<a name="quick-requirejs-example"></a>
## A RequireJS Example
My site's search functionality is powered by the wonderful [Tipue Search plugin for jQuery](http://www.tipue.com/search/ "Read more about Tipue Search"). It basically takes end user searches and returns the results based on data in a JSON object that contains the site content.

Tipue needs four separate JS files to work and they must be listed in the following order on an HTML page...these will be dependencies:

1. `jquery.js`: the core jQuery library.
2. `tipuesearch_content.js`: the file that contains the JSON object with the site content.
3. `tipuesearch_set.js`: the file that tells Tipue to manages certain words typed into the search field in certain ways....things such as stop words.
4. `tipuesearch.js`: the core Tipue plugin code.

Setting this up usually meant loading all these files in `<script>` tags on my HTML page in the order above, then referencing my custom Tipue code afterwards. RequireJS allows for an easier process.

We first add the only `<script>` tag we need:
{% prism markup %}
<script data-main="scripts/main" src="scripts/require.js"></script> 
{% endprism %}

The info in the `data-main` attribute refers to a file called `main.js`, which contains the configurations. The `.js` is purposely left off  because RequireJS always assume that the info in this attribute is a JavaScript file.  

`scripts/require.js` refers to the core RequireJS file. Both it and `main.js` are in a directory called `scripts`.

The configs in our `main.js` file look like this:

{% prism javascript %}
// We're only talking about creating one module here but this is
// the config setup for multiple modules.  This is what's being
// discussed here as it's common practice to use multiple modules
// but configuring a single module is outlined over at: 
// http://requirejs.org/docs/api.html#define

requirejs.config({

  baseUrl: "/",

  deps: ["search"],

  paths: {
    jquery: "libs/jquery.min", // v.1.10.2
    tipue: "libs/tipuesearch.min",
    tipueset: "libs/tipuesearch_set",
    tipuesetContent: "libs/tipuesearch_content"
  },

  shim: {
    tipue: {
      deps: ["jquery"],
      exports: "jquery"
    },
    tipueset: {
      deps: ["jquery"],
      exports: "jquery"
    },
    tipuesetContent: {
      deps: ["jquery"],
      exports: "jquery"
    }
  }
});
{% endprism %}

Let's break all this down...

{% prism javascript %} 
requirejs.config({
...
});
{% endprism %}

We wrap our code in a self-enclosed function, which contains all the config info to the `requirejs.config` object that's attached to the browser's `window` object.


{% prism javascript %} 
baseUrl: "/",
{% endprism %}

Where stuff is...
{% prism javascript %} 
deps: ["search"],
{% endprism %}

`deps` is an array of all the dependencies needed by our site or app.  The dependencies are the code modules that we talked about and are really just `.js` files.  Therefore, the `search` that's mentioned in the array is referring to a file called `search.js` and will contain the code needed to make Tipue work on the site...will get to that code shortly.  




<a name="javascript-wordpress"></a>
## How WordPress Manages JavaScript Files Behind the Scenes
Version 3.6.1 is the current WordPress release at the time of this post. Like WordPress versions before it, v3.6.1 comes preloaded with many JavaScript libraries and plugins.

The default WordPress install doesn't load all these libraries and plugins into the viewable website after the default install. It just makes them available to be loaded by both web developers who want to bring them in with hand-written code, and as dependencies for whatever other installed libraries and plugins may need them.

A long but incomplete list of these libraries and plugins can be viewed on the [the Function Reference/wp register script page on the WordPress Codex](http://codex.wordpress.org/Function_Reference/wp_register_script) over on the WordPress Codex.



<a name="jquery-wordpress-default-install"></a>
## jQuery and the WordPress Default Install
Again, WordPress is at version 3.6.1 at the time of this writing, and it implements TwentyThirteen as its default theme. It was at version 3.5.2 when I was still using it to redesign the site, which implements TwentyTweleve as its default theme. TwentyTwelve was the parent that my child theme was based on.

While TwentyThirteen does load jQuery after the default install, TwentyTwelve does not. As I was working with TwentyTwelve, I would need to bring jQuery into the site somehow and would want to do so with RequireJS.

This is where the problems started...







Looking at the default install using the TwentyThirteen Theme, the following JavaScript is loaded onto the page:

* [HTML5shiv 3.6](https://code.google.com/p/html5shiv/): used to properly display HTML5 elements in browsers that don't naturally support them.  The browsers in question refer to Internet Explorer versions 8 and lower and, as such, this file's script reference is wrapped in IE conditional comments that prevent it from loading in any other browsers but those. Also, please note that WP 3.6.1 is currently running version 3.6 of the shiv, one build behind the current release.
* [jQuery 1.10.2](https://jquery.com/): the core jQuery library...current in TwentyThirteen as of this post.
* [jQuery Migrate](https://github.com/jquery/jquery-migrate/): detects and restores jQuery features that have been deprecated & and removed as of jQuery 1.9...current in TwentyThirteen as of this post.
* [Masonry](http://masonry.desandro.com/): David Desandro's excellent jQuery-powered grid layout library.
* functions.js: a small JavaScript file that provides some light dynamic styling to elements, enables the mobile menu button and fixes a Chrome/IE bug related to the theme's hidden "Skip to Content" link.
* On any page that allows comments, `comment-reply.min.js` is included.

*Side note: the "Skip to Content" fix is globally important and should everywhere and not just in WordPress. It comes from Nick Zakas and you can read about it [here](http://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/).*

I want to start things off by removing almost all these JavaScript files. By doing so, I can use RequireJS to properly manage all the JS I would bring in eventually.

I say "almost all these files" because RequireJS will be placed as close to the bottom of all the site pages as possible. HTML5 Shiv is placed within the `<head>` tag because needs to do work very early in the page load process.  Moving it to the bottom would prevent that, so I'm keeping it where it is.

I would use Disqus for commenting so `comment-reply.min.js` can be removed. jQuery core and jQuery Migrate are placed within `<head>` and I would prefer to move them to the bottom of the page.

Both Masonry and `functions.js` are placed at the bottom of the page; however, their version numbers are appended with a query string. This  isn't that great from [a site optimization standpoint](https://developers.google.com/speed/docs/best-practices/caching?hl=sv "Read about optimizing file caching").

In the context of the TwentyThirteen theme, removing the rest of the JavaScript can be done by creating a new `functions.php` in my child them folder and placing the following code inside of it:

{% prism php %}
<?php

  // remove 'comment-reply.js' from the site
  function clean_header(){
	  wp_deregister_script( 'comment-reply' );
  }
  add_action('init','clean_header');

  // remove 'jQuery core' from the site...this
  // will also remove jQuery Migrate, Masonry
  // and 'functions.js'
  function remove_jquery(){
	  wp_deregister_script( 'jquery' );
  }
  add_action('init','remove_jquery');

?>
{% endprism %}

The comment JS code was removed by creating a `functions.php` file in my child theme and using [This post in the WordPress Support forums](http://wordpress.org/support/topic/how-to-remove-comment-replyjs-completely) can get you up and running with this code.



http://scribu.net/wordpress/optimal-script-loading.html