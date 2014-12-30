---
title: "TUTORIAL: Filter Content On A Click With jQuery"
comments: true
author: Kai Gittens
layout: post
meta-excerpt: Use jQuery.filter() and Attribute Selectors with HTML5 data attributes to filter out categorized content on a click. Includes code demo.
permalink: /filter-categories-jquery/
category: tutorials
cat-name: "Tutorials"
has-home-img: jquery-filter.jpg
tags: [jquery, javascript, data attributes]
---
<a href="http://codepen.io/kaidez/pen/azmRXm" class="demoLink" target="blank">VIEW THE DEMO</a>

For a personal project, I had to create functionality that filtered out specific page content on a link click. So if the page has three groups of content, clicking on a link would keep remove one group while the others remained visible.

To do this, I took [what I learned about data attributes](/load-data-attributes-mouseclicks/ "Read kaidez's blog post on loading in page content with data attributes") and combined it with the [jQuery .filter() method](http://api.jquery.com/filter/ "Read about the jQuery filter method") and some of [jQuery's selector methods](http://api.jquery.com/category/selectors/ "Read about the jQuery's selector methods"). There are certainly different ways to filter page content, but this is how I did it.

## Table of Contents
1. [A brief look at the CSS](#brief-look-css)
2. [A first look at the HTML](#html-first-look)
3. [The 2 sections of the HTML](#2-html-sections)
4. [The important binding of the 2 HTML sections](#html-section-binding)
5. [A first look at the JavaScript](#javascript-first-look)
6. [Feature-detect for data attributes](#feature-detect-data-attributes)

<a name="brief-look-css"></a>
### A brief look at the CSS
We are using three files for our code: `index.html`, `styles.css` and `main.js`.  All the files are in the same directory.

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
The `index.html` file is key and looks like this...
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
Take note that the page has two distinct sections: a list of soccer teams at the top (except for the last one) and the list of soccer players directly below that. Except for the last one, every item in the top list is a link with a class name of `btn-player` and a data attribute called `data-team`.

The `btn-player` class name is important and will be discussed but for now, notice that the values of the `data-team` attribute differs across the links that have it. There are four different values across these links: 1) `chelsea`, 2) `psg`, 3) `real-madrid` and 4) `barcelona`.

At the bottom of this list is a link with an ID of `#btn-show-all`. If any content has been removed, clicking on this link will add all of it back to the page.  

Every item in the bottom list is a `<div>` with a class name of `player` and a data attribute called `data-players-team`. The `player` class name is important and will be discussed but for now, notice that the values of the `data-players-team` attribute is shared across some of the `<div>` tags.

For example: four tags have their `data-players-team` value set to `chelsea`, two of them have their attribute set `psg`. And so on and so on.
<a name="html-section-binding"></a>
### The important binding of the 2 HTML sections
Most importantly, take note that the values of the `data-players-team`  attribute in the section below matches the value of one of the `data-team` attributes in the section above. So the four tags with a `data-players-team` attribute with a value of `chelsea` match the value of the `data-team` attribute in the first `<a>` tag: it's value is also `chelsea`.

These shared values are assisting in binding the content to their respective links...when of those links are clicked, they'll understand that it's their bound `<div>` tags that content should be visible.
<a name="javascript-first-look"></a>
### A first look at the JavaScript
But this is only a small part of the binding process...jQuery does a lot here too.  That code is in `main.js` and looks like this:
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

There are four link at the top with a class name of `btn-player`. Whenever one of those buttons is clicked, a function will run and do a lot of stuff.

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

Whatever `btn-player` link gets clicked has a `data-team` attribute. Our code needs to find the value of that attribute and store it in the previously-created `getLinkType` variable, and JavaScript's `this` keyword makes sure we're looking the value for the `data-team` value for the clicked-on link only.

But data-attributes can't be found unless the browser supports `dataset` properties for elements. Internet Explorer versions 10 and lower don't support that so we need to do a little feature detection.

We'll start by checking to see if the clicked-on link does NOT have a `dataset` property. And if it doesn't, we'll use the `getAttribute()` method to find the value of `data-team` and store it in the `getLinkType` variable.

But for browsers other than IE 10 and lower, we can use `dataset` to find the value of `data-team` and store it in the `getLinkType` variable. For a more in-depth discussion about data attributes and `getAttribute()`, [read my data attributes post](/load-data-attributes-mouseclicks/ "Read kaidez's blog post on loading in page content with data attributes").

{% prism javascript %}
getElType = $( "div[data-players-team~="+getLinkType+"]" );
{% endprism %}
jQuery's "Attribute Contains" selector functionality can help us here. jQuery has a lot of uses for this selector but in this case, we're using the [Attribute Contains Word Selector](http://api.jquery.com/attribute-contains-word-selector/).

In this case, "Attribute Contains" uses `~` to look any `<div>` whose `data-players-team` value EXACTLY matches the value of `getLinkType`. The total `<div>` tags that match this criteria are stored in the previously-created `getElType` variable.

In other words, if the `.btn-player` button that gets clicked has a `data-team` value of `chelsea`, then `chelsea` gets stored in `getLinkType`. Then, the "Attribute Contains" code will look for any `<div>` whose `data-players-team` value matches that of the current value of `getLinkType`...it will find four `<div>` tags in this case.

{% prism javascript %}
getElNotType = $( "div[data-players-team!="+getLinkType+"]" );
{% endprism %}
Almost the same code as just-discussed except we're now using jQuery's [Attribute Not Equal Selector](http://api.jquery.com/attribute-not-equal-selector/) (note the "!" that's now before the "=" in the code instead of "~"). As you've may have guessed, this code is looking for all the `<div>` tags that have `data-players-team` values that do NOT match `getLinkType`, then stores them in a variable called `getElNotType`.

{% prism javascript %}
$( ".player" ).filter( getElNotType ).css( "display", "none" );
{% endprism %}
Lots jQuery chaining now...

All the `<div>` tags at the bottom have a class called `.player` and we're finding them in the DOM with jQuery. Plus, they're all contained in either the `getElType` or the `getElNotType` variable.

We're, first, using jQuery's `.filter()` method to "filter", or "pick out" all the `.player` elements that are contained in `getElNotType`. From there, we use jQuery's `.css()` method to apply an inline style of `display:none;` to these particular `<div>` tags, removing them from view.

{% prism javascript %}
$( ".player" ).filter( getElType ).css( "display", "block" );
{% endprism %}
Next, we do the opposite: we look for any `<div>` with a `.player` class and use `.filter()` to filter out those stored in `getElType`, which are the ones we DO want to display. Then use `css()` to apply an inline style of `display:block;` to these particular `<div>` tags, making them visible if they're not already.

{% prism javascript %}
$( "#btn-show-all" ).click(function() {
  $( ".player" ).css( "display", "block" );
});
{% endprism %}

We'll end our code with functionality that makes an hidden `<div>` tags visible. The very last link at the top of the page has an ID of `#btn-show-all`: when clicked, it uses jQuery to find all the `.player` elements and give them an inline style of `display:block;` if they don't have it already.

That's it but, again, there may be other ways to do this...feel free to share alternatives.
