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
AJAX has advanced a lot since [Jesse James Garrett defined it 2005](adaptivepath.com/ideas/ajax-new-approach-web-applications/ "Read Jesse James Garrett original ‘AJAX' article"). It's described a way to create robust web applications and helped turn JavaScript into one of the world's most popular web programming languages.

Many new developers (as well as a few intermediate ones) struggle to learn AJAX and are also not aware of how it's progressed inside the jQuery library. This guide was written with those developers and jQuery progressions in mind.
<h2 style="clear:both;">Table of Contents</h2>
  <ol>
    <li><a href="#how-code-examples-works">How the code examples work</li>
    <li><a href="#what-is-ajax">What Is AJAX</li>
    <li><a href="#brief-history-ajax">A brief history of AJAX</li>
    <li>
      <a href="#ajax-javascript">Write AJAX with JavaScript</li>
      <ol>
        <li><a href="#xhr-feature-detection">XHR feature detection</li>
        <li>
          <a href="#load-content">Load content onto a page with AJAX</li>
          <ol>
            <li><a href="#200-response">Wait for 200 response code from the server</li>
            <li><a href="#xhr-states">XHR States</li>
            <li><a href="#what-is-onreadystatechange">What is "onreadystatechange"?</li>
          </ol>
        </li>
      </ol>
    </li>
    <li><a href="#conclusion">Conclusion</li>
  </ol>
<a name="how-code-examples-works"></a>
<h3 class="h3-guide">How the code examples work</h3>
The raw code for all the examples is located in the GitHub repo and typically looks like this:

{% prism markup %}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>A Sample</title>
  </head>
  <body>

    <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="scripts.js"></script>
  </body>
</html>
{% endprism %}

All examples run in their own folder from an `index.html` file. `index.html` always references a minified version of jQuery 1.11.2 and a file called `scripts.js`.

jQuery is being served out from [the jQuery CDN](http://code.jquery.com/ "Visit the jQuery CDN"). Either `index.html` or `scripts.js` will change with each new example.

All examples use the XMLHttpRequest object so if you download them from the GitHub repo, they should run from a web server and not as a local file in a web browser. Firefox can run files locally but to ensure the best results, they should run from some sort of web server.

<a name="what-is-ajax"></a>
<h3 class="h3-guide">What Is AJAX</h3>
First, understand that XMLHttpRequest is the heart of an AJAX implementation. With that in mind, <a href="https://xhr.spec.whatwg.org/#introduction" target="blank" title=Read the W3C's XMLHttpRequest specification>the current version of the XMLHttpRequest specification</a> helps to provide the simplest AJAX definition:

> *"The XMLHttpRequest object is an API for fetching resources."*

That's the best way to describe it: XMLHttpRequest "requests" information from a server, then places it on a web page. It does this "asynchronously", meaning that __it loads the information onto specific parts of the page without having to completely reload the page.__

"AJAX" is an acronym for _Asynchronous JavaScript + XML_ but other technologies are used as well, specifically XMLHttpRequest, or "xhr".  In original definition, AJAX was the term for a group of technologies working together to manage "xhr" requests inside a web page: the technologies were XMLHttpRequest, JavaScript, XML/XSLT, XHTML, CSS and the Document Object Model (or, "the DOM").

XML was defined as the main data layer but any other data layer can be used...text files, HTML files, etc. JSON is the most-used data layer at the time of this guide's initial publish date.

XHTML can be used as the presentation layer but at the time of this guide's initial publish date, using HTML5 is recommended over XHTML. If you use XHTML, using it in Strict mode is recommended.
<a name="brief-history-ajax"></a>
<h3 class="h3-guide">A brief history of AJAX</h3>
The roots of AJAX goes back to roughly late 1988/early 1999: [according to JavaScript creator, Brendan Eich](http://www.stitcher.com/podcast/ruby-rogues/javascript-jabber/e/124-jsj-the-origin-of-javascript-with-brendan-eich-35282918), Microsoft was using Java to make asynchronous data requests inside its browser-based Outlook Web Access application. Due to a disagreement between Microsoft and Sun (who owned Java), Microsoft removed Java from their application.

Outlook Web Access still needed to make asynchronous requests, or, "async" requests. Because of this, Microsoft created the [XMLHTTP object](http://msdn.microsoft.com/en-us/library/ie/ms537505%28v=vs.85%29.aspx, "Read more about the XMLHTTP Object") to do just that, bundling it into Internet Explorer 5 when it was released in March 1999.

Other browsers added the object as well, but with a slightly different implementation and called it `XMLHttpRequest`. With the release of Internet Explorer 7, Microsoft would copy that other implementation and also name their object `XMLHttpRequest`.

The object was used to create to web applications that loaded data asynchronously, without page refreshes. The most notable applications came from Google: specifically Google Maps and [Google Suggest](http://www.searchenginejournal.com/beginners-guide-google-suggest-marketers-seo/73269/ "Read about Google Suggest").

These web applications demonstrated how useful "xhr" was but the developer community as a whole didn't really notice this. That all changed in February 2005, when [Jesse James Garrett wrote his influential AJAX article](http://www.adaptivepath.com/ideas/ajax-new-approach-web-applications/).

Garret's article was where the AJAX acronym was defined and was also where the initial AJAX technologies were listed out. <a href="#what-is-ajax">See the previous section for more on this</a>.

<a name="ajax-javascript"></a>
<h3 class="h3-guide">Write AJAX with JavaScript</h3>
<a name="xhr-feature-detection"></a>
<h4 class="h4-guide">XHR feature detection</h4>
As mentioned, Microsoft's "xhr" implementation was different from other browsers until they released IE7. In the older versions, XMLHTTP was not a directly accessible object in the web browser...you couldn't access it by using `window.XMLHTTP` somewhere in your JavaScript code.

Instead, it was bundled inside of another object called
<a href="http://msdn.microsoft.com/en-us/library/aa751972(VS.85).aspx">"ActiveXObject"</a>. Since AJAX became popular while the old Microsoft implementation was still in wide use, you had to write some sort of feature-detection code to make sure that your AJAX worked in all browsers.

The simplest version of this feature-detection code looked similar to this (<a href="/samples/ajax-tutorial-samples/sample01/" target="blank">view the example</a>):
{% prism javascript %}
// sample/01scripts.js
// Feature-detect XMLHttpRequest implementation
var xhr;
if (window.XMLHttpRequest) { // Browsers other than IE 6 and lower
  xhr = new XMLHttpRequest();
} else {
  if (window.ActiveXObject) { // For IE 6 and lower
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
}
{% endprism %}
The above-example creates a variable called `xhr`, then checks to see if `XMLHttpRequest` is attached to the browser via the `window` object.  If it is, then `xhr` will directly reference a new instance of `XMLHttpRequest` when doing AJAX things.

The example is also checking to see if `ActiveXObject` is attached to the browser via the `window` object. If it is, then `xhr` will directly reference a new instance of `ActiveXObject` when doing AJAX things.

Developers later realized that `window.ActiveXObject` was implemented differently across builds of all the older versions of IE. Sadly, they also realized that that some browsers heavily in use at the time didn't support `xhr` at all.

As a result, they built slightly different feature detection code (<a href="/samples/ajax-tutorial-samples/sample02/" target="blank">view the example</a>):
{% prism javascript %}
// sample02/scripts.js
// Feature-detect XMLHttpRequest implementation
// More robust detecting of ActiveX implementations
function getXHR() {
  var xhr;
  if (window.XMLHttpRequest) { // Browsers other than IE 6 and lower
    xhr = new XMLHttpRequest();
  } else {
    try { // Browsers with one type of ActiveXObject build
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try { // Browsers with another type of ActiveXObject build
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        // Browsers that don't support either XMLHttpRequest or ActiveXObject
        xhr = false;
      }
    }
  }
  return xhr;
}
{% endprism %}
The feature detection code is now in a reusable function called `getXHR()`. The function does the cross-browser checking for `XMLHttpRequest` internally, meaning we can use "xhr" by creating new `getXHR()` instances without worrying about the "xhr" cross-browser issues.

The function checks for `XMLHttpRequest` in the same way, but we're also checking to see of the browser has one of two ActiveXObject builds and also checking to see if either `XMLHttpRequest` or `ActiveXObject` exists.

A JavaScript `try...catch` statement is looking for the different versions of `ActiveXObject`. If `try...catch` can't find it and also can't find `XMLHttpRequest`, then the value of the `xhr` variable is set to `false` and won't do any AJAX work.

`getXHR()` says `return xhr` at the end of the code. This lets us create new instances of `getXHR()` outside of the function.

There are many ways to implement MDN feature detection: <a href="https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started#Step_3_.E2.80.93_A_Simple_Example" target="blank">MDN has another great implementation</a>. Also, <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch" target="blank">Read about "try...catch" on MDN</a>.

<a name="load-content"></a>
<h4 class="h4-guide">Load content onto a page with AJAX</h4>
Loading content with "xhr" is a three-step process:
1. Wait for 200 response code from the server.
2. Wait for a state of 4.
3. Bring everything together using "onreadystatechange".
<a name="200-response"></a>
<h5 class="h5-guide">Wait for 200 response code from the server</h5>
A web server sends many server response codes, each in the form of a numerical number.  With AJAX, the most important one is `200 OK`.

When your AJAX code sees a `200 OK` response, it knows that your "xhr" has succeeded in making the request.
<a name="xhr-states"></a>
<h5 class="h5-guide">XHR States</h5>
An "xhr" request will be in one of fives states, each with a numerical value that will be 0 through 4. The last request state, number 4, is the most important one in AJAX code, but here's a simplified description of the states.

*(NOTE: This section is here because it's an important part of the XHR spec, but because this guide focuses on the last state only, you can [skip this section](what-is-onreadystatechange "Go the the "onreadystatechange" section").*

There are two widely accepted specifications for AJAX states: [the spec defined by WHATWG](https://xhr.spec.whatwg.org/#states "Read the AJAX states definition in official XMLHttpRequest specification") and [the original spec defined by Microsoft](http://msdn.microsoft.com/en-us//library/ms534361%28en-us,VS.85%29.aspx). Many web development sources, including MDN, refer to the Microsoft one.

The WHATWG spec defines five states, each with a numerical value:

* __0__: meaning that things are in the __UNSENT__ state...the code understands that instance of `xhr` has been created, but it's not doing anything.

* __1__: meaning that things are in the __OPEN__ state...the `open()` method has been invoked somewhere in our code and if you want to send any data to the server, you can do that with the `send()` method. This guide focuses more on getting things with `xhr` instead of sending things...[read about setting headers over on MDN ](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started#Step_5_.E2.80.93_Working_with_data "Go to MDN to learn about setting headers in an XMLHttpRequest").

* __2__: meaning that things are in the __HEADERS_RECEIVED__ state...if you're downloading headers, the state will be set to 2 after they're finished downloading.

* __3__: meaning that things are in the __LOADING__ state...the data is loading.

* __4__: meaning that things are in the __DONE__ state...either the data has downloaded in full or there was an error during the download process.

Microsoft's definition also attaches numbers to states but is shorter. <a href="https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started#Step_2_.E2.80.93_Handling_the_server_response" title="See how AJAX states are listed in MDN" target="blank">MDN shortens it even more</a>:

* __0__ (uninitialized)

* __1__ (loading)

* __2__ (loaded)

* __3__ (interactive)

* __4__ (complete)

<a name="what-is-onreadystatechange"></a>
<h5 class="h5-guide">What is "onreadystatechange"?</h5>
`onreadystatechange` is an event handler that tracks the current request state. Whether it's 0 or 4, that value will always be stored in `onreadystatechange`.

There are use cases for knowing all the times when `onreadystatechange` is equal to all the different states. But with AJAX, knowing when it's equal to 4, the `done` state, is the most important use case.

When `onreadystatechange` is equal to 4, it means that all the data has fully downloaded and is ready to be used in our code. It also could mean that the data didn't download, but this guide assumes that your final code will be written in a way that keeps that from happening.

Using `onreadystatechange` means that your AJAX code is is ready to load in data:

{% prism markup %}
<!-- sample03/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Sample 03</title>
  </head>
  <body>
    <div id="textTarget"></div>
    <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="scripts.js"></script>
  </body>
</html>
{% endprism %}
We've added a div tag with an id of `textTarget` to `index.html`. Our AJAX code will load data into this element.

{% prism javascript %}
// Feature-detect XMLHttpRequest implementation
// More robust detecting of ActiveX implementations
function getXHR() {
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        xhr = false;
      }
    }
  }
  return xhr;
}

var getArticleInfo = new getXHR();

getArticleInfo.onreadystatechange = loadText;
getArticleInfo.open("GET", "articleName.txt");
getArticleInfo.send();

function loadText() {
  var text = document.getElementById("textTarget");
    if (getArticleInfo.readyState === 4) {
      if (getArticleInfo.status === 200) {
        text.innerHTML = getArticleInfo.responseText;
      } else {
        console.log('There was a problem with the request.');
      }
    }
};
{% endprism %}
The feature detection code is the same as before, so we won't be walking through that...let's look at the other code:

{% prism javascript %}
var getArticleInfo = new getXHR();
{% endprism %}
Treat the `getXHR()` function as a constructor function and create a new instance of it with a variable called `getArticleInfo`. Again, `getXHR()` lets us use `XMLHttpRequest()` in a cross-browser compatible way.

{% prism javascript %}
getArticleInfo.onreadystatechange = loadText;
getArticleInfo.open("GET", "articleName.txt");
getArticleInfo.send();
{% endprism %}
For now, `getArticleInfo.onreadystatechange` will run a function called `loadText` any time a state changes, but our code will make sure that only happens when the state is set to `4`.

`getArticleInfo.open()` describes the data request. The first parameter is `GET` and it tells the server we want to "get" something from the server.

The second `getArticleInfo.open()` parameter is the file name of the data we're requesting. In this case, that's a file called "articleName.txt" and it contains the name of this article and the name of the article.

`getArticleInfo.send()` is the part of the code that actually sends the request through. You can pass a parameter to `send()` but it will be ignored if you do this `GET`: the parameter will be set to its default value of `null`.

`send()` can accept and process parameters when using `POST` instead of `GET`.

{% prism javascript %}
function loadText() {
...
};
{% endprism %}
Start building the `loadText()` function that runs when `getArticleInfo.onreadystatechange` goes through state changes.
{% prism javascript %}
var text = document.getElementById("textTarget");
{% endprism %}
<a name="conclusion"></a>
<h3 class="h3-guide">Conclusion</h3>
Synchronous requests are disappearing from XHR: https://xhr.spec.whatwg.org/#the-open()-method
