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
As mentioned in [my 2013 site redesign post](/site-redesign-2013/ "A walk-through of how kaidez.com was redesigned"), I started redesigning this site on top of [WordPress](http://wordpress.org/ "Go to WordPress.org") but eventually switched over to [Jekyll](http://jekyllrb.com/ "Go to the Jekyll blog engine site"). This was because I set a goal for myself to control all the JavaScript in a specific way with [RequireJS](http://requirejs.org/ "Go to requirejs.org"), and WordPress kept me from doing this *exactly* how I wanted to.

The issue: my RequireJS setup needed to treat [jQuery](http://jquery.com/ "Check out the jQuery library") as a dependency for certain code modules. But jQuery and the other JavaScript stuff must be managed in a manner that both benefits and protects the WordPress ecosystem: a manner that imposed limits on what I needed RequireJS to do.

RequireJS can still be used inside of WordPress with caveats.  This post discusses some of these caveats.

## Table of Contents
1. [Assumptions &amp; Notes](#assumptions-notes)
2. [What Is RequireJS?](#what-is-requirejs)
3. [A Quick RequireJS Example](#quick-requirejs-example)
4. [How WordPress Manages JavaScript Files Behind the Scenes](#javascript-wordpress)
5. [jQuery and the WordPress Default Install](#jquery-wordpress-default-install)

<a name="assumptions-notes"></a>
## Assumptions &amp; Notes
I'm assuming that you understand a few things:

   * This post is a high-level discussion about customizing a default WordPress theme with a child theme, which is a well-defined best practice. This post assumes that you understand the very simple technical work required to create a child theme: if not, [the Child Theme docs in the WordPress Codex ](http://codex.wordpress.org/Child_Themes "How to create a child theme in WordPress")clearly describes how it's done. 

   * I'm not assuming that you're a JavaSript guru but am assuming JS doesn't intimidate you and that you know enough of it to get things done.

There's only one thing to note: this post should *not* be looked as my stating that "WordPress is bad." WordPress is AWESOME and I will continue to use it, but was not the way to go in order to meet the aRequireJS-related goal I set for myself with this redesign. [I discuss this at great length in my site redesign post](/site-redesign-2013/#jekyll "Read about why kaidez.com switched from WordPress to Jekyll").

<a name="what-is-requirejs"></a>
## What is RequireJS?
RequireJS is a script loader that provides a dependency management system for your website's or web app's JavaScript files. It's based on the [Asynchronous Module Definition (AMD)](https://github.com/amdjs/amdjs-api/wiki/AMD "Learn more about the Asynchronous Module Definition") which defines a coding pattern for loading JS files in organized, non-blocking, asynchronous fashion.

At the time of this post, there are 16 JavaScript files that perform different tasks...form validation, off-DOM element construction, search box functionality, etc. RequireJS efficiently manages and loads all of them into this site: this process is discussed in [the RequireJS section of my site redesign post](/site-redesign-2013/#RequireJS).

So the initial plan was to get RequireJS to perform these differnt tasks on my WordPress-powered site.  Let's look at a quick example of what the code for this would look like, particularly when jQuery's involved.

<a name="quick-requirejs-example"></a>
## A Quick RequireJS Example
My site's search functionality is powered by the wonderful [Tipue Search plugin for jQuery](http://www.tipue.com/search/ "Read more about Tipue Search"). It basically takes end user searches and returns the results based on data in a JSON object that contains the site content.

Tipue needs four separate JS files to work and they must be listed in the following order on an HTML page:

1. `jquery.js`: the core jQuery library.
2. `tipuesearch_content.js`: the file that contains the JSON object.
3. `tipuesearch_set.js`: the file that tells Tipue to manages certain words typed into the search field in certain ways....things such as stop words.
4. `tipuesearch.js`: the core Tipue plugin code.

To get Tipue working, we need to load RequireJS on our page like so:
{% prism markup %}
<script data-main="scripts/main" src="scripts/require.js"></script> 
{% endprism %}

The info in the `data-main` attribute refers to a file called `main.js`and it contains the all the code needed to run the search form. The `.js` is purposely left of because RequireJS always assume that the info in this attribute is a JavaScript file.  

`scripts/require.js` refers to the core RequireJS file. Both it and `main.js` are in a directory called `scripts`.


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

As an example, I have a RequireJS module that processes form submissions using `jQuery.ajax()`. To get it working on my site, I first need to call RequireJS on my page and pass it a set of configurations to perform certain tasks.  Next, I need to write out the modules and their dependencies.

	

If my entire site only utilized a small unit of JS code, I would put it in a `main.js` along with all its dependency mappings, ignoring the config process. But as I have multiple units of JS doing different things, it makes sense to put the form validation code and its single dependency (jQuery) in it's own module and place just the configs in `main.js`. 

So `main.js` goes into the `scripts` folder and looks like this:

{% prism javascript %} 
requirejs.config({

  baseUrl: "/jsBuildOut",

  deps: ["form"],

  paths: {
    jquery: "libs/jquery.min"
  }

});
{% endprism %}













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