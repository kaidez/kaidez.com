---
title: "TUTORIAL: Filter Content On A Click With jQuery"
comments: true
author: Kai Gittens
layout: post
meta-excerpt: Use jQuery.filter(), jQuery :not(), jQuery :contains and data attributes to filter out categorized content on a click. Includes a code demo.
permalink: /filter-categories-jquery/
category: tutorials
cat-name: "Tutorials"
has-home-img: effective-js.jpg
tags: [jquery, javascript data attributes]
---
<a href="http://codepen.io/kaidez/pen/azmRXm" class="demoLink" target="blank">VIEW THE DEMO</a>

A recent personal project required that content in a certain category be removed on a link click. So if the page has two groups of content, clicking on one link would filter out the first group, displaying that first group while removing the second one.

Armed with [my recent knowledge of data attributes](/load-data-attributes-mouseclicks/ "Read kaidez's blog post on loading in page content with data attributes"), I solved the problem using it along with a handful of jQuery methods: `jQuery.filter()`, `jQuery :not()` and `jQuery :contains`. There are probably a few different ways to solve this problem but this is how I did it.

To begin with, there are three files at use here: `index.html`, `styles.css` and `main.js`.  All the files are in the same directory.

The styles in `styles.css` are arbitrary and are here to give the page SOME style.  They have no bearing on the functionality and won't be discussed in depth in the post, but here they are...
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

    <!-- The Player -->
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
Take note that that the page has two distinct sections: a list of footie teams at the top and the list of footie players directly below that. Except for the last one, every item in the top list has a link with a class name of `btn-player` and a data attribute called `data-team`.

The `btn-player` class name is important and will be discussed but for now, notice that the values of the `data-team` attribute differ across the links that have it. There are four different values across these links: 1) `chelsea`, 2) `psg`, 3) `real-madrid` and 4) `barcelona`.

Every item in the bottom list has a `<div>` with a class name of `player` and a data attribute called `data-players-team`. The `player` class name is important and will be discussed but for now, notice that the values of the `data-player-team` attribute are shared across these `<div>` tags.

`main.js` is also key and looks like this:
{% prism javascript %}
var getLinkType, getElType, getElNotType;

$( ".btn-player" ).click(function(){

  // Feature-detect for dataset support
  if( !this.dataset ) { // If IE10 or lower
    getLinkType = this.getAttribute( "data-team" );
   } else { // For other browsers
     getLinkType = this.dataset.team;
   }

  getElType = $( "div[data-players-team*="+getLinkType+"]" );

  getElNotType = $( "div:not([data-players-team*="+getLinkType+"])" );


   $( ".player" ).filter( getElNotType ).css( "display", "none" );
   $( ".player" ).filter( getElType ).css( "display", "block" );

});

$("#btn-show-all").click(function() {
  $(".player").css("display", "block");
});
{% endprism %}
