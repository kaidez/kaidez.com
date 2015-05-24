---
title: "TUTORIAL: Filter Content With jQuery.filter() & jQuery Selectors"
comments: true
author: Kai Gittens
layout: post
meta-excerpt: Use jQuery.filter() & Attribute Selectors with HTML5 data attributes to filter out specific content on a click. Includes a code demo.
permalink: /filter-content-jquery/
category: tutorials
cat-name: "Tutorials"
has-home-img: jquery-filter.jpg
tags: [jquery, javascript, data attributes]
---
<a href="http://codepen.io/kaidez/pen/azmRXm" class="demoLink" target="blank">VIEW THE DEMO</a>

I had a project where I needed to create functionality that filtered out specific page content on a link click. So if the page had three different content groups, clicking on a link had to display one group while removing the other two from view.

I built the functionality using data attributes, jQuery's .filter() method, and some jQuery selector methods. There are certainly different ways to filter page content, but this is how I did it.

## Table of Contents
1. [A (very) brief look at the CSS](#brief-look-css)
2. [A first look at the HTML](#html-first-look)
3. [The 2 sections of the HTML](#2-html-sections)
4. [The binding of the two HTML sections](#html-section-binding)
5. [A first look at the JavaScript](#javascript-first-look)
6. [Feature-detect for data attributes](#feature-detect-data-attributes)
7. [Using jQuery attribute selectors](#jquery-attribute-selectors)
8. [Adding & removing content](#add-remove-content)
9. [Show all the content with a click](#show-all-content)
10. [Some notes](#notes)
11. [Conclusion](#conclusion)

<a name="brief-look-css"></a>
### A (very) brief look at the CSS
We're using three files for our code: `index.html`, `styles.css` and `main.js`.  All the files are in the same directory.

The things in `styles.css` are here to give the page some style and have  nothing to do with the functionality. We won't discuss them in depth, but here they are:
{% prism css %}
body {
  background-color: rgba(60, 105, 145, 1);
  color: rgba(255, 255, 255, 1);
  font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;
  font-size: 20px;
}

a {
  margin:0 5px;
}

a:link {
  color: rgba(100, 255, 0, 1);
}

a:visited {
  color: rgba(100, 255, 0, 1);
}

a:hover {
  color: rgba(0, 255, 193, 1);
  text-decoration: none;
}
{% endprism %}
<a name="html-first-look"></a>
### A first look at the HTML
The `index.html` file looks like this...
{% prism markup %}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Filter Content On A Click With jQuery</title>
    <link rel="stylesheet" href="styles.css" media="all" />
  </head>
  <body>
    <h1>Filter by team</h1>

    <!-- The Teams -->
    <a href="#" class="btn-player" data-team="chelsea">Chelsea</a>
    <a href="#" class="btn-player" data-team="psg">Paris St-Germain</a>
    <a href="#" class="btn-player" data-team="real-madrid">Real Madrid</a>
    <a href="#" class="btn-player" data-team="barcelona">Barcelona</a>
    <a href="#" id="btn-show-all">SHOW ALL PLAYERS</a>

    <!-- The Players -->
    <div class="player" data-players-team="chelsea">Cesc Fabregas</div>
    <div class="player" data-players-team="psg">Zlatan Ibrahimović</div>
    <div class="player" data-players-team="real-madrid">Cristiano Ronaldo</div>
    <div class="player" data-players-team="chelsea">Didier Drogba</div>
    <div class="player" data-players-team="chelsea">John Terry</div>
    <div class="player" data-players-team="barcelona">Lionel Messi</div>
    <div class="player" data-players-team="real-madrid">Sergio Ramos</div>
    <div class="player" data-players-team="chelsea">Thibault Courtois</div>
    <div class="player" data-players-team="psg">Thiago Motta</div>

    <!-- Note that we're using the oldIE-friendly version of jQuery -->
    <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
    <script src="main.js"></script>
  </body>
</html>
{% endprism %}
<a name="2-html-sections"></a>
### The 2 sections of the HTML
The page has two distinct sections: a list of `<a>` tags at the top and a list of `<div>` tags at the bottom. Except for the last one, every item in the top list has a class name of `btn-player` and a data attribute called `data-team`.

Notice that the values of the `data-team` attribute differ across the links that have it. There are four different values: 1) `chelsea`, 2) `psg`, 3) `real-madrid` and 4) `barcelona`.

At the bottom of this list is a link with an ID of `#btn-show-all`. We'll build functionality where clicking on this link will add back any content that has been removed.  

Every item in the bottom list is a `<div>` with a class name of `player` and a data attribute called `data-players-team`. The `player` class name is important and will be discussed but for now, notice that the values of the `data-players-team` attribute is shared across some of the `<div>` tags.

For example: four tags have their `data-players-team` value set to `chelsea`, two of them have their attribute set `psg`. And so on and so on.
<a name="html-section-binding"></a>
### The binding of the two HTML sections
The values of the `data-players-team` attribute in the section below matches the value of one of the `data-team` attributes in the section above. So the four tags with a `data-players-team` attribute with a value of `chelsea` match the value of the `data-team` attribute in the first `<a>` tag: it's value is also `chelsea`.

These shared values create a binding between the two sections, As a result, when of a link is clicked, it will understand that it's their bound `<div>` tags that should be visible.
<a name="javascript-first-look"></a>
### A first look at the JavaScript
But this is only a small part of the binding process...jQuery does a lot here, too.  That code is in `main.js` and looks like this:
{% prism javascript %}
$( ".btn-player" ).click(function(){

  var getLinkType, getElType, getElNotType;

  // Feature-detect for dataset support
  if( !this.dataset ) { // If IE 10 or lower
    getLinkType = this.getAttribute( "data-team" );
   } else { // For other browsers
     getLinkType = this.dataset.team;
   }

  getElType = $( "div[data-players-team~="+getLinkType+"]" );

  getElNotType = $( "div[data-players-team!="+getLinkType+"]" );

   $( ".player" ).filter( getElNotType ).css( "display", "none" );
   $( ".player" ).filter( getElType ).css( "display", "block" );

});

$( "#btn-show-all" ).click(function() {
  $( ".player" ).css( "display", "block" );
});
{% endprism %}

Quite a bit to discuss here...let's break it down:

{% prism javascript %}
$( ".btn-player" ).click(function(){
  ...
});
{% endprism %}

There are four links at the top with a class name of `btn-player`. Whenever one of those buttons is clicked, a function performs some tasks.

{% prism javascript %}
var getLinkType, getElType, getElNotType;
{% endprism %}

List three variables in a single var pattern for future use.
<a name="feature-detect-data-attributes"></a>
### Feature-detect for data attributes
{% prism javascript %}
// Feature-detect for dataset support
if( !this.dataset ) { // If IE 10 or lower
  getLinkType = this.getAttribute( "data-team" );
} else { // For other browsers
  getLinkType = this.dataset.team;
}
{% endprism %}

All the links with a `btn-player` class have a `data-team` attribute. When one of those links gets clicked, we need to find that attribute's value and store it in the previously-created `getLinkType` variable.

We can find the value by looking directly at link's dataset property by saying `this.dataset`. But dataset isn't supported in Internet Explorer 10 and lower, so we need to provide fallback code for those browsers by applying feature detection.

We'll start by checking to see if the clicked-on link does NOT have a `dataset` property and if it doesn't, we'll use the `getAttribute()` method to find the value of `data-team` and store it in the `getLinkType` variable. But for other browsers, we can use `dataset` to do the finding and storing.

For a more in-depth discussion about data attributes and `getAttribute()`, [read my data attributes post](/load-data-attributes-mouseclicks/ "Read kaidez's blog post on loading in page content with data attributes").
<a name="jquery-attribute-selectors"></a>
### Using jQuery attribute selectors
{% prism javascript %}
getElType = $( "div[data-players-team~="+getLinkType+"]" );
{% endprism %}
jQuery's "Attribute Contains" selector functionality can help us here. jQuery has a lot of uses for this selector but in this case, we're using the [Attribute Contains Word Selector](http://api.jquery.com/attribute-contains-word-selector/).

In this case, "Attribute Contains" uses `~` to look any `<div>` whose `data-players-team` value EXACTLY matches the value of `getLinkType`. The total `<div>` tags that match this criteria are stored in the previously-created `getElType` variable.

In other words, if the `.btn-player` button that gets clicked has a `data-team` value of `chelsea`, then `chelsea` gets stored in `getLinkType`. Then, the "Attribute Contains" code will look for any `<div>` whose `data-players-team` value matches `chelsea`...it will find four `<div>` tags in this case.

{% prism javascript %}
getElNotType = $( "div[data-players-team!="+getLinkType+"]" );
{% endprism %}
Almost the same code as just-discussed except we're now using jQuery's [Attribute Not Equal Selector](http://api.jquery.com/attribute-not-equal-selector/) (note the "!" that's now before the "=" in the code instead of "~"). As you've may have guessed, this code is looking for all the `<div>` tags that have `data-players-team` values that do NOT match `getLinkType`, then stores them in a variable called `getElNotType`.
<a name="add-remove-content"></a>
### Adding & removing content
{% prism javascript %}
$( ".player" ).filter( getElNotType ).css( "display", "none" );
{% endprism %}
Lots jQuery chaining now...

All the `<div>` tags at the bottom have a class called `.player` and we're finding them in the DOM with jQuery. Plus, they're all contained in either the `getElType` or the `getElNotType` variable.

We first, use jQuery's `.filter()` method to "filter", or "pick out" all the `.player` elements that are contained in `getElNotType`, which are the ones we DON'T want to display. From there, we use jQuery's `.css()` method to apply an inline style of `display:none;` to these particular `<div>` tags, removing them from view if they're not removed already.

{% prism javascript %}
$( ".player" ).filter( getElType ).css( "display", "block" );
{% endprism %}
Next, we do the opposite: we look for any `<div>` with a `.player` class and use `.filter()` to filter out those stored in `getElType`, which are the ones we DO want to display. Then use `css()` to apply an inline style of `display:block;` to these particular `<div>` tags, making them visible if they're not visible already.
<a name="show-all-content"></a>
### Show all the content with a click
{% prism javascript %}
$( "#btn-show-all" ).click(function() {
  $( ".player" ).css( "display", "block" );
});
{% endprism %}
We'll end our code with functionality that makes any hidden `<div>` tags visible. The very last link at the top of the page has an ID of `#btn-show-all`: when clicked, it uses jQuery to find all the `.player` elements and if any are set to `display:none;` they'll be set to `display:block;`.
<a name="notes"></a>
### Some Notes
That's it for the code....here are a few interesting things to note:

*   This code does not work on IE 8 and lower...and I don't care.

*   We only used two jQuery attribute selectors here but there are many more and they're all useful. [Read about the jQuery Selector API](http://api.jquery.com/category/selectors/ "Read about jQuery Selectors on the jQuery API site").

*   While we had to do `dataset` feature detection for the `data-team` attribute, take note that we didn't have to do that for `data-players-team`. This is because we had to find the exact value of `data-team` but with `data-players-team`, we just need to see if it existed in the DOM.

*   The part of the code that uses `$.filter()` could be more elegant. It's written in a way that automatically assumes that all the `.player` elements aren't in view, which isn't the case. So it's probably neater to use something like `if/else` to check the DOM and see what elements are and aren't visible. But like any DOM checking, a search like that is a bit of a performance hit so it's left out of the code for that reason.

<a name="conclusion"></a>
### Conclusion
I may or may not do some performance tests to see how much of a hit I'll take doing an `if/else` check but either way, I found this code to be a neater way of doing things when compared to some other implementations I commonly use. I like what I did here and will probably use the pattern again.

Again, there may be other ways to do this...feel free to share alternatives.
