---
title: 'Using RequireJS In WordPress'
comments: true
author: Kai Gittens
layout: post
meta-excerpt: Learn how to use RequireJS in WordPress. Includes a walk-through of how RequireJS works and how WordPress manages JavaScript internally.
permalink: /requirejs-wordpress/
category: coding-best-practices
cat-name: "Code Tips"
has-home-img: require-wordpress.jpg
tags: [RequireJS, Wordpress, jQuery, AMD, javascript]
---
As mentioned in [my 2013 site redesign post](/site-redesign-2013/ "A walk-through of how kaidez.com was redesigned"), I started redesigning this site on top of [WordPress](http://wordpress.org/ "Go to WordPress.org") but eventually switched over to [Jekyll](http://jekyllrb.com/ "Go to the Jekyll blog engine site"). This was because my goal was to use [RequireJS](http://requirejs.org/ "Go to requirejs.org") to control all the site's JavaScript in a specific way, and WordPress kept me from doing this.

The issue: my RequireJS setup needed to treat [jQuery](http://jquery.com/ "Check out the jQuery library") as a dependency for certain code modules. But a default WordPress install includes jQuery, and WP needs to manage it and other internal JS files in a manner that benefits its entire ecosystem: a manner that imposed limits on what I wanted RequireJS to do.

*(Side note: this post is long so if you're looking for a quick answer for using RequireJS inside of WordPress, go to the ["How To Use jQuery, RequireJS &amp; WordPress Together"](#jquery-requirejs-wordpress "How To Use jQuery, RequireJS &amp; WordPress Together") section.)*

## Table of Contents
1. [Assumptions &amp; Notes](#assumptions-notes)
2. [What Is RequireJS?](#what-is-requirejs)
3. [A RequireJS Example](#quick-requirejs-example)
4. [How I THOUGHT RequireJS Should Bring jQuery Into WordPress](#bring-jquery-into-wordpress)
5. [The RIGHT Way To Load jQuery Into WordPress](#load-js-into-wordpress)
6. [How To Use jQuery, RequireJS &amp; WordPress Together](#jquery-requirejs-wordpress)
7. [RequireJS/AMD, WordPress &amp; The Future?](#future-requirejs-amd-wordpress)
8. [Conclusion](#conclusion)

<a name="assumptions-notes"></a>
## Assumptions &amp; Notes
I'm making a few assumptions:

The main assumption is that you understand WordPress beyond configuring it inside the Dashboard. This post discusses adding code to WordPress files so you should be comfortable doing this. You should also understand that adjusting code in WP is relatively easy when using the [WordPress Codex](http://codex.wordpress.org/) as a reference.

All my initial RequireJS/WordPress work was done inside a child theme, a well-defined WP best practice, so I'm assuming you know how to implement this. If not, [the Child Theme docs in the WordPress Codex](http://codex.wordpress.org/Child_Themes "How to create a child theme in WordPress") clearly describe how it's done.

RequireJS is relatively new when compared to WordPress so I do walk through the former more that the latter, but it's still only a walk-through. RequireJS can do much more than the tasks discussed in this post so I'm assuming that you're curious about RequireJS and have no problem reading a few things to better understand it, starting with the [RequireJS API docs](http://requirejs.org/docs/api.html "Read the RequireJS API").

Some notes...

This post should *not* be looked as my stating that "WordPress is bad." WordPress is awesome and I will continue to use it, but it was not the way to go in order to meet the RequireJS-related goal I set for myself with this redesign. I discuss this at great length in [my site redesign post](/site-redesign-2013/#jekyll "Read about why kaidez.com switched from WordPress to Jekyll").

When I started working on the redesign, I was working with WordPress version 3.5.2. I then left for Jekyll and since that time, WordPress has released versions 3.6 and 3.7, the latter being released shortly before this post's publish date.

TwentyTwelve was the default theme for 3.5.2, and was what my child theme was based upon.  Both 3.6 and 3.7 use TwentyThirteen as its default theme, which loads JavaScript onto a WP site differently from TwentyTwelve and previous themes.

I did test *some* RequireJS things in version 3.6/TwentyThirteen and did no testing in version 3.7 testing at all because it was released roughly three weeks before this post's publish date. So this post's point of view is from using RequireJS inside a 3.5.2/TwentyTwelve setup, but what really matters is how WordPress pre-installs JS libraries and plugins before the themes actually use them. That, I have tested across all the versions and themes mentioned: the pre-install process is the same all around.

And finally, there were some RequireJS things that I struggled with at both the beginning and end of the redesign. I pile a ton of gratitude onto [Cary Landholt](https://twitter.com/carylandholt "Visit Cary Landholt's Twitter page") for helping me through the struggles.  Spending some time going through [Cary's YouTube screencasts](http://www.youtube.com/user/carylandholt "Watch Cary Landholt's YouTube screencasts") is time well spent, particularly his RequireJS ones that are geared for beginners. Also, his [GitHub page](https://github.com/CaryLandholt "Visit Cary Landholt's GitHub page") is full of top-notch code samples.

<a name="what-is-requirejs"></a>
## What Is RequireJS?
RequireJS is a script loader written in JavaScript that creates a dependency management system within your website or web app. It's based on the [Asynchronous Module Definition (AMD) specification](https://github.com/amdjs/amdjs-api/wiki/AMD) which defines a code pattern for loading JS files in an asynchronous, organized, non-blocking fashion.

Generally speaking, a RequireJS setup consists of two parts:

1. __A group of modules__: single units of JavaScript code that execute either a code block or a small group of closely-related code blocks. You can create multiple modules, with each module executing the code block(s).

2. __Configurations__: settings you pass to RequireJS so it can properly manage all the modules within your site or app, making sure everything works seamlessly.

The modules contain not only the code needed to run your task(s), but also lists the dependencies that this code needs to run the task(s). These dependencies are things like the core jQuery library and plugins

Based on the configurations, RequireJS asynchronously loads the modules and dependencies onto your site. Let's examine this further by looking at an example of how RequireJS works on kaidez.com.

<a name="quick-requirejs-example"></a>
## A RequireJS Example
This site's search functionality is powered by the [Tipue Search plugin for jQuery](http://www.tipue.com/search/ "Read more about Tipue Search"). It takes end-user searches and returns the search results based on the data in a JSON object containing the site content.

Tipue needs four separate JS files to work and should be listed in the following order on an HTML page:

1. `jquery.js`: the core jQuery library.
2. `tipuesearch_content.js`: the file that contains the JSON object with the site content.
3. `tipuesearch_set.js`: the file that sets rules for certain words inputed into the search field, rules such as "ignore words like 'the' and 'or' in search inputs".
4. `tipuesearch.js`: the core Tipue plugin code.

In the past, setting up this functionality usually meant placing all these files in `<script>` tags on your HTML page in the order above, then putting your custom Tipue code somewhere below them. RequireJS allows for an easier process.

First, we  add the only `<script>` tag we need...it should go as close to the bottom of the page as possible:
{% prism markup %}
<script data-main="scripts/config" src="scripts/require.js"></script>
{% endprism %}

The info in the `data-main` attribute refers to a file called `config.js` which contains the configurations. The `.js` is purposely left off  because RequireJS *always* assume that the info referenced in this attribute is a JavaScript file.  

`require.js` refers to the file containing the core RequireJS code.

Both files are in a directory called `scripts`.

The configurations in our `config.js` file look like this:

{% prism javascript %}
// We're only talking about creating one module here but this is
// the config setup for creating multiple modules. This is
// what's being discussed because it's common practice to use
// multiple modules in a site/app build.  The process for
// configuring a single module is discussed over at:
// http://requirejs.org/docs/api.html#define.

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

`deps` is an array of all the dependencies for our site or app.  The dependencies are the code modules that we talked about and are really just `.js` files.  Therefore, the `search` that's mentioned in the array is referring to a file called `search.js` and will contain the code needed to make Tipue work on the site.  We'll get to that code shortly and to be clear, `search.js` is located in the `scripts` folder.


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

`deps` tells RequireJS that the shimmed-in file needs jQuery to work properly. `exports`, a core [Node.js](http://nodejs.org/ "Learn more about Node.js") concept, properly exposes the shimmed-in file to RequireJS so it can treat it as a dependency based on the AMD spec.

Both the `tipueset` and `tipuesetContent` files listed in `paths` are also not AMD-compliant; however, they're just providing support for `tipue` to do its job instead of executing code. In this instance, there's no need to shim them.

jQuery also doesn't need to be shimmed in. This is because we're using version 1.10.2 and [jQuery has been AMD-compliant since version 1.7](http://blog.jquery.com/2011/11/03/jquery-1-7-released/ "Read about jQuery's support for AMD").

Now that our configs are set, we need to create the code that runs our Tipue search functionality. This goes into the `search.js` file that we referred to earlier in our `deps` array and looks like this:

{% prism javascript %}
define(["jquery","tipuesetContent","tipueset","tipue"], function($, tipuesetContent, tipueset, tipue) {

  $("#tipue_search_input").tipuesearch({
    "show": 10,
    "showURL": false,
    "highlightEveryTerm": true
  });

});
{% endprism %}

The `define()` method first defines all the code's dependencies in the array, then passes them as parameters for use by a callback function. Note that they're listed in the order outlined above: RequireJS will load things in this order.

The callback function contains our custom code, which does the following tasks:

* It takes the returned search results and places them in a page element with an id of `tipue_search_input`
* It will "show" 10 results per page.
* it will not "show the URL" for each result.
* It will "highlight" whatever the search term was by bolding it.

Our code is done. When our HTML page loads into a browser, `scripts/require.js` looks at the configurations in `scripts/config` and notices the `deps: ["search"]` setting, which refers to `scripts/search.js`.  It then sees that `search` needs four files to work properly, all of which are listed in the `paths` object.

RequireJS loads these four files and `scripts/search.js` into the `<head>` tag, and in the proper order. If the `<script>` tag is placed as close to the bottom of the page as possible, all the files will usually load in a manner that doesn't slow down your site's/app's load time. The code in `scripts/search.js` executes after everything loads.

*(Side note: your project's RequireJS files can be concatenated and minified down to a single file, but discussing this is outside the scope of this post. The [RequireJS optimization docs](http://requirejs.org/docs/optimization.html "Learn about optimizing RequireJS") outline how to get this done. Plus, Cary Landholt has [a great YouTube screencast on RequireJS Optimization](http://www.youtube.com/watch?v=m6VNhqKDM4E, "Check out Cary Landholt's screencast on optimizing RequireJS").)*

This was the code that I wanted to integrate into WordPress...and  this was where I started running into problems. Understanding these problems "requires" an understanding a few things about WordPress.

<a name="bring-jquery-into-wordpress"></a>
## How I THOUGHT RequireJS Should Bring jQuery Into WordPress
While TwentyThirteen preloads jQuery and other JavaScript files into the site's HTML, the TwentyTwelve theme I was working with does not. I was fine with this because as the above example illustrates, you only need to load one `script` tag onto the page to get RequireJS working.

As mentioned in the beginning, a default WordPress install contains jQuery other internal JS files. So I figured that I would just bring jQuery into my RequireJS configs by pointing to where WordPress placed it during install via the `paths` object:

{% prism javascript %}
paths: {
  // This ignores the 'baseURL' setting, but works well for Wordpress
  http://kaidez.com/wp-includes/js/jquery/jquery.js,
  ...
}
{% endprism %}
This worked fine for my RequireJS setup but creates potential future problems inside of WordPress.
<a name="load-js-into-wordpress"></a>
## The RIGHT Way To Load jQuery Into WordPress
The default WordPress install contains many JS file that are "registered," meaning that WP knows they exist but doesn't necessarily load them into the theme's HTML. jQuery is an unloaded registered file in TwentyTwelve so it can come into the HTML in one of two ways:

1. a WordPress plugin that needs jQuery loads it in during the plugin's install.
2. a WordPress PHP function called `wp_enqueue_script` loads it onto the page.  This needs to be hand-written and should be placed in a custom `functions.php` file in your child theme...read more about [wp_enqueue_script](http://codex.wordpress.org/Function_Reference/wp_enqueue_script "Read more about wp_enqueue_script") and [functions.php](http://codex.wordpress.org/Functions_File_Explained "Read more about functions.php")

Once a registered file is loaded in like this, WordPress knows not to install it again.  In other words, if jQuery loads into the HTML via either a plugin or `wp_enqueue_script`, subsequent plugins requiring jQuery won't install it and will just use the one already installed.

Looking at my code snippet above, I didn't use any of these two methods...I just referred to the file in the `paths` object. This meant that WordPress had absolutely NO idea that jQuery was already on the site.

As a result, if I installed a WordPress plugin requiring jQuery, WP would load it into the HTML, meaning there would be two jQuery files on my page and that's not good. I was 99.99999% sure that I wouldn't be using such plugins and this would be a non-issue, but I wasn't 100% sure.
<a name="jquery-requirejs-wordpress"></a>
## How To Use jQuery, RequireJS &amp; WordPress Together
With the 3.5.2/ TwentyTwelve setup, the safest thing to do was to use `wp_enqueue_script` to bring jQuery into the HTML. The code for this would be placed in the just-mentioned `functions.php` file and would look like this:
{% prism markup %}
<?php
function my_scripts_method() {
  wp_enqueue_script( 'jquery' );
}

add_action( 'wp_enqueue_scripts', 'my_scripts_method' );
?>
{% endprism %}

This loaded jQuery onto my page while preventing jQuery duplicates from loading, but I wasn't sure how to integrate this setup with my RequireJS functionality.

I surfed the web awhile looking for an answer, eventually posting something on RequireJS' GitHub Issue Tracker. It was at that point that RequireJS creator [James Burke gave me an answer](https://github.com/jrburke/requirejs/issues/622 "James Burke shows how to use RequireJS inside WordPress") so simple that to this day, I'm kicking myself for not figuring it out on my own:

> *"...if jquery is already in the page, what you could do is detect for it before doing [a] require() loading and set it up as the 'jquery' module value:*
{% prism javascript %}
if (typeof jQuery === 'function') {
  define('jquery', function () { return jQuery; });
}
//Now require your code:
require(['app'], function (){});
{% endprism %}
> *This assumes jquery was loaded before the require call. If so, then this approach means requirejs will not load another version of jquery."*

Yup...kicking myself for missing the obvious. Had I stuck with WordPress, I would apply `wp_enqueue_script` to jQuery in using the method above, then setup `search.js` like this:

{% prism javascript %}
if (typeof jQuery === 'function') {
  define('jquery', function () { return jQuery; });
}

define(["jquery","tipuesetContent","tipueset","tipue"], function($, tipuesetContent, tipueset, tipue) {

  $("#tipue_search_input").tipuesearch({
    "show": 10,
    "showURL": false,
    "highlightEveryTerm": true
  });

});
{% endprism %}

I tested this inside of WordPress and it worked like a charm, but I had to get jQuery on the page via `wp_enqueue_script`. This meant that jQuery would be placed in a `<script>` tag on my page and be excluded from my final RequireJS build.

This is, generally, not how RequireJS works and I was very stubborn about managing all my site's JavaScript with RequireJS so I could better understand how it works. It was at this point that I went over to Jekyll but if I ever need to use RequireJS and WordPress together, I would do so using the method above.

<a name="future-requirejs-amd-wordpress"></a>
## RequireJS/AMD, WordPress &amp; The Future?
RequireJS and AMD are gaining in popularity so integrating them into WordPress is worth a discussion. Web searches show some RequireJS implementations inside of WordPress by developers, but there's no indication from the core WP team that AMD functionality will be bundled in a future version.

An interesting discussion has built up around [a feature request ticket to bring AMD JavaScript loading into WordPress](http://core.trac.wordpress.org/ticket/23285 "Read the feature request to bring AMD into WordPress"). Referring primarily to jQuery, the discussion's main point is that the various WordPress plugins don't necessarily use the same versions of the JavaScript library. Some plugins require an older version of jQuery: creating an AMD system that allows plugin developers to load an older version is offered as a solution to the problem.

WordPress somewhat solved this problem with the release of the TwentyThirteen theme. The theme comes bundled with [jQuery Migrate](https://github.com/jquery/jquery-migrate/ "Go to main the jQuery Migrate page"), which detects and loads deprecated jQuery features. Plugin developers in need of jQuery's older features can take advantage of this, after testing things, of course.

At the same time, the core WordPress team encourages plugin authors to update their plugin code when one of their dependencies get updated. jQuery Migrate may be solving a problem, but the core team would prefer it if authors applied updates themselves...WordPress SEO plugin creator [Joost de Valk wrote a great post on this subject](http://yoast.com/why-we-dont-support-old-wordpress-versions/ "Read 'Why we don’t support old WordPress versions' by Joost de Valk").

Even if jQuery Migrate didn't solve this problem, I'm of the opinion that WordPress can't do much more than this right now. Integrating RequireJS or another AMD JavaScript solution is nice to have in WP, but not crucial to its growth and survival. And doing so would mean a major code rewrite of how WordPress already handles JavaScript, which is currently fine as is.

Simply put, WordPress is content management system meant to solve customer and business problems. It needs to be demonstrated that AMD/RequireJS can solve such a problems and until that happens, I can't see this functionality landing into WordPress...just my opinion on all this.

<a name="conclusion"></a>
## Conclusion
Bringing RequireJS into WordPress is possible, but you may have to make adjustments in some spots to make sure everything works. That's a natural occurrence in web development though, so feel free to review the many links above and go ahead and do so.
