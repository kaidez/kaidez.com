---
title: 'TUTORIAL: Jekyll Search with Non-JavaScript/CSS Fallback'
comments: true
author: Kai Gittens
layout: post
meta-excerpt: jQuery-powered search functionality for a Jekyll site with fallback code if JS or CSS is disabled. Look at the demo before using the code.
permalink: /custom-jekyll-search/
category: tutorials
cat-name: "Tutorials"
has-home-img: require-wordpress.jpg
tags: [jekyll, jquery, accessibility, javascript, tute]
---  
[Jekyll](http://jekyllrb.com/ "Go to the Jekyll blog engine site") generates static sites, not dynamic database-driven sites. This means that it can't provide the custom site search functionality bundled into content management systems like [WordPress](http://wordpress.org/ "Go to wordPress.org")and [Drupal](https://drupal.org/ "Go to drupal.org").

A common alternative is to apply a search solution based around JavaScript, but this won't work if an end-user disables JS in their browser. This can lead to accessibility issues; therefore, this tutorial shows you how to not only create JS-powered search functionality, but also how to create a fallback search method for situations where either JavaScript or, as an added bonus, CSS is disabled.

## Table of Contents
1. [The Goal &amp; The Steps We'll Take](#goal-steps)
2. [One Assumption...Many Notes](#assumptions-notes)
3. [The Various Versions Of Google CSE](#various-google-cse-code)
4. [Start Putting Tipue Search On The Site](#start-tipue)

<a name="goal-steps"></a>
## The Goal &amp; The Steps We'll Take

The goal for this tutorial is to add JavaScript-powered search functionality to our Jekyll-powered site, functionality that gets automatically disabled if either JavaScript, CSS or both have been disabled in the browser. For those situations, we will create an alternative search method using code provided by Google.

The steps we'll take to achieve this are:

1. Create HTML pages that contains the code for the fallback search method. These pages will link to a JavaScript file that contains code which detects whether or not JavaScript is enabled in a web browser.

2. Use JavaScript to dynamically create the JS-powered search functionality...this will be done off-DOM first, then loaded onto the pages next.

3. Use JavaScript to detect whether or not CSS is enabled.

<a name="assumptions-notes"></a>
## One Assumption...Many Notes

The only assumption I'm making is that you have already installed Jekyll on your machine. If you don't, [the Jekyll installation documentation](http://jekyllrb.com/docs/installation/ "Read the Jekyll installation documentation") thoroughly walks through the process.

Some notes...

* Despite the one assumption, this search functionality isn't Jekyll-specific. All this is based on my personal Jekyll experiences and the fact that it's one of the most popular static site generators at the time of the post's publish date.  I haven't tested this code outside of a Jekyll project but as it's dependent on already-existing browser technologies and not any specific software, it should work for situations outside of Jekyll.

* The JavaScript-powered search in this is provided by the [Tipue search jQuery plugin](http://www.tipue.com/search/ "Read more about Tipue Search"), but you can use another option...I list some of these options towards the end of this post.

* The proper way to test this functionality is to disable both JavaScript and CSS __BEFORE__ the code runs in a browser.  Disabling JavaScript before page load in both Chrome and Firefox is easy enough with [Chris Pederick's Web Developer extension](http://chrispederick.com/work/web-developer/ "Get Chris Pederick's Web Developer extension")...Opera had issues.  But disabling CSS before page load is tricky: Pederick's tool disables it __AFTER__ page load.  CSS is enabled on page refresh after that, which isn't helpful. This [Stack Overflow post on disabling a browser's CSS](http://stackoverflow.com/questions/14046738/how-to-disable-css-in-browser-for-testing-purposes "Learn how to disable a browser's CSS") discusses how to do this for various browsers. Refer to that post when doing cross-browser testing before production deployments but for performing rapid tests while in development, both the Firefox and Safari methods seem to be the easiest way to disable CSS before page load. Firefox is *View &gt; Page Style &gt; No Style* while Safari is *Develop > Disable Styles*.

* The fallback code used in this tutorial is provided by [Google Custom Search Engine (CSE)](https://www.google.com/cse/ "Learn about Google Custom Search Engine"), which has multiple options. kaidez.com currently uses an older version that Google still supports...for now. The other versions work fine but don't provide the user experience I wanted to create while, at the same time, taking accessibility into consideration.  I go through all these options in the next section, showing you the pros and cons for each and allowing you to make your own choice. I could probably avoid going through all these options but since the tutorial's final code uses an option that Google doesn't currently recommend, I feel obliged to show you all the options.

* Lastly, you may read this and some point and say "Isn't it easier to just place the fallback code inside a `<noscript>` tag?"...nope, because it doesn't always work.  Plus, if you're coding in XHTML instead of any version of HTML, `<noscript>` won't work at all. [The W3C HTML5 specification is clear about all this](http://www.w3.org/html/wg/drafts/html/master/scripting-1.html#the-noscript-element "Read the noscript section of the HTML5 specification").

<a name="various-google-cse-code"></a>
## The Various Versions Of Google CSE
Let's start by reviewing the various versions of the Google CSE code. This tutorial uses version 1 for its fallback but sinces it's old, I want you to be aware of the newer, Google-recommended versions.

There are three versions: note that all versions place the code in a `<div>` tag and that the first two give the `<div>` an id of `no-js-searchbox`. The latter point will be important when we actually implement our fallback code.

### 1. Really Old CSE Code (what kaidez.com uses)
{% prism markup %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Search For Content</title>
</head>
<body>
  <h1>Search here...</h1>
  <div id="no-js-searchbox">
    <form action="http://google.com/search" method="get">
      <fieldset role="search">
        <!-- change the "value" attribute below to point to your site -->
        <input type="hidden" name="q" value="site:kaidez.com"/>
        <input class="search" type="text" name="q" results="0" placeholder="Search"/>
      </fieldset>
    </form> 
  </div>
</body>
</html>
{% endprism %}
This is the search fallback that I'm currently using on this site and I'm fine with it. Any searches entered into this searchbox return the search results in a standard Google search results page.

Note the setting of the `value` attribute in the first input tag: you would need to change this to whatever your site URL is.

The downside with this version is that it's old and Google may get rid of it someday. 
### 2. CSE Code That Isn't As Old as Example #1, But Is Still Old
{% prism markup %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Search For Content</title>
</head>
<body>
  <h1>Search here...</h1>
  <div id="no-js-searchbox">
    <form id="cse-search-box" action="http://google.com/cse">
      <!-- change the "value" attribute below to point to your search engine ID -->
      <input type="hidden" name="cx" value="partner-pub-7363372172009273:x2tstb3o6ga" />
      <input type="hidden" name="ie" value="UTF-8" />
      <input type="text" name="q" size="31" />
      <input type="submit" name="sa" value="Search" />
    </form>
    <img src="http://www.google.com/cse/images/google_custom_search_smwide.gif">
  </div>
</body>
</html>
{% endprism %}
If you *have* to use a `<form>` tag setup for CSE, Google prefers that you use this version. The code is not that much different from the version 1. 

Note the setting of the `value` attribute in the first input tag: while version 1 just referenced a simple URL, version 2 requires a search engine ID, which you can get for free after signing up with [Google CSE](https://www.google.com/cse/). A big advantage to this version is that it offers a higher level of customization than version 1.

For me, there are two downside with version 2...

The first downside is that version 2's search results page displays more ads and branding when compared to the search results page in version 1.

The second downside is this version needs JavaScript to return search results whereas version 1 did not. If you use this search box while JavaScript is *disabled*, you're taken to page that says search results can only be viewed unless JavaScript is *enabled*. The page also contains a link that takes you a search results page that doesn't depend on on JavaScript and I guess that's good, but it ads another click to the end-user experience...I didn't want to include that on my site.

### 3. CSE Code That Google Recommends
{% prism markup %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Search For Content</title>
</head>
<body>
  <h1>Search here...</h1>
  <div>
    <script>
      (function() {
        // change the value of the "cx" variable below to contain your search engine ID
        var cx = 'partner-pub-7363372172009273:x2tstb3o6ga';
        var gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//www.google.com/cse/cse.js?cx=' + cx;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
      })();
    </script>
    <gcse:search></gcse:search>
  </div>
</body>
</html>
{% endprism %}

This is [the current CSE solution that Google recommends](http://googlecustomsearch.blogspot.com/2012/08/introducing-custom-search-element-v2.html "Read about the current Google CSE recommendation")...an asynchronous JavaScript solution that provides the same level of customization that version 2 offers. Note that the search engine ID is now contained in a JavaScript variable instead of being applied to a tag attribute.

Version 3's downside is that it's a purely JavaScript solution that won't work if JavaScript is disabled...the searchbox won't even show up on the page.  We need a solution that works when JavaScript is disabled so this won't help us solve our problem.

To be honest: if you want search engine functionality on your Jekyll site, you really can just use one of these Google solutions and move on. I would use one of the first two and skip the third one since it won't work if JS is turned off which, again, is not good from an accessibilty standpoint.

The reason I did more than this was because I wanted to deliver a certain experience on kaidez.com: when people performed a search on the site, I wanted them to stay on the site. None of the CSE solutions did this so I went with Tipue while using version 1 for my fallback code.

<a name="start-tipue"></a>
## Start Putting Tipue Search On The Site
We're going to begin implementing our Tipue code.  This is not the final code that we'll use, just a preview of how things will look after out final code is executed. 

We're not going to review either the jQuery or Tipue plugin files as they don't play a role in the JSS/CSS detection process, but five other files do and we need to review them:

1. index.html
2. search.html
3. js/detect.js
4. css/styles.css
5. js/scripts.js

Let's look at the `html` files first:

__index.html__
{% prism markup %}
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
  <meta charset="UTF-8">
  <title>Search For Content</title>
  <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
  <link href="css/tipuesearch.css" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
  <script src="js/detect.js"></script>
</head>
<body>
  <div id="container" class="containerClass">
  <h1>Search here...</h1>

    <!-- Tipue Search box will go here -->
    <div id="searchbox"> </div>


    <!-- Google CSE search box starts here -->
    <div id="no-js-searchbox">
      <form action="http://google.com/search" method="get">
        <fieldset role="search">
          <!-- change the "value" attribute below to point to your site -->
          <input type="hidden" name="q" value="site:kaidez.com"/>
          <input class="search" type="text" name="q" results="0" placeholder="Search"/>
        </fieldset>
      </form> 
    </div>
    <!-- Google CSE search box ends here -->

  </div>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/libs/jquery-1.10.2.min.js"><\/script>')</script>
  <script src="js/tipuesearch_content.js"></script>
  <script src="js/tipuesearch_set.js"></script>
  <script src="js/tipuesearch.min.js"></script>
  <script src="js/scripts.js"></script>
  
</body>
</html>
{% endprism %}

__search.html__
{% prism markup %}
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
  <meta charset="UTF-8">
  <title>Search Results</title>
  <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
  <link href="css/tipuesearch.css" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
  <script src="js/detect.js"></script>
</head>
<body>
  <div id="container" class="containerClass">
  <h1>Search Results</h1>

    <!-- Tipue Search box will go here -->
    <div id="searchbox"> </div>

    <!-- Google CSE search box starts here -->
    <div id="no-js-searchbox">
      <form action="http://google.com/search" method="get">
        <fieldset role="search">
          <!-- change the "value" attribute below to point to your site -->
          <input type="hidden" name="q" value="site:kaidez.com"/>
          <input class="search" type="text" name="q" results="0" placeholder="Search"/>
        </fieldset>
      </form> 
    </div>
    <!-- Google CSE search box ends here -->

  </div>

  <div id="tipue_search_content"></div>
  
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/libs/jquery-1.10.2.min.js"><\/script>')</script>
  <script src="js/tipuesearch_content.js"></script>
  <script src="js/tipuesearch_set.js"></script>
  <script src="js/tipuesearch.min.js"></script>
  <script src="js/scripts.js"></script>

</body>
</html>
{% endprism %}

These files have similarities and differences:

* both files have a `no-js` class attached to the `<html>` element.

* both files reference the same three CSS files but the first two are only applying styles and have no affect on the Tipue search functionality. The last file, `css/styles.css`, has one selector called `.js #no-js-searchbox`, which does affect on the Tipue search functionality. We'll talk about all the JavaScript shortly.

* both files reference a file called `js/detect.js` which detects whether or not JavaScript is enabled. Again, we'll talk about all the JavaScript shortly.

* both files have HTML code for the Google searcg box but not the Tipue search box. As previously mentioned, we're going to use JavaScript to build it off-DOM first, then load it onto the page. We'll load it specifically into a web page element that's on each page called `<div id="searchbox"> </div>`.

* both files reference jQuery using the method popularized by [HTML5 Boilerplate](http://html5boilerplate.com/ "Review HTML5 Boilerplate front-end template") and the three JavaScript files needed to make the Tipue search functionality work. Both also contain a file called `js/scripts.js` which where we'll be placing our custom code. All these files are important but moving forward in this post, we'll be talking about `js/scripts.js` only.

* `search.html` has an extra tag: `<div id="tipue_search_content"></div>`. This is because when an end-user performs a search using our Tipue search box from anywhere on our site, search results are returned to the `search.html` page and listed within `<div id="tipue_search_content"></div>`.

__css/styles.css__
{% prism css %}
.js #no-js-searchbox {
  display: none;
}

body {
  font: 12px/1.7 'open sans', sans-serif;
}

h1 {
  text-align: center;
}

form {
  text-align: center;
}

.containerClass {
  margin: 0 auto;
  width: 900px;
}
{% endprism %}

Most of this is just styling for the `html` pages.  The important style is the first one: `.js #no-js-searchbox`.

This style will hide the Google CSE search when JavaScript is enabled *ONLY*.

__js/detect.js__
{% prism javascript %}
// If JavaScript is enabled, this code will change the "no-js" class on
// the opening <html> element to "js". This code is stolen from
// Modernizr so if Modernizr is already on your web page, don't use
// this part of the code.
var docElement = document.documentElement;
docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') + ('js');
{% endprism %}


__js/scripts.js__
{% prism javascript %}
(function(){

  // The Tipue-powered code that returns search results to
  // "search.html".
  $(function() {
    $('#tipue_search_input').tipuesearch();
  });

})();
{% endprism %}

<!-- 

        <form action="search.html">
        <input type="text" name="q" id="tipue_search_input" placeholder="Search...">
        <input type="submit" class="btnSearch" value="Search">    
      </form>

    -->
