---
title: 'TUTORIAL: Change "data" Attributes with Mouse Clicks'
comments: true
author: Kai Gittens
layout: post
permalink: /data-attribute-click/
meta-excerpt: "Load/unload information stored in data-* attributes inside HTML with mouse clicks in a cross-browser compatible way. Includes demos."
category: tutorials
cat-name: "Tutorials"
tags: [html5, javascript]
has-home-img: data-attribute.jpg
---
A recent project at work *almost* required the use of swapping information in and out of the DOM with data attributes (usually referred to as `data-*`), and to do so with mouseclicks. I hadn't used them much so I researched some current production code we had and also did some web searches.

The final project requirements forced us not to do this but while doing the web searches, I was unable to find any good, descriptive tutorials on the subject. That surprised me so while using info on my favorite footie teams, I spent a few days hacking some code together, all while taking note of the quirks and cross-browser issues, and created this tutorial.

Simple Example (<a href="http://codepen.io/kaidez/pen/VYLxqG" target="blank">See the CodePen Demo</a>)
---------------------
Before we create code that changes/swaps the `data-*` content in different places, let's look at an example of how to load in just one set of data. It's pretty simple: store content in data attributes for certain elements, then use JavaScript to load the content into other elements.

First, the CSS looks like this...the CSS will be applied to all future code samples and demos:
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
      data-home-pitch="Stanford Bridge"
      data-manager="José Mourinho">

    </div>  

    <div id="team" class="dataTarget"></div>
    <div id="homePitch" class="dataTarget"></div>
    <div id="manager" class="dataTarget"></div>

    <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
  </body>
</html>
{% endprism %}


And the JavaScript that allows for the content that gets loaded on a mouseclick looks like this:
{% prism javascript %}
var team = document.querySelector("#team"),
    homePitch = document.querySelector("#homePitch"),
    manager = document.querySelector("#manager");

$("#chelseaLink").click(function(event){

  event.preventDefault();
  // Use the .dataset property
  team.innerHTML = teamInfo.dataset.team;
  homePitch.innerHTML = teamInfo.dataset.homePitch;
  manager.innerHTML = teamInfo.dataset.manager;

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
  data-home-pitch="Stanford Bridge"
  data-manager="José Mourinho">

</div>
{% endprism %}

When that link gets clicked, it loads content stored in the three data attributes onto the page. These attributes are listed in `<div id="teamInfo">` and named `data-team`, `data-home-pitch` and `data-manager`. Note that all these attributes are attached to a `<div id="teamInfo">` element.

{% prism markup %}
<div id="team" class="dataTarget"></div>
<div id="homePitch" class="dataTarget"></div>
<div id="manager" class="dataTarget"></div>
{% endprism %}

And where on the page is this content placed after the click? Into the three `div` tags at the bottom. Their ids are: `team`, `homePitch` and `manager`,

Let's look at a nice, lengthy breakdown of the JavaScript next...

{% prism javascript %}
var team = document.querySelector("#team"),
    homePitch = document.querySelector("#homePitch"),
    manager = document.querySelector("#manager");
{% endprism %}

I'm using `document.querySelector()` to store references to the three `div` tags I just discussed...this will make them easier to find when I start referring to them in this next function...

{% prism javascript %}
$("#chelseaLink").click(function(event){

  event.stopPropagation();
  // Use the .dataset property
  team.innerHTML = teamInfo.dataset.team;
  homePitch.innerHTML = teamInfo.dataset.homePitch;
  manager.innerHTML = teamInfo.dataset.manager;

});
{% endprism %}

The `$` tells us that we're using jQuery to bind the `jQuery.click` method to the link on the web page which, again, is the one with an id of `#chelseaLink`. It has a parameter called `event` passed to it...we'll discuss that shortly.

When `#chelseaLink` is clicked, it looks at the `innerHTML` property of the three elements just discussed...the ones where `div` tags are referenced by `querySelector()`. For each one, it looks at the `dataset` property for the `#teamInfo` element on the page.

`dataset` is the key to this code: it's a property that stores __any and all information placed in an element's `data-*` attribute.__ So `teamInfo.dataset.team` is direct reference to the value of the `data-team` attribute in our HTML, with that value being "Chelsea".

That attribute value is what gets loaded inside those three `div` tags, with some help from the `innerHTML` property of each of the tags.

OK...back to the function's `event` parameter...

We have to do this so we can use the `[event.PreventDefault()` method in the link. If we don't use this and the link's `href` attribute is set to `#` (which is what's happening with `#chelseaLink`), then the `#` will be passed to the URL.

Depending on the page layout, will force the page to jump to the top. Which we don't want.

*(Side note: read more about [event.PreventDefault() on MDN](https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault). There's also the similar [event.stopPropagation() on MDN](https://developer.mozilla.org/en-US/docs/Web/API/event.stopPropagation), but that blocks events a little more obtrusively then `event.PreventDefault()`.)*

Proper Naming of Data Attributes (<a href="http://codepen.io/kaidez/pen/WbvEab" target="blank">See the CodePen Demo</a>)
---------------------
Here's one of the quirks of data attribiutes...

As just mentioned, `teamInfo.dataset.team` is a direct reference to the `data-team` attribute....that makes sense. But you may have noticed that for the `data-home-pitch` attribute, the syntax is different:
{% prism javascript %}
homePitch.innerHTML = teamInfo.dataset.homePitch;
{% endprism %}

The JS reference to the data attribute value can't be `teamInfo.dataset.home-pitch` and the HTML reference can't be `data-homePitch`. This is the result of an HTML5 thing, the result of how browsers are converting strings inside data attributes.

The HTML for this section's CodePen has a `data-homePitch` attribute.  Click on the "Load Chelsea FC Info" link and notice that the pitch content loads in as `undefined` instead of the expected "Stanford Bridge".

Adjust the code so it says `data-home-pitch` and it will work fine.  But from there, go to the JavaScript and change `teamInfo.dataset.homePitch` to `teamInfo.dataset.home-pitch`...you'll get a Reference error saying "pitch is not defined".

This is part of the conversion that the browser's doing behind the scenes.  In order for things to work properly, it does a camelcase converion of `home-pitch` to `homePitch`.

As a result of this, I suggest following two rules:

  1. No camelcase names in your data attributes in your HTML and no dash-separated words for the `dataset` properties.
  2. Keep your data attributes and `dataset` properties at a two-word minimum.  `data-home-pitch` and `teamInfo.dataset.homePitch` are fine...`data-home-pitch-address` and `teamInfo.dataset.homePitchAddress` may work, but are too verbose.

Store the data attributes in a link instead (<a href="http://codepen.io/kaidez/pen/dPoexg" target="blank">See the CodePen Demo</a>)








Cross-browser coding for android: as close to hell on earth as I've ever gotten.

http://ejohn.org/blog/html-5-data-attributes/

make sure the CSS is consistent across all CodePen samples
