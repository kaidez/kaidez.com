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

The issue: my RequireJS setup needed to treat [jQuery](http://jquery.com/ "Check out the jQuery library") as a dependency for certain code modules. But a default WordPress install contains the jQuery core file and must manage it and other internal JS files in a manner that benefits its entire ecosystem: a manner that imposed limits on what I wanted RequireJS to do.

RequireJS can still be used inside of WordPress with caveats.  This post discusses some of these caveats.

## Table of Contents
1. [Assumptions &amp; Notes](#assumptions-notes)
2. [What Is RequireJS?](#what-is-requirejs)
3. [A RequireJS Example](#quick-requirejs-example)
4. [How I THOUGHT I Could Bring jQuery Into WordPress](#bring-jquery-into-wordpress)
5. [How To Load JavaScript Files Into WordPress](#load-js-into-wordpress)

<a name="assumptions-notes"></a>
## Assumptions &amp; Notes
I'm making a few assumptions:

The main assumption is that you understand WordPress beyond just configuring it inside the Dashboard. This post discusses adjusting code in already-existing existing WP files so you should be comfortable adjusting WordPress code, be it CSS, PHP, JavaScript, whatever. You should also understand that doing this is relatively easy if you use the [WordPress Codex](http://codex.wordpress.org/) as a reference.

All my initial RequireJS/WordPress work was done inside a child theme, a well-defined WP best practice, so I'm assuming you know how to implement this. If not, [the Child Theme docs in the WordPress Codex](http://codex.wordpress.org/Child_Themes "How to create a child theme in WordPress") clearly describe how it's done. 

RequireJS is relatively new when compared to WordPress so I do walk through the former more that the latter, but it's still only a walk-through. RequireJS can do much more than the tasks discussed in this post so I'm assuming that you're curious about RequireJS and have no problem reading a few things to better understand it, starting with the [RequireJS API docs](http://requirejs.org/docs/api.html "Read the RequireJS API").

Some notes...

This post should *not* be looked as my stating that "WordPress is bad." WordPress is awesome and I will continue to use it, but it was not the way to go in order to meet the RequireJS-related goal I set for myself with this redesign. I discuss this at great length in [my site redesign post](/site-redesign-2013/#jekyll "Read about why kaidez.com switched from WordPress to Jekyll").

When I started working on the redesign, I was working with WordPress version 3.5.2. I then left for Jekyll and since that time, WordPress has released versions 3.6 and 3.7, the latter being released about ten days before this post's publish date.

TwentyTwelve was the default theme for 3.5.2, and was what my child theme was based upon.  Both 3.6 and 3.7 use TwentyThirteen as its default theme, which loads JavaScript onto a WP site differently from TwentyTwelve and previous themes.

I did test some RequireJS things in version 3.6/TwentyThirteen and did no testing in version 3.7/TwentyThirteen as 3.7 was just released. So my point of view is from using RequireJS stuff in a 3.5.2/TwentyTwelve setup, but what really matters here is how WordPress pre-installs JS libraries and plugins before the themes actually use them. That, I have tested across versions and themes and all is the same. 

<a name="what-is-requirejs"></a>
## What is RequireJS?
RequireJS is a script loader that creates a JavaScript dependency management system within your website or web app. It's based on the [Asynchronous Module Definition (AMD) specification](https://github.com/amdjs/amdjs-api/wiki/AMD) which defines a code pattern for loading JS files in an asynchronous, organized, non-blocking fashion.

Generally speaking, a RequireJS setup consists of two parts:

1. __A group of modules__: single units of JavaScript code that execute either a single task or a small group of closely-related tasks. You can create multiple modules, with each module performing a different task or group of tasks.

2. __Configurations__: settings you pass to RequireJS so it can properly manage all the modules within your site or app, making sure everything works seamlessly.

The modules contain not only the code needed to run your task(s), but also lists the dependencies that this code needs to run the task(s). These dependencies are things like the core jQuery library and plugins.

Let's examine this by looking at an example of how RequireJS works on kaidez.com.

<a name="quick-requirejs-example"></a>
## A RequireJS Example
This site's search functionality is powered by the [Tipue Search plugin for jQuery](http://www.tipue.com/search/ "Read more about Tipue Search"). It takes end user searches and returns the search results based on the data in a JSON object containing the site content.

Tipue needs four separate JS files to work and they must be listed in the following order on an HTML page:

1. `jquery.js`: the core jQuery library.
2. `tipuesearch_content.js`: the file that contains the JSON object with the site content.
3. `tipuesearch_set.js`: the file that sets rules for certain words inputed into the search field, rules such as "ignore words like 'the' and 'or' in search inputs".
4. `tipuesearch.js`: the core Tipue plugin code.

In the past, setting up this functionality usually meant placing all these files in `<script>` tags on my HTML page in the order above, then putting my custom Tipue code somewhere below them. RequireJS allows for an easier process.

We first add the only `<script>` tag we need...it should go as close to the bottom of the page as possible:
{% prism markup %}
<script data-main="scripts/main" src="scripts/require.js"></script> 
{% endprism %}

The info in the `data-main` attribute refers to a file called `main.js`which, in the context of my site, contains the configurations. The `.js` is purposely left off  because RequireJS *always* assume that the info referenced in this attribute is a JavaScript file.  

`require.js` refers to the file containing the core RequireJS code.

Both files are in a directory called `scripts`.

The configurations in our `main.js` file look like this:

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
      exports: "tipue"
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

We wrap our code in a JavaScript object that will pass our configurations to the core RequireJS code.

{% prism javascript %} 
baseUrl: "/",
{% endprism %}

`baseURL` represents a relative reference to the location of all the JS files that RequireJS must manage. In this case, the location is the `scripts` folder.

*(Side note: I'm using a very simplified file structure in order to keep this post from being too long, but the RequireJS docs do outline some best practices in terms of organizing your code.  The [Load JavaScript Files section in the RequireJS docs](http://requirejs.org/docs/api.html#jsfiles "Go to the Load JavaScript Files section in the RequireJS docs") is the place to read up on this.)* 
{% prism javascript %} 
deps: ["search"],
{% endprism %}

`deps` is an array of all the dependencies for our site or app.  The dependencies are the code modules that we talked about and are really just `.js` files.  Therefore, the `search` that's mentioned in the array is referring to a file called `search.js` and will contain the code needed to make Tipue work on the site...will get to that code shortly. And to be clear, `search.js` is located in the `scripts` folder.


{% prism javascript %}
paths: {
  jquery: "libs/jquery.min", // v.1.10.2
  tipue: "libs/tipuesearch.min",
  tipueset: "libs/tipuesearch_set",
  tipuesetContent: "libs/tipuesearch_content"
},
{% endprism %}
`paths` is a JavaScript object that lists the dependencies for the items listed in the `deps` array...you can think of them as the "dependencies of the dependencies". These files are located in a directory called `libs` that's in our `scripts` folder.

As you can see, these are the previously-discussed four files that Tipue needs to function properly on our website. Also note that we're using jQuery 1.10.2: this will be important when we start talking about the last part of the configs.

{% prism javascript %} 
shim: {
  tipue: {
    deps: ["jquery"],
    exports: "tipue"
  }
}
{% endprism %}

As previously-mentioned, RequireJS is based on the AMD spec which defines a code pattern for loading JS files asynchronously. JavaScript files containing this pattern are said to be "AMD-compliant."

If the dependency is not AMD-compliant, RequireJS must force it to be so. That's what's happening here in this `shim` setting.

`tipue` is a reference to our core Tipue plugin code that was defined in the `paths` object.  It's not AMD-compliant so it's shimmed in.

`deps` tells RequireJS that the shimmed-in file needs jQuery to work properly. `exports`, a core [Node.js](http://nodejs.org/ "Learn more about Node.js") concept, properly exposes the shimmed-in file to the core RequireJS code so it can treat it as a dependency based on the AMD spec.

Both the `tipueset` and `tipuesetContent` listed in `paths` are also not AMD-compliant; however, they're not executing code like `tipue` is.  They're just adding support to the core Tipue plugin code so it can do its job, so there's no need to shim them.

jQuery also doesn't need to be shimmed in. This is because we're using version 1.10.2 and [jQuery has been AMD-compliant since version 1.7](http://requirejs.org/docs/whyamd.html#amdtoday "View JS libraries and frameworks that are AMD-compliant").

Now that are configs are set, we need to create the code that runs our Tipue search functionality. This goes into the `search.js` file that we referred to earlier in our `deps` array and looks like this:

{% prism javascript %}
define(["jquery","tipuesetContent","tipueset","tipue"], function($, tipuesetContent, tipueset, tipue) {

  $("#tipue_search_input").tipuesearch({
    "show": 10,
    "showURL": false,
    "highlightEveryTerm": true
  });
   
});
{% endprism %}

The `define()` method first defines all the code's dependencies in the array, then passes them as parameters to a callback function. Note that they're listed in the order outlined above: RequireJS will load things in this order.

As far what our custom code is doing, it takes the returned search results and places them in a page element with an id of `tipue_search_input`. It will "show" 10 results per page, not "show the URL" for each result and "highlight" whatever the search term was by bolding it.

Our code is done. When our HTML page loads into a browser, `scripts/require.js` looks at the configurations in `scripts/main` and notices the `deps: ["search"]` setting, which refers to `scripts/search.js`.  It then sees that `search` needs four files to work properly, all of which are listed in the `paths` object.

RequireJS loads these four files and `scripts/search.js` into the `<head>` tag, and in the proper order. If the `<script>` tag was loaded as close to the bottom of the page, all the files will usually load in a manner that doesn't slow down your site's/app's load time.

*(Side note: your project's RequireJS files can be concatenated and minified down to a single file, but discussing this is outside the scope of this post. The [RequireJS optimization docs](http://requirejs.org/docs/optimization.html "Learn about optimizing RequireJS") outline how to get this done.)*

This was the code that I wanted to integrate into WordPress...and  this was where I started running into problems. Understanding these problems "requires" an understanding a few things about WordPress.

<a name="bring-jquery-into-wordpress"></a>
## How I THOUGHT I Could Bring jQuery Into WordPress
While TwentyThirteen preloads jQuery and other JavaScript files into the site's HTML, the TwentyTwelve theme I was working with does not. I was fine with this because as the above example illustrates, you only need to load one `script` tag onto the page to get RequireJS working. 

As mentioned in the beginning, a default WordPress install contains jQuery other internal JS files. So I figured that I would just bring jQuery into my RequireJS configs by pointing to where WordPress placed it during install via the `paths` object:

{% prism javascript %}
paths: {
  // This ignores the 'baseURL' setting, but works
  http://kaidez.com/wp-includes/js/jquery/jquery.js,
  ...
}
{% endprism %}
This worked fine for my RequireJS setup but creates potential future problems inside of WordPress.
<a name="load-js-into-wordpress"></a>
## How To Load JavaScript Files Into WordPress
The JS files that WordPress contains but doesn't load into a theme's HTML are `registered` with WP, meaning that WP knows they exist. A registered file comes into the HTML file in one of two ways:

1. a WordPress plugin that needs jQuery loads it in.
2. a WordPress PHP function called ` wp_enqueue_script` loads onto the page.  This needs to be hand-written and should be placed in a custom `functions.php` file in your child theme...read more about [wp_enqueue_script](http://codex.wordpress.org/Function_Reference/wp_enqueue_script "Read more about wp_enqueue_script") and [functions.php](http://codex.wordpress.org/Functions_File_Explained "Read more about functions.php")

Once a registered file is loaded in like this, WordPress knows not to install it again.  In other words, if a WordPress plugin loads jQuery UI into the HTML, subsequent plugins requiring jQueryUI won't install it and will just use the one already installed.

Looking at my code snippet above, I didn't use any of these two methods...I just referred to the file in the `paths` object. This meant that WordPress had absolutely NO idea that jQuery was already on the site.

As a result, if I installed a WordPress plugin requiring jQuery, WP would load it into the HTML, meaning there would be two jQuery files on my page and that's not good. I was 99.99999% sure that I wouldn't be using such plugins and this would be a non-issue, but I wasn't 100% sure.

The safest thing to do was to use `wp_enqueue_script` to bring in jQuery. This would be done using the `functions.php` method just discussed:
{% prism php %}
<?php
function my_scripts_method() {
  wp_enqueue_script( 'jquery' );
}

add_action( 'wp_enqueue_scripts', 'my_scripts_method' );
?>
{% endprism %}

This kept the 































































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