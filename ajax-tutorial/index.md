---
title: AJAX Tutorial for Beginners
author: Kai Gittens
layout: page_twitter_conversion
permalink: /ajax-tutorial/
meta-excerpt: "Learn how to write AJAX using both pure JavaScript as well as jQuery. Includes many code examples that can be downloaded."
category: articles
cat-name: "Articles"
tags: [ajax, javascript, jquery]
has-home-img: ajax-image.jpg
---
AJAX has grown a lot since <a href="http://adaptivepath.com/ideas/ajax-new-approach-web-applications/" target="blank" title="Read Jesse James Garrett original ‘AJAX' article">Jesse James Garrett defined it in 2005</a>. It described a way to create robust web applications and helped turn JavaScript into one of the world's most popular web programming languages.

New developers (and a few intermediate ones) struggle to learn AJAX and are also not aware of how it's advanced inside of jQuery. This AJAX tutorial was written with those developers in mind.
<a name="table-of-contents"></a>
<h2 style="clear:both;">Table of Contents</h2>
  <ol>
    <li><a href="#assumptions">Assumptions</li>
    <li><a href="#how-code-examples-works">How the code examples work</li>
    <li><a href="#what-is-ajax">What Is AJAX</a></li>
    <li><a href="#brief-history-ajax">A brief history of AJAX</a></li>
    <li>
      <a href="#ajax-javascript">Create AJAX with Regular JavaScript</a>
      <ol>
        <li><a href="#xhr-feature-detection">XHR feature detection</a></li>
        <li><a href="#load-content">Load content onto a page with AJAX</a></li>
          <ol>
            <li><a href="#new-xhr-instance">Create a new instance of the XHR object</a></li>
            <li><a href="#xhr-states">Wait for an XHR state of 4</a></li>
            <li><a href="#200-response">Wait for 200 response code from the server</a></li>
            <li><a href="#readystatechange">Bring everything together using "onreadystatechange"</a></li>
          </ol>
        </li>
        <li><a href="#callback-function">Have "readyStateChange" run a callback function</a></li>
        <li><a href="#logical-and-error">Using "&&" generates an error</a></li>
        <li><a href="#ajax-request-mouseclick">Make an AJAX request with mouseclick</a></li>
        <li><a href="#multiple-ajax-buttons">Multiple buttons with AJAX functionality</a></li>
        <li><a href="#reusable-button-code">Create reusable code for multiple buttons</a></li>
        <li><a href="#load-json-ajax">Load JSON with AJAX</a></a>
      </ol>
    </li>
    <li><a href="#ajax-jquery">AJAX & jQuery</a>
      <ol>
        <li><a href="#add-jquery">Add jQuery to the project</a></li>
        <li><a href="#understanding-jquery-ajax">Understanding $.ajax()</a></li>
        <li><a href="#ajax-shorthand">jQuery AJAX Shorthand methods</a>
          <ol>
            <li><a href="#jquery-load">.load: the easiest way to use AJAX with jQuery</a></li>
            <li><a href="#jquery-ajax-request-mouseclick">Use .load to make an AJAX request with mouseclick</a></li>
            <li><a href="#jquery-reusable-button-code">Create reusable code for multiple buttons with .load</a></li>
            <li><a href="#load-fragments">Load in fragments with .load</a></li>
            <li><a href="#jquery-get">Use jQuery.get</a></li>
            <li><a href="#jquery-get-json">Use jQuery.getJSON</a></li>
            <li><a href="#jquery-get-script">Use jQuery.getScript</a>
          </ol>
        </li>
        <li><a href="#jqxhr-promises-deferreds">jqHXR & Promises</a></li>
        <li><a href="#what-is-a-javascript-promise">What is a Promise?</a></li>
        <li><a href="#jquery-promises">An important note about jQuery Promises</a></li>
        <li><a href="#differed-methods">Use Deferred methods with jqXHR</a>
          <ol>
            <li><a href="#done-method">The .done method</a></li>
            <li><a href="#fail-method">The .fail method</a></li>
            <li><a href="#always-method">The .always method</a></li>
            <li><a href="#then-method">The .then method</a>
          </ol>
        </li>
      </ol>
    </li>
    <li><a href="#conclusion">Conclusion</a></li>
  </ol>
<a name="assumptions"></a>
<h3 class="h3-guide">Assumptions</h3>
This AJAX tutorial assumes you understand HTML. It also assumes that you understand the basic building blocks of JavaScript: variables, functions, arrays, etc.

This tutorial also takes the position that <a href="https://xhr.spec.whatwg.org/" target="blank" title="Read the WHAT WG XMLHttpRequest specification">the WHAT WG XMLHttpRequest specification</a> is the best source for understanding how AJAX works. It refers to other sources like <a href="http://api.jquery.com/category/ajax/" target="blank" title="Read jQuery's AJAX documentation">jQuery's AJAX documentation</a>, <A href="https://developer.mozilla.org/" target="blank" title="Go to the MDN home page">Mozilla Developer Network(MDN)</a> and <a href="https://msdn.microsoft.com/" target="blank" title="Go to the MSDN homepage">Microsoft Developer Network(MSDN)</a>, but it ultimately views the WHAT WG spec as the best reference.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="how-code-examples-works"></a>
<h3 class="h3-guide">How the code examples work</h3>
[The code for all the examples is on GitHub ](https://github.com/kaidez/ajax-tutorial-samples)and looks similar to this:

{% prism markup %}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>A Sample</title>
  </head>
  <body>
    <div id="textTarget"></div>
    <script src="scripts.js"></script>
  </body>
</html>
{% endprism %}

All examples run from their own folder using an `index.html` file, which references a `scripts.js` file. Either `index.html` or `scripts.js` will change with each new example, and new files may be added or subtracted to each example.

Because examples use some form of the `XMLHttpRequest` browser object, they need to run from a web server instead of as a local file in a web browser. Whether it's a browser tool or a desktop server application like <a href="http://www.mamp.info/" target="blank" title="Learn about MAMP">MAMP</a>, it needs to run from a web server.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="what-is-ajax"></a>
<h3 class="h3-guide">What Is AJAX</h3>
First, understand that `XMLHttpRequest`, or "XHR", is the heart of any AJAX code. Therefore, <a href="https://xhr.spec.whatwg.org/#introduction" target="blank" title="Read the WHATWG XMLHttpRequest specification">the current version of the XMLHttpRequest specification</a> helps to provide the simplest AJAX definition:

> *"The XMLHttpRequest object is an API for fetching resources."*

Simply put, `XMLHttpRequest` fetches, or "requests", information from a server, then places it on a web page. It does this "asynchronously", meaning that __XHR loads the information onto the page without needing to reload it.__

*(Note: at the time of this tutorial's publish date, XHR can make both synchronous and asynchronous requests. XHR synchronous requests will likely be removed from browsers in the future: <a href="https://xhr.spec.whatwg.org/#the-open()-method" target="blank" title="Read about disappearing XHR synchronous requests">read about disappearing XHR synchronous requests</a>).*


"AJAX" stands for _Asynchronous JavaScript + XML_ but other technologies are used besides JavaScript and XML.  The original definition described it as a group of technologies working together to manage XHR requests inside a web page.

The technologies were: XHR, JavaScript, XML/XSLT, XHTML, CSS and the Document Object Model (or, "the DOM"). XML was the recommended data type but other data types can be used...text files, HTML files, images and (more so than anything else), JSON.  

XHTML can be used as the presentation layer along with CSS. But using HTML5 instead of XHTML is recommended at the time of this guide's initial publish date.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="brief-history-ajax"></a>
<h3 class="h3-guide">A brief history of AJAX</h3>
*(NOTE: This section provides some historically perspective on AJAX but has nothing to do with the code in this guide. To start looking at code, you can <a href="#ajax-javascript">skip this section and go to "Create AJAX with Regular JavaScript"</a>.)*

The roots of AJAX goes back to roughly late 1988/early 1999: <a href="http://www.stitcher.com/podcast/ruby-rogues/javascript-jabber/e/124-jsj-the-origin-of-javascript-with-brendan-eich-35282918" target="blank" title="Listen to Brendan Eich on the JavaScript Jabber Podcast">according to JavaScript creator, Brendan Eich</a>, Microsoft was using Java to make asynchronous requests inside of its Outlook Web Access application (OWA) at that time. Due to a conflict between Microsoft and Sun (who owned Java), Microsoft removed Java from OWA.

OWA still needed to make asynchronous requests, or, "async" requests. Because of this, Microsoft developers created the <a href="http://msdn.microsoft.com/en-us/library/ie/ms537505%28v=vs.85%29.aspx" target="blank" title=""Read more about the XMLHTTP Object"">XMLHTTP object</a> to do just that, bundling it into Internet Explorer 5 when it was released in March 1999.

Other browsers added the object as well, but with a different implementation and called it `XMLHttpRequest`. Microsoft would copy the other implementation and also name their object `XMLHttpRequest` when they released Internet Explorer 7.

The object was used to create to web applications that loaded data asynchronously, without page refreshes. The most notable applications came from Google: specifically Google Maps and <a href="http://www.searchenginejournal.com/beginners-guide-google-suggest-marketers-seo/73269/" target="blank" title="Read about Google Suggest">Google Suggest</a>..

These web apps showed how useful XHR was but the developer community didn't really notice this on a wide scale. That changed in February 2005 when <a href="http://adaptivepath.com/ideas/ajax-new-approach-web-applications/" target="blank" title="Read Jesse James Garrett original AJAX article">Jesse James Garrett wrote his influential AJAX article</a>.

Garret's article defined AJAX and also listed its required technologies (<a href="#what-is-ajax">see the previous section for more on this</a>). The article inspired developers to create compelling web applications and continues to do so to this day.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="ajax-javascript"></a>
<h3 class="h3-guide">Create AJAX with Regular JavaScript</h3>
<a name="xhr-feature-detection"></a>
<h4 class="h4-guide">XHR feature detection</h4>
*(NOTE: Writing AJAX feature detection in pure JavaScript is discussed here for historically perspective only. It's primarily needed for Internet Explorer versions 6 and lower, but usage for those browsers has dropped significantly. Plus, jQuery version 1.x takes care of the feature detection for you if you use it. If you're not coding for those browsers and/or using jQuery version 1.x, <a href="#load-content">skip this section and go to "Load content onto a page with AJAX"</a>.)*

As mentioned, Microsoft's XHR implementation was different from other browsers until IE7. In the older IE versions, `XMLHTTP` was not directly accessible in the browser...in other words, you couldn't access it by using `window.XMLHTTP` somewhere in your JavaScript code.

Instead, it was bundled inside proprietary Microsoft technology called <a href="http://msdn.microsoft.com/en-us/library/aa751972(VS.85).aspx" target="blank" title="Learn more about Microsoft's ActiveXObject">"ActiveXObject"</a>. Since AJAX became popular while the old Microsoft implementation was still in wide use, you had to use feature-detection code to make sure that your AJAX worked in all browsers.

The simplest version of this feature-detection code looked similar to this:
{% prism javascript %}
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
The above-example created a variable called `xhr`, then checked to see if `XMLHttpRequest` was attached to the browser's `window` object.  If it was, then `xhr` directly referenced a new instance of `XMLHttpRequest` when it performed AJAX tasks.

The example also checked to see if `ActiveXObject` was attached to the browser via the `window` object. If it was, then `xhr` would directly reference a new instance of `ActiveXObject` when it performed AJAX tasks.

Developers later realized that `window.ActiveXObject` was used differently across the older versions of IE. They also realized that some browsers heavily in use at the time didn't support XHR at all.

As a result, they updated the feature detection code:
{% prism javascript %}
// Feature-detect XMLHttpRequest implementation
// More robust detecting of ActiveX
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
The feature detection code was rewritten to be a reusable function called `getXHR`. The function did the cross-browser checking for `XMLHttpRequest` internally, meaning any new instance of `getXHR`  would use XHR without worrying about cross-browser issues.

`getXHR` checked for `XMLHttpRequest`, but also checked to see of the browser had one of two ActiveXObject builds. It also checked to see if either the `XMLHttpRequest` or `ActiveXObject` existed.

A JavaScript `try...catch` statement looked for the different versions of `ActiveXObject`. If `try...catch` didn't find it and also didn't find `XMLHttpRequest`, then the value of the `xhr` variable was set to `false` and didn't do any AJAX work.

`getXHR` said `return xhr` at the end of the code, which let us create new instances of `getXHR` outside the function.

Go to MDN to  <a href="https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started#Step_3_.E2.80.93_A_Simple_Example" target="blank">learn more about feature-detection</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch" target="blank">learn more about "try...catch" on MDN</a>.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="load-content"></a>
<h4 class="h4-guide">Load content onto a page with AJAX</h4>
Loading content with XHR is a four-step process:

1. Create a new instance of the XHR object.
2. Wait for an XHR state of 4.
3. Wait for a 200 response code from the server.
4. Bring everything together using "onreadystatechange".

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="new-xhr-instance"></a>
<h5 class="h5-guide">Create a new instance of the XHR object</h5>
There are use cases for including XHR feature detection in your code, but it's primarily required if your AJAX code needs to run in Internet Explorer versions 6 and lower. These browsers are in use less and less so it may make sense to keep this out of your code and just create a direct instance of the XHR:

{% prism javascript %}
var xhr = new XMLHttpRequest();
{% endprism %}

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="xhr-states"></a>
<h5 class="h5-guide"> Wait for an XHR state of 4</h5>
An XHR request will be in one of fives states, each with a numerical value of 0 through 4. The last request state, number 4, is the most important one in AJAX code, but here's a simplified description of the states.

*(NOTE: This section is here because it's an important part of the XHR spec, but because this guide focuses on the "4" state only, you can [skip this section and go to "Wait for 200 response code from the server"](#200-response "Go to "Wait for 200 response code from the server")".*

There are two widely-accepted specifications for XHR states: <A href="https://xhr.spec.whatwg.org/#states" target="blank" title="Read the AJAX states definition in official XMLHttpRequest specification">the spec defined by WHATWG</a> and <a href="http://msdn.microsoft.com/en-us//library/ms534361%28en-us,VS.85%29.aspx" target="blank" title="Read the AJAX states definition in Microsoft's XMLHttpRequest specification">the original spec defined by Microsoft</a>.

The WHATWG spec defines five states, each with a numerical value:

* __0__: meaning that things are in the __UNSENT__ state...the code understands that instance of `xhr` has been created, but it's not doing anything.

* __1__: meaning that things are in the __OPEN__ state...the `open()` method has been invoked somewhere in our code and if you want to send any data to the server, you can do that with the `send()` method. This guide focuses more on getting things with `xhr` instead of sending things...[read about setting headers over on MDN ](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started#Step_5_.E2.80.93_Working_with_data "Go to MDN to learn about setting headers in an XMLHttpRequest").

* __2__: meaning that things are in the __HEADERS_RECEIVED__ state...if you're downloading headers, the state will be set to 2 after they're finished downloading.

* __3__: meaning that things are in the __LOADING__ state...the data is loading.

* __4__: meaning that things are in the __DONE__ state...either the data has downloaded in full or there was an error during the download process.

Microsoft's definition also attaches numbers to states, but the definition is shorter:

* __0__ (uninitialized)

* __1__ (loading)

* __2__ (loaded)

* __3__ (interactive)

* __4__ (complete)

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="200-response"></a>
<h5 class="h5-guide">Wait for 200 response code from the server</h5>
A web server sends many server response codes, each in the form of a numerical number.  With AJAX, the most important one is `200 OK`.

When your AJAX code sees a `200 OK` response, it knows that your XHR has made a successful server request.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="readystatechange"></a>
<h5 class="h5-guide">Bring everything together using "onreadystatechange"</h5>
`onreadystatechange` is an event handler that watches for when `readystate` changes...again, `readyState` will always have a numerical value of 0 through 4. There are use cases for knowing all the times that this value changes but with AJAX, knowing when it changes to 4 (the `done` state) is the most important.

When `onreadystatechange` sees that `readyState` is equal to 4, it knows that all the data has fully downloaded and is ready to be used in our code. It also could mean that the data didn't download, but this guide assumes that your final code will be written in a way that keeps that from happening: (<a href="/samples/ajax-tutorial-samples/sample01/" target="blank">view the example</a>):

{% prism markup %}
<!-- sample01/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Sample 03</title>
  </head>
  <body>
    <div id="textTarget"></div>
    <script src="scripts.js"></script>
  </body>
</html>
{% endprism %}
We've added a div tag with an id of "textTarget" to `index.html`. Our AJAX code will load data into this element.

{% prism javascript %}
// sample01/scripts.js
var getArticleInfo = new XMLHttpRequest();

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
Reviewing the code...

{% prism javascript %}
var getArticleInfo = new XMLHttpRequest();
{% endprism %}
We created a new XHR instance called `getArticleInfo`.
{% prism javascript %}
getArticleInfo.onreadystatechange = loadText;
getArticleInfo.open("GET", "articleName.txt");
getArticleInfo.send();
{% endprism %}
For now, `getArticleInfo.onreadystatechange` will run a function called `loadText` any time a state changes. But we'll write code that makes sure that `loadText` only runs when the state equals `4`.

`open` is an XHR method and one of the most important parts of an AJAX application. This is because __the `open` method is where you tell your code what data needs to be loaded onto the page.__

`getArticleInfo.open()` first described *how* to get the data. That was done with the first parameter, which was `GET`...it told the server to "get" something from the server.

The second `getArticleInfo.open()` parameter described *what* to get...that's the data we're requesting. In this case, that was a file called "articleName.txt" that contained the name of this article and the name of the author.

`getArticleInfo.send()` is the part of the code that actually sent the data request to server. It has a default value of `null` when using `GET`, but you can pass a parameter to `send()` if using `POST`.

You would use `POST` if you want to send data to the server while in the "1" state, which was discussed in the <a href="#xhr-states">"Wait for an XHR state of 4" section</a>. Discussing this is beyond the scope of this AJAX tutorial.

{% prism javascript %}
function loadText() {
...
};
{% endprism %}
Start building the `loadText()` function that we defined above.
{% prism javascript %}
var text = document.getElementById("textTarget");
{% endprism %}
We stored a variable reference to the `<div id="textTarget">` in `index.html`.
{% prism javascript %}
if (getArticleInfo.readyState === 4) {
  if (getArticleInfo.status === 200) {
    text.innerHTML = getArticleInfo.responseText;
  } else {
    console.log("There was a problem with the request.");
  }
}
{% endprism %}
We first checked to see if `getArticleInfo.readyState` definitely equaled `4`. If it did, then the data downloaded.

Next, we checked to see if `getArticleInfo.status` equaled `200`. If it did, it meant the code successfully contacted the server.

Our code then found the `<div id="textTarget">` element on our page (which was referenced by the `text` variable) and placed whatever content is inside of `getArticleInfo.responseText`.

`getArticleInfo.responseText` referred to the data we requested in `getArticleInfo.open()`, which was the "articleName.txt" file. The copy in that file was placed in `<div id="textTarget">`.

If the code didn't connect to the server and `getArticleInfo.status`  didn't equal `200`, then the browser console would have displayed a message saying, "There was a problem with the request."

It's important to note that this console message would only have appeared if `getArticleInfo.status` didn't equal `200` and that __the value of `getArticleInfo.readyState` would have no effect on whether or not the console message appeared__.

As mentioned, AJAX can load in all different types of documents...we can tell the `getArticleInfo.open()` to load in an HTML document instead of a text one (<a href="/samples/ajax-tutorial-samples/sample02/" target="blank">view the example</a>):
{% prism javascript %}
// sample02/scripts.js
// Update the getArticleInfo.open() method only
// Replace articleName.txt with articleName.html in the directory
...
getArticleInfo.open("GET", "articleName.html");
...
{% endprism %}

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="callback-function"></a>
<h4 class="h4-guide">Have "readyStateChange" run a callback function</h4>
We've had "readyStateChange" request data using a named function called `loadText()`. Requesting data with a callback function is also an option (<a href="/samples/ajax-tutorial-samples/sample03/" target="blank">view the example</a>):
{% prism javascript %}
// sample03/scripts.js
var getArticleInfo = new XMLHttpRequest();

getArticleInfo.open("GET", "articleName.html");
getArticleInfo.send();

getArticleInfo.onreadystatechange = function() {
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
`getArticleInfo.onreadystatechange` immediately ran a callback function instead of going out and named function, making the code run slightly faster.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="logical-and-error"></a>
<h4 class="h4-guide">Using "&&" generates an error</h4>
*(NOTE: This section describes how NOT to do `readyState` and `status` checks. Developers still this but this AJAX tutorial does not. This section is a demonstration of what not to do; it has no bearing on the examples. Feel free to <a href="#ajax-request-mouseclick">skip this section and go to "Make an AJAX request with mouseclick"</a>.)*

Our code checked for the value of `readyState` first, _then_ checked for the server's status code. Some developers like to use the logical "AND" operator (&&) to simultaneously check for these values.

The code for this looks similar to this (<a href="/samples/ajax-tutorial-samples/sample04/" target="blank">view the example</a>):
{% prism javascript %}
// sample04/scripts.js
// Update the getArticleInfo.onreadystatechange callback function only
...
getArticleInfo.onreadystatechange = function() {
  var text = document.getElementById("textTarget");
  if ((getArticleInfo.readyState === 4) && (getArticleInfo.status === 200)) {
      text.innerHTML = getArticleInfo.responseText;
  } else {
    console.log("There was a problem with the request.");
  }
};
{% endprism %}
In this example, `XMLHttpRequest` probably requested and displayed data without error, but the console message displayed anyway. This is because it did only one very specific check.

The code using logical "AND" would only "AJAX in" the content if `getArticleInfo.readyState` equaled `4` at the same time that `getArticleInfo.status` equaled `200`. But that wasn't the only scenario that happened in the code.

There were times when `getArticleInfo.readyState` equaled 0 through 3 and there were times when `getArticleInfo.readyState` equaled `2` at the same time that `getArticleInfo.status` equaled `200`. There may have even been a time when `getArticleInfo.status` equaled something other than `200`.

We didn't define functionality for those other use cases so as a result, the console message returned for all those use cases. The fact that the data displayed correctly didn't matter: it returned the console error message anyway.

Using `&&` doesn't like this doesn't perform a robust check of the application state in this case, so it's best to avoid it.

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_AND_.28&&.29" target="blank" title="Read more about the logical "AND" operator on MDN">Read more about the logical "AND" operator on MDN</a>.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="ajax-request-mouseclick"></a>
<h4 class="h4-guide">Make an AJAX request with mouseclick</h4>
The previous examples used AJAX to load data automatically, but we can also make it load with events. Doing this with mouseclicks is common (<a href="/samples/ajax-tutorial-samples/sample05/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample05/index.html -->
<!-- add <button> directly above <div id="textTarget">  -->
...
<button id="getHTMLFile">Load the HTML file</button>
<div id="textTarget"></div>
{% endprism %}

We added a button tag with an id of "getHTMLFile" above `<div     id="textTarget">`. Clicking on this button loaded the contents of an HTML file inside the div tag.
{% prism javascript %}
// sample05/scripts.js
function loadHTML() {
  var getInfo = new XMLHttpRequest();

  getInfo.open("GET", "articleName.html");
  getInfo.send();

  getInfo.onreadystatechange = function() {
    var text = document.getElementById("textTarget");
    if (getInfo.readyState === 4) {
      if (getInfo.status === 200) {
        text.innerHTML = getInfo.responseText;
      } else {
        console.log('There was a problem with the request.');
      }
    }
  }
}

// Code that loads the data on a button click
document.getElementById("getHTMLFile").addEventListener("click", loadHTML);
{% endprism %}
All the AJAX code was placed in a `loadHTML` function and we added new code at the bottom that ran this function when the button was clicked. At the bottom of the code, the button with the id of `getHTMLFile` had the `addEventListener` method attached to it.

The button was "listening for", or "watching for", whatever event we told it to watch for...which was `click`. When the code saw that the button was been clicked, it ran the `loadHTML` function and processed the AJAX code.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="multiple-ajax-buttons"></a>
<h4 class="h4-guide">Multiple buttons with AJAX functionality</h4>
We can create multiple buttons that load different data with AJAX (<a href="/samples/ajax-tutorial-samples/sample06/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample06/index.html -->
<!-- add a new <button> directly above <div id="textTarget">  -->
...
<button id="getHTMLFile">Load the HTML file</button>
<button id="getTextFile">Load the text file</button>
<div id="textTarget"></div>
{% endprism %}
We added a new button tag with an id of "getTextFile" directly above `<div id="textTarget">`. Clicking on this button will load the contents of a text file inside the div tag.
{% prism javascript %}
// sample06/scripts.js
// Pass a parameter to loadFile and refer to it in getInfo.open()
function loadFile(file) {
  var getInfo = new XMLHttpRequest();

  getInfo.open("GET", file);
  ...
}
...
// Add a new button to the bottom of scripts.js
// Have each button run loadFile() to load in a different file
document.getElementById("getHTMLFile").onclick = function() {
  loadFile("articleName.html");
};

document.getElementById("getTextFile").onclick = function() {
  loadFile("articleName.txt");
};
{% endprism %}
`loadFile` now requires a parameter that we're calling "file". The parameter will define what file get's loaded onto the page via `getInfo.open`.

We also updated our button code: it still ran the `loadFile` function, but that function needed a parameter in order to work. That parameter was the name of the file we want to load onto the page.

The new button loaded in a text file while the old button loaded in an HTML file.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="reusable-button-code"></a>
<h4 class="h4-guide">Create reusable code for multiple buttons</h4>
The code in the last demo is fine if we only have a few buttons, but would get messy if we had to create `onclick` functionality for a lot of buttons. So it's a best to create reusable code that the buttons can share (<a href="/samples/ajax-tutorial-samples/sample07/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample07/index.html -->
<!-- update the <button> tags directly above <div id="textTarget"> -->
...
<button class="btn" data-file="articleName.html">Load the HTML file</button>
<button class="btn" data-file="articleName.txt">Load the text file</button>
<div id="textTarget"></div>
...
{% endprism %}
We updated the two buttons already on our HTML page. For each one, we removed the ids, added a class called `btn` and added a data-attribute called `data-file`.

The values of the data-attributes were unique for each button: each value was the name of the file that needed be loaded with AJAX.
{% prism javascript %}
// sample07/scripts.js
// Don't change the loadFile() function
// Remove the button code for the two buttons at the bottom
// Add this new code
...
var getButtons = document.querySelectorAll(".btn");

for (key in getButtons) {

  var singleButton = getButtons[key];

  singleButton.onclick = function() {
    if(!this.dataset) {
      loadFile(this.getAttribute("data-file"));
    } else {
      loadFile(this.dataset.file);
    }
  }

}
{% endprism %}
The button code for the two buttons was replaced with new code. That code first used `document.querySelectorAll` to find all the buttons with the `btn` class name and store them as a group in a variable called `getButtons`.

Then a `for...in` loop ran for whatever the total amount of buttons  were inside of `getButtons`...which was two. Every time the loop ran, it created a variable called `singleButton` that stored a reference to one button at a time: that reference was the `getButtons[key]` line of code.

Next, our code told each `singleButton` what to do when it got clicked. What it did was, looked at the value of the button's data attribute (which is one of two files) and passed it as a parameter to the `loadFile` function to load onto the page.

Data attributes aren't supported in IE 10 and lower so we had to feature-detect for them, then provide fallback code for those browsers. We looked for the `dataset` property of the button being clicked by saying `this.dataset`.

We first checked to see if `dataset` did NOT exist in the browser by saying `if(!this.dataset)`...if it didn't, we got the value of the data attribute with the `getAttribute()` method.

But if `dataset` DID exist, we used it to get the value of the data attribute using `this.dataset`.

*(Note: To learn more about data attributes, read my <a href="/load-data-attributes-mouseclicks/" target="blank" title="Read my 'Load data attributes with Mouse Clicks' tutorial">"Load data attributes with Mouse Clicks" tutorial</a> or my <a href="/filter-content-jquery/" target="blank" target="blank" title="Read my 'Filter Content With jQuery.filter() & jQuery Selectors' tutorial">"Filter Content With jQuery.filter() & jQuery Selectors" tutorial</a>.*

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="load-json-ajax"></a>
<h4 class="h4-guide">Load JSON with AJAX</h4>
AJAX can work with many data types but  JSON is the most-used data type at the time of this guide's initial publish date. There are many ways to use JSON with AJAX...this is a basic example (<a href="/samples/ajax-tutorial-samples/sample08/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample08/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Sample 08</title>
  </head>
  <body>
    <div id="textTarget"></div>
    <script src="scripts.js"></script>
  </body>
</html>
{% endprism %}
The buttons were removed from the HTML file.
{% prism javascript %}
// sample08/soccerplayers.json
{
    "chelsea": {
        "playerOne": "Didier Drogba",
        "playerTwo": "Thibault Courtois",
        "playerThree": "Cesc Fabregas"
    },
    "realMadrid": {
        "playerOne": "Cristiano Ronaldo",
        "playerTwo": "Sergio Ramos",
        "playerThree": "Iker Casillas"
    },
    "psg": {
        "playerOne": "Zlatan Ibrahimović",
        "playerTwo": "Thiago Motta",
        "playerThree": "Marquinhos"
    }
}
{% endprism %}
Instead of using AJAX to load in data from either an HTML or text file, we loaded it in from a JSON file called `soccerplayers.json`.
{% prism javascript %}
// sample08/scripts.js
(function(){
    var getPlayerInfo = new XMLHttpRequest();

    getPlayerInfo.open("GET", "soccerplayers.json");
    getPlayerInfo.send();

    getPlayerInfo.onreadystatechange = function() {
      if (getPlayerInfo.readyState === 4) {
        if (getPlayerInfo.status === 200) {
          var players = JSON.parse(getPlayerInfo.responseText),
              text = document.getElementById("textTarget");
          for (i in players) {
            var newDiv = document.createElement("div");
            newDiv.innerHTML = players[i].playerOne;
            text.appendChild(newDiv);
          }
        }
      }
    }
})();
{% endprism %}
Breaking down the code:
{% prism javascript %}
(function(){
...
})();
{% endprism %}
The main change is that the function now ran as soon as the page loaded instead of being invoked some place in our code. This was done with an <a href="http://benalman.com/news/2010/11/immediately-invoked-function-expression/" target="blank" title="Learn about the IIFE">"immediately-invoked function expression", or an "IIFE"</a>.
{% prism javascript %}
...
var getPlayerInfo = new XMLHttpRequest();
getPlayerInfo.open("GET", "soccerplayers.json");
getPlayerInfo.send();
...
{% endprism %}
The main variable used in the AJAX code was renamed `getPlayerInfo` throughout the code. The `open` method now fetched our JSON file.
{% prism javascript %}
...
getPlayerInfo.onreadystatechange = function() {
  if (getPlayerInfo.readyState === 4) {
    if (getPlayerInfo.status === 200) {
      var players = JSON.parse(getPlayerInfo.responseText),
          text = document.getElementById("textTarget");
      for (i in players) {
        var newDiv = document.createElement("div");
        newDiv.innerHTML = players[i].playerOne;
        text.appendChild(newDiv);
      }
    }
  }
};
...
{% endprism %}
Once `readyState` equaled `4` and our code successfully connected to the server, it created two variables: `players` and `text`. `players` grabbed our data with `responseText` like before and converted it to a readable JSON format with `JSON.parse`.

`text` referred to the `<div id="textTarget">` element on the HTML page. As before, our data loaded into this element.

Then we did a `for...in` loop that looped through JSON content stored inside the `players` variable. Three steps were performed for every loop iteration:

1. the loop created a div tag using `document.createElement` and stored in a variable called `newDiv`.
2. the loop looked at each item in the `players` variable and found its `playerOne` property. Then placed it inside the div tag created with the `newDiv` variable by accessing the div's `innerHTML` property.
3. the loop found the `text` variable that referenced the `<div id="textTarget">` element already on the page and loaded the `newDiv` content inside of it.

This was a basic example of how to use JSON with AJAX...the main takeaway from this is example is, __AJAX can load all different types of content, including JSON__.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="ajax-jquery"></a>
<h3 class="h3-guide">AJAX & jQuery</h3>
<a href="http://jquery.com" target="blank" title="Go to the jQuery site">jQuery</a> has always had excellent AJAX support. It lets you write highly-configurable AJAX functionality with less code.

The release of jQuery 1.5 was significant because of certain AJAX-related changes:

* AJAX performed faster in jQuery.
* Deferreds and Promises were introduced, making AJAX's asynchronous functionality better.
* the already-existing jqXHR object added new functionality to AJAX in jQuery.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="add-jquery"></a>
<h4 class="h4-guide">Add jQuery to the project</h4>
For the rest of the examples, the core jQuery library has been added to `index.html` via the jQuery CDN. `index.html` now looks like this:
{% prism markup %}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>A Sample with the jQuery code attached to it</title>
  </head>
  <body>
    <div id="textTarget"></div>
    <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="scripts.js"></script>
  </body>
</html>
{% endprism %}
Note that jQuery comes before `scripts.js` and that we're using a 1.x version of the library instead of a 2.x version. This means that jQuery is optimized to work in Internet Explorer versions 6 and higher...2.x versions only work in IE versions 9 and higher.

If you use jQuery 1.x, it will perform the ActiveX Object feature detection we reviewed earlier.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="understanding-jquery-ajax"></a>
<h4 class="h4-guide">Understanding $.ajax</h4>
`$.ajax` is a powerful, highly-configurable method in jQuery. It manages all AJAX calls made by jQuery.

There are many ways to configure `$.ajax` and reviewing all of them is beyond the scope of this guide. But understanding its structure is important. <a href="/samples/ajax-tutorial-samples/sample09/" target="blank">View the example</a>:

{% prism markup %}
<!-- sample09/scripts.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Sample 09</title>
  </head>
  <body>
    <div id="textTarget"></div>
    <div id="isLoadedTarget"></div>
    <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="scripts.js"></script>
  </body>
</html>
{% endprism %}

The same HTML code as before except we've added a div with an id of "isLoadedTarget" and the core jQuery library.
{% prism javascript %}
// sample09/scripts.js
$.ajax({
  url: "articleName.html",
  success: isLoaded,
  statusCode: {
    200: function() {
      console.log("Everything is loaded!!!");
    }
  }
}).done(function(data) {
  $("#textTarget").html(data);
});

function isLoaded() {
  $("#isLoadedTarget").html("<p>The articleName.html file has loaded...check the console for a message returned by the statusCode property!!!</p>");
}
{% endprism %}
You can use `$.ajax` either with or without passing parameters to it. If you do pass parameters, you can pass more than one using a configurable object.

We've created a configurable object be setting three options:

1.  url: defined which file is being loaded into the page via AJAX. This example loaded in the "articleName.html" file.
2.  success: defined what to do if the request for the file succeeds. This example would run a function called `isLoaded`.
3.  statusCode: defined what to do when a certain server status code has been called. This example sent a message to the browser console when the server gets to a 200 status.

We chained `.ajax`to the `.done` method, so it will run next. `.done` is discussed later when we look at [jQuery Promises and Deferreds](#jqxhr-promises-deferreds "Read about Promises and Deferreds in AJAX") but for now, understand  that `.done` is a callback function that ran after `.ajax` did everything it was supposed to do.

`.done` had its own callback function and for it, we passed a parameter of "data" to it. "data" represents all the options configured in `.ajax`, including the value of the "url" option.

The callback used the `html` method to load "articleName.html" into `<div id="textTarget">` like it did before except this time, we passed the "data" parameter to `.html` instead of the file name. `.done` is smart enough to understand that it needs to look at the "url" value to find out what content needs to be loaded in.  

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="ajax-shorthand"></a>
<h4 class="h4-guide">jQuery AJAX Shorthand methods</h4>
`$.ajax` is powerful, but not needed for every project. According to <a href="http://api.jquery.com/jQuery.ajax/" target="blank" title="Read the jQuery.ajax documentation">the current version of the $.ajax documentation</a>:

> *"The `$.ajax()` function underlies all Ajax requests sent by jQuery. It is often unnecessary to directly call this function, as several higher-level alternatives like `$.get()` and `.load()` are available and are easier to use. If less common options are required, though, `$.ajax()` can be used more flexibly."*

In jQuery, these higher-level functions are commonly referred to as "[shorthand methods](http://api.jquery.com/category/ajax/shorthand-methods/ "Read more about jQuery AJAX shorthand methods")." All of them use core `.ajax` method internally.

jQuery currently offers five AJAX shorthand methods:

1. `.load`
2. `jQuery.get`
3. `jQuery.getJSON`
4. `jQuery.getScript`
5. `jQuery.post`

`jQuery.post` deals with server interaction, which is beyond the scope of this guide, so it won't be discussed here.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="jquery-load"></a>
<h5 class="h5-guide">.load: the easiest way to use AJAX with jQuery</h5>
If you want to use jQuery to load in file with AJAX like we've been doing, the `.load` function is the easiest way to do this. This is the jQuery version of <a href="#readystatechange" title="Read the "onreadystatechange section of this article">a JavaScript sample we looked at earlier.

<a href="/samples/ajax-tutorial-samples/sample10/" target="blank">View the example</a>:
{% prism markup %}
<!-- sample10/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Sample 10</title>
  </head>
  <body>
    <div id="textTarget"></div>
    <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="scripts.js"></script>
  </body>
</html>
{% endprism %}
An HTML page like we've used in previous examples...it contains `<div id="textTarget">` where we loaded in content on page-load.
{% prism javascript %}
// sample10/scripts.js
$("#textTarget").load("articleName.html");
{% endprism %}
jQuery looked for the `<div id="textTarget">` element on the page and ran it against the `.load` function. That function used AJAX to "load" content inside of the div...that content was defined as "articleName.html" in the `.load` parameter.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="jquery-ajax-request-mouseclick"></a>
<h5 class="h5-guide">Use .load to make an AJAX request with mouseclick</h5>
We used a mouseclick to [load content "AJAX in" content in a previous example](#ajax-request-mouseclick "Make an AJAX request with mouseclick")...here's its jQuery version (<a href="/samples/ajax-tutorial-samples/sample11/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample11/index.html -->
<!-- add <button> directly above <div id="textTarget">  -->
...
<button id="getHTMLFile">Load the HTML file</button>
<div id="textTarget"></div>
{% endprism %}
We added a button tag with an id of "getHTMLFile" directly above `<div id="textTarget">`. Clicking on this button loaded the contents of an HTML file inside the div tag.
{% prism javascript %}
// sample11/scripts.js
$("#getHTMLFile").click(function(){
  $("#textTarget").load("articleName.html");
});
{% endprism %}
We bound the jQuery `.click` method to the button we just added and had it run a callback function when clicked. The function ran the `.load` code in the previous example.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="jquery-reusable-button-code"></a>
<h5 class="h5-guide">Create reusable code for multiple buttons with .load</h5>
We used [plain JavaScript to create separate buttons to "AJAX in" different content](#multiple-ajax-buttons "Go to "Multiple buttons with AJAX functionality"). But [using plain JavaScript to create a shared function to load in content](#reusable-button-code "Go to "Create reusable code for multiple buttons") was more efficient (<a href="/samples/ajax-tutorial-samples/sample12/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample12/index.html -->
<!-- add two <button> tags directly above <div id="textTarget"> -->
...
<button class="btn" data-file="articleName.html">Load the HTML file</button>
<button class="btn" data-file="articleName.txt">Load the text file</button>
<div id="textTarget"></div>
...
{% endprism %}
We created two buttons with a class called `btn` and a data-attribute called `data-file`. `data-file` stored the name of the file that had to be loaded with AJAX.
{% prism javascript %}
// sample12/scripts.js
$(".btn").click(function(){
  var getData = $(this).data("file");
  $("#textTarget").load(getData);
});
{% endprism %}
As before, we had all the buttons with the `btn` class share the same `.click` function for loading in content. As before, the buttons simultaneously performed two tasks: find the file stored in the `data-file` attribute, and load that file into the `<div id="textTarget">` element.

To get the file stored in `data-file`, we used `$(this).data()`. We still used the JavaScript `this` keyword to reference the button being clicked, but wrapped in the jQuery object so we could use it with other jQuery methods.

We passed the name of data attribute we want to find as a parameter to the `.data` method. The name we wanted was `data-file` so we just needed to call our parameter "file".

All that was stored in a variable called `getData`. Because `getData` refers to the value of the clicked-on button's data attribute (which is one of two files), we can pass that as a parameter to the `.load` method that loads files inside of `<div id="textTarget">`.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="load-fragments"></a>
<h5 class="h5-guide">Load in fragments with .load</h5>
The `.load` method can load in a piece of data from an HTML document instead of the entire document (<a href="/samples/ajax-tutorial-samples/sample13/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample13/index.html -->
<!-- No <button> tags in this example -->
...
<div id="textTarget"></div>
...
{% endprism %}
Use a page with just `<div id="textTarget">`.
{% prism markup %}
<!-- sample13/article.html -->
<div id="title">AJAX Tutorial for Beginners</div>
<div id="author">Kai "kaidez" Gittens</div>
{% endprism %}
Create a page called `article.html` that contains two elements: `<div id="title">` and `<div id="author">`.
{% prism javascript %}
// sample13/scripts.js
$("#textTarget").load("article.html #author");
{% endprism %}
Use load to "AJAX in" the `article.html` but instead of loading in the entire file, just load in the content in the `<div id="author">` element.

<a href="http://api.jquery.com/load/" target="blank" "title"=Read more about jQuery's '.load' method>Read more about jQuery's ".load()" method</a>.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="jquery-get"></a>
<h5 class="h5-guide">Use jQuery.get</h5>

The `.get` method is different from `.load` in a few important ways:

* `.get` is a global function while `.load` is a method. This means that you would use `.get` to start a jQuery code block but use `.load` as a chainable method inside a code block.

* Because of the last difference, it makes sense to use `.load` to "AJAX in" HTML documents only. `.get` was created to "AJAX in" all types of documents.

* `.get` manages GET server requests only while `.load` can manage both GET and POST requests.

Using the same HTML as in the previous example, using `.get` to bring content via AJAX looks like this (<a href="/samples/ajax-tutorial-samples/sample14/" target="blank">view the example</a>):
{% prism javascript %}
// sample14/scripts.js
$.get("articleName.html", function(data) {
  $("#textTarget").html(data);
});
{% endprism %}
Where we used `.load` as a chainable method inside a code block, `.get` started the code block in this example. The first parameter told us what content gets loaded onto the page, which is "articleName.html".

The second parameter was a callback function that defined where the content got loaded. The function took a parameter called "data" which represented the content that got loaded onto the page.

The inside of the function loaded the content inside the "textTarget" page element with the help of jQuery's `.html` method.

The "data" parameter (which represented the content) was passed to the `.html` method so the method knew what to load. The function parameter  can be anything you want, but naming it "data" is a common practice.

<a href="http://api.jquery.com/jQuery.get/" target="blank">Read more about "jQuery.get"</a>.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="jquery-get-json"></a>
<h5 class="h5-guide">Use jQuery.getJSON</h5>
We can use jQuery's `.getJSON` method to load in JSON content [as we did before with plain JavaScript](#load-json-ajax) (<a href="/samples/ajax-tutorial-samples/sample15/" target="blank">view the example</a>).

As a reminder, here's our JSON file
{% prism javascript %}
// sample15/soccerplayers.json
{
  "chelsea": {
    "playerOne": "Didier Drogba",
    "playerTwo": "Thibault Courtois",
    "playerThree": "Cesc Fabregas"
  },
  "realMadrid": {
    "playerOne": "Cristiano Ronaldo",
    "playerTwo": "Sergio Ramos",
    "playerThree": "Iker Casillas"
  },
  "psg": {
    "playerOne": "Zlatan Ibrahimović",
    "playerTwo": "Thiago Motta",
    "playerThree": "Marquinhos"
  }
}
{% endprism %}
And our `scripts.js` file looks like this
{% prism javascript %}
// sample15/scripts.js
$.getJSON("soccerplayers.json", function(players) {
  $.each(players, function(i) {
    var newDiv = $("<div></div>");
    $(newDiv).append(players[i].playerOne);
    $("#textTarget").append(newDiv);
  })
});
{% endprism %}
The first parameter for `.getJSON` was the JSON file with the content we wanted to load onto the page. The second parameter was a callback function that loaded the data onto the page.

That callback function took one parameter we've called `player`, which references the JSON file. Next, we used jQuery's `.each` method to do what the `for...in` loop did before: look for properties in our JSON data.

`.each` also took parameters: the first one was `players` parameter, which, again, pointed to our JSON data. The second parameter was another callback function that loaded the data onto the page, and inside particular page elements we created.

In the function, we created a variable called `newDiv` that used jQuery to create a new div tag. Then we used jQuery's `.append` method to look for any `playerOne` properties in the items of the JSON object, and place them inside of the newly created div tag.

The new div had content at that point: we then took it and used `.append` again to load it into the "textTarget" element already on the page.

<a href="http://api.jquery.com/jQuery.getJSON/" target="blank">Read more about "jQuery.getJSON()"</a>.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="jquery-get-script"></a>
<h5 class="h5-guide">Use jQuery.getScript</h5>
`.getScript` loads a single JavaScript file via AJAX. A common practice is to use a callback function to execute code in the file after it loads.

`index.html` looks the same as before, but we're adding a file called `loadFile.js` while updating `scripts.js` (<a href="/samples/ajax-tutorial-samples/sample16/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample16/index.html -->
...
<div id="textTarget"></div>
...
{% endprism %}
The same HTML structure we used in the last few examples.
{% prism javascript %}
// sample16/loadFile.js
function getHtmlFile() {

  $("#textTarget").load("articleName.html");

};

function setText() {

  $("#textTarget").css({
    "color": "red",
    "font-weight": "bold"
  });

};
{% endprism %}
We created two functions in `loadFile.js`: `getHtmlFile` and `setText`.

`getHtmlFile()` loads the `articleName.html` into the `<div id="textTarget">` as was done in other examples, `setText` changes the copy in `<div id="textTarget">` by making it red and bolding it.
{% prism javascript %}
// sample16/scripts.js
$.getScript("loadFile.js", function() {

  getHtmlFile();

  $("#textTarget").click(function(){
    setText();
  });

});
{% endprism %}
Inside of `scripts.js`, the `getScript` method loaded `loadFile.js`, then ran a callback function. The callback immediately ran `getHtmlFile` and loaded in "articleName.html", and it also ran `setText` when `<div id="textTarget">` was clicked.

If you view `index.html` in a web browser with a good developer tool (Firebug, Chrome Developer Tools, etc.), open up its Network panel. You'll see that the filename for `loadFile.js` as a time stamp appended to it:
{% prism javascript %}
// Will look different every time the page gets reloaded
loadFile.js?=1421161342213
{% endprism %}
This is because `.getScript` always "cache-busts" the scripts it loads in. This forces the browser to download a new version of the file instead of looking for a cached one.

If you want to avoid this, you can use `.ajaxSetup` to allow caching (<a href="/samples/ajax-tutorial-samples/sample17/" target="blank">view the example</a>):  
{% prism javascript %}
// sample17/scripts.js
$.ajaxSetup({
  cache: true
});

$.getScript("loadFile.js", function() {

  getHtmlFile();

  $("#textTarget").click(function(){
    setText();
  });

});
{% endprism %}

If you look at the Network panel in the developer tools now, you'll notice that no time stamp as been append to the filename.

<a href="http://api.jquery.com/jQuery.getScript/" target="blank">Read more about "jQuery.getScript()"</a>.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="jqxhr-promises-deferreds"></a>
<h4 class="h4-guide">jqHXR & Promises</h4>
The `$.ajax` method and some of the shorthand methods return the "jQuery XMLHttpRequest" object, commonly referred to as "jqHXR". The `.load` shorthand method does not return jqXHR.

jqXHR is basically the traditional `XMLHttpRequest` browser object wrapped in a specific jQuery API. The jQuery documentation refers to jqXHR as a "superset" of the browser's XHR.

An important part of this API are _jQuery Promises_ which are part of jQuery's _Deferred_ object. This guide focuses on using Promises with AJAX and not Deferreds, but Deferreds are useful so it's good to understand them...<a href="http://api.jquery.com/category/deferred-object/" target="blank" title="Read more about jQuery Deferreds">read the jQuery documentation to learn more about jQuery Deferreds</a>.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="what-is-a-javascript-promise"></a>
<h4 class="h4-guide">What is a Promise?</h4>
Promises are not a new technology, but are relatively new to JavaScript and are gaining an important role in the language. Discussing them in full is also beyond the scope of this guide but it's good to understand their basic ideas.

According to the <a href="https://promisesaplus.com/" target="blank" title="Read the Promises/A+ specification">community-led Promises/A+ specification</a>:

> *A promise represents the eventual result of an asynchronous operation. The primary way of interacting with a promise is through its `then` method, which registers callbacks to receive either a promise’s eventual value or the reason why the promise cannot be fulfilled.*

In other words...

* Promises wait for your code to COMPLETELY finish what it's doing.
* Promises let you run callbacks to do things AFTER the code COMPLETELY finishes what it's doing.
* Promises run callbacks in neater, cleaner ways then in the past.
* Promises have a `then` method that manages the callbacks.
* Promises have special event handling for situations where any part of the code fails.

At the time of this guide's publish date, Promises haven't been implemented in all browsers. The current plan to achieve this is to make them part of a future version of JavaScript, specifically <a href="http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts" target="blank" title="Read the ECMAScript 6/Harmony specification">ECMAScript version 6, code-named "Harmony."</a>

There is much more to Promises than what's being discussed here, especially when discussing what's the right way to implementing them. Domenic Denicola, a very active member of the Promises community, has written <a href="https://gist.github.com/Domenic/3889970" target="blank" title="Read Domenic Denicola's excellent explanation of Promises">an excellent Promises post on GitHub</a> that discusses this.

Also, Forbes Lindesay has written <a href="https://www.promisejs.org/" target="blank" title="Read Forbes Lindesay's excellent Promises walk-through">an excellent walk-through on Promises</a>. Really good for beginners.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="jquery-promises"></a>
<h4 class="h4-guide">An important note about jQuery Promises</h4>
Since Promises aren't available in every browser, there are libraries you can add to make them work your project. The Promises spec has <a href="https://promisesaplus.com/implementations" target="blank" title="Read about the various Promise libraries">a list of libraries you can use to implement Promise functionality in your code</a>.

jQuery isn't on the list. This is because the current jQuery build doesn't fully conform to the Promises spec in two ways:

1. The spec calls for Promises to be their own object when implemented: Promises are wrapped in the jQuery's Deferred object.

2. The spec calls for Promises to manage errors in a specific way: the current jQuery build doesn't do this.

Also, jQuery's `.then` method is based on an older version of the Promises spec. This is discussed in <a href="#then-method">the jQuery `.then` section of this guide</a>.

According to <a href="https://esdiscuss.org/topic/a-challenge-problem-for-promise-designers-was-re-futures#content-43" target="blank" title="Read Rick Waldron says about Promises in jQuery">comments from jQuery core committer Rick Waldron</a>, these things are happening because implementing Promises as per the spec would cause breaking changes in jQuery. It would break things to the point that things other than Promises wouldn't work.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="differed-methods"></a>
<h4 class="h4-guide">Use Deferred methods with jqXHR</h4>
Because jqXHR is part of jQuery Deferreds, it has access to all of Deferreds methods. The four most commonly-used methods are:

1. `done`
2. `fail`
3. `always`
4. `then`

As mentioned, Promises allow for the neater callback implementations. Using these four methods for callback implementation is considered a best practice in jQuery.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="done-method"></a>
<h5 class="h5-guide">The .done method</h5>
The `.done` method sets a callback for what to do after the code has "resolved"...i.e., has fully run. (<a href="/samples/ajax-tutorial-samples/sample18/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample18/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Sample 18</title>
  </head>
  <body>
    <div id="textTarget"></div>
    <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="scripts.js"></script>
  </body>
</html>
{% endprism %}
The HTML required for this code sample.
{% prism javascript %}
// sample18/scripts.js
$.get("article.html").done(function(data) {
  $("#textTarget").html(data);
  console.log("The file has loaded!");
});
{% endprism %}
`.get` requested "article.html" from the server and had a `.done` method chained to it. If the request was successful, `.done` ran a callback function.

The callback loaded the contents of "article.html" onto the page and returned a console message.

We were able to do this with `.get` because it returned the `jqXHR` object. As a reminder: `.load` doesn't return `jqXHR` and is unable to do this.

The HTML remains the same but the JavaScript gets updated (<a href="/samples/ajax-tutorial-samples/sample19/" target="blank">view the example</a>):

{% prism javascript %}
// sample19/scripts.js
$("#textTarget").load("article.html")
  .done(function(data) {
    // Won't run because "load" doesn't understand "done"
    // "done" will return as an undefined function
    console.log("The file has loaded!");
});
{% endprism %}

The file loaded onto the page but the console message failed to appear. This is because `.load` doesn't automatically return `jqXHR`; therefore, `.done` didn't work in our code.

<a href="http://api.jquery.com/deferred.done/" target="blank" title="Read more about the jQuery 'deferred.done()'">Read more about the jQuery "deferred.done()"</a>.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="fail-method"></a>
<h5 class="h5-guide">The .fail method</h5>
The `.fail` method sets a callback for what to do if the code fails, or if it's "rejected".

`index.html` remains the same but we've deleted "article.html" from this sample's directory...<a href="/samples/ajax-tutorial-samples/sample20/" target="blank">view the example</a>.

`scripts.js` now looks like this:
{% prism javascript %}
// sample20/scripts.js
$.get("article.html")
  .done(function(data) {
    $("#textTarget").html(data);
  })
  .fail(function() {
    $("#textTarget").html("The file didn't load!");
  });
{% endprism %}

Since `article.html` was removed from the directory, the code failed. The `.fail` method was called as a result, so it loaded a message into the "textTarget" into the message saying so.

<a href="http://api.jquery.com/deferred.fail/" target="blank" title="Read more about the jQuery 'deferred.fail()'">"Read more about the jQuery "deferred.fail()"</a>.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="always-method"></a>
<h5 class="h5-guide">The .always method</h5>
The `.always` method sets a callback for what to do if the code either resolves or is rejected <a href="/samples/ajax-tutorial-samples/sample21/" target="blank">view the example</a>:
{% prism markup %}
<!-- sample21/index.html -->
<!-- Add <div id="textTarget02"> directly below <div id="textTarget">-->
...
<div id="textTarget"></div>
<div id="textTarget02"></div>
...
{% endprism %}
 A div tag with an id of "textTarget02" was added below the div tag with an id of "textTarget."
{% prism javascript %}
// sample21/scripts.js
// Try & load "article.html" into "<div id="textTarget">"
$.get("article.html")
  .done(function(data) {
    $("#textTarget").html(data);
  })
  .fail(function() {
    $("#textTarget").html("The file didn't load!");
  })
  .always(function(){
    console.log("The 'article.html' file either did or didn't load!");
  });

// Try & load "article02.html" into "<div id="textTarget02">"
$.get("article02.html")
  .done(function(data) {
    $("#textTarget02").html(data);
  })
  .fail(function() {
    $("#textTarget02").html("The 'article02.html' file didn't load!");
  })
  .always(function(){
    console.log("The 'article02.html' file either did or didn't load!");
  });
{% endprism %}
There were two functions in our code: one that loads in "article.html", which does exist, and one that loads in "article02.html", which does __NOT__ exist. Each one is chaining the `.done`, `.fail` and `.always` methods.

The first one loads in the existing "article.html" file, so its chained `.done` method will run...as will its chained `.always` method. The second one loads in the non-existing "article02.html" file, so its chained `.fail` method will run...as will its chained `.always` method.

<a href="http://api.jquery.com/deferred.always/" target="blank" title="Read more about the jQuery 'deferred.always()'">Read more about the jQuery "deferred.always()"</a>.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="then-method"></a>
<h5 class="h5-guide">The .then method</h5>
The `.then` method sets a callback for what to do if the code either resolves, is rejected or is still in progress (<a href="/samples/ajax-tutorial-samples/sample22/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample22/index.html -->
<!-- Remove <div id="textTarget02"> that was in the previous example -->
...
<div id="textTarget"></div>
...
{% endprism %}
The `<div id="textTarget02">` element was removed from `index.html`.
{% prism javascript %}
$.getJSON("soccerplayers.json").then(
  function(data) {
    $.each(data, function(i) {
      var newDiv = $("<div></div>");
      $(newDiv).append(data[i].playerOne);
      $("#textTarget").append(newDiv);
    })
  }, function(){
    $("#textTarget").html("The data failed to load.");
  },
    function(){
      $("#textTarget").html("The data is loading...");
    }
  );
{% endprism %}
We used `.getJSON` to grab and parse JSON [as we did in a previous example](#jquery-get-json). But the `.then` method is now helping us manage callback functions.

The callbacks are passed as function parameters...there are three of them:

1. The first function described what to do if the jQuery Promise resolves.
2. The first function described what to do if the jQuery Promise is rejected.
3. The first function described what to do if the jQuery Promise is still progressing.

Because `soccerplayers.json` exists, the Promise will resolve. But it could easily reject if it couldn't find the file.

If we removed `soccerplayers.json`, then the function in the second parameter would appear on the page (<a href="/samples/ajax-tutorial-samples/sample23/" target="blank">view the example</a>):
{% prism markup %}
The data failed to load.
{% endprism %}
Demonstrating the progress function passed in the third parameter is tough with such a small amount of JSON data is tough. But it's important to understand that the function would show "The data is loading..." if the Promise either resolved of rejected.

As mentioned, jQuery's `then` method is based on an older version of the Promises spec, which is <a href="http://wiki.commonjs.org/wiki/Promises/A" target="blank" title="Read the Promises A specification">the Promises A spec maintained by the Common JS community</a>. That spec requires that `then` allow for a progress parameter while newer <a href="https://promisesaplus.com/" target="blank" title="Read the Promises/A+ specification">Promises/A+ spec</a> states that it should not.

<a href="http://api.jquery.com/deferred.then/" target="blank" title="Read more about the jQuery 'deferred.then()'">Read more about the jQuery "deferred.then()"</a>.

<p class="toc-paragraph"><a href="#table-of-contents" class="toc">Back to the Table of Contents</a></p>
<a name="conclusion"></a>
<h3 class="h3-guide">Conclusion</h3>
AJAX is something that should be second nature to JavaScript developers so I hope this AJAX tutorial is good start in your understanding how it works.  Understanding how it works internally and how jQuery makes it easier to implement are key things to understand.

Reading <a href="https://xhr.spec.whatwg.org/#introduction" target="blank" title="Read the WHATWG XMLHttpRequest specification">the  official WHATWG XHR specification</a> should be your next step in understanding AJAX in full. From there, reading <a href="http://api.jquery.com/category/ajax/" target="blank" title="Read jQuery's AJAX documentation">jQuery's AJAX documentation</a> should be your next step.

Also, having a good understanding of JavaScript's asynchronous nature is important. So reading <a href="http://www.amazon.com/gp/product/1937785270/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1937785270&linkCode=as2&tag=kaidez-20&linkId=26L4SOXAE3MHODKC" target="blank" title="Get Trevor Burnham's *Async JavaScript* on amazon.com">Trevor Burnham's *Async JavaScript*</a> at some point is a good idea.

Feel free to post questions/issues/whatever on [this article's GitHub repository](https://github.com/kaidez/ajax-tutorial-samples).
