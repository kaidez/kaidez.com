---
title: 'TUTORIAL: Jekyll Search with Non-JavaScript/CSS Fallback'
comments: true
author: Kai Gittens
layout: post
meta-excerpt: jQuery-powered search functionality for a Jekyll site with fallback code if JS or CSS is disabled. Look at the demo before using the code.
permalink: /custom-jekyll-search/
category: tutorials
cat-name: "Tutorials"
has-home-img: jekyllSearchPostImage.jpg
tags: [jekyll, jquery, accessibility, javascript, tutorial]
---
<a href="/samples/jekyll-search/" class="demoLink" target="blank">VIEW THE DEMO</a>

[Jekyll](http://jekyllrb.com/ "Go to the Jekyll blog engine site") is a static site generator: it creates static sites instead of database-driven ones. This means that it doesn't contain the site search functionality commonly bundled into CMS software like [WordPress](http://wordpress.org/ "Go to wordpress.org") and [Drupal](https://drupal.org/ "Go to drupal.org").

A common solution to this problem is to use some sort of JavaScript-based search functionality, but this won't work if the end-user has disabled JS in their browser. This tutorial shows you how to not only add JS-powered search functionality to your static site, but also how to create a fallback search method for situations where either JavaScript or, as an added bonus, CSS is disabled.

## Table of Contents
1. [The Three Steps We Need To Take](#three-steps)
2. [One Assumption...More Notes](#assumptions-notes)
3. [The Fallback Search Code](#fallback-search-code)
4. [A Very Quick Tipue Walkthrough](#tipue-walkthrough)
5. [Step 1: Add the JavaScript Detection &amp; Fallback Code to HTML Pages](#build-pages)
6. [Step 2: Dynamically Create the JS-powered Search Functionality](#create-javascript-search)
7. [Step 3: Use JavaScript to Detect if CSS is Disabled](#css-detection)
8. [More Notes](#notes)
9. [Conclusion](#conclusion)

<a name="three-steps"></a>
## The Three Steps We Need To Take
There are three steps we need to take to acheive our goal:

1. __Add the JavaScript Detection &amp; Fallback Code to HTML Pages__: These pages will link to JavaScript and CSS files working together to check for the presence of JavaScript, and will also contain our fallback search functionality, courtesy of Google.

2. __Dynamically Create the JS-powered Search Functionality__: We'll create it off-DOM first, then load it onto the pages next.

3. __Use JavaScript to Detect if CSS is Disabled__: With JavaScript, we'll create code that provides the Google fallback search for times when CSS is disabled, but JavaScript is not. Because CSS is disabled, the Google page that returns the search results will not look pretty, but the results will be returned nonetheless.

<a name="assumptions-notes"></a>
## One Assumption...More Notes

Since we're talking about creating search for static sites, the only assumption I'm making is that you have either Jekyll or some other static site software installed on your machine, and that you use it regularly.

Some notes...

* Expanding on the one assumption, let's be clear that the search functionality being described here isn't Jekyll-specific. This post is based on my personal Jekyll experiences. I haven't tested this code outside of Jekyll but as it's dependent on already-existing browser technologies and not any specific software, it should work for situations outside of Jekyll.

* The proper way to test this functionality is to disable both JavaScript and CSS __BEFORE__ the code runs in a browser.  Disabling JavaScript before page load in either Chrome or Firefox is easy enough with [Chris Pederick's Web Developer extension](http://chrispederick.com/work/web-developer/ "Get Chris Pederick's Web Developer extension").  But Pederick's tool currently can't disable CSS before page load. It can disable it afterwards but it won't stay disabled: CSS will be re-enabled after a page refresh and that doesn't help us. This [Stack Overflow post on disabling a browser's CSS](http://stackoverflow.com/questions/14046738/how-to-disable-css-in-browser-for-testing-purposes "Learn how to disable a browser's CSS") discusses how to do this for various browsers. Refer to it when doing cross-browser testing before production deployments but for performing rapid tests while in development, both the Firefox and Safari methods seem to be the easiest way to disable CSS before page load. Firefox is __*View &gt; Page Style &gt; No Style*__ while Safari is __*Develop > Disable Styles*__.

* The JavaScript-powered search in this tutorial is provided by the [Tipue search plugin for jQuery](http://www.tipue.com/search/ "Read more about Tipue Search") but this post does not go into great detail on how of Tipue works. It bullet points what the code is doing to provide context for this tutorial, but that's it.  [Read the Tipue documentation](http://www.tipue.com/search/docs/ "Read the Tipue documentation") to fully understand how it works. Also, this method should work using static site search solutions other than Tipue: you will have to make code adjustments in some places, but it should still work.

* At some point while reading this, you may say to yourself, "Isn't it easier to just place the fallback code inside a `<noscript>` tag?"...maybe, but that doesn't always work.  Plus, if you're coding in XHTML instead of any version of HTML, `<noscript>` won't work at all. [The W3C's HTML5 specification is clear about all this](http://www.w3.org/html/wg/drafts/html/master/scripting-1.html#the-noscript-element "Read the noscript section of the HTML5 specification").

<a name="fallback-search-code"></a>
## The Fallback Search Code
Before we get to the three steps, we need to understand some things about the fallback code...

Our fallback search functionality comes from [Google Custom Search Engine (CSE)](https://www.google.com/cse "Learn more about Google Custom Search Engine (CSE)"), which comes in three versions at the time of this post. This tutorial uses the oldest version as it best suits our needs and although it's old, it's still widely in use, particularly on sites using [the Octopress framework for Jekyll](http://octopress.org/ "Learn about the Octopress framework for Jekyll").

[The second version](https://support.google.com/customsearch/answer/1351747?hl=en "Read Google's recommended way to use Google CSE with a form tag") is very similar to the first version and works when JavaScript is disabled, but adds an extra click-through to the user experience when compared to the first one...not what I wanted. [The third version is what Google currently recommends](https://developers.google.com/custom-search/docs/element "Read the official recommendation for Google CSE search boxes") but is a pure JavaScript version that won't work if JS is disabled...also, not what I wanted.

Let's look at version 1 of the code we'll be using:

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
      <input type="hidden" name="q" value="site:yoursite.com"/>
      <input class="search" type="text" name="q" results="0" placeholder="Search"/>
    </fieldset>
  </form> 
</body>
</html>
{% endprism %}
Note the setting of the `value` attribute in the first `<input>` tag: "yoursite.com". You would need to change this to whatever your site URL is. Once that's done, any searches entered into this searchbox will return the results for that site, and return them inside a standard Google search results page. 

To be honest: if you want search engine functionality on your static site, you really can just apply a Google CSE solution and move on. The reason I went beyond Google CSE was because I wanted to deliver a certain experience on kaidez.com: when people performed a search on my site, I wanted them to stay on my site. 

None of the current CSE solutions do this, so I went with Tipue while using version 1 for my fallback code.

<a name="tipue-walkthrough"></a>
## A Very Quick Tipue Walkthrough
Very quick...

Tipue is a jQuery plugin that provides static search. The search results must be returned to a properly-configured `search.html` page.

Along with the `search.html` page, Tipue also needs five JS files to work and they should be listed in the following order:

1. the core jQuery library.
2. `tipuesearch_content.js`, which contains the searchable site data that's returned to `search.html`
3. `tipuesearch_set.js`, which filters words and phrases in the search results.
4. `js/tipuesearch.min.js`, which is the core Tipue code.
5. a file containing the executable Tipue code that returns search results to `search.html`...this code will be placed in a file called `js/scripts.js` and we'll discuss it shortly.

<a name="build-pages"></a>
## Step 1: Add the JavaScript Detection &amp; Fallback Code to HTML Pages
We need to create web pages that include references to both a `.css` file and two more `.js` files. We're not going to review any of the Tipue-related files we just discussed as they don't play a role in the JS detection process, but these other files do play a role:

* index.html
* search.html
* css/styles.css
* js/detect.js
* js/scripts.js

Let's review these files...

__index.html__
{% prism markup %}
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
  <meta charset="UTF-8">
  <title>Search For Content</title>
  <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
  <link href="css/tipuesearch.css" rel="stylesheet">
  <link href="css/styles.css" rel="stylesheet">
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
          <input type="hidden" name="q" value="site:yoursite.com"/>
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

* A `no-js` class is attached to the `<html>` element. This will help us detect whether or not JavaScript is enabled.

* There are three CSS files but the first two are just there as per Tipue documentation...they load in Google Fonts, apply some styling and don't play a role in the detection process. The last file, `css/styles.css`, also applies some styling but contains a selector called `.js #no-js-searchbox`, which plays a HUGE role in the detection process.

* There's a file called `js/detect.js` which detects whether or not JavaScript is enabled.

* The Google search box is on the page and has an id name of `no-js-searchbox`. It's partially being targeted by the `.js #no-js-searchbox` selector we just talked about...this may not make sense now, but it will shortly.

* The Tipue search box is *not* on the page. As previously mentioned, we're going to use JavaScript to build it off-DOM first, then load it onto the page. We'll load it specifically into a page element called `<div id="searchbox"></div>`.

* `js/scripts.js` is also on the page and we'll soon see that for now, it only contains the code needed to execute Tipue searches. But as we move forward, it will be the place where we add both the code needed to build things off-DOM and our JS detection code.

__search.html__
{% prism markup %}
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
  <meta charset="UTF-8">
  <title>Search Results</title>
  <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
  <link href="css/tipuesearch.css" rel="stylesheet">
  <link href="css/styles.css" rel="stylesheet">
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
          <input type="hidden" name="q" value="site:yoursite.com"/>
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

Again, `search.html` is the page where Tipue returns the search results.  It's similar to `index.html` but has an extra tag: `<div id="tipue_search_content"></div>`. This is the page element where Tipue places the search results.

__css/styles.css__
{% prism css %}
.js #no-js-searchbox {
  display: none;
}

/* 
 * The code below is just applying styles and has nothing to do with
 * the CSS/JS detection process. 
 */
body {
  font: 12px/1.7 'open sans', sans-serif;
}

h1 {
  text-align: center;
}

form, p {
  text-align: center;
}

.containerClass {
  margin: 0 auto;
  width: auto;
}
{% endprism %}

As mentioned, the `.js #no-js-searchbox` is the key class here...the rest of the styles just add generic styling. `.js #no-js-searchbox` will hide the Google CSE search *only when JavaScript is enabled*...let's start breaking down how that's done.

__js/detect.js__
{% prism javascript %}
// This code is stolen from Modernizr so if Modernizr is already on
// your web page, don't use this part of the code.

// This code is one file and not inline because it's a best practice as
// per the Content Security Policy (CSP). Mike West breaks CSP down really
// well over at: http://bit.ly/KzGWUZ. Also make sure to read the CSP
// W3C spec at: http://bit.ly/vCQbiW

var docElement = document.documentElement;
docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') + ('js');
{% endprism %}

A very important piece of our code:

`var docElement` is storing a short-hand reference to `document.documentElement`, which is a reference to our page's `<html>` tag. `docElement.className` is a reference to the tag's only class: `no-js`.

A regular expression search is run against `docElement.className` when the page loads. When the search finds the text "no-js", it replaces it with the text "js".

Our HTML tag will now look like this:

`<html lang="en" class="js">`

Because of the class name change and because of [CSS descendant selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_selectors "Read about CSS descendant selectors"), the `.js #no-js-searchbox` selector will work and set our Google CSE search box to `display:none`. But if JavaScript is disabled, the regular expression search won't happen.

If the regular expression search doesn't happen, it means that the `no-js` class will remain in the `<html>` tag and that the `.js #no-js-searchbox` selector cannot be applied; in other words, *__if JavaScript is disabled, the Google CSE search box will be visible.__* This is exactly what we want.

As the comments say, this code is currently built into [Modernizr](http://modernizr.com/ "Read about the Modernizr feature detection library") so if Modernizr's already on your page, you don't need this code.

Also, it's suggested that Modernizr be placed in the `<head>` tag so it can do work before the DOM starts constructing the page content. We're treating this piece of code the same way for the same reason.

And as noted in the comments, this code is placed in its own JS file instead of inline because it's a best practice as per the Content Security Policy (CSP) that's starting to gain a consensus. Mike West's [Content Security Policy article on HTML5 Rocks](http://www.html5rocks.com/en/tutorials/security/content-security-policy/) breaks it down really well but you should still [read the W3C's Content Security Policy spec](http://www.w3.org/TR/CSP/ "Read the W3C's Content Security Policy spec") sooner than later.

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

At this point we've established the basic structure for our pages as well as our system for detecting whether or not JavaScript is enabled. We also understand that if JavaScript is disabled, the Google search box will be visible.

Let's now go to step two and build our Tipue search functionality.

<a name="create-javascript-search"></a>
## Step 2: Dynamically Create the JS-powered Search Functionality

We now need to create the Tipue search box off-DOM with JavaScript, then load it onto the page. Specifically, we need to create a form on both pages that looks like this:
{% prism markup %}
<form action="search.html" role="search">
  <input type="text" name="q" id="tipue_search_input" placeholder="Search...">
  <input type="submit" value="Search">    
</form>
{% endprism %}

We'll add this code to our already-existing `js/scripts.js` file so it will now look like this:
{% prism javascript %}
(function(){

  // Tipue code
  $(function() {
    $('#tipue_search_input').tipuesearch();
  });

  var loadSearchBox = document.getElementById("searchbox"),
    frag = document.createDocumentFragment(),
    form = document.createElement("form"),
    searchTextBox = document.createElement("input"),
    searchButton = document.createElement("input");
    
  form.action = "search.html";
  form.setAttribute("role", "search");

  searchTextBox.type = "text";
  searchTextBox.name = "q";
  searchTextBox.id = "tipue_search_input";
  searchTextBox.placeholder = "Search...";

  searchButton.type = "submit";
  searchButton.value = "Search";

  form.appendChild(searchTextBox);
  form.appendChild(searchButton);

  frag.appendChild(form);

  loadSearchBox.appendChild(frag);
    
})();
{% endprism %}

We already know what the Tipue code is doing so let's look at the "build the search box code"...

{% prism javascript %}
var loadSearchBox = document.getElementById("searchbox"),
  frag = document.createDocumentFragment(),
  form = document.createElement("form"),
  searchTextBox = document.createElement("input"),
  searchButton = document.createElement("input");
{% endprism %}

We're using a [single var pattern](http://tech.diaslopes.com/?p=51 "Learn more about the single var pattern") to create five variables:

* `loadSearchBox` is a variable reference to `<div id="searchbox"></div>`, which is already on our pages.
* `frag` is a variable reference to a newly created document fragment, which is basically a virtual box created in browser memory.
* `form`, `searchTextBox` and `searchButton` are variable references to newly-created page elements: specifically a `<form>` tag and two `<input>` tags.

{% prism javascript %}
form.action = "search.html";
form.setAttribute("role", "search");
{% endprism %}

We have to apply attributes to our three newly-created page elements, starting with the `<form>` tag. We're setting the tag's `action` attribute to `search.html` (which targets Tipue's search results page) and setting its `role` attribute to `search` (which is good from a web semantics standpoint).

The end result of all this is a form tag which, from a code perspective, looks like this: `<form action="search.html" role="search"></form>`

{% prism javascript %}
searchTextBox.type = "text";
searchTextBox.name = "q";
searchTextBox.id = "tipue_search_input";
searchTextBox.placeholder = "Search...";
{% endprism %}

We next have to apply attributes to our first input element.  The main thing we have to do is turn it into a text box: that happens with the `searchTextBox.type = "text"` line of code.

Both `searchTextBox.name = "q"` and `searchTextBox.id = "tipue_search_input"` are what's being done as per the Tipue documentation, so let's never change that code. `searchTextBox.placeholder = "Search..."` can be changed and even removed if you want to...I would change it but never remove it as it's a great visual cue for end-users.

The end result of all this is an input tag which, from a code perspective, looks like this: `<input type="text" name="q" id="tipue_search_input" placeholder="Search...">`

{% prism javascript %}
searchButton.type = "submit";
searchButton.value = "Search";
{% endprism %}

We next have to apply attributes to our second input element.  The main thing we have to do is turn it into a submit button: that happens with the `searchButton.type = "submit"` line of code.

The value of `searchButton.value` can be anything you want it to be.

The end result of all this is a submit button which, from a code perspective, looks like this: `<input type="submit" value="Search"> `

Now we have to arrange all the page elements we created off-DOM.

{% prism javascript %}
form.appendChild(searchTextBox);
form.appendChild(searchButton);
{% endprism %}

Since the `<form>` tag should contain our two `<input>` tags, the `<form>` tag is viewed as the "parent element" and each `input` tag is viewed as a "child element". We can add each child to the inside of the parent using the `appendChild()` method.

Because the search box (which is represented by the `searchTextBox` variable) is appended first, it will appear in our code before the search button (which is represented by the `searchButton` variable).

At this point, we've constructed our search box the way we want to and it exists off-DOM in the browser memory...the time has come to load it onto the pages.

{% prism javascript %}
frag.appendChild(form);
{% endprism %}

We load our `<form>` tag and all of its contents into our document fragment, which is curently represented in the variable list above by our `frag` variable.

{% prism javascript %}
loadSearchBox.appendChild(frag);
{% endprism %}

Since `frag` contains our complete `<form>` code, JavaScript takes it and loads it into the `<div id="searchbox"></div>` element already on our web pages, targeting it with the `loadSearchBox` variable.

At this point, this is what the JavaScript (not CSS) detection process looks like:

1. One of our HTML pages load.

2. If the page loads in a browser where JavaScript is __*enabled*__, `js/detect.js` changes the `no-js` class in the `<html>` tag to `js`.

3. The above class name change means that the `.js #no-js-searchbox` selector can apply a `display:none` setting to the Google CSE search box currently on the page and hide it.

4. `js/scripts.js` runs the code that builds the Tipue search box off-DOM and loads it onto the page.

5. If the page loads in a browser where JavaScript is __*disabled*__, steps 2, 3 and 4 can't happen because they need JavaScript to run.  So the Google CSE search box won't be set to `display:none` and be completely visible, giving our end-users a search option.  Also, since JS is disabled, the Tipue search box won't be built.


*(Shameless self-promotion: this part of the tutorial focused on dynamically constructing page elements off-DOM....if you want to learn more about this, check out my [off-DOM screencast tutorial](/javascript-off-dom/ "kaidez screencast on creating web page elements off-DOM").)*

<a name="css-detection"></a>
## Step 3: Use JavaScript to Detect if CSS is Disabled

The code in Step 2 works well if either JavaScript is disabled or if both JavaScript *and* CSS are disabled. But if *just* CSS is disabled, things fall apart.

If *just* CSS is disabled, JavaScript will still change the `no-js` class name in our `<html>` tag to `js`. The point of this code was to allow the invocation of the `.js #no-js-searchbox` selector so we can hide our Google CSE search box.

But if *just* CSS is disabled in a browser, it renders all custom styles useless and allows only the the browser's default styling to render. This means that `.js #no-js-searchbox` will be ignored and the CSE box will be visible.

And since JavaScript is enabled in this case, the Tipue search box will load onto our page, meaning every page will have *two* search boxes. That's bad so we need to detect if CSS is *enabled*, making sure that the Tipue search box isn't built if CSS is *disabled*.  Which is fine because, as mentioned in the paragraph above, the Google search box will be visible if CSS is disabled, giving our end-users a search option in every situation.

Someone by the name of "Kethinov" shared [a very cool trick to use JavaScript to detect if CSS is enabled in a browser](http://www.sitepoint.com/forums/showthread.php?592155-How-to-detect-whether-CSS-enabled-or-not-using-Javascript "How to detect whether CSS enabled or not using JavaScript") over on the SitePoint forum. I made a few syntax changes but remain quite loyal to his ridiculously clever code.

Let's update our already-existing `js/scripts.js` file so it looks like this:
{% prism javascript %}
(function(){

  // Tipue code
  $(function() {
    $('#tipue_search_input').tipuesearch();
  });

  // Variables used throughout the code
  var loadMenu,
    isCSSDisabled,
    testCSS,
    currStyle;
  
  // Function that builds the Tipue search box
  loadMenu = function() {
    var loadSearchBox = document.getElementById("searchbox"),
      frag = document.createDocumentFragment(),
      form = document.createElement("form"),
      searchTextBox = document.createElement("input"),
      searchButton = document.createElement("input");
    
    form.action = "search.html";
    form.setAttribute("role", "search");

    searchTextBox.type = "text";
    searchTextBox.name = "q";
    searchTextBox.id = "tipue_search_input";
    searchTextBox.placeholder = "Search...";

    searchButton.type = "submit";
    searchButton.value = "Search";

    form.appendChild(searchTextBox);
    form.appendChild(searchButton);

    frag.appendChild(form);

    loadSearchBox.appendChild(frag);
    
  }

  // Start detecting if CSS is enabled or disabled
  isCSSDisabled = false;
  
  testCSS = document.createElement('div');

  testCSS.style.position = 'absolute';

  document.getElementsByTagName('body')[0].appendChild(testCSS);

  if (testCSS.currentStyle) {
    currStyle = testCSS.currentStyle['position'];
  } else if (window.getComputedStyle) {
      currStyle = document.defaultView.getComputedStyle(testCSS, null).getPropertyValue('position');
  }

  isCSSDisabled = (currStyle === 'static') ? true : false;

  document.getElementsByTagName('body')[0].removeChild(testCSS);

  if (isCSSDisabled === false) {
    loadMenu();
  } else {
    return false;
  }

})();
{% endprism %}
We already know what the Tipue code is doing so let's look at the "CSS enabled/disabled" detection code...
{% prism javascript %}
var loadMenu,
  isCSSDisabled,
  testCSS,
  currstyle;
{% endprism %}

We're creating four new variables using the single var pattern again. We'll give them value as we go along, starting with the `loadMenu` variable.

{% prism javascript %}
loadMenu = function() {
...
}
{% endprism %}

The code we used to build the Tipue search box is now a function stored in a variable called `loadMenu`.  The code hasn't changed so it's not displayed here, but it's important to understand that while the previous version of the code ran immediately, this new version isn't doing that. This code will now *not* run until we tell it to.

{% prism javascript %}
isCSSDisabled = false;
{% endprism %}

The `isCSSDisabled` variable that we created earlier is a Boolean type variable, meaning it has a value of either true or false. We're setting it to `false`.

`isCSSDisabled` will be the variable that will tell us whether or not CSS is enabled in the browser....remember that.

{% prism javascript %}
testCSS = document.createElement('div');
{% endprism %}

The `testCSS` variable that we created earlier is storing a reference to a `<div>` tag created with the `createElement()` method.

{% prism javascript %}
testCSS.style.position = 'absolute';
{% endprism %}

The value of a `<div>` tag's position property is `static` by default...let's change the position property of our `testCSS` div to `absolute`.

{% prism javascript %}
document.getElementsByTagName('body')[0].appendChild(testCSS);
{% endprism %}

Load the `testCSS` div onto our web page so we can properly detect it in a browser. Do this by finding the `<body>` tag and place the `testCSS` div inside of it. It will be placed just above the closing `<body>` tag because we're using `appendChild()`.

{% prism javascript %}
if (testCSS.currentStyle) {
  currStyle = testCSS.currentStyle['position'];
} else if (window.getComputedStyle) {
    currStyle = document.defaultView.getComputedStyle(testCSS, null).getPropertyValue('position');
}
{% endprism %}

We need to find the value of our `testCSS` div's position property and place it inside the `currStyle` variable we created earlier. oldIE refers to this property one way...the other browsers refer to it another way. So we need to use a little feature detection here.

If our `testCSS` div has a `currentStyle` property attached to it, we're in oldIE. So use `currentStyle` to find the position property and store it's value inside `currStyle`.

But if the `window` object has a `getComputedStyle()` method attached to it, we're in a browser other than oldIE. So use `getComputedStyle()` to find the position property and store its value inside `currStyle`.

{% prism javascript %}
isCSSDisabled = (currStyle === 'static') ? true : false;
{% endprism %}

Our `isCSSDisabled` variable runs a quick ternary operation, which is a short-hand conditional check.  As previously mentioned, `isCSSDisabled` will tell us whether or not CSS is enabled in the browser and does so as follows...

`isCSSDisabled` checks the value of our `currStyle` variable which, again, is storing the value of our `testCSS` div's position property.  If it still has its default `static` setting, it means our browser is ignoring the `absolute` property we applied...which would only happen if CSS was disabled in a browser.  So `isCSSDisabled` will equal `true`.

But if `testCSS` div's position property is set to anything else *but* `static` (such as the `absolute` setting we gave it earlier), then CSS must be enabled. So `isCSSDisabled` will equal `false`.

{% prism javascript %}
document.getElementsByTagName('body')[0].removeChild(testCSS);
{% endprism %}

Our test is done so we don't need `testCSS` div on our page anymore...let's remove it. 

{% prism javascript %}
if (isCSSDisabled === false) {
  loadMenu();
} else {
  return false;
}
{% endprism %}

Our `testCSS` div may be gone but our `isCSSDisabled` variable is still around, and we can check its value. And if `isCSSDisabled` is set to `false`, it means that CSS is *not* disabled so it's safe to run our `loadMenu()` function to build the Tipue search box. But in any other situation, such as `isCSSDisabled` being set to `true`, don't do anything else and, just to play it safe, do absolutely nothing by performing a basic `return false`.

<a name="notes"></a>
## More Notes
While this code works, there are a few things to keep in mind:

* Because of how we've structured it, this code will run every time a page loads so we need to check its performance. On the average, the off-DOM building and JS/CSS detection code takes 0.6-0.9 milliseconds to run. But this code is in the same file as the code that executes Tipue searches, so that number can jump to around 1.2 milliseconds to run when such a search is invoked...it didn't get any higher than that.  This isn't bad but it's something to keep in mind.

* Hiding elements using `display:none` is generally frowned upon from an accessibility standpoint. [The Yahoo! dev team has been recommending another method since 2010](http://developer.yahoo.com/blogs/ydn/clip-hidden-content-better-accessibility-53456.html) and it's in wide use, but implementing it would mean that the Google search box would be picked up by a screen reader as well as the Tab key.  That means that two search boxes could have been picked up by the various accessibility methods and caused a major headache. For that reason, I stuck with `display:none`.

<a name="conclusion"></a>
## Conclusion
There are lots of search options for static sites generators like Jekyll...we just need to try things and then implement, test, then deploy them. This is just one thing...I'm sure that there are more and I haven't found them.  Please share these things in the comments if you like.