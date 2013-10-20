---
title: RequireJS with WordPress
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
As mentioned in [my 2013 site redesign post](/site-redesign-2013/ "A walk-through of how kaidez.com was redesigned"), I started off redesigning things on top of [WordPress](http://wordpress.org/ "Go to WordPress.org") but eventually switched over to [Jekyll](http://jekyllrb.com/ "Go to the Jekyll blog engine site"). This was because I set a goal for myself to control all the JavaScript in a specific way with [RequireJS](http://requirejs.org/ "Go to requirejs.org") and WordPress prevented this.

The issue: my RequireJS setup needed to treat [jQuery](http://jquery.com/ "Check out the jQuery library") as a dependency for certain code modules.  But WordPress must regulate jQuery and many other JS libraries in a manner that allows plugin code to work seamlessly inside the WordPress ecosystem...a manner that didn't really align with how I wanted to use RequireJS.

But RequireJS can still be used inside of WordPress with caveats.  This post discusses some of these caveats.

## Table of Contents
1. [Assumptions](#assumptions)
2. [What Is RequireJS?](#what-is-requirejs)
3. [How WordPress manages JavaScript Files](#javascript-wordpress)

<a name="assumptions"></a>
## Assumptions
I'll give a quick definition of RequireJS, define some specific terms like "AMD" and walk-through some key WordPress functions. Past that, I'm assuming that you understands a few things...

This post is a high-level discussion about customizing a WordPress theme and unless you're using a theme that doesn't permit it, customizing WordPress inside a child theme is best practice. This post assumes that you understand the simple technical work required to create a child theme: if not, [the Child Theme docs in the WordPress Codex](http://codex.wordpress.org/Child_Themes "How to create a child theme in WordPress") clearly describes how it's done.

I'm not assuming that you're a JavaSript guru, but am assuming JS doesn't intimidate and that you know enough of it to get things done.You should also understand JS basics: you won't learn how to create a variable or invoke a function in JavaScript in this post.

<a name="what-is-requirejs"></a>
## What is RequireJS?
RequireJS describes itself as a "JavaScript file and module loader." When configured properly, it allows you to write JavaScript in separate files that are looked upon as "modules."

The code in some of these modules may need other files to core libraries like jQuery to work, as well as any plugins. Once properly configured, RequireJS creates a dependency management system that allows you to arrange these files exactly as they need to be.  

<a name="javascript-wordpress"></a>
## How WordPress manages JavaScript Files
As mentioned, JavaScript is managed using a specific technique in WordPress. And we need to understand the technique if we want to embed RequireJS in our site build.



RequireJS is a JavaScript file and module loader. Once you configure it properly, It lets you write multiple JavaScript files and  in a modular fashion an

As I would want to safely customize my WordPress blog's look and feel, these tests were run against a [child theme](http://codex.wordpress.org/Child_Themes "Learn how to create a WordPress child theme") a globally agreed-upon WP best practice. This is done with TwentyThirteen child was the parent of this child theme. 



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