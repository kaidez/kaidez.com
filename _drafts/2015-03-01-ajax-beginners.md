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
`scripts.js` will always in the same folder as `index.html`: either one or both of these files will change with each step of this guide.

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
http://msdn.microsoft.com/en-us/library/ie/ms537505%28v=vs.85%29.aspx

<a name="xhr-feature-detection"></a>
### XHR feature detection
AJAX's rise in popularity occurred at a time when both Internet Explorer version's 6 and lower were still in wide use. Since those browsers implemented `xhr` differently from all the others by placing it inside of `window.ActiveXObject`, any code using it needed to include some sort of feature-detection system to make sure that it worked in all the browsers.

The simplest version of this code looked similar to this (<a href="/samples/ajax-tutorial-samples/sample01/" target="blank">view the example</a>):

{% prism javascript %}
// sample/01scripts.js
// Feature-detect XMLHttpRequest implementation
var xhr;
if (window.XMLHttpRequest) { // Browsers other than IE 6 and lower
  xhr = new XMLHttpRequest();
  alert("Supports newer XHR implementations");
} else if (window.ActiveXObject) { // For IE 6 and lower
  xhr = new ActiveXObject("Microsoft.XMLHTTP");
  alert("Supports older XHR implementations");
}
{% endprism %}
The above-example will return one of the two alert messages above, depending on which browser `index.html` loads into.

Developers later realized that `window.ActiveXObject` was implemented differently across builds of all the older versions of IE. Sadly, they also realized that that some browsers heavily in use at the time didn't support `xhr` at all.

As a result, they built slightly different feature detection code (<a href="/samples/ajax-tutorial-samples/sample02/" target="blank">view the example</a>):
{% prism javascript %}
// sample02/scripts.js
// Feature-detect XMLHttpRequest implementation
// More robust detecting of ActiveX implementations
(function(){
  var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
      alert("Supports newer XHR implementations");
    } else {
      try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
        alert("Supports one version of ActiveX");
      } catch (e) {
        try {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
          alert("Supports another version of ActiveX");
        } catch (e) {
          xhr = false;
          alert("Sorry...xhr is not supported");
        }
      }
    }
  return xhr;
})();
{% endprism %}
The above-example will return one of the four alert messages above, depending on which browser `index.html` loads into. A `try...catch` statement is used to perform more robust ActiveX detection as well as detect whether or not the browser even supports `xhr`.

The `try...catch` statement will loop through each single `try` statement until it one of them meets a condition that works. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch" target="blank">Read more about "try...catch" on MDN</a>

There are many ways to implement MDN feature detection: <a href="https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started#Step_3_.E2.80.93_A_Simple_Example" target="blank">MDN has another great implementation</a>
<a name="conclusion"></a>
### Conclusion
