---
title: AJAX - A Beginner's Tutorial
comments: true
author: Kai Gittens
layout: post
permalink: /ajax-beginners-tutorial/
meta-excerpt: "A tutorial for beginners about how to use AJAX. Learn how to write AJAX using both pure JavaScript and jQuery. Includes code examples."
category: tutorials
cat-name: "Tutorials"
tags: [html5, javascript]
has-home-img: ajax-image.jpg
---

## Table of Contents
1. [Introduction](#introduction)
2. [How the code examples work](#how-code-examples-works)
3. [What Is AJAX](#what-is-ajax)
4. [A brief history of AJAX](#brief-history-ajax)
5. [XHR feature detection](#xhr-feature-detection)
11. [Conclusion](#conclusion)

<a name="introduction"></a>
### Introduction

<a name="how-code-examples-works"></a>
### How the code examples work

There will always be a relative reference to a minified, production-ready version of jQuery version 1.11.2 and a file called `scripts.js`. jQuery will always be one level up to a folder called `js/libs` and the `js` folder will be in the same folder as `index.html`.
{% prism markup %}
├── sample-folder
|   ├── index.html
|   ├── scripts.js
├── js
|   ├── libs
|       ├── jquery-1.11.2.min.js
{% endprism %}
`main.js` will always in the same folder as `index.html`: either one or both of these files will change with each step of this guide.

For the example above, the HTML would look like to this:
{% prism markup %}
<!-- sample-folder/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>A Code Sample</title>
  </head>
  <body>
    <!-- Content will go here -->
    <script src="../js/libs/jquery-1.11.2.min.js"></script>
    <script src="scripts.js"></script>
  </body>
</html>
{% endprism %}
This is done so each example folder doesn't need its own copy of jQuery. All code example linkss will open in a new browser window.

Raw code for all the examples is located in the GitHub repo.
<a name="what-is-ajax"></a>
### What Is AJAX
The most important thing to understand about AJAX is that the `XMLHttpRequest` object is the centerpiece of an AJAX implementation. With that in mind, <a href="http://www.w3.org/TR/XMLHttpRequest/#introduction" target="blank" title=Read the W3C's XMLHttpRequest specification>the current version of the W3C's XMLHttpRequest specification</a> provides the best, and simplest, definition to what AJAX is:

> *"The XMLHttpRequest object is an API for fetching resources."*

That is really is the best way to describe it: `XMLHttpRequest`, or `xhr` as this guide will refer to it from this point on, is used to find resources not on a web page, then place them on the page. `xhr` has the ability to do this "asynchronously", meaning that it can load them onto specific parts of the page without having to completely reload or refresh the page.
<a name="brief-history-ajax"></a>
### A brief history of AJAX

<a name="xhr-feature-detection"></a>
### XHR feature detection
AJAX's rise in popularity occurred at a time when both Internet Explorer version's 6 and lower were still in wide use. Since those browsers implemented `xhr` differently from all the others, any code using it needed to include some sort of feature-detection system to make sure that it worked in all the browsers.

The simplest version of this code looked similar to this (<a href="/samples/ajax-tutorial-samples/sample01/" target="blank">view the example</a>):

{% prism javascript %}
// Feature-detect XMLHttpRequest implementation
var xhr;
if (window.XMLHttpRequest) { // Browsers other than IE 6 and lower
  xhr = new XMLHttpRequest();
  console.log("Supports newer XHR implementations");
} else if (window.ActiveXObject) { // For IE 6 and lower
  xhr = new ActiveXObject("Microsoft.XMLHTTP");
  console.log("Supports older XHR implementations");
}
{% endprism %}

<a name="conclusion"></a>
### Conclusion
