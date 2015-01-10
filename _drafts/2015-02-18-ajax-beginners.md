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
AJAX has grown a lot since [Jesse James Garrett defined it in 2005](adaptivepath.com/ideas/ajax-new-approach-web-applications/ "Read Jesse James Garrett original ‘AJAX' article"). It's described a way to create robust web applications and helped turn JavaScript into one of the world's most popular web programming languages.

New developers (and a few intermediate ones) struggle to learn AJAX and are also not aware of how it's advanced inside of jQuery. This guide was written with those developers in mind.
<h2 style="clear:both;">Table of Contents</h2>
  <ol>
    <li><a href="#how-code-examples-works">How the code examples work</li>
    <li><a href="#what-is-ajax">What Is AJAX</li>
    <li><a href="#brief-history-ajax">A brief history of AJAX</li>
    <li>
      <a href="#ajax-javascript">Write AJAX with Regular JavaScript
      <ol>
        <li><a href="#xhr-feature-detection">XHR feature detection</li>
        <li>
          <a href="#load-content">Load content onto a page with AJAX</li>
          <ol>
            <li><a href="#200-response">Wait for 200 response code from the server</li>
            <li><a href="#xhr-states">XHR States</li>
            <li><a href="#what-is-onreadystatechange">Bring everything together using "onreadystatechange"</li>
          </ol>
        </li>
        <li><a href="#no-feature-detection">Use AJAX without feature-detection</li>
        <li><a href="#callback-function">Have "readyStateChange" run a callback function</li>
        <li><a href="#logical-and-error">Using "&&" generates an error</li>
        <li><a href="#ajax-request-mouseclick">Make an AJAX request with mouseclick</a></li>
        <li><a href="#multiple-ajax-buttons">Multiple buttons with AJAX functionality</a></li>
        <li><a href="#reusable-button-code">Create reusable code for multiple buttons</a></li>
        <li><a href="#load-json-ajax">Load JSON with AJAX</a>
      </ol>
    </li>
    <li><a href="#ajax-jquery">AJAX and jQuery
      <ol>
        <li><a href="#add-jquery">Add jQuery to the project</a></li>
        <li><a href="#jquery-load">$.load: the easiest way to use AJAX with jQuery</a></li>
        <li><a href="#jquery-ajax-request-mouseclick">Use $.load to make an AJAX request with mouseclick</a></li>
      </ol>
    </li>
    <li><a href="#conclusion">Conclusion</li>
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

All examples run from their own folder, and from an `index.html` file that references a file called `scripts.js`. Either `index.html` or `scripts.js` will change with each new example: new files may also be added as well.

All the examples use XMLHttpRequest browser object. Because of these, they need to run from a web server instead of as a local file in a web browser.
<a name="what-is-ajax"></a>
<h3 class="h3-guide">What Is AJAX</h3>
First, understand that XMLHttpRequest, or "XHR", is the heart of any AJAX code. With that in mind, <a href="https://xhr.spec.whatwg.org/#introduction" target="blank" title=Read the W3C's XMLHttpRequest specification>the current version of the XMLHttpRequest specification</a> helps to provide the simplest AJAX definition:

> *"The XMLHttpRequest object is an API for fetching resources."*

Simply put, XMLHttpRequest fetches, or "requests", information from a server, then places it on a web page. It does this "asynchronously", meaning that __XMLHttpRequest loads the information onto the page without needing to reload it.__

"AJAX" stands for _Asynchronous JavaScript + XML_ but other technologies are used besides JavaScript and XML.  The original definition described it as a group of technologies working together to manage XHR requests inside a web page: the technologies were XMLHttpRequest, JavaScript, XML/XSLT, XHTML, CSS and the Document Object Model (or, "the DOM").

XML was the recommended data type but other data types can be used...text files, HTML files, even images. XML was also the recommended data type to use when loading in a large group of data but for this, JSON is now preferred over XML at the time of this guide's initial publish date.  

XHTML can be used as the presentation layer along with CSS. But using HTML5 instead of over XHTML is recommended at the time of this guide's initial publish date.
<a name="brief-history-ajax"></a>
<h3 class="h3-guide">A brief history of AJAX</h3>
The roots of AJAX goes back to roughly late 1988/early 1999: [according to JavaScript creator, Brendan Eich](http://www.stitcher.com/podcast/ruby-rogues/javascript-jabber/e/124-jsj-the-origin-of-javascript-with-brendan-eich-35282918), Microsoft was using Java to make asynchronous requests inside of its Outlook Web Access application (OWA) at that time. Due to a conflict between Microsoft and Sun (who owned Java), Microsoft removed Java from OWA.

OWA still needed to make asynchronous requests, or, "async" requests. Because of this, Microsoft developers created the [XMLHTTP object](http://msdn.microsoft.com/en-us/library/ie/ms537505%28v=vs.85%29.aspx, "Read more about the XMLHTTP Object") to do just that, bundling it into Internet Explorer 5 when it was released in March 1999.

Other browsers added the object as well, but with a different implementation and called it `XMLHttpRequest`. Microsoft would copy the other implementation and also name their object `XMLHttpRequest` when they released Internet Explorer 7.

The object was used to create to web applications that loaded data asynchronously, without page refreshes. The most notable applications came from Google: specifically Google Maps and [Google Suggest](http://www.searchenginejournal.com/beginners-guide-google-suggest-marketers-seo/73269/ "Read about Google Suggest").

These web apps showed how useful XHR was but the developer community didn't really notice this on a wide scale. That changed in February 2005, [Jesse James Garrett wrote his influential AJAX article](http://www.adaptivepath.com/ideas/ajax-new-approach-web-applications/).

Garret's article defined the AJAX acronym and also listed its required technologies (<a href="#what-is-ajax">see the previous section for more on this</a>). The article inspired developers to create compelling web applications and continues to do so to this day.

<a name="ajax-javascript"></a>
<h3 class="h3-guide">Write AJAX with Regular JavaScript</h3>
<a name="xhr-feature-detection"></a>
<h4 class="h4-guide">XHR feature detection</h4>
As mentioned, Microsoft's XHR implementation was different from other browsers until IE7. In the older versions, XMLHTTP was not a directly accessible object in the web browser...you couldn't access it by using `window.XMLHTTP` somewhere in your JavaScript code.

Instead, it was bundled inside of another object called
<a href="http://msdn.microsoft.com/en-us/library/aa751972(VS.85).aspx">"ActiveXObject"</a>. Since AJAX became popular while the old Microsoft implementation was still in wide use, you had to write some sort of feature-detection code to make sure that your AJAX worked in all browsers.

The simplest version of this feature-detection code looked similar to this (<a href="/samples/ajax-tutorial-samples/sample01/" target="blank">view the example</a>):
{% prism javascript %}
// sample01/scripts.js
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

Developers later realized that `window.ActiveXObject` was used differently across the older versions of IE. They also realized that that some browsers heavily in use at the time didn't support XHR at all.

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
The feature detection code is now in a reusable function called `getXHR()`. The function does the cross-browser checking for `XMLHttpRequest` internally, meaning we can use XHR by creating new `getXHR()` instances and not worry about cross-browser issues.

`getXHR()` checks for `XMLHttpRequest` in the same way, but also checks to see of the browser has one of two ActiveXObject builds and also checks to see if either the `XMLHttpRequest` or `ActiveXObject` exists.

A JavaScript `try...catch` statement is looking for the different versions of `ActiveXObject`. If `try...catch` can't find it and also can't find `XMLHttpRequest`, then the value of the `xhr` variable is set to `false` and won't do any AJAX work.

`getXHR()` says `return xhr` at the end of the code. This lets us create new instances of `getXHR()` outside of the function.

There are many ways to implement XHR feature detection: <a href="https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started#Step_3_.E2.80.93_A_Simple_Example" target="blank">MDN has another great implementation</a>. Also, <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch" target="blank">Read about "try...catch" on MDN</a>.

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

When `onreadystatechange` is equal to 4, it means that all the data has fully downloaded and is ready to be used in our code. It also could mean that the data didn't download, but this guide assumes that your final code will be written in a way that keeps that from happening: (<a href="/samples/ajax-tutorial-samples/sample03/" target="blank">view the example</a>):

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
    <script src="scripts.js"></script>
  </body>
</html>
{% endprism %}
We've added a div tag with an id of `textTarget` to `index.html`. Our AJAX code will load data into this element.

{% prism javascript %}
// sample03/scripts.js
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
Create a new instance of the `getXHR()` function and store it in a variable called `getArticleInfo`. Again, `getXHR()` lets us use `XMLHttpRequest` in a cross-browser compatible way.

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

If the code is in the `4` state, then the next step is to check and see if `getArticleInfo.status` equals `200`. If it does, then the code has successfully contacted the server.

If it has, then find `<div id="textTarget">` on our page and place whatever content is inside of `getArticleInfo.responseText`.

`getArticleInfo.responseText` is a reference to the data we requested in `getArticleInfo.open()`, which is the "articleName.txt" file. The copy in that file will be placed in `<div id="textTarget">`.

If the code can't connect to the server and `getArticleInfo.status`  doesn't equal `200`, then the browser console will display a message saying, "There was a problem with the request."  Note that this console message will only appear if `getArticleInfo.status` doesn't equal `200`: the value of `getArticleInfo.readyState` has no effect on whether or not the console message appears.

As mentioned, AJAX can load in all different types of documents...we can tell the `getArticleInfo.open)` to load in an HTML document instead of a text one (<a href="/samples/ajax-tutorial-samples/sample04/" target="blank">view the example</a>):
{% prism javascript %}
// sample04/scripts.js
// Update the getArticleInfo.open() method only
...
getArticleInfo.open("GET", "articleName.html");
...
{% endprism %}
<a name="no-feature-detection"></a>
<h4 class="h4-guide">Use AJAX without feature-detection</h4>
There are use cases for including XHR feature detection in your code, but it's primarily required if your AJAX code needs to run in Internet Explorer versions 6 and lower. These browsers are in use less and less so it may make sense to keep this out of your code (<a href="/samples/ajax-tutorial-samples/sample05/" target="blank">view the example</a>):
{% prism javascript %}
// sample05/scripts.js
var getArticleInfo = new XMLHttpRequest();

getArticleInfo.onreadystatechange = loadText;
getArticleInfo.open("GET", "articleName.html");
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
The XHR feature detection has been removed...there's no need to for a `getXHR()` function that does `ActiveXObject` checks. Instead, our `getArticleInfo` variable is set to a new instance of the `XMLHttpRequest()` object.
<a name="callback-function"></a>
<h4 class="h4-guide">Have "readyStateChange" run a callback function</h4>
We've had "readyStateChange" request data using a named function called `loadText()`. Using a callback function is also an option (<a href="/samples/ajax-tutorial-samples/sample06/" target="blank">view the example</a>):
{% prism javascript %}
// sample06/scripts.js
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
Developers like to use the [logical "AND" operator (&&)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_AND_.28&&.29 "Read about the logical "AND" operator on MDN") to simultaneously check the value of both `readyState` and `status` (<a href="/samples/ajax-tutorial-samples/sample07/" target="blank">view the example</a>):
{% prism javascript %}
// sample07/scripts.js
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
`XMLHttpRequest` will request and display data without error but the console message, however we write it, will return anyway. This is because it's doing very limited checks.

The code using logical "AND" will only load the content onto the page if `getArticleInfo.readyState` equals `4` at the same time that `getArticleInfo.status` equals `200`. If `getArticleInfo.readyState` equals `3` (meaning that data is still loading), it won't place content on the page.

But since `getArticleInfo.readyState` equals `3`, it doesn't meet the conditions set by the logical "AND" to load in data. So it will return the console error message anyway even though the data's loading...that's (probably) not what you want.

Most developers simply don't add a console statement but your web application may require them. You'll probably want to write a few more `if/else` checks in those case, but doing that is out of the scope of this guide.

<a name="ajax-request-mouseclick"></a>
<h4 class="h4-guide">Make an AJAX request with mouseclick</h4>
The previous examples used AJAX to load data automatically, but we can also make it load when events are run. Doing this with mouseclicks is common (<a href="/samples/ajax-tutorial-samples/sample08/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample08/index.html -->
<!-- add <button> directly above <div id="textTarget">  -->
...
<button id="getHTMLFile">Load the HTML file</button>
<div id="textTarget"></div>
{% endprism %}

Add a button tag with an id of "getHTMLFile" directly above `<div id="textTarget">`. Clicking on this button will load the contents of an HTML file inside the div tag.
{% prism javascript %}
// sample08/scripts.js
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
We can create multiple buttons that load different data with AJAX (<a href="/samples/ajax-tutorial-samples/sample09/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample09/index.html -->
<!-- add a new <button> directly above <div id="textTarget">  -->
...
<button id="getHTMLFile">Load the HTML file</button>
<button id="getTextFile">Load the text file</button>
<div id="textTarget"></div>
{% endprism %}
Add a new button tag with an id of "getTextFile" directly above `<div id="textTarget">`. Clicking on this button will load the contents of a text file inside the div tag.
{% prism javascript %}
// sample09/scripts.js
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
The code in the last demo is fine if we only have a few buttons, but would get messy if we had to create `onclick` functionality for a lot of buttons. So it's a best to create reusable code that the buttons can share (<a href="/samples/ajax-tutorial-samples/sample10/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample10/index.html -->
<!--  update the <button> tags directly above <div id="textTarget"> -->
...
<button class="btn" data-file="articleName.html">Load the HTML file</button>
<button class="btn" data-file="articleName.txt">Load the text file</button>
<div id="textTarget"></div>
...
{% endprism %}
The two buttons are still on our HTML page but we're updated them. For each one, we've removed the IDs, added a class called `btn` and added a data-attribute called `data-file`.

The values of the data-attributes are unique for each button": each value is the name of the file that should be loaded using AJAX.
{% prism javascript %}
// sample10/scripts.js
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

*(Note: To learn more about data attributes, read my ["Load data attributes with Mouse Clicks" tutorial](/load-data-attributes-mouseclicks/ "read my "Load data attributes with Mouse Clicks" tutorial") or my ["Filter Content With jQuery.filter() & jQuery Selectors" tutorial]("/filter-content-jquery/")).*
<a name="load-json-ajax"></a>
<h4 class="h4-guide">Load JSON with AJAX</h4>
As mentioned in the beginning, AJAX can work with many data types but  JSON is the most-used data type at the time of this guide's initial publish date. There are many ways to use JSON with AJAX...this is a basic example (<a href="/samples/ajax-tutorial-samples/sample11/" target="blank">view the example</a>):
{% prism markup %}
<!-- sample11/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Sample 11</title>
  </head>
  <body>
    <div id="textTarget"></div>
    <script src="scripts.js"></script>
  </body>
</html>
{% endprism %}
The buttons have been removed from the HTML file.
{% prism javascript %}
// sample11/soccerplayers.json
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
// sample11/scripts.js
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
The main change is that the function now runs as soon as the page loads instead of being invoked some place in our code. This is done with an "immediately invoked function expression", or an "IIFE": [learn about the IIFE](http://benalman.com/news/2010/11/immediately-invoked-function-expression/ "Read more about the IIFE").
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
<h3 class="h3-guide">AJAX and jQuery</h3>
[jQuery](http://jquery.com "Go to the jQuery site") has always had excellent AJAX support. It lets you write AJAX functionality we've seen up to this point and, in most cases, with less code.


The release of jQuery 1.5 was significant because of certain AJAX-related changes. It optimized jQuery's AJAX functionality to be faster but also did the following:

* bundled deferreds and promises, making AJAX's asynchronous functionality better.
* increased the functionality of the jqXHR object, adding new functionality to AJAX in jQuery.
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
<a name="jquery-load"></a>
<h4 class="h4-guide">$.load: the easiest way to use AJAX with jQuery</h4>
[jQuery has an `$.ajax()` method](http://api.jquery.com/jQuery.ajax/ "Read about jQuery's ajax method") that allows you to use AJAX with jQuery any way that you want. But it also has many [AJAX shorthand methods](http://api.jquery.com/category/ajax/shorthand-methods/ "Read about jQuery shorthand methods") that lets you use a little easier.

If you want to use jQuery to load in file with AJAX like we've been doing, the `.load()` function is the easiest way to do this. This is the jQuery version of [a JavaScript sample we looked at earlier](#what-is-onreadystatechange, "Read the "onreadystatechnage section of this article).

<a href="/samples/ajax-tutorial-samples/sample12/" target="blank">View the example</a>:
{% prism markup %}
<!-- sample12/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Sample 12</title>
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
// sample12/scripts.js
$("#textTarget").load("articleName.html");
{% endprism %}
jQuery looks for the `<div id="textTarget"></div>` element on the page and runs it against the `load()` function. That function will use AJAX to "load" content inside of `<div id="textTarget"></div>`: that content is defined as `"articleName.html"` in the `load()` parameter.
<a name="jquery-ajax-request-mouseclick"></a>
<h3 class="h3-guide">Use $.load to make an AJAX request with mouseclick</h3>
{% prism markup %}
<!-- sample13/index.html -->
<!-- add <button> directly above <div id="textTarget">  -->
...
<button id="getHTMLFile">Load the HTML file</button>
{% endprism %}

{% prism javascript %}
// sample13/scripts.js
$("#getHTMLFile").click(function(){
  $("#textTarget").load("articleName.html");
});
{% endprism %}


yayquery: http://vimeo.com/19578621
returns jqXHR...comes with a lot of stuff...lets you use XHR with other functions if you want.
<a name="conclusion"></a>
<h3 class="h3-guide">Conclusion</h3>
Synchronous requests are disappearing from XHR: https://xhr.spec.whatwg.org/#the-open()-method
