---
title: AJAX Tutorial for Beginners
comments: true
author: Kai Gittens
layout: post
permalink: /ajax-tutorial/
meta-excerpt: "Learn how to write AJAX using both pure JavaScript as well as jQuery. Includes many code examples that can be downloaded."
category: tutorials
cat-name: "Tutorials"
tags: [ajax, javascript, jquery]
has-home-img: ajax-image.jpg
---
AJAX has grown a lot since <a href="http://adaptivepath.com/ideas/ajax-new-approach-web-applications/" target="blank" title="Read Jesse James Garrett original ‘AJAX' article">Jesse James Garrett defined it in 2005</a>. It described a way to create robust web applications and helped turn JavaScript into one of the world's most popular web programming languages.

New developers (and a few intermediate ones) struggle to learn AJAX and are also not aware of how it's advanced inside of jQuery. This guide was written with those developers in mind.
<h2 style="clear:both;">Table of Contents</h2>
  <ol>
    <li><a href="#how-code-examples-works">How the code examples work</li>
    <li><a href="#what-is-ajax">What Is AJAX</a></li>
    <li><a href="#brief-history-ajax">A brief history of AJAX</a></li>
    <li>
      <a href="#ajax-javascript">Create AJAX with Regular JavaScript</a>
      <ol>
        <li><a href="#xhr-feature-detection">XHR feature detection</a></li>
        <li>
          <a href="#load-content">Load content onto a page with AJAX</a></li>
          <ol>
            <li><a href="#200-response">Wait for 200 response code from the server</a></li>
            <li><a href="#xhr-states">XHR States</a></li>
            <li><a href="#what-is-onreadystatechange">Bring everything together using "onreadystatechange"</a></li>
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
    <li><a href="#ajax-jquery">Create AJAX with jQuery</a>
      <ol>
        <li><a href="#add-jquery">Add jQuery to the project</a></li>
        <li><a href="#understanding-jquery-ajax">Understanding $.ajax()</a></li>
        <li><a href="#ajax-shorthand">jQuery AJAX Shorthand methods</a>
          <ol>
            <li><a href="#jquery-load">.load: the easiest way to use AJAX with jQuery</a></li>
            <li><a href="#jquery-ajax-request-mouseclick">Use .load to make an AJAX request with mouseclick</a></li>
            <li><a href="#jquery-reusable-button-code">Create reusable code for multiple buttons with .load</a></li>
            <li><a href="#load-fragments">Load in fragments with .load</a></li>
            <li><a href="#jquery-get">Use jQuery.get()</a></li>
            <li><a href="#jquery-get-json">Use jQuery.getJSON()</a></li>
            <li><a href="#jquery-get-script">Use jQuery.getScript()</a>
          </ol>
        </li>
        <li><a href="#jqxhr-promises-deferreds">jqHXR, Promises & Deferreds</a></li>
        <li><a href="#what-is-a-javascript-promise">What is a Promise</a></li>
        <li><a href="#jquery-promises">An important note about jQuery Promises</a></li>
        <li><a href="#deffered-methods">Use Deffered methods with jqXHR</a>
          <ol>
            <li><a href="#done-method">The .done method</a></li>
            <li><a href="#fail-method">The .fail method</a></li>
            <li><a href="#always-method">The .always method</a></li>
            <li></li>
          </ol>
        </li>
      </ol>
    </li>
    <li><a href="#conclusion">Conclusion</a></li>
  </ol>
<a name="how-code-examples-works"></a>
<h3 class="h3-guide">How the code examples work</h3>
The code for all the examples is located in the GitHub repo and looks similar to this:

{% prism markup %}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>A Sample</title>
  </head>
  <body>

    <script src="scripts.js"></script>
  </body>
</html>
{% endprism %}

All examples run from their own folder using an `index.html` file, which references a `scripts.js` file. Either `index.html` or `scripts.js` will change with each new example, and new files may be added or subtracted to each example.

All examples use some form of the XMLHttpRequest browser object. Because of this, they need to run from a web server instead of as a local file in a web browser.
<a name="what-is-ajax"></a>
<h3 class="h3-guide">What Is AJAX</h3>
First, understand that XMLHttpRequest, or "XHR", is the heart of any AJAX code. With that in mind, <a href="https://xhr.spec.whatwg.org/#introduction" target="blank" title=Read the W3C's XMLHttpRequest specification>the current version of the XMLHttpRequest specification</a> helps to provide the simplest AJAX definition:

> *"The XMLHttpRequest object is an API for fetching resources."*

Simply put, XMLHttpRequest fetches, or "requests", information from a server, then places it on a web page. It does this "asynchronously", meaning that __XMLHttpRequest loads the information onto the page without needing to reload it.__

"AJAX" stands for _Asynchronous JavaScript + XML_ but other technologies are used besides JavaScript and XML.  The original definition described it as a group of technologies working together to manage XHR requests inside a web page.

The technologies were: XMLHttpRequest, JavaScript, XML/XSLT, XHTML, CSS and the Document Object Model (or, "the DOM"). XML was the recommended data type but other data types can be used...text files, HTML files, images and (more so than anything else), JSON.  

XHTML can be used as the presentation layer along with CSS. But using HTML5 instead of XHTML is recommended at the time of this guide's initial publish date.
<a name="brief-history-ajax"></a>
<h3 class="h3-guide">A brief history of AJAX</h3>
*(NOTE: This section provides some historically perspective on AJAX but has nothing to do with the code in this guide. To start looking at code, you can <a href="#ajax-javascript">skip this section and go to "Create AJAX with Regular JavaScript"</a>.)*

The roots of AJAX goes back to roughly late 1988/early 1999: <a href="http://www.stitcher.com/podcast/ruby-rogues/javascript-jabber/e/124-jsj-the-origin-of-javascript-with-brendan-eich-35282918" target="blank" title="Listen to Brendan Eich on the JavaScript Jabber Podcast">according to JavaScript creator, Brendan Eich</a>, Microsoft was using Java to make asynchronous requests inside of its Outlook Web Access application (OWA) at that time. Due to a conflict between Microsoft and Sun (who owned Java), Microsoft removed Java from OWA.

OWA still needed to make asynchronous requests, or, "async" requests. Because of this, Microsoft developers created the <a href="http://msdn.microsoft.com/en-us/library/ie/ms537505%28v=vs.85%29.aspx" target="blank" title=""Read more about the XMLHTTP Object"">XMLHTTP object</a> to do just that, bundling it into Internet Explorer 5 when it was released in March 1999.

Other browsers added the object as well, but with a different implementation and called it "XMLHttpRequest". Microsoft would copy the other implementation and also name their object `XMLHttpRequest` when they released Internet Explorer 7.

The object was used to create to web applications that loaded data asynchronously, without page refreshes. The most notable applications came from Google: specifically Google Maps and [Google Suggest](http://www.searchenginejournal.com/beginners-guide-google-suggest-marketers-seo/73269/ "Read about Google Suggest").

These web apps showed how useful XHR was but the developer community didn't really notice this on a wide scale. That changed in February 2005 when <a href="http://adaptivepath.com/ideas/ajax-new-approach-web-applications/" target="blank" title="Read Jesse James Garrett original AJAX article">Jesse James Garrett wrote his influential AJAX article</a>.

Garret's article defined AJAX and also listed its required technologies (<a href="#what-is-ajax">see the previous section for more on this</a>). The article inspired developers to create compelling web applications and continues to do so to this day.

<a name="ajax-javascript"></a>
<h3 class="h3-guide">Create AJAX with Regular JavaScript</h3>
<a name="xhr-feature-detection"></a>
<h4 class="h4-guide">XHR feature detection</h4>
*(NOTE: Writing AJAX feature detection in pure JavaScript is discussed here for historically perspective, but is primarily needed for Internet Explorer versions 6 and lower. Usage for those browsers has dropped significantly, plus, jQuery version 1.x takes care of the feature detection for you when you use it. Therefore, you can <a href="#load-content">skip this section and go to "Load content onto a page with AJAX"</a>.)*

As mentioned, Microsoft's XHR implementation was different from other browsers until IE7. In the older IE versions, XMLHTTP was not a directly accessible object in the web browser...i.e., you couldn't access it by using `window.XMLHTTP` somewhere in your JavaScript code.

Instead, it was bundled inside of a proprietary Microsoft technology called <a href="http://msdn.microsoft.com/en-us/library/aa751972(VS.85).aspx" target="blank" title="Learn more about Microsoft's ActiveXObject">"ActiveXObject"</a>. Since AJAX became popular while the old Microsoft implementation was still in wide use, you had to write some sort of feature-detection code to make sure that your AJAX worked in all browsers.

The simplest version of this feature-detection code looked similar to this (<a href="/samples/ajax-tutorial-samples/sample01/" target="blank">view the example</a>):
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
The above-example created a variable called `xhr`, then checked to see if `XMLHttpRequest` is attached to the browser via the `window` object.  If it was, then `xhr` directly referenced a new instance of `XMLHttpRequest` when it performed AJAX tasks.

The example also checked to see if `ActiveXObject` was attached to the browser via the `window` object. If it was, then `xhr` will directly reference a new instance of `ActiveXObject` when it performed AJAX tasks.

Developers later realized that `window.ActiveXObject` was used differently across the older versions of IE. They also realized that that some browsers heavily in use at the time didn't support XHR at all.

As a result, they built slightly different feature detection code (<a href="/samples/ajax-tutorial-samples/sample02/" target="blank">view the example</a>):
{% prism javascript %}
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
The feature detection code was rewritten to be a reusable function called `getXHR()`. The function did the cross-browser checking for `XMLHttpRequest` internally, meaning any `getXHR()` instance lets you use XHR without worrying about cross-browser issues.

`getXHR()` checked for `XMLHttpRequest` in the same way, but also checks to see of the browser has one of two ActiveXObject builds and also checks to see if either the `XMLHttpRequest` or `ActiveXObject` exists.

A JavaScript `try...catch` statement looked for the different versions of `ActiveXObject`. If `try...catch` didn't find it and also didn't find `XMLHttpRequest`, then the value of the `xhr` variable was set to `false` and didn't do any AJAX work.

`getXHR()` said `return xhr` at the end of the code. That let us create new instances of `getXHR()` outside of the function.

There are use cases for including XHR feature detection in your code, but it's primarily required if your AJAX code needs to run in Internet Explorer versions 6 and lower. These browsers are in use less and less so it may make sense to keep this out of your code and just create a direct instance of the XHR:

{% prism javascript %}
var xhr = new XMLHttpRequest();
{% endprism %}

The samples in this guide don't use the feature detection code but if you want to learn more about it, <a href="https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started#Step_3_.E2.80.93_A_Simple_Example" target="blank">MDN has another great implementation</a> or <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch" target="blank">Read about "try...catch" on MDN</a>.

<a name="load-content"></a>
<h4 class="h4-guide">Load content onto a page with AJAX</h4>
Loading content with XHR is a three-step process:

1. Wait for a 200 response code from the server.
2. Wait for an XHR state of 4.
3. Bring everything together using "onreadystatechange".
<a name="200-response"></a>
<h5 class="h5-guide">Wait for 200 response code from the server</h5>
A web server sends many server response codes, each in the form of a numerical number.  With AJAX, the most important one is `200 OK`.

When your AJAX code sees a `200 OK` response, it knows that your XHR has succeeded in making the request.
<a name="xhr-states"></a>
<h5 class="h5-guide"> Wait for an XHR state of 4</h5>
An XHR request will be in one of fives states, each with a numerical value that will be 0 through 4. The last request state, number 4, is the most important one in AJAX code, but here's a simplified description of the states.

*(NOTE: This section is here because it's an important part of the XHR spec, but because this guide focuses on the last state only, you can [skip this section](what-is-onreadystatechange "Go the "onreadystatechange" section").*

There are two widely accepted specifications for AJAX states: [the spec defined by WHATWG](https://xhr.spec.whatwg.org/#states "Read the AJAX states definition in official XMLHttpRequest specification") and [the original spec defined by Microsoft](http://msdn.microsoft.com/en-us//library/ms534361%28en-us,VS.85%29.aspx). Many web development sources refer to the Microsoft one.

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

<a name="what-is-onreadystatechange"></a>
<h5 class="h5-guide">Bring everything together using "onreadystatechange"</h5>
`onreadystatechange` is an event handler that tracks the current request state. Whether it's 0 or 4, that value will always be stored in `onreadystatechange`.

There are use cases for knowing all the times when `onreadystatechange` is equal to all the different states. But with AJAX, knowing when it's equal to 4, the `done` state, is the most important use case.

When `onreadystatechange` is equal to 4, it means that all the data has fully downloaded and is ready to be used in our code. It also could mean that the data didn't download, but this guide assumes that your final code will be written in a way that keeps that from happening: (<a href="/samples/ajax-tutorial-samples/sample01/" target="blank">view the example</a>):

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
We've added a div tag with an id of `textTarget` to `index.html`. Our AJAX code will load data into this element.

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
Create a new instance of the `XMLHttpRequest` called `getArticleInfo`.
{% prism javascript %}
getArticleInfo.onreadystatechange = loadText;
getArticleInfo.open("GET", "articleName.txt");
getArticleInfo.send();
{% endprism %}
`getArticleInfo.onreadystatechange` will run a function called `loadText` any time a state changes, but we'll write code that makes sure that this only happens when the state is set to `4`.

`open()` is a method attached to the XHR object, and one of the most important parts of an AJAX application. This is because __the `open` method is where you tell your code what data needs to be loaded onto the page.__

In this example, `getArticleInfo.open()` first describes *how* to get the data. That's done with the first parameter, which is `GET`...it tells the server to "get" something from the server.

The second `getArticleInfo.open()` parameter is the file name of the data we're requesting. In this case, that's a file called "articleName.txt" and it contains the name of this article and the name of the author.

`getArticleInfo.send()` is the part of the code that actually sends the request through. You can pass a parameter to `send()` but it will be ignored if you do this using `GET`: the parameter will be set to its default value of `null`.

`send()` can accept and process parameters when using `POST` instead of `GET`.

{% prism javascript %}
function loadText() {
...
};
{% endprism %}
Start building the `loadText()` function that we defined above.
{% prism javascript %}
var text = document.getElementById("textTarget");
{% endprism %}
Store a variable reference to the `<div id="textTarget">` that we just added to `index.html`.
{% prism javascript %}
if (getArticleInfo.readyState === 4) {
  if (getArticleInfo.status === 200) {
    text.innerHTML = getArticleInfo.responseText;
  } else {
    console.log("There was a problem with the request.");
  }
}
{% endprism %}
First, check to see if `getArticleInfo.readyState` definitely equals `4`. If it does, then the data has been fully downloaded.

If the code is in the `4` state, then check and see if `getArticleInfo.status` equals `200`. If it does, then the code has successfully contacted the server.

If it has, then find `<div id="textTarget">` on our page and place whatever content is inside of `getArticleInfo.responseText`.

`getArticleInfo.responseText` is a reference to the data we requested in `getArticleInfo.open()`, which is the "articleName.txt" file. The copy in that file will be placed in `<div id="textTarget">`.

If the code can't connect to the server and `getArticleInfo.status`  doesn't equal `200`, then the browser console will display a message saying, "There was a problem with the request."  Note that this console message will only appear if `getArticleInfo.status` doesn't equal `200`: the value of `getArticleInfo.readyState` has no effect on whether or not the console message appears.

As mentioned, AJAX can load in all different types of documents...we can tell the `getArticleInfo.open)` to load in an HTML document instead of a text one (<a href="/samples/ajax-tutorial-samples/sample02/" target="blank">view the example</a>):
{% prism javascript %}
// sample02/scripts.js
// Update the getArticleInfo.open() method only
...
getArticleInfo.open("GET", "articleName.html");
...
{% endprism %}
<a name="callback-function"></a>
<h4 class="h4-guide">Have "readyStateChange" run a callback function</h4>
We've had "readyStateChange" request data using a named function called `loadText()`. Using a callback function is also an option (<a href="/samples/ajax-tutorial-samples/sample03/" target="blank">view the example</a>):
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
`getArticleInfo.onreadystatechange` now runs the function immediately instead of going out and looking for it in our code, which makes the code run  slightly faster.
<a name="logical-and-error"></a>
<h4 class="h4-guide">Using "&&" generates an error</h4>
*(NOTE: This section describes how NOT to do `readyState` and `status` checks. Many developers have performed checks this way but it should be avoided, so this section is here for historically perspective. To get to the next part of the working code, <a href="#ajax-request-mouseclick">skip this section and go to "Make an AJAX request with mouseclick"</a>.)*

Developers like to use the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_AND_.28&&.29" target="blank" title="Read about the logical "AND" operator on MDN">logical "AND" operator (&&)</a> to simultaneously check the value of `readyState` and `status`. The code for this looks similar to this (<a href="/samples/ajax-tutorial-samples/sample04/" target="blank">view the example</a>):
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
In this example, `XMLHttpRequest` probably requested and displayed data without error, but the console message displayed anyway. This is because it's doing very limited checks.

The code using logical "AND" will only load the content onto the page if `getArticleInfo.readyState` equals `4` at the same time that `getArticleInfo.status` equals `200`. If `getArticleInfo.readyState` equals `3` (meaning that data is still loading), it won't place content on the page.

But since `getArticleInfo.readyState` equals `3`, it doesn't meet the conditions set by the logical "AND" to load in data. So it will return the console error message anyway even though the data's loading...that's (probably) not what you want.

The point is, using `&&` doesn't like this doesn't perform a robust check of the application state so it's best to avoid it.
<a name="ajax-request-mouseclick"></a>
<h4 class="h4-guide">Make an AJAX request with mouseclick</h4>
The previous examples used AJAX to load data automatically, but we can also make it load when events are run. Doing this with mouseclicks is common (<a href="/samples/ajax-tutorial-samples/sample05/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample05/index.html -->
<!-- add <button> directly above <div id="textTarget">  -->
...
<button id="getHTMLFile">Load the HTML file</button>
<div id="textTarget"></div>
{% endprism %}

Add a button tag with an id of "getHTMLFile" directly above `<div id="textTarget">`. Clicking on this button will load the contents of an HTML file inside the div tag.
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
All the AJAX code is now inside a `loadHTML()` function and there's also new code at the bottom that loads runs this function with a mouseclick. In the bottom code, the button with the id of `getHTMLFile` has the `addEventListener` method attached to it.

The button is "listening for", or "watching for", whatever event we tell it to watch for...which is `click`. When the code see's that the button has been clicked, it runs the `loadHTML` that processes the AJAX code.

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
Add a new button tag with an id of "getTextFile" directly above `<div id="textTarget">`. Clicking on this button will load the contents of a text file inside the div tag.
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
`loadFile()` now requires a parameter that we're calling "file". The parameter will define what file get's loaded onto the page via `getInfo.open()`.

We also updated our button code: it still runs the `loadFile()` function, but that function now needs a parameter in order to work. That parameter is the name of the file we want to load onto the page.

We also added a new button: the new button loads in a text file while the old button loads in an HTML file.
<a name="reusable-button-code"></a>
<h4 class="h4-guide">Create reusable code for multiple buttons</h4>
The code in the last demo is fine if we only have a few buttons, but would get messy if we had to create `onclick` functionality for a lot of buttons. So it's a best to create reusable code that the buttons can share (<a href="/samples/ajax-tutorial-samples/sample08/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample07/index.html -->
<!-- update the <button> tags directly above <div id="textTarget"> -->
...
<button class="btn" data-file="articleName.html">Load the HTML file</button>
<button class="btn" data-file="articleName.txt">Load the text file</button>
<div id="textTarget"></div>
...
{% endprism %}
The two buttons are still on our HTML page but we're updated them. For each one, we've removed the IDs, added a class called `btn` and added a data-attribute called `data-file`.

The values of the data-attributes are unique for each button": each value is the name of the file that should be loaded using AJAX.
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
The button code for the two buttons is removed and replaced with this new code. The code starts by finding all the buttons with the `btn` class name and stores them as a group in a variable called `getButtons`.

Then a `for...in` loop runs for whatever the total amount of buttons there are inside of `getButtons`...there two right now. And every time the loop runs, it creates a variable called `singleButton` which stores a reference to one button at a time: that reference is the `getButtons[key]` line of code.

Next, our code tells each `singleButton` what to do when it gets clicked. What it does is, look at the value of the button's data attribute (which is one of two files) and passes it as a parameter to the `loadFile()` function to load onto the page.

Data attributes aren't supported in IE 10 and lower so we need to feature-detect for them, then provide fallback code for those browsers. We're detecting for the `dataset` property of the button being clicked, so we need to look for `this.dataset`.

We're first checking to see if `dataset` does NOT exist in the browser by saying `if(!this.dataset)`...if it doesn't exist, we get the value of the data attribute with the `getAttribute()` method.

But if `dataset` DOES exist, we can use it to get the value of the data attribute using `this.dataset`.

*(Note: To learn more about data attributes, read my <a href="/load-data-attributes-mouseclicks/" target="blank" title="Read my 'Load data attributes with Mouse Clicks' tutorial">"Load data attributes with Mouse Clicks" tutorial</a> or my <a href="/filter-content-jquery/" target="blank" target="blank" title="Read my 'Filter Content With jQuery.filter() & jQuery Selectors' tutorial">"Filter Content With jQuery.filter() & jQuery Selectors" tutorial</a>.*
<a name="load-json-ajax"></a>
<h4 class="h4-guide">Load JSON with AJAX</h4>
As mentioned in the beginning, AJAX can work with many data types but  JSON is the most-used data type at the time of this guide's initial publish date. There are many ways to use JSON with AJAX...this is a basic example (<a href="/samples/ajax-tutorial-samples/sample08/" target="blank">view the example</a>):
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
The buttons have been removed from the HTML file.
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
Instead of using AJAX to load in data from either an HTML or text file, we're now loading it from a `json` file called `soccerplayers.json`.

{% prism javascript %}
// sample08/scripts.js
(function(){
    var getPlayerInfo = new XMLHttpRequest();

    getPlayerInfo.open("GET", "languages.json");
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
There are only a few changes to `scripts.js` but they're important:
{% prism javascript %}
(function(){
...
})();
{% endprism %}
The main change is that the function now runs as soon as the page loads instead of being invoked some place in our code. This is done with an "immediately invoked function expression", or an <a href="http://benalman.com/news/2010/11/immediately-invoked-function-expression/ target="blank" title="learn about the IIFE">"IIFE"</a>.
{% prism javascript %}
...
var getPlayerInfo = new XMLHttpRequest();
getPlayerInfo.open("GET", "languages.json");
getPlayerInfo.send();
...
{% endprism %}
The main variable used in the AJAX code is renamed `getPlayerInfo` throughout the code. Also, the code is now fetching `soccerplayers.json`.
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
Once `readyState` equals `4` and our code successfully connects to the server, it creates two variables: `players` and `text`. `players` grabs our data with `responseText` like before and converts it to a readable JSON format with `JSON.parse`.

`text` is a reference to the `<div id="textTarget">` element on the HTML page. As before, our data will load into this element.

Then we're doing a `for...in` loop again that loops through JSON content stored inside the `players` variable. Three steps are performed for every loop iteration:

1. create a div tag using `document.createElement` and store it in a variable called `newDiv`.
2. look at each item in the `players` variable and find it's `playerOne` property. Then place it inside the div tag created in the `newDiv` variable by accessing the div's `innerHTML` property.
3. find the `text` variable that references the `<div id="textTarget">` already on the page and load the `newDiv` content inside of it.

Again, this is a basic example of how to use JSON with AJAX...the main takeaway from this is example is that __AJAX can load all different types of content, including JSON__.
<a name="ajax-jquery"></a>
<h3 class="h3-guide">Create AJAX with jQuery</h3>
<a href="http://jquery.com" target="blank" title="Go to the jQuery site">jQuery</a> has always had excellent AJAX support. It lets you write AJAX functionality we've seen up to this point and, in most cases, with less code.

The release of jQuery 1.5 was significant because of certain AJAX-related changes:

* AJAX performed faster in jQuery.
* deferreds and promises were introduced, making AJAX's asynchronous functionality better.
* the already-existing jqXHR object added new functionality to AJAX in jQuery.
<a name="add-jquery"></a>
<h4 class="h4-guide">Add jQuery to the project</h4>
The core jQuery library has been added to `index.html` via the jQuery CDN. `index.html` now looks like this:
{% prism markup %}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>A Sample with the jQuery code attached to it</title>
  </head>
  <body>
    <div id="textTarget"></div>
    <script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
    <script src="scripts.js"></script>
  </body>
</html>
{% endprism %}
Note that jQuery comes before `scripts.js` and that we're using a 2.x version of the library instead of a 1.x version. This means that jQuery is optimized to work in Internet Explorer versions 9 and higher only...1.x versions work in IE versions 6 and higher.

If you use jQuery 1.x, it will perform the ActiveX Object feature detection we reviewed earlier.

<a name="understanding-jquery-ajax"></a>
<h4 class="h4-guide">Understanding $.ajax()</h4>
`$.ajax()` is a powerful, highly-configurable method in jQuery. It manages all AJAX calls made by jQuery.

There are many ways to configure `$.ajax()` and reviewing all of them is beyond the scope of this guide. But understanding its structure is important. <a href="/samples/ajax-tutorial-samples/sample09/" target="blank">View the example</a>:

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
You can use `$.ajax()` either with or without passing parameters to it. If you do pass parameters, you can pass more than one using a configurable object.

We've created a configurable object be setting three options:

1.  url: Defines which file is being loaded into the page via AJAX. This example loaded in the "articleName.html" file.
2.  success: Defines what to do if the request for the file succeeds. This example would run a function called `isLoaded`.
3.  statusCode: Defines what to do when a certain server status code has been called. This example sent a message to the browser console when the server gets to a 200 status.

`.ajax()` is chained to the `.done()` method, so it will run next. `.done()` is discussed later when we look at jQuery promises and deferreds but for now, understand  that `.done()` is a essentially a callback function that ran after `.ajax()` did everything it was supposed to do.

`.done()` had its own callback function and for it, we passed a parameter of "data" to it. "data" represents all the options configured in `.ajax()`, including the value of the "url" option.

The callback used the `html()` method to load "articleName.html" into `<div id="textTarget">` like it did before except this time, we passed the "data" parameter to `.html()` instead of the file name. `.done()` is smart enough to understand that it needs to look at the "url" value to find out what content needs to be loaded in.  
<a name="ajax-shorthand"></a>
<h4 class="h4-guide">jQuery AJAX Shorthand methods</h4>
`$.ajax()` is powerful, but not needed for every project. According to <a href="http://api.jquery.com/jQuery.ajax/" target="blank" title="Read the jQuery.ajax documentation">the current version of the $.ajax documentation</a>:

> *"The `$.ajax()` function underlies all Ajax requests sent by jQuery. It is often unnecessary to directly call this function, as several higher-level alternatives like `$.get()` and `.load()` are available and are easier to use. If less common options are required, though, `$.ajax()` can be used more flexibly."*

In jQuery, these higher-level functions are commonly referred to as "[shorthand methods](http://api.jquery.com/category/ajax/shorthand-methods/ "Read more about jQuery AJAX shorthand methods")." All of them use core `.ajax()` method internally.

jQuery currently offers five AJAX shorthand methods:

1. `.load()`
2. `jQuery.get()`
3. `jQuery.getJSON()`
4. `jQuery.getScript()`
5. `jQuery.post()`

`jQuery.post()` deals with server interaction, which is beyond the scope of this guide, so it won't be discussed here.
<a name="jquery-load"></a>
<h5 class="h5-guide">.load: the easiest way to use AJAX with jQuery</h5>
If you want to use jQuery to load in file with AJAX like we've been doing, the `.load()` function is the easiest way to do this. This is the jQuery version of <a href="#what-is-onreadystatechange" title="Read the "onreadystatechange section of this article">a JavaScript sample we looked at earlier.

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
    <script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
    <script src="scripts.js"></script>
  </body>
</html>
{% endprism %}
A  HTML page like we've used in previous examples...it has `<div id="textTarget"></div>` where we'll load content on page-load.
{% prism javascript %}
// sample10/scripts.js
$("#textTarget").load("articleName.html");
{% endprism %}
jQuery looks for the `<div id="textTarget"></div>` element on the page and runs it against the `load()` function. That function will use AJAX to "load" content inside of `<div id="textTarget"></div>`: that content is defined as `"articleName.html"` in the `load()` parameter.
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
Add a button with an id of `getHTMLFile` directly above `<div id="textTarget">`.
{% prism javascript %}
// sample11/scripts.js
$("#getHTMLFile").click(function(){
  $("#textTarget").load("articleName.html");
});
{% endprism %}
Bind the jQuery `click` method to the button we just added and have it run a callback function when it's clicked. The function will run the `load`-based code in the previous example.
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
As before, create two buttons with a class called `btn` and a data-attribute called `data-file`. And `data-file` stores the file that should be loaded using AJAX.
{% prism javascript %}
// sample12/scripts.js
$(".btn").click(function(){
  var getData = $(this).data("file");
  $("#textTarget").load(getData);
});
{% endprism %}
As before, have all the buttons with the `btn` class share the same `click` function for loading in content. As before, the buttons simultaneously perform two tasks: find the file stored in the `data-file` attribute, and load that file into the `<div id="textTarget">` element.

To get the file stored in `data-file`, we start by using `$(this).data()`. We're still using the JavaScript `this` keyword to reference the button being clicked, but it's now wrapped in the jQuery object so we can use it with other jQuery methods.

We have to pass the name of data attribute we want to find as a parameter to the `.data` method. The name we want is `data-file` so we just need to write call our parameter "file".

All of this is stored in a variable called `getData`. Because `getData` refers to the value of the clicked-on button's data attribute (which is one of two files), we can pass that as a parameter to the `load` method that loads files inside of `<div id="textTarget">`.

<a name="load-fragments"></a>
<h5 class="h5-guide">Load in fragments with .load</h5>
The `$load` method can load in a piece of data from an HTML document instead of the entire document (<a href="/samples/ajax-tutorial-samples/sample14/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample14/index.html -->
<!-- No <button> tags in this example -->
...
<div id="textTarget"></div>
...
{% endprism %}
Use a page with just `<div id="textTarget"></div>`.
{% prism markup %}
<!-- sample14/article.html -->
<div id="title">AJAX Tutorial for Beginners</div>
<div id="author">Kai "kaidez" Gittens</div>
{% endprism %}
Create a page called `article.html` that contains two elements: `<div id="title">` and `<div id="author">`.
{% prism javascript %}
// sample14/scripts.js
$("#textTarget").load("article.html #author");
{% endprism %}
Use load to "AJAX in" the `article.html` but instead of loading in the entire file, just load in the content in the `<div id="author">` element.

<a name="jquery-get"></a>
<h5 class="h5-guide">Use jQuery.get()</h5>

The `$.get` method is different from `.load` in a few important ways:

* `$.get` is a global function while `.load` is a method. This means that you would use `$.get` to start a jQuery code block but use `.load` as a chainable method inside a code block.

* `$.get` manages GET server requests only while `.load` can manage both GET and POST requests.

* With `.load`, you can define what content gets loaded onto a page and where. `$.get` cannot do this on its own...extra code is needed.

* Because of the last difference, it makes sense to use `.load` to "AJAX in" HTML documents only. `$.get` was created to "AJAX in" all types of documents.

Using the same HTML as in the previous example, using `$.get` to bring content via AJAX looks like this (<a href="/samples/ajax-tutorial-samples/sample15/" target="blank">view the example</a>):
{% prism javascript %}
// sample15/scripts.js
$.get("articleName.html", function(data) {
  $("#textTarget").html(data);
});
{% endprism %}
Where we used `.load` as a chainable method inside a code block, `jQuery.get()` started the code block in this example. The first parameter told us what content gets loaded onto the page, which is "articleName.html".

The second parameter was a callback function that defined where the content got loaded. The function took a parameter called `data` which represented the content that got loaded onto the page.

The inside of the function loads the content onto the page. It loads inside the `#textTarget` element with the help of jQuery's `.html()` method.

The `data` parameter, which represents the content, is passed to `.html()` so it knows what to load. The function parameter does not need to be called `data`: it can be anything you want, but naming it as `data` is a common practice.

<a href="http://api.jquery.com/jQuery.get/" target="blank">Read more about "jQuery.get"</a>

<a name="jquery-get-json"></a>
<h5 class="h5-guide">Use jQuery.getJSON()</h5>
We can use jQuery's `$.getJSON()` method to load in JSON content [as we did before with plain JavaScript](#load-json-ajax)(<a href="/samples/ajax-tutorial-samples/sample16/" target="blank">view the example</a>).

As a reminder, here's our JSON file
{% prism javascript %}
// sample16/soccerplayers.json
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
// sample16/scripts.js
$.getJSON("soccerplayers.json", function(players) {
  $.each(players, function(i) {
    var newDiv = $("<div></div>");
    $(newDiv).append(players[i].playerOne);
    $("#textTarget").append(newDiv);
  })
});
{% endprism %}
The first parameter for `$.getJSON()` is the JSON file with the content we want to load onto the page. The second parameter is a callback function that loads the data onto the page.

That callback function takes one parameter we've called `player`, which points to the JSON file. Next, we use jQuery's `$.each()` method to do what the `for...in` loop did before and look for properties in our JSON data.

`$.each()` also takes parameters: the first one is `players` parameter, which, again, is pointing to our JSON data. The second parameter is another callback function that loads the data onto the page, and inside particular page elements we create.

In the function, we created a variable called `newDiv` that used jQuery to create a new div tag. Then we used jQuery's `.append()` method to look for any `playerOne` properties in the items of the JSON object, and place them inside of the newly created div tag.

The new div has content: we can now take it and use jQuery `.append()` again to load it into the `#textTarget` element already on the page.

<a href="http://api.jquery.com/jQuery.getJSON/" target="blank">Read more about "jQuery.getJSON()"</a>

<a name="jquery-get-script"></a>
<h5 class="h5-guide">Use jQuery.getScript()</h5>
`$.getScript()` loads a single JavaScript file via AJAX. A common practice is to use a callback function to execute code in the file after it loads.

`index.html` looks the same as before, but we're adding a file called `loadFile.js` while updating `scripts.js` (<a href="/samples/ajax-tutorial-samples/sample17/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample17/index.html -->
...
<div id="textTarget"></div>
...
{% endprism %}
The same HTML structure we used in the last few examples.
{% prism javascript %}
// sample17/loadFile.js
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
We created two functions in `loadFile.js`: `getHtmlFile()` `setText()`. `getHtmlFile()` loads the `articleName.html` into the `<div id="textTarget">` as was done in other examples, `setText()` changes the copy in `<div id="textTarget">` by making it red and bolding it.
{% prism javascript %}
// sample17/scripts.js
$.getScript("loadFile.js", function() {

  getHtmlFile();

  $("#textTarget").click(function(){
    setText();
  });

});
{% endprism %}
The `$.getScript()` method loads `loadFile.js`, then runs a callback function. The callback immediately runs `getHtmlFile()` and loads in "articleName.html", and it also allows the `setText()` to be run when `<div id="textTarget">` is clicked.
http://davidwalsh.name/loading-scripts-jquery

If you view `index.html` in a web browser with a good developer tool (Firebug, Chrome Developer Tools, etc.), open up its Network panel. You'll see that the filename for `loadFile.js` as a time stamp appended to it:
{% prism javascript %}
// Will look different every time the page gets reloaded
loadFile.js?=1421161342213
{% endprism %}
This is because `$.getScript()` always "cache-busts" scripts that it loads in. This forces the browser to download a new version of the file instead of looking for a cached one.

If you want to avoid this, you can use `$.ajaxSetup()` to allow caching (<a href="/samples/ajax-tutorial-samples/sample18/" target="blank">view the example</a>):  
{% prism javascript %}
// sample18/scripts.js
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

<a href="http://api.jquery.com/jQuery.getScript/" target="blank">Read more about "jQuery.getScript()"</a>

<a name="jqxhr-promises-deferreds"></a>
<h4 class="h4-guide">jqHXR, Promises & Deferreds</h4>
When used, both `$.ajax()` and some of the shorthand methods return the jQuery XMLHttpRequest object, which is commonly referred to as "jqHXR". The `.load()` shorthand method does not return jqXHR.

jqXHR is basically the traditional `XMLHttpRequest` object already in the browser, but wrapped in a specific API created by jQuery. The jQuery documentation refers to jqXHR as a "superset" of the browser's XHR.

An important part of the API are jQuery "promises" which are part of the jQuery Deffered object. This guide focuses on using the jQuery Deffered object with AJAX-related functionality, but it can do more than what will be discussed here...<a href="http://api.jquery.com/category/deferred-object/" target="blank" title="Read more about jQuery Deferreds">read the jQuery documentation to learn more about jQuery Deferreds</a>.

<a name="what-is-a-javascript-promise"></a>
<h4 class="h4-guide">What is a Promise</h4>
Promises are not a new technology, but are relatively new to JavaScript and are gaining an important role in the language. Discussing them in full is also beyond the scope of this guide but it's good to understand their basic ideas.

According to the <a href="https://promisesaplus.com/" target="blank" title="Read the Promises/A+ specification">community-led Promises specification</a>:

> *A promise represents the eventual result of an asynchronous operation. The primary way of interacting with a promise is through its `then` method, which registers callbacks to receive either a promise’s eventual value or the reason why the promise cannot be fulfilled.*

In other words...

* Promises wait for your code to COMPLETELY finish what it's doing.
* Promises let you attach callbacks to the code, and do it in a neater, cleaner way then before.
* Promises have a `then` method that manages the callbacks.
* Promises have special event handling for situations where the code fails.

At the time of this guide's publish date, Promises haven't been implemented in all browsers. The current plan to achieve this is to make them part of a future version of JavaScript, specifically <a href="http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts" target="blank" title="Read the ECMAScript 6/Harmony specifcation">ECMAScript version 6, code-named "Harmony."</a>

<a name="jquery-promises"></a>
<h4 class="h4-guide">An important note about jQuery Promises</h4>
Since Promises aren't available in every browser, there are libraries that you can add to your add to your project that make them work. The Promises spec has <a href="https://promisesaplus.com/implementations" target="blank" title="Read about the various Promise libraries">a list of libraries that fully conform the spec</a>.

Note that jQuery isn't on the list. This is because the current jQuery build doesn't fully conform to the spec in two ways:

1. The spec calls for Promises to be their own object when implemented: Promises are wrapped in the jQuery's Deffered object.

2. The spec calls for Promises to manage errors in a specific way: the current jQuery build doesn't do this.

According to <a href="http://bugs.jquery.com/ticket/11010" target="blank" title="Read the jQuery bug ticket discussing its Promise implementation">a ticket in jQuery's bug tracker</a>, these things are happening because implementing Promise as per the spec would cause breaking changes in jQuery. It would break things to the point that things other than Promises wouldn't work.

There is much more to Promises than what's being discussed here. Domenic Denicola, a very active member of the Promises community, has written <a href="https://gist.github.com/Domenici/3889970" target="blank" title="Read Domenic Denicola's excellent explanation of Promises">an excellent Promises post on GitHub</a> that explains them even further.

Also, Forbes Lindesay has written <a href="https://www.promisejs.org/" target="blank" title="Read Forbes Lindesay's excellent Promises walk-through">an excellent walk-through on Promises</a>. Really good for beginners.

<a name="deffered-methods"></a>
<h4 class="h4-guide">Use Deffered methods with jqXHR</h4>
Because jqXHR is part of jQuery Deferreds, it has access to all of Deferreds methods. The four most commonly-used methods are:

1. `done`
2. `fail`
3. `always`
4. `then`

As mentioned, Promises allow for the neater callback implementations. Using these four methods for callback implementation is considered a best practice in jQuery.

<a name="done-method"></a>
<h5 class="h5-guide">The .done method</h5>
The `.done` method sets a callback for what to do after the code has fully run, or, fully "resolved" (<a href="/samples/ajax-tutorial-samples/sample19/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample19/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Sample 19</title>
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
// sample19/scripts.js
$.get("article.html").done(function(data) {
  $("#textTarget").html(data);
  console.log("The file has loaded!");
});
{% endprism %}
`$.get()` requested "article.html" from the server. `.done` will run a callback function if the request is successful.

The callback loaded the contents of "article.html" on to the page and returned a console message.

We were able to do this with `$.get()` because it returned the `jqXHR` object. As a reminder: `load()` doesn't return jqXHR and is unable to do this.

The HTML remains the same but the JavaScript gets updated (<a href="/samples/ajax-tutorial-samples/sample20/" target="blank">view the example</a>):

{% prism javascript %}
// sample20/scripts.js
$("#textTarget").load("article.html")
  .done(function(data) {
    // Won't run because "load" doesn't understand "done"
    // "done" will return as an undefined function
    console.log("The file has loaded!");
});
{% endprism %}

The file loaded onto the page but the console message failed to appear. This is because `load` doesn't automatically return `jqXHR`; therefore, `.done` didn't work in our code.

<a name="fail-method"></a>
<h5 class="h5-guide">The .fail method</h5>
The `.fail()` method sets a callback for what to do if the code fails, or if it's "rejected".

`index.html` remains the same but we've deleted "article.html" from this sample's directory...<a href="/samples/ajax-tutorial-samples/sample21/" target="blank">view the example</a>.

`scripts.js` now looks like this:
{% prism javascript %}
// sample21/scripts.js
$.get("article.html")
  .done(function(data) {
    $("#textTarget").html(data);
  })
  .fail(function() {
    $("#textTarget").html("The file didn't load!");
  });
{% endprism %}

Since `article.html` was removed from the directory, the code failed. The `.fail()` method was called as a result, so it loaded a message into the "#textTarget" into the message saying so.

<a name="always-method"></a>
<h5 class="h5-guide">The .always method</h5>
The `.always()` method sets a callback for what to do if the code either resolves or is rejected.

<a name="conclusion"></a>
<h3 class="h3-guide">Conclusion</h3>


Synchronous requests are disappearing from XHR: https://xhr.spec.whatwg.org/#the-open()-method



MDN Promises
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise


([read the Wikipedia article about the history of promises](http://en.wikipedia.org/wiki/Futures_and_promises)).

yayquery: http://vimeo.com/19578621
returns jqXHR...comes with a lot of stuff...lets you use XHR methods/functions with other methods/functions if you want.
