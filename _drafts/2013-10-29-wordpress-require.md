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
As mentioned in [my 2013 site redesign post](/site-redesign-2013/ "A walk-through of how kaidez.com was redesigned"), I started redesigning this site on top of [WordPress](http://wordpress.org/ "Go to WordPress.org") but eventually switched over to [Jekyll](http://jekyllrb.com/ "Go to the Jekyll blog engine site"). This was because my goal was to use [RequireJS](http://requirejs.org/ "Go to requirejs.org") to control all the site's JavaScript in a specific way, and WordPress kept me from doing this.

The issue: my RequireJS setup needed to treat [jQuery](http://jquery.com/ "Check out the jQuery library") as a dependency for certain code modules. But WordPress must manage its internal JavaScript in a manner that benefits its entire ecosystem: a manner that imposed limits on what I needed RequireJS to do.

RequireJS can still be used inside of WordPress with caveats.  This post discusses some of these caveats.

## Table of Contents
1. [Assumptions &amp; Notes](#assumptions-notes)
2. [What Is RequireJS?](#what-is-requirejs)
3. [A RequireJS Example](#quick-requirejs-example)
4. [The WordPress install &amp; JavaScript](#jquery-wordpress-default-install)

<a name="assumptions-notes"></a>
## Assumptions &amp; Notes
I'm assuming that you understand a few things:

This post is about both WordPress and RequireJS. While both have been around for awhile, RequireJS is relatively new when compared to WordPress at the time of this post's publish date.  Therefore, this post discusses RequireJS in more detail than WordPress.

This post is a high-level view of customizing a few things in WordPress so I'm assuming that from a coding standpoint, you know the basics of WP customizing. Particularly in the area of child themes.

All my initial RequireJS/WordPress work was done inside a child theme, a well-defined WP best practice, so I'm assuming you know how to do this. If not, [the Child Theme docs in the WordPress Codex](http://codex.wordpress.org/Child_Themes "How to create a child theme in WordPress") clearly describes how it's done. 

While I do walk through RequireJS more than I do WordPress, it's still only a walk-through. RequireJS can do much more than the tasks discussed in this post so if you've read this far, I'm assuming that you know at least a little about RequireJS.

If not, then I'm assuming that you're naturally curious about RequireJS and have no problem reading up on a few things to better understand it, starting with the  [RequireJS API docs](http://requirejs.org/docs/api.html "Read the RequireJS API").

Some notes...

This post should *not* be looked as my stating that "WordPress is bad." WordPress is awesome and I will continue to use it, but was it not the way to go in order to meet the RequireJS-related goal I set for myself with this redesign. [I discuss this at great length in my site redesign post](/site-redesign-2013/#jekyll "Read about why kaidez.com switched from WordPress to Jekyll").

Also, I was working with WordPress 3.5.2 when I was redesigning my site and trying to properly integrate RequireJS. WordPress is now at 3.7 but starting with 3.6, JavaScript is placed in a WP site via much differently than previous versions.

I did test some RequireJS things in 3.6. and did no testing in version 3.7 as it was released three days ahead of this post and had no time to do a proper test.  So my point of view was doing most of the RequireJS stuff in 3.5.2, but what really matters here is how WordPress loads and manages JS libraries and plugins after its initial install.  That, I have tested that in versions 3.5.2 through 3.7 and all is the same. 

And on a personal note: there were RequireJS things that I struggled with at both the beginning and the end of the redesign. I'm indebted to [Cary Landholt](https://twitter.com/carylandholt "visit Cary Landholt's Twitter page") for taking the time helping me at both points. His [YouTube screencasts](http://www.youtube.com/user/carylandholt "visit Cary Landholt's YouTube page") are worth a watch, specifically his RequireJS ones.  You should also spend some time poking around his [GitHub repo](https://github.com/CaryLandholt "visit Cary Landholt's GitHub repo") for cool JavaScript stuff.

That being said, let's start things off by describing RequireJS...
<a name="what-is-requirejs"></a>
## What is RequireJS?
RequireJS is a script loader that creates a JavaScript dependency management system within your website or web app. It's based on the [Asynchronous Module Definition (AMD) specification](https://github.com/amdjs/amdjs-api/wiki/AMD) which defines a code pattern for loading JS files in an asynchronous, organized, non-blocking fashion.

Generally speaking, a RequireJS setup consists of two parts:

1. __A group of modules__: single units of JavaScript code that execute either a single task or a small group of closely-related tasks. You can create multiple modules, with each module performing a different task or group of tasks.

2. __Configurations__: settings you pass to RequireJS so it can properly manage all the modules within your site or app, making sure everything works seamlessly.

The modules contain not only the code needed to run your task(s), but also references to the dependencies the code needs to run the task(s). These dependencies are things like the core jQuery library and plugins.

*(Side note: if you're skeptical about setting up your JavaScript like this, read this [RequireJS discussion on GitHub](https://gist.github.com/desandro/4686136 "Read about the benefits of RequireJS") that nicely outlines the benefits of such a setup.)*

Let's get some RequireJS perspective by looking at a quick example of how it works on this site.

<a name="quick-requirejs-example"></a>
## A RequireJS Example
My site's search functionality is powered by the [Tipue Search plugin for jQuery](http://www.tipue.com/search/ "Read more about Tipue Search"). It takes end user search inputs and returns the results based on the data in a JSON object that contains the site content.

Tipue needs four separate JS files to work and they must be listed in the following order on an HTML page:

1. `jquery.js`: the core jQuery library.
2. `tipuesearch_content.js`: the file that contains the JSON object with the site content.
3. `tipuesearch_set.js`: the file that sets rules for certain words inputed into the search field, rules such as ignoring words like "the" and "or".
4. `tipuesearch.js`: the core Tipue plugin code.

In the past, setting up this functionality usually meant loading all these files in `<script>` tags on my HTML page in the order above, then referencing my custom Tipue code sometime afterwards. RequireJS allows for an easier process.

We first add the only `<script>` tag we need...it should go as close to the bottom of the page as possible:
{% prism markup %}
<script data-main="scripts/main" src="scripts/require.js"></script> 
{% endprism %}

The info in the `data-main` attribute refers to a file called `main.js`, which contains the configurations. The `.js` is purposely left off  because RequireJS *always* assume that the info referenced in this attribute is a JavaScript file.  

`require.js` refers to the core RequireJS file.

Both it and `main.js` are in a directory called `scripts`.

The configs in our `main.js` file look like this:

{% prism javascript %}
// We're only talking about creating one module here but this is
// the config setup for multiple modules. This is what's being
// discussed here as it's common practice to use multiple modules
// but the process for configuring a single module is outlined
// over at: http://requirejs.org/docs/api.html#define.

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
      exports: "jquery"
    },
    tipuesetContent: {
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

We wrap our code in a self-enclosed function that will contain all our configs.

{% prism javascript %} 
baseUrl: "/",
{% endprism %}

`baseURL` represents a relative reference to the location of all the JS files that RequireJS must manage.

*(Side note: I'm using a very simplified file structure in order to keep this post from being too long, but the RequireJS docs do outline some best practices in terms of organizing your code.  The [Load JavaScript Files section in the RequireJS docs](http://requirejs.org/docs/api.html#jsfiles "Go to the Load JavaScript Files section in the RequireJS docs") is the place to read up on this.)* 
{% prism javascript %} 
deps: ["search"],
{% endprism %}

`deps` is an array of all the dependencies for our site or app.  The dependencies are the code modules that we talked about and are really just `.js` files.  Therefore, the `search` that's mentioned in the array is referring to a file called `search.js` and will contain the code needed to make Tipue work on the site...will get to that code shortly.  

{% prism javascript %}
paths: {
  jquery: "libs/jquery.min", // v.1.10.2
  tipue: "libs/tipuesearch.min",
  tipueset: "libs/tipuesearch_set",
  tipuesetContent: "libs/tipuesearch_content"
},
{% endprism %}
`paths` is a JavaScript object that lists the dependencies for the items listed in the `deps` array...you can think of them as the "dependencies of the dependencies". These files are located in a directory called `libs` that's in our `scripts` folder.

As you can see, these are the previously-discussed four files that Tipue needs to function properly on our website. Also note that we're using jQuery 1.10.2: this will be important when we start talking about WordPress and is REALLY important when we talk about the final piece of our configurations.

{% prism javascript %} 
shim: {
  tipue: {
    deps: ["jquery"],
    exports: "jquery"
  },
  tipueset: {
    exports: "jquery"
  },
  tipuesetContent: {
    exports: "jquery"
  }
}
{% endprism %}

As previously-mentioned, RequireJS is based on the AMD spec which defines a code pattern for loading JS files asynchronously. JavaScript files that contain this pattern are said to be "AMD-compliant."

If the file dependency is not AMD-compliant, RequireJS must force it to be so.  That's what's happening here in this `shim` setting.

`tipue` represents our core Tipue plugin code and this can't run without jQuery. So it's listed as a dependency in the `deps` array.  The other two shimmed-in files have no jQuery code inside them so they can skip this step.

`exports` properly exposes these files to the core RequireJS code so it can treat it as a dependency based on the AMD spec.

Note that jQuery is not listed here: this is because we're using version 1.10.2 and [jQuery has been AMD-compliant since version 1.7](http://requirejs.org/docs/whyamd.html#amdtoday "View JS libraries and frameworks that are AMD-compliant"). So there's no need to shim it in.

Now that are configs are set, we need to create the code that runs our Tipue search functionality. This goes into the `search.js` file (also inside the `scripts` folder) that we referred to earlier in our `deps` array, and looks like this:

{% prism javascript %}
define(["jquery","tipuesetContent","tipueset","tipue"], function($, tipuesetContent, tipueset, tipue) {

  $("#tipue_search_input").tipuesearch({
    "show": 10,
    "showURL": false,
    "highlightEveryTerm": true
  });
   
});
{% endprism %}

The `define()` method first defines the dependencies in the array. It then passes them as parameters to a callback function so our custom code can access it.

As far what our custom code is doing, it takes the returned search results and places them in a page element with an id of `tipue_search_input`. It will return 10 results per page, not display the URL for each result and highlight whatever the search term was by bolding it.

Our code is done. When our HTML page loads into a browser, `scripts/require.js` looks at the configs in `scripts/main` and sees that it needs to setup things up so the code in `scripts/search.js` works correctly.  It looks at the files listed in the `paths` object and sees that `scripts/search.js` needs to four files in order to work properly.

RequireJS loads these four files and `scripts/search.js` into the `<head>` tag. If the `<script>` tag was loaded as close to the bottom of the page, all the files will usually load in a manner that doesn't slow down your site's/apps load time.

*(Side note: your project's RequireJS files can be concatenated and minified, but discussing this is outside the scope of this post. The [RequireJS optimization docs](http://requirejs.org/docs/optimization.html "Learn about optimizing RequireJS") outline how to get this done. )*

This was the code that I wanted to integrate into WordPress...and  this was where I started running into problems. Understanding these problems "requires" an understanding a few things about WordPress.

<a name="javascript-wordpress-default-install"></a>
## The WordPress install &amp; JavaScript

WordPress comes packaged with many well-known JavaScript libraries and plugins after it's installed, jQuery included. But in WP 3.5.2 (the version I was initially working with) it doesn't load them onto the site in `<script>` via TwentyTwelve, the default theme for 3.5.2.

jQuery was located in `/wp-includes/js/jquery/` so in order to refer to it in my RequireJS configs while respecting my `baseURL` setting, I needed to refer to it like this in the `paths` object:

{% prism javascript %}
paths: {
  http://livetest.kaidez.com/wp-includes/js/jquery/jquery.js,
  ...
}
{% endprism %}

In the context of the code I was writing, this would have worked fine. But in the context of WordPress, this the wrong way to bring in its pre-installed libraries and plugins.

Version 3.6.1 is the current WordPress release at the time of this post. Like WordPress versions before it, v3.6.1 comes preloaded with many JavaScript libraries and plugins.





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