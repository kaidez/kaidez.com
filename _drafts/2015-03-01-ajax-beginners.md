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
<ol>
  <li><a href="#introduction">Introduction</li>
  <li><a href="#how-code-examples-works">How the code examples work</li>
  <li><a href="#what-is-ajax">What Is AJAX</li>
  <li><a href="#brief-history-ajax">A brief history of AJAX</li>
  <li>
    <a href="#ajax-javascript">Write AJAX with JavaScript</li>
    <ol>
      <li><a href="#xhr-feature-detection">XHR feature detection</li>
      <li><a href="#ajax-states">Manage content with different AJAX states</li>
    </ol>
  </li>
  <li><a href="#conclusion">Conclusion</li>
</ol>

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
This is done so each example folder doesn't need its own copy of jQuery. All code example links will open in a new browser window.

Raw code for all the examples is located in the GitHub repo.
<a name="what-is-ajax"></a>
### What Is AJAX
The most important thing to understand about AJAX is that the `XMLHttpRequest` object is the centerpiece of an AJAX implementation. With that in mind, <a href="http://www.w3.org/TR/XMLHttpRequest/#introduction" target="blank" title=Read the W3C's XMLHttpRequest specification>the current version of the W3C's XMLHttpRequest specification</a> provides the best, and simplest, definition to what AJAX is:

> *"The XMLHttpRequest object is an API for fetching resources."*

That's the best way to describe it: `XMLHttpRequest` is used to find resources on a remote web server and place them on the page. It has the ability to do this "asynchronously", meaning that it can load them onto specific parts of the page without having to completely reload or refresh the page.
<a name="brief-history-ajax"></a>
### A brief history of AJAX
The roots of AJAX goes back to roughly early 1999: [according to JavaScript creator,Brendan Eich](http://www.stitcher.com/podcast/ruby-rogues/javascript-jabber/e/124-jsj-the-origin-of-javascript-with-brendan-eich-35282918), Microsoft was using Java to make asynchronous data requests inside its Outlook Web Access application. Due to a disagreement between Microsoft and Sun (who owned Java), Microsoft removed Java from their application.

Outlook Web Access still needed to make asynchronous requests, or, "async" requests. Because of this, Microsoft created the [XMLHTTP object](http://msdn.microsoft.com/en-us/library/ie/ms537505%28v=vs.85%29.aspx, "Read more about the XMLHTTP Object") to do just that, bundling it into Internet Explorer 5 when it was released in March 1999.

XMLHTTP was not made directly accessible to the web browser, meaning that you couldn't access it by adding `window.XMLHTTP` somewhere in your JavaScript code. Instead, it was bundled inside of another object called "[ActiveXObject](http://msdn.microsoft.com/en-us/library/aa751972(VS.85).aspx, "Read more about Microsoft's ActiveXObject")", which is a software package the helps other software easily communicate with one another in Microsoft apps.

Other browsers added `XMLHttpRequest` directly to the browser. Microsoft would eventually do the same when they removed it from ActiveXObject with the release of Internet Explorer 7.

`XMLHttpRequest`, or `xhr`, was used to create to web applications that loaded data asynchronous and without refreshing the page in its entirety. The most notable applications came from Google: specifically Google Maps and Gmail.

These web applications demonstrated how useful `xhr` was but the developer community as a whole didn't really take note. That all changed in February 2005, when [Jesse James Garrett wrote his influential AJAX article](http://www.adaptivepath.com/ideas/ajax-new-approach-web-applications/).

Garret described AJAX as _Asynchronous JavaScript + XML_ 

<a name="ajax-javascript"></a>
### Write AJAX with JavaScript
<a name="xhr-feature-detection"></a>
#### XHR feature detection
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

The `try...catch` statement will loop through each single `try` statement until it one of them meets a condition that works. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch" target="blank">Read more about "try...catch" on MDN</a>.

There are many ways to implement MDN feature detection: <a href="https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started#Step_3_.E2.80.93_A_Simple_Example" target="blank">MDN has another great implementation</a>
<a name="ajax-states"></a>
#### Manage content with different AJAX states

<a name="conclusion"></a>
### Conclusion
