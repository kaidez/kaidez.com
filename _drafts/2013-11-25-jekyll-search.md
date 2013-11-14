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
[Jekyll](http://jekyllrb.com/ "Go to the Jekyll blog engine site") generates static sites and not database-driven sites. This means that it can't provide the custom search functionality provided by content management systems like WordPress and Drupal.

A common solution to this problem is to create custom search functionality powered by either JavaScript or jQuery, but none of these solutions will work if the end-user disables JavaScript. This can create accessibility issues; therefore, this tutorial walks through how to create Jekyll search functionality with a fallback for situations where not only JavaScript is disabled, but also when CSS is disabled as well.

## Table of Contents
1. [Assumptions &amp; Notes](#assumptions-notes)
2. [The Various Versions Of Google CSE We Can Use For Our Fallback Code](#fallback-code)
3. [Start Putting Tipue Search On The Site](#start-tipue)

<a name="assumptions-notes"></a>
## Assumptions &amp; Notes

I'm assuming that you've got Jekyll already installed on your machine. If you don't, [the Jekyll installation documentation](http://jekyllrb.com/docs/installation/ "Read the Jekyll installation documentation") thoroughly walks through the process.

Some notes...

The proper way to test this code is to disable both JavaScript and CSS are __BEFORE__ the code runs in a browser.  Disabling JavaScript before page load in both Chrome and Firefox is easy enough using [Chris Pederick's Web Developer extension](http://chrispederick.com/work/web-developer/ "Get Chris Pederick's Web Developer extension")...Opera had issues.  Disabling CSS before page load is tricky...Pederick's tool disables it __AFTER__ page load, then CSS is enabled on page refresh. This [Stack Overflow post on disabling a browser's CSS](http://stackoverflow.com/questions/14046738/how-to-disable-css-in-browser-for-testing-purposes "Learn how to disable a browser's CSS") discusses how to do this for various browsers. Refer to that post when doing cross-browser testing before production deployments but for performing rapid tests while in development, I found the Firefox solution to be the easiest way to fully disable CSS (View &gt; Page Style &gt; No Style).

The fallback code used in this tutorial is provided by [Google Custom Search Engine (CSE)](https://www.google.com/cse/ "Learn about Google Custom Search Engine"), for which there are various versions. kaidez.com currently uses an older version that Google still supports...for now. The other versions work fine but don't provide the user experience I wanted to create while, at the same time, take accessibilty into consideration.  I go through all this versions in the next section, showing you the pros and cons for each and allowing you to make your own choice.

This tutorial is based on my implementing the [Tipue search jQuery plugin](http://www.tipue.com/search/ "Read more about Tipue Search") when I redesigned my site and while I'm very happy with it, I'm not suggesting that you use it. The point of the tutorial is to teach you how to apply a JavaScript-powered search for a Jekyll site and to create fallback search functionality if JavaScript and/or CSS is disabled, not push you towards the Javascript-based Jekyll search solution that I like. I list some other search solutions towards the end of this post.

Lastly, you may read this and some point and say "Isn't it easier to just place the fallback code inside a `<noscript>` tag?". No, because it doesn't always work.  Plus, if you're coding in XHTML instead of any version of HTML, `<noscript>` won't work at all. [The W3C HTML5 specification is clear about all this](http://www.w3.org/html/wg/drafts/html/master/scripting-1.html#the-noscript-element "Read the noscript section of the HTML5 specification").

<a name="fallback-code"></a>
## The Various Versions Of Google CSE We Can Use For Our Fallback Code
First, let's setup the Google CSE code that will run if either JavaScript or CSS is disabled. There are three versions: note that all versions place the code in a `<div>` tag, and that the first two give the `<div>` an id of `no-js-searchbox`. The latter point will be important when we implement our fallback code.

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

The downside with this version is that it's old and Google may block it from rendering search results someday. 
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

Note the setting of the `value` attribute in the first input tag: while version 1 just referenced a simple URL, version 2 requires a search engine ID. You must sign up with [Google CSE](https://www.google.com/cse/) for free to obtain a search engine ID.  A big advantage to this version is after you sign up, this version offers a higher level of customization for your search results page when compared to version 1.

For me, there are two downside with version 2...

The first downside is that version 2's search results page displays more ads and branding when compared to the search results page in version 1.

The second downside is this version needs JavaScript to return search results whereas version 1 did not. If you do a search using this search results box while JavaScript is *disabled*, you're taken to page that says the results can only be viewed unless JavaScript is *enabled*. The page also contains link that takes you a search results page that doesn't depend on on JavaScript and I guess that's good, but it ads another click to the end-user experience...I didn't want to include that on my site.

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

This is the current [CSE solution that Google recommends](http://googlecustomsearch.blogspot.com/2012/08/introducing-custom-search-element-v2.html "Read about the current Google CSE recommendation"). Note that the search engine ID is now placed inside a JavaScript variable instead of being applied to a tag attribute. It also provides the same level of customization that version 2 offers.

Version 3's downside is that it's a purely JavaScript solution that won't work if JavaScript is disabled...the searchbox won't even show up on the page.  We need a solution that works when JavaScript is disabled so this won't help us solve our problem.

To be honest: if you want search engine functionality on your Jekyll site, you really can just use one of these Google solutions and move on. I would use one of the first two and skip the third one since it won't work if JS is turned off which, again, is not good from an accessibilty standpoint.

The reason I did more than this was because I wanted to deliver a certain experience on kaidez.com: when people performed a search on the site, I wanted them to stay on the site. None of the CSE solutions did this so I went with Tipue

<a name="start-tipue"></a>
## Start Putting Tipue Search On The Site
We're going to begin implementing our Tipue code.  This is not the final code that we'll use, just a preview of how things will look after out final code is executed. 

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
</head>
<body>
  <div id="container" class="containerClass">
  <h1>Search here...</h1>
    <div id="searchbox">
      <form action="search.html">
        <input type="text" name="q" id="tipue_search_input" placeholder="Search...">
        <input type="submit" class="btnSearch" value="Search">    
      </form>
    </div>
    <div id="no-js-searchbox">
      <form action="http://google.com/search" method="get">
        <fieldset role="search">
          <!-- change the "value" attribute below to point to your site -->
          <input type="hidden" name="q" value="site:kaidez.com"/>
          <input class="search" type="text" name="q" results="0" placeholder="Search"/>
        </fieldset>
      </form> 
    </div>
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
</head>
<body>
  <div id="container" class="containerClass">
  <h1>Search Results</h1>
    <div id="searchbox">
      <form action="search.html">
        <input type="text" name="q" id="tipue_search_input" placeholder="Search...">
        <input type="submit" class="btnSearch" value="Search">    
      </form>
    </div>
    <div id="no-js-searchbox">
      <form action="http://google.com/search" method="get">
        <fieldset role="search">
          <!-- change the "value" attribute below to point to your site -->
          <input type="hidden" name="q" value="site:kaidez.com"/>
          <input class="search" type="text" name="q" results="0" placeholder="Search"/>
        </fieldset>
      </form> 
    </div>
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

__js/scripts.js__
{% prism javascript %}
(function(){

    // The Tipue-powered code that returns search results to
    // "search.html".
    $(function() {
      $('#tipue_search_input').tipuesearch();
    });
    
    // If JavaScript is enabled, this code will change the "no-js" 
    // class on the opening <html> element to "js". This code is stolen
    // from Modernizr so if Modernizr is already on your web page,
    // don't use this part of the code.
    var docElement = document.documentElement;
    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') + ('js');

})();
{% endprism %}

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