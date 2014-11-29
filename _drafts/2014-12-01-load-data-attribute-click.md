---
title: 'TUTORIAL: Change data-attributes with Mouse Clicks'
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

How data-attributes work
---------------------
data-attributes (sometimes referred to as `data-*`), are attributes placed in page elements:
{% prism markup %}
<div id="teamInfo"
     data-team="Chelsea FC"
     data-manager="José Mourinho"
     data-home-pitch="Stanford Bridge">
</div>
{% endprism %}

The element that contains these data-attributes (`<div id="teamInfo">` in the above-example) has a property called `dataset`, which holds all these attributes and their respective values in an object called `DOMStringMap` (an API introduced with HTML5):

{% prism javascript %}
console.log(teamInfo.dataset);
// logs "DOMStringMap {team: "Chelsea FC", manager: "José Mourinho", homePitch: "Stanford Bridge"}"
{% endprism %}

You can access the individual `dataset` properties:
{% prism javascript %}
console.log(teamInfo.dataset.team); // logs "Chelsea FC"
console.log(teamInfo.dataset.manager); // logs "José Mourinho"
console.log(teamInfo.dataset.homePitch); // logs "Stanford Bridge"
{% endprism %}

All of this means we use JavaScirpt to access these properties and display on a web page. But [data-attribute manipulation doesn't work in all browsers, specifically, Internet Explorer 10 and lower](http://caniuse.com/#search=dataset), so we need to write fallback code for those situations.

Before we create our final-production-ready code, we'll create some incremental examples so we understand it better.

Simple Example (<a href="http://codepen.io/kaidez/pen/VYLxqG" target="blank">See the CodePen Demo</a>)
---------------------
We'll start by creating code that changes just one set of data-attributes with JavaScript. Let's start with the CSS, which will be applied to all future code samples and demos:
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

.teamListItem {
  display: inline;
  list-style-type: none;
  padding-right: 20px;
}

.dataTarget {
  padding-left: 40px;
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
    <a href="#" id="chelsea">Load Chelsea FC Info &raquo;</a>

    <div
      id="teamInfo"
      data-team="Chelsea"
      data-manager="José Mourinho"
      data-home-pitch="Stanford Bridge">

    </div>  

    <div id="team" class="dataTarget"></div>
    <div id="manager" class="dataTarget"></div>
    <div id="homePitch" class="dataTarget"></div>

    <!-- Note that we're using the oldIE-friendly version of jQuery -->
    <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
  </body>
</html>
{% endprism %}

And the JavaScript that allows for the content that gets loaded on a mouse click looks like this:
{% prism javascript %}
var team = document.querySelector("#team"),
    manager = document.querySelector("#manager"),
    homePitch = document.querySelector("#homePitch");

$("#chelsea").click(function(event){

  event.preventDefault();

  // Use the .dataset property
  team.innerHTML = teamInfo.dataset.team;
  manager.innerHTML = teamInfo.dataset.manager;
  homePitch.innerHTML = teamInfo.dataset.homePitch;

});
{% endprism %}

Breaking down the HTML first:

{% prism markup %}
<a href="#" id="chelsea">Load Chelsea FC Info &raquo;</a>
{% endprism %}

In the HTML, clicking on the `id="chelsea` element will load the content stored in the data-attributes.

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
$("#chelsea").click(function(event){

  event.stopPropagation();

  // Use the .dataset property
  team.innerHTML = teamInfo.dataset.team;
  manager.innerHTML = teamInfo.dataset.manager;
  homePitch.innerHTML = teamInfo.dataset.homePitch;

});
{% endprism %}

The `$` tells us that we're using jQuery to bind the `jQuery.click` method to the link on the web page which, again, is the one with an id of `#chelsea`. It has a parameter called `event` passed to it, which we'll discuss a little later.

When `#chelsea` is clicked, it accesses the previously-mentioned `dataset` property and sees the value of all the data-attributes set inside `<div id="teamInfo">`.  So after it's clicked, `#chelsea` sees that `teamInfo.dataset.team` is direct reference to the value of the `data-team`, and has a value of  "Chelsea FC".

The link will then take that value and place it inside the `<div>` tags that we referenced with `querySelector()`, all with help of the `innerHTML` property.  

OK...back to the function's `event` parameter...

We have to do this so we can use the `event.PreventDefault()` method in the link. If we don't use this and the link's `href` attribute is set to `#` (which is what's happening with `#chelsea`), then the `#` will be passed to the URL.

Depending on the page layout, will force the page to jump to the top. Which we don't want.

*(Side note: read more about [event.PreventDefault() on MDN](https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault). There's also the similar [event.stopPropagation() on MDN](https://developer.mozilla.org/en-US/docs/Web/API/event.stopPropagation), but that blocks events a little more obtrusively then `event.PreventDefault()`.)*

Proper Naming of Data Attributes (<a href="http://codepen.io/kaidez/pen/WbvEab" target="blank">See the CodePen Demo</a>)
---------------------
Here's one of the quirks of data-attributes...

As just mentioned, `teamInfo.dataset.team` is a direct reference to the `data-team` attribute...that makes sense. It's also the same thing with the manager information: `teamInfo.dataset.manager` is a direct reference to the `data-manager` attribute.

But those are one-word attributes and our `data-home-pitch` attribute is two words. So the syntax is different:
{% prism javascript %}
homePitch.innerHTML = teamInfo.dataset.homePitch;
{% endprism %}

It needs to be this way for two-word data-attributes.  `dataset` can't refer to it as `teamInfo.dataset.home-pitch` and the HTML reference can't be `data-homePitch`.

This is due to how `dataset` works behind the scenes, using something called the `DOMStringMap` object. `dataset` will look at the data-attribute names and automatically drop the data- prefix first, removing hyphens next, and finally convert the attribute to camelCase.

The HTML for this section's CodePen has a `data-homePitch` attribute.  Click on the "Load Chelsea FC Info" link and notice that the pitch content loads in as `undefined` instead of the expected "Stanford Bridge".

Adjust the code so it says `data-home-pitch` and it will work fine.  But from there, go to the JavaScript and change `teamInfo.dataset.homePitch` to `teamInfo.dataset.home-pitch`...you'll get a Reference error saying "pitch is not defined".

Because of this, I suggest keeping your data-attributes and `dataset` properties at a two-word minimum.  `data-home-pitch` and `teamInfo.dataset.homePitch` are fine...`data-home-team-pitch` and `teamInfo.dataset.homeTeamPitch` may work, but are too verbose.

Store the data-attributes in a link (<a href="http://codepen.io/kaidez/pen/dPoexg" target="blank">See the CodePen Demo</a>)
---------------------
The first example was separated out just so things would be clearer, but a real-world use case is to store the data-attributes in the link being clicked on. Using the same CSS, that code would look like this:

__The HTML__
{% prism markup %}
...
<a href="#"
   id="chelsea"
   data-team="Chelsea"
   data-manager="José Mourinho"
   data-home-pitch="Stanford Bridge">
   Load Chelsea FC Info &raquo;
</a>

<div id="team" class="dataTarget"></div>
<div id="manager" class="dataTarget"></div>
<div id="homePitch" class="dataTarget"></div>
...
{% endprism %}
__The JavaScript__
{% prism javascript %}
var team = document.querySelector("#team"),
manager = document.querySelector("#manager"),
homePitch = document.querySelector("#homePitch");

$("#chelsea").click(function(event){

  event.preventDefault();
  // Use the .dataset property
  team.innerHTML = this.dataset.team;
  manager.innerHTML = this.dataset.manager;
  homePitch.innerHTML = this.dataset.homePitch;

});
{% endprism %}

In the HTML, we've taken the data-attributes listed in `<div id="teamInfo">` and placed them inside the `#chelsea` link. This means that `<div id="teamInfo">` is no longer needed so we can get rid of it.

In the JavaScript, we've replaced all the `teamInfo.dataset` references to `this.dataset`. `this` is a direct reference to the `#chelsea` link context, meaning it sees everything connected to to...including the data-attributes.

Store the data-attributes in multiple links (<a href="http://codepen.io/kaidez/pen/GgJYLZ" target="blank">See the CodePen Demo</a>)
---------------------

In the previous example, we could have used `chelsea.dataset` instead of `this.dataset`. But when using `this`, we can make our code reusable and create multiple links with the same functionality.

Still keeping the CSS the same, we can add a few more links to our HTML while slightly adjusting our JavaScript.  Clicking on each link will load different info onto our page.

__The HTML__
{% prism markup %}
...
<ul>
  <li class="teamListItem">
    <a href="#"
       class="teamLink"
       data-team="Chelsea"
       data-manager="José Mourinho"
       data-home-pitch="Stanford Bridge">
       Load Chelsea FC Info &raquo;
     </a>
  </li>
  <li class="teamListItem">
    <a href="#"
       class="teamLink"
       data-team="Real Madrid"
       data-manager="Carlo Ancelotti"
       data-home-pitch="Santiago Bernabéu">
       Load Real Madrid Info &raquo;
    </a>
  </li>
  <li class="teamListItem">
    <a href="#"
       class="teamLink"
       data-team="AC Milan"
       data-manager="Filippo Inzaghi"
       data-home-pitch="San Siro">
       Load AC Milan Info &raquo;
    </a>
  </li>
  <li class="teamListItem">
    <a href="#"
       class="teamLink"
       data-team="Paris Saint-Germain"
       data-manager="Laurent Blanc"
       data-home-pitch="Parc des Princes">
       Load Paris Saint-Germain Info &raquo;
    </a>
  </li>
</ul>

<div id="team" class="dataTarget"></div>
<div id="manager" class="dataTarget"></div>
<div id="homePitch" class="dataTarget"></div>
...  
{% endprism %}

__The JavaScript__
{% prism javascript %}
var team = document.querySelector("#team"),
    manager = document.querySelector("#manager"),
    homePitch = document.querySelector("#homePitch");

$(".teamLink").click(function(event){

  event.preventDefault();
  // Use the .dataset property
  team.innerHTML = this.dataset.team;
  manager.innerHTML = this.dataset.manager;
  homePitch.innerHTML = this.dataset.homePitch;

});
{% endprism %}

In the HTML we've removed the id property while adding a class called `teamLink` for each of our links.  We're also no longer targeting the id in the `jQuery.click` method and, instead, targeting this new `teamLink` class.

So every time a link with the `teamLink` class gets clicked, the `this` keyword forces our JavaScript code to look at the data-attributes for that link only, then load them onto the page.

Use `getAttribute` instead of `dataset` (<a href="http://codepen.io/kaidez/pen/QwbJBZ" target="blank">See the CodePen Demo</a>)
---------------------
`dateset` is awesome but isn't cross-browser compliant and won't work in Internet Explorer 10 and lower. And [as MDN points out](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes), it has performance issues.







Cross-browser coding for android: as close to hell on earth as I've ever gotten.

http://ejohn.org/blog/html-5-data-attributes/
    https://dev.opera.com/articles/introduction-to-datasets/
make sure the CSS is consistent across all CodePen samples
