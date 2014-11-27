---
title: 'TUTORIAL: Change data attributes with Mouse Clicks'
comments: true
author: Kai Gittens
layout: post
permalink: /data-attribute-click/
meta-excerpt: "Load/unload information stored in data attributes inside HTML with mouse clicks in a cross-browser compatible way. Includes demos."
category: tutorials
cat-name: "Tutorials"
tags: [html5, javascript]
has-home-img: data-attribute.jpg
---
A recent project at work *almost* required my creating functionality that loaded content that was stored in HTML5 data attributes onto a web page with mouse clicks. I hadn't used data attributes much so I researched some production code we had and did some web searches on the subject.

The final project specs end up not requiring this functionality but while doing the web searches, I was shocked at the lack of good, descriptive tutorials on data attributes. So while using info on my favorite footie teams, I spent a few days hacking some code together (all while taking note of the quirks and cross-browser issues) and created this tutorial.

Simple Example (<a href="http://codepen.io/kaidez/pen/VYLxqG" target="blank">See the CodePen Demo</a>)
---------------------
Before we create code that changes/swaps multiple sets of `data-*` content in different places, let's look at an example of how to do all this with one set. The process for this is:

1. store content in data attributes in certain elements.
2. use JavaScript to load the content into other elements.

Let's look at the CSS first...the CSS will be applied to all future code samples and demos:
{% prism css %}
body {
  background: grey;
  color: #000;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 900;
  font-size: 18px;
}

a:link {
  color: #fff;
  font-weight: 700;
  font-size: 22px;
}

a:visited {
  color: #fff;
}

a:hover {
  color: #fff;
  text-decoration: none;
}

.dataTarget {
  margin: 10px 0;
}
{% endprism %}

Next, the HTML looks like this:
{% prism markup %}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>TUTORIAL: Change "data" Attributes with Mouse Clicks</title>
  </head>
  <body>
    <a href="#" id="chelseaLink">Load Chelsea FC Info &raquo;</a>

    <div
      id="teamInfo"
      data-team="Chelsea"
      data-manager="José Mourinho"
      data-home-pitch="Stanford Bridge">

    </div>  

    <div id="team" class="dataTarget"></div>
    <div id="manager" class="dataTarget"></div>
    <div id="homePitch" class="dataTarget"></div>

    <!-- Note that we're using jQuery -->
    <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
  </body>
</html>
{% endprism %}


And the JavaScript that allows for the content that gets loaded on a mouse click looks like this:
{% prism javascript %}
var team = document.querySelector("#team"),
    manager = document.querySelector("#manager"),
    homePitch = document.querySelector("#homePitch");

$("#chelseaLink").click(function(event){

  event.preventDefault();

  // Use the .dataset property
  team.innerHTML = teamInfo.dataset.team;
  manager.innerHTML = teamInfo.dataset.manager;
  homePitch.innerHTML = teamInfo.dataset.homePitch;

});
{% endprism %}

Breaking down the HTML first:

{% prism markup %}
<a href="#" id="chelseaLink">Load Chelsea FC Info &raquo;</a>
{% endprism %}

In the HTML, clicking on the `id="chelseaLink` element will load the content stored in the data attributes.

{% prism markup %}
<div
  id="teamInfo"
  data-team="Chelsea"
  data-manager="José Mourinho"
  data-home-pitch="Stanford Bridge">

</div>
{% endprism %}

Those attributes are listed inside `<div id="teamInfo">` and named `data-team`, `data-home-pitch` and `data-manager`.

{% prism markup %}
<div id="team" class="dataTarget"></div>
<div id="manager" class="dataTarget"></div>
<div id="homePitch" class="dataTarget"></div>
{% endprism %}

And where on the page is this content placed after the click? Into the three `div` tags at the bottom. Their ids are: `team`, `homePitch` and `manager`,

Let's look at a nice, lengthy breakdown of the JavaScript next...

{% prism javascript %}
var team = document.querySelector("#team"),
    manager = document.querySelector("#manager"),
    homePitch = document.querySelector("#homePitch");
{% endprism %}

I'm using `document.querySelector()` to store references to the three `div` tags I just discussed...this will make them easier to find when I start referring to them in this next function...

{% prism javascript %}
$("#chelseaLink").click(function(event){

  event.stopPropagation();

  // Use the .dataset property
  team.innerHTML = teamInfo.dataset.team;
  manager.innerHTML = teamInfo.dataset.manager;
  homePitch.innerHTML = teamInfo.dataset.homePitch;

});
{% endprism %}

The `$` tells us that we're using jQuery to bind the `jQuery.click` method to the link on the web page which, again, is the one with an id of `#chelseaLink`. It has a parameter called `event` passed to it...we'll come back to that shortly because `.dataset` is the key to this code.

`.dataset` is a property that stores __any and all information placed in an element's data-attribute.__ For example: `teamInfo.dataset.team` is direct reference to the value of the `data-team` attribute listed in `<div id="teamInfo">` in HTML, with that value being "Chelsea".

When `#chelseaLink` is clicked, it looks at all the content stored in the data-attributes listed in `<div id="teamInfo">` and loads them inside the `div` tags that are referenced by `querySelector()`, all with the help of `innerHTML`.

OK...back to the function's `event` parameter...

We have to do this so we can use the `event.PreventDefault()` method in the link. If we don't use this and the link's `href` attribute is set to `#` (which is what's happening with `#chelseaLink`), then the `#` will be passed to the URL.

Depending on the page layout, will force the page to jump to the top. Which we don't want.

*(Side note: read more about [event.PreventDefault() on MDN](https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault). There's also the similar [event.stopPropagation() on MDN](https://developer.mozilla.org/en-US/docs/Web/API/event.stopPropagation), but that blocks events a little more obtrusively then `event.PreventDefault()`.)*

Proper Naming of Data Attributes (<a href="http://codepen.io/kaidez/pen/WbvEab" target="blank">See the CodePen Demo</a>)
---------------------
Here's one of the quirks of data attributes...

As just mentioned, `teamInfo.dataset.team` is a direct reference to the `data-team` attribute...that makes sense. It's also the same thing with the manager information: `teamInfo.dataset.manager` is a direct reference to the `data-manager` attribute.

But those are one-word attributes and our `data-home-pitch` attribute is two words. So the syntax is different:
{% prism javascript %}
homePitch.innerHTML = teamInfo.dataset.homePitch;
{% endprism %}

It needs to be this way for two-word data-attributes.  `.dataset` can't refer to it as `teamInfo.dataset.home-pitch` and the HTML reference can't be `data-homePitch`.

This is due to how `.dataset` works behind the scenes, using something called the `DOMStringMap` object. `.dataset` will look at the data-attribute names and automatically drop the data- prefix first, removing hyphens next, and finally convert the attribute to camelCase.

The HTML for this section's CodePen has a `data-homePitch` attribute.  Click on the "Load Chelsea FC Info" link and notice that the pitch content loads in as `undefined` instead of the expected "Stanford Bridge".

Adjust the code so it says `data-home-pitch` and it will work fine.  But from there, go to the JavaScript and change `teamInfo.dataset.homePitch` to `teamInfo.dataset.home-pitch`...you'll get a Reference error saying "pitch is not defined".

Because of this, I suggest keeping your data attributes and `.dataset` properties at a two-word minimum.  `data-home-pitch` and `teamInfo.dataset.homePitch` are fine...`data-home-team-pitch` and `teamInfo.dataset.homeTeamPitch` may work, but are too verbose.

Store the data attributes in a link instead (<a href="http://codepen.io/kaidez/pen/dPoexg" target="blank">See the CodePen Demo</a>)
---------------------







Cross-browser coding for android: as close to hell on earth as I've ever gotten.

http://ejohn.org/blog/html-5-data-attributes/

make sure the CSS is consistent across all CodePen samples
