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
[Jekyll](http://jekyllrb.com/ "Go to the Jekyll blog engine site") is a static site generator: it creates static sites and not dynamic, database-driven ones. This means that it doesn't contain the search functionality that's commonly bundled into CMS software like [WordPress](http://wordpress.org/ "Go to wordPress.org") and [Drupal](https://drupal.org/ "Go to drupal.org").

For static site generators, a common solution to this problem is to use a search solution based on JavaScript, but this won't work if the end-user has disabled JS in their browser. Search is vital nowadays so this tutorial shows you how to not only implement JS-powered search functionality, but also how to create a fallback search method for situations where either JavaScript or, as an added bonus, CSS is disabled.

## Table of Contents
1. [The Steps We Need To Take](#steps)
2. [One Assumption...Many Notes](#assumptions-notes)
3. [The Fallback Google CSE](#fallback-google-cse-code)
4. [A Very Quick Tipue Walkthrough](#tipue-walkthrough)
5. [Step 1: Add the JavaScript Detection &amp; Fallback Code to HTML Pages](#build-pages)
6. [Dynamically Create the JS-powered Search Functionality](#create-javascript-search)

<a name="steps"></a>
## The Steps We Need To Take
To acheive our goal, the steps we need to take are:

1. __Step 1: Add the JavaScript Detection &amp; Fallback Code to HTML Pages__: These pages will link to JavaScript and CSS files working together to check for the presence of JavaScript, and will also contain our fallback code. ([jump to this section](#build-pages))

2. __Dynamically Create the JS-powered Search Functionality__: We'll create it off-DOM first, then load it onto the pages next.

3. __Use JavaScript to Detect whether or not CSS is enabled__: This will be walked through in great detail.

<a name="assumptions-notes"></a>
## One Assumption...Many Notes

The only assumption I'm making is that you have already installed Jekyll on your machine. If you don't, [the Jekyll installation documentation](http://jekyllrb.com/docs/installation/ "Read the Jekyll installation documentation") thoroughly walks through the process.

Some notes...

* Despite the one assumption, this search functionality isn't Jekyll-specific. All this is based on my personal Jekyll experiences, and the fact that it's one of the most popular static site generators at the time of the post's publish date. I haven't tested this code outside of Jekyll but as it's dependent on already-existing browser technologies and not any specific software, it should work for situations outside of Jekyll.

* The JavaScript-powered search in this tutorial is provided by the [Tipue search plugin for jQuery](http://www.tipue.com/search/ "Read more about Tipue Search") but this post does not go into great detail on how of Tipue works. It bullet points what the code is doing but that's it...[read the Tipue documentation](http://www.tipue.com/search/docs/ "Read the Tipue documentation") to fully understand how Tipue works. Also, I like Tipue but this tutorial should work with other JS-powered search solutions. I list some of these options towards the end of this post.

* The proper way to test this functionality is to disable both JavaScript and CSS __BEFORE__ the code runs in a browser.  Disabling JavaScript before page load in both Chrome and Firefox is easy enough with [Chris Pederick's Web Developer extension](http://chrispederick.com/work/web-developer/ "Get Chris Pederick's Web Developer extension")...Opera had issues.  But disabling CSS before page load is tricky: Pederick's tool disables it __AFTER__ page load, then CSS is enabled on page refresh after that, which won't render a proper test. This [Stack Overflow post on disabling a browser's CSS](http://stackoverflow.com/questions/14046738/how-to-disable-css-in-browser-for-testing-purposes "Learn how to disable a browser's CSS") discusses how to do this for various browsers. Refer to it when doing cross-browser testing before production deployments but for performing rapid tests while in development, both the Firefox and Safari methods seem to be the easiest way to disable CSS before page load. Firefox is *View &gt; Page Style &gt; No Style* while Safari is *Develop > Disable Styles*.

* At some point while reading this, you may say to yourself, "Isn't it easier to just place the fallback code inside a `<noscript>` tag?"...yes, but it doesn't always work.  Plus, if you're coding in XHTML instead of any version of HTML, `<noscript>` won't work at all. [The W3C's HTML5 specification is clear about all this](http://www.w3.org/html/wg/drafts/html/master/scripting-1.html#the-noscript-element "Read the noscript section of the HTML5 specification").

<a name="fallback-google-cse-code"></a>
## The Fallback Google CSE

Our fallback code comes from [Google Custom Search Engine (CSE)](https://www.google.com/cse "Learn more about Google Custom Search Engine (CSE)"), which comes in three versions at the time of this post. This tutorial uses the oldest version as it best suits our needs and although it's old, it's still widely in use, particularly on sites that run [the Octopress framework for Jekyll](http://octopress.org/ "Learn about the Octopress framework for Jekyll").

[The second version](https://support.google.com/customsearch/answer/1351747?hl=en "Read Google's recommended way to use Google CSE with a form tag") is very similar to the first version and works when JavaScript is disabled, but adds an extra click-through to the user experience when compared to the first one...not what we want. [The third version is what Google currently recommends](http://googlecustomsearch.blogspot.com/2012/08/introducing-custom-search-element-v2.html "Read the official recommendation for Google CSE search boxes") but is a pure JavaScript version that won't work if JS is disabled...also, not what we want.

Let's look at the code that we'll be using...version 1:

{% prism markup %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Search For Content</title>
</head>
<body>
  <h1>Search here...</h1>
  <form action="http://google.com/search" method="get">
    <fieldset role="search">
      <!-- change the "value" attribute below to point to your site -->
      <input type="hidden" name="q" value="site:kaidez.com"/>
      <input class="search" type="text" name="q" results="0" placeholder="Search"/>
    </fieldset>
  </form> 
</body>
</html>
{% endprism %}
Note the setting of the `value` attribute in the first input tag: you would need to change this to whatever your site URL is. Once that's done, any searches entered into this searchbox returns the results for that site, and within a standard Google search results page. 

To be honest: if you want search engine functionality on your static site, you really can just apply a Google CSE solution and move on. The reason I went beyond Google CSE was because I wanted to deliver a certain experience on kaidez.com: when people performed a search on my site, I wanted them to stay on my site. 

None of the CSE solutions did that so I went with Tipue while using Google CSE version 1 for my fallback code.

<a name="tipue-walkthrough"></a>
## A Very Quick Tipue Walkthrough
Very quick...

Tipue is jQuery plugin that provides static search. The search results must be returned to a properly-configured `search.html` page.

Along with the `search.html` page, Tipue also needs five JS files to work and they should be listed in the following order:

1. the core jQuery library.
2. `tipuesearch_content.js`, which contains the searchable site data that's returned to `search.html`
3. `tipuesearch_set.js`, which filters words and phrases in the search results.
4. `js/tipuesearch.min.js`, which is the core Tipue code.
5. a files that actually executes the Tipue code and returns searches to the end-user: this file will be represented as `js/scripts.js` in this tutorial and we'll discuss shortly.

<a name="build-pages"></a>
## Step 1: Add the JavaScript Detection &amp; Fallback Code to HTML Pages
We need to layout our pages and add references to both `.css` and more `.js` files. We're not going to review any of the just-mentioned Tipue files as they don't play a role in the JSS/CSS detection process, but five other files do and we need to review them:

1. index.html
2. search.html
3. css/styles.css
4. js/detect.js
5. js/scripts.js

Let's start with`index.html`:

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

The key parts of the file:

* A `no-js` class is attached to the `<html>` element. This will help us detect whether or not JavaScript is disabled.

* There are three CSS files but the first two are only applying generic styles and don't help us in achieving our goal. The last file, `css/styles.css`, also applies some generic styling but has one selector called `.js #no-js-searchbox`, which does help us in achieving our goal.

* There's a file called `js/detect.js` which detects whether or not JavaScript is enabled.

* The Google search box is on the page and has an id name of `no-js-searchbox`. It's partially being targeted by the `.js #no-js-searchbox` selector we just talked about...this may not make sense now, but it will shortly.

* The Tipue search box is *not* on the page. As previously mentioned, we're going to use JavaScript to build it off-DOM first, then load it onto the page. We'll load it specifically into an element on page called `<div id="searchbox"></div>`.

* Among the Tipue-related files we discussed earlier, we now see `js/scripts.js`. It currently contains the code needed execute Tipue's searches and will be the place where we add both our off-DOM and JS detection code.

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

Again, `search.html` is the page where Tipue returns the search results.  It's similar to `index.html` but it has an extra tag: `<div id="tipue_search_content"></div>`. This is the spot where Tipue returns the search results.

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

As mentioned, the `.js #no-js-searchbox` is the key class here...the rest of the styles just add generic styling. This style will hide the Google CSE search when JavaScript is enabled *ONLY*...let's now see how this is done.


__js/detect.js__
{% prism javascript %}
// If JavaScript is enabled, this code will change the "no-js" 
// class on the opening <html> element to "js". This code is stolen
// from Modernizr so if Modernizr is already on your web page,
// don't use this part of the code.

// This code is one file because it's a best practice as per the
// Content Security Policy. Mike West breaks CSP down really well at:
// http://bit.ly/KzGWUZ. Also make sure to read the CSP W3C spec at: 
// http://bit.ly/vCQbiW
var docElement = document.documentElement;
docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') + ('js');
{% endprism %}

A very important piece of our code:

`var docElement` is storing a short-hand reference to `document.documentElement`, which is a DOM reference to our page's `<html>` tag. `docElement.className` is a reference to the tag's only class: `no-js`.

A regular expression search is run against `docElement.className` when the page loads. When the search finds the text "no-js", it replaces it with the text "js".

Our HTML tag will now look like this:

`<html lang="en" class="js">`

Because of the class name change and because of [CSS descendant selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_selectors "Read about CSS descendant selectors"), the `.js #no-js-searchbox` selector will work and set our Google CSE search box to `display:none`. But if JavaScript is disabled, the regular expression search won't happen.

If the regular expression search doesn't happen, it means that the `no-js` class will remain in the `<html>` tag and that the `.js #no-js-searchbox` selector cannot be applied; in other words, *__if JavaScript is diabled, the Google CSE search box, so the search box will be visible.__* This is exactly what we want.

As the comments say, this code is currently built into [Modernizr](http://modernizr.com/, "Read about the Modernizr feature detection library") so if Modernizr's already on your page, you don't need this code.

Also, it's suggested that Modernizr be placed in the `<head>` tag so it can do work before the DOM starts loading. We're treating this piece of code the same way for the same reason.

And as noted in the comments, this code is placed in its own JS file instead of inline because it's a best practice as per the Content Security Policy (CSP) that's starting to gain a consensus. Mike West's [Content Security Policy article on HTML5 Rocks](http://www.html5rocks.com/en/tutorials/security/content-security-policy/) breaks it down really well and you should [read the W3C's Content Security Policy spec](http://www.w3.org/TR/CSP/ "Read the W3C's Content Security Policy spec") sooner than later.

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
This file is just running our Tipue search code, which has absolutely nothing to do with the JS/CSS detection. But again, it's where we're going to add our remaining code and it's the only file we're really going to talk for the rest of this post.

At this point we've established the basic structure for our pages as well as our system for detecting whether JavaScript is enabled or not. We also understand that if JavaScript is disabled, the Google search box will be visible.

Let's now go to step two and build our Tipue search functionality.

<a name="create-javascript-search"></a>
## Dynamically Create the JS-powered Search Functionality](#create-javascript-search)

We now need to create the Tipue search box with JavaScript off-DOM, then load it onto the page. Specifically, we need to create code on both of our web pages that looks like this:
{% prism markup %}
<form action="search.html">
  <input type="text" name="q" id="tipue_search_input" placeholder="Search...">
  <input type="submit" class="btnSearch" value="Search">    
</form>
{% endprism %}

So the JavaScript way to create it and also load it onto the pages will be added to our already-existing `js/scripts.js` file and will look like this:
{% prism javascript %}
(function(){

  // The Tipue-powered code that returns search results to
  // "search.html".
  $(function() {
    $('#tipue_search_input').tipuesearch();
  });

  var loadSearchBox = document.getElementById("searchbox"),
    frag = document.createDocumentFragment(),
    form = document.createElement("form"),
    searchTextBox = document.createElement("input"),
    searchButton = document.createElement("input");
    
  // set attributes for form
  form.action = "search.html";
  form.setAttribute("role", "search");

  // set attributes for Search text box
  searchTextBox.type = "text";
  searchTextBox.name = "q";
  searchTextBox.id = "tipue_search_input";
  searchTextBox.placeholder = "Search...";

  // set attributes for Submit button
  searchButton.type = "submit";
  searchButton.setAttribute("class", "btnSearch");
  searchButton.value = "Search";

  // Arrange elements
  form.appendChild(searchTextBox);
  form.appendChild(searchButton);

  // Load arranged elements into document fragment
  frag.appendChild(form);

  // Load document fragment into #searchbox, which is already on the page
  loadSearchBox.appendChild(frag);
    
})();
{% endprism %}
<!-- 

Hiding elements using `display:none` is generally frowned upon from an accessibility standpoint. [The Yahoo! dev team has recommended another method since 2010](http://developer.yahoo.com/blogs/ydn/clip-hidden-content-better-accessibility-53456.html) but implementing it would mean that the Google search box would be picked up by a screen reader. 

Note that hiding elements with `display:none` is not a best practice...hiding them using the [the Yahoo! dev team has recommendation](http://developer.yahoo.com/blogs/ydn/clip-hidden-content-better-accessibility-53456.html) is the recommended way to do it. But the Yahoo! implementation makes the CSE searchbox viewable to both screen readers and tab-throughs. So if JS is enabled and loads up our Tipue sear it would mean that the Google search box would be picked up by a screen reader.  

-->
