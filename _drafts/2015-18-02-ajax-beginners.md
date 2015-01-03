---
title: AJAX Tutorial for Beginners
comments: true
author: Kai Gittens
layout: post
permalink: /ajax-beginners-tutorial/
meta-excerpt: "Learn how to write AJAX using both pure JavaScript as well as jQuery. Includes many code examples that can be downloaded."
category: tutorials
cat-name: "Tutorials"
tags: [html5, javascript]
has-home-img: ajax-image.jpg
---
AJAX has advanced a lot since [Jesse James Garrett defined it 2005](adaptivepath.com/ideas/ajax-new-approach-web-applications/ "Read Jesse James Garrett original'AJAX' article"). It's defined a way to create robust web applications and turned JavaScript into one of the world's most popular web programming languages.

Many new developers (as well as few intermediate ones) struggle to learn AJAX and are also not aware of how it's progressed inside the jQuery library. This guide was written with those developers and jQuery progressions in mind.
<h2 style="clear:both;">Table of Contents</h2>
  <ol>
    <li><a href="#how-code-examples-works">How the code examples work</li>
    <li><a href="#what-is-ajax">What Is AJAX</li>
    <li><a href="#brief-history-ajax">A brief history of AJAX</li>
    <li>
      <a href="#ajax-javascript">Write AJAX with JavaScript</li>
      <ol>
        <li><a href="#xhr-feature-detection">XHR feature detection</li>
        <li><a href="#what-is-onreadystatechange">What is "onreadystatechange"?</li>
      </ol>
    </li>
    <li><a href="#conclusion">Conclusion</li>
  </ol>
<a name="how-code-examples-works"></a>
### How the code examples work

All examples run from an `index.html` file that references a minified version of jQuery 1.11.2 and a file called `scripts.js`. jQuery will always be one level up to a folder called `js/libs` and `scripts.js` file will be in the same folder as `index.html`.

All of this is done so that each example folder doesn't need its own copy of jQuery.  The tree structure looks like this:
{% prism markup %}
├── sample-folder
|   ├── index.html
|   ├── scripts.js
├── js
|   ├── libs
|       ├── jquery-1.11.2.min.js
{% endprism %}

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
Either `index.html` or `scripts.js` will change with each new example.

All code example links will open in a new browser window.  Raw code for all the examples is located in the GitHub repo.
<a name="what-is-ajax"></a>
### What Is AJAX
First, understand that `XMLHttpRequest` is the heart of an AJAX implementation. With that in mind, <a href="https://xhr.spec.whatwg.org/#introduction" target="blank" title=Read the W3C's XMLHttpRequest specification>the current version of the W3C's XMLHttpRequest specification</a> helps to provide the simplest definition of what AJAX is:

> *"The XMLHttpRequest object is an API for fetching resources."*

That's the best way to describe it: `XMLHttpRequest` "requests" information from a server, then places it on a web page. It does this "asynchronously", meaning that *it loads the information onto specific parts of the page without having to completely reload or refresh the page.*
<a name="brief-history-ajax"></a>
### A brief history of AJAX
The roots of AJAX goes back to roughly late 1988/early 1999: [according to JavaScript creator, Brendan Eich](http://www.stitcher.com/podcast/ruby-rogues/javascript-jabber/e/124-jsj-the-origin-of-javascript-with-brendan-eich-35282918), Microsoft was using Java to make asynchronous data requests inside its Outlook Web Access application. Due to a disagreement between Microsoft and Sun (who owned Java), Microsoft removed Java from their application.

Outlook Web Access still needed to make asynchronous requests, or, "async" requests. Because of this, Microsoft created the [XMLHTTP object](http://msdn.microsoft.com/en-us/library/ie/ms537505%28v=vs.85%29.aspx, "Read more about the XMLHTTP Object") to do just that, bundling it into Internet Explorer 5 when it was released in March 1999.

Other browsers added the object as well, but with a slightly different implementation and called it `XMLHttpRequest`. With the release of Internet Explorer 7, Microsoft would copy this implementation and also name their object `XMLHttpRequest`.

`XMLHttpRequest`, or `xhr`, was used to create to web applications that loaded data asynchronously, without page refreshes. The most notable applications came from Google: specifically Google Maps and [Google Suggest](http://www.searchenginejournal.com/beginners-guide-google-suggest-marketers-seo/73269/ "Read about Google Suggest").

These web applications demonstrated how useful `xhr` was but the developer community as a whole didn't really take note. That all changed in February 2005, when [Jesse James Garrett wrote his influential AJAX article](http://www.adaptivepath.com/ideas/ajax-new-approach-web-applications/).

Garret described AJAX as _Asynchronous JavaScript + XML_: he went onto say that it wasn't a technology but rather "several technologies, each flourishing in its own right, coming together in powerful new ways." The technologies were: XHTML, CSS, the Document Object Model(DOM), XML/XSLT, XMLHttpRequest, and JavaScript would bring all of these things together.

<a name="ajax-javascript"></a>
### Write AJAX with JavaScript
<a name="xhr-feature-detection"></a>
#### XHR feature detection
As mentioned, Microsoft's XHR implementation was different from other browsers until they released IE7. But when AJAX started to become popular, older versions were still in use.

In the older versions, XMLHTTP was not a directly accessible object in the web browser, meaning that you couldn't access it by adding `window.XMLHTTP` somewhere in your JavaScript code. Instead, it was bundled inside of another object called
<a href="http://msdn.microsoft.com/en-us/library/aa751972(VS.85).aspx">"ActiveXObject"</a>, which helps software interact with Microsoft apps.


This meant that you had to write some sort of feature-detection system in your code to make sure that it worked in all the browsers. The simplest version of this code looked similar to this (<a href="/samples/ajax-tutorial-samples/sample01/" target="blank">view the example</a>):

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
function getXHR() {
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
        alert("Sorry...this browser doesn't support XMLHttpRequest");
      }
    }
  }
  return xhr;
}

{% endprism %}
The above-example creates a reusable function called `getXHR()`. Every new instance `getXHR()` we create will be able to use `xhr` without worrying about the cross-browser issues.

This version of `getXHR()` will return one of the four alert messages above, depending on which browser `index.html` loads into. A `try...catch` statement is used to perform more robust ActiveX detection as well as detect whether or not the browser even supports `xhr`.

The `try...catch` statement will loop through each single `try` statement until it one of them meets a condition that works. The last condition is what's returned if the browser soes NOT support `xhr`.

There are many ways to implement MDN feature detection: <a href="https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started#Step_3_.E2.80.93_A_Simple_Example" target="blank">MDN has another great implementation</a>. Also, <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch" target="blank">Read about "try...catch" on MDN</a>.
<a name="what-is-onreadystatechange"></a>
#### What is "onreadystatechange"?
`onreadystatechange` is an event handler that tracks state changes in an `xhr` instance. It does this by watching for changes in `readyState`, which is an attribute attached to the `xhr`.

While it's running, `readyState` will always be in one of five states and each state has a numeric value:
* 0: meaning that `onreadystatechange` is in the __UNSENT__ state...the code understands that instance of `xhr` has been created, but it's not  doing anything.
* 1: meaning that `onreadystatechange` is in the __OPEN__ state...the `open()` method has been invoked somewhere in our code. This guide will use `open()` to get data but when things are in this state, you can also set headers if you're sending things instead of getting things. [Read about setting headers over on MDN ](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started#Step_5_.E2.80.93_Working_with_data "Go to MDN to learn about setting headers in an XMLHttpRequest") 
<a name="conclusion"></a>
### Conclusion
