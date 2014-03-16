---
title: 5 Reasons Why You Need To Learn To Use JavaScript Before jQuery
comments: true
author: Kai Gittens
permalink: /learn-javascript-before-jquery/
layout: post
meta-excerpt: A list of good reasons why it's better to learn JavaScript before jQuery. A short learning resource list at the end to help you get started.
category: coding-best-practices
cat-name: "Code Tips"
has-thumbnail: jQjS.png
tags: [javascript, beginner, jquery, best practice]
---
A project came up at work involving [Node][1], the software system that allows JavaScript to run server-side instead of client-side. I wasn’t involved in the project but wanted to play with the code once it landed in production and wanted to be ready if ever asked to support it. So I set Node up on my Mac laptop, read parts of its documentation and found some beginning Node learning resources online.

 [1]: http://nodejs.org/

Server-side code is definitely not my thing so Node has always made me nervous. I can talk about how it works in the abstract, but actually *using* it has intimidated me. I delayed learning Node until the last minute.

But as I started playing with Node, something funny happened: understanding it turned out to be easy!

I’m not saying that it was so easy that I’m now a Node guru. I had to grasp Node’s event loop, its handling of server modules and gain a basic understanding of the how servers work in general. And I still have more to learn.

But in terms of the JavaScript needed to run Node, I picked it up in about two days. Knowing some basic JS things, that functions are first class objects, that these functions can be passed, that callbacks are powerful; knowing all that made my Node learning process much easier than expected.

I suppose the point is, I don’t know all the answers to Node (and still don’t), but thanks to my JavaScript knowledge, I understand all the questions.

None of this would have happened had I not made a conscious decision a year-and-a-half ago to focus on getting better at JavaScript instead of mastering jQuery. I’m may not be a JavaScript ninja but I’m comfortable putting it on my resume, something I was unsure about 18 months ago.

I need to be clear about something before I go on: I AM NOT BAD-MOUTHING JQUERY!!!! jQuery is awesome! I think you should use it and don’t see myself doing any future web projects without it.

jQuery effectively deals with a lot of cross-browser JavaScript issues, making overall web development an easier process. Its power as a DOM selection engine is so strong, that it doesn’t make sense to *not* use it. Furthermore, jQuery lets developers write quality JavaScript faster, so a case can be made that a developer using jQuery is, at times, more productive than one that doesn’t. Also, key JavaScript things like adding data to objects and function parameters are what’s needed to make jQuery work, meaning you can pick up some key JS skills by writing JQ. And a web designer with no coding experience whose main job is to work in PhotoShop eight hours a day shouldn’t be faulted for using jQuery to whip out a quick effect. At least I don’t think so.

While learning jQuery has lots of positives, the focus of your learning should mostly be on JavaScript: doing so makes you a better developer.

Here’s the list:

## 1. Because understanding JavaScript makes it easier to understand all the JavaScript-related stuff

Already implied in this post but it bears a deeper examination. Let’s look at this list:

### What You Know After Learning *Just* jQuery

*   [jQuery][2]
*   [jQuery UI][3]
*   [jQuery Mobile][4]

 [2]: http://jquery.com/
 [3]: http://jqueryui.com/
 [4]: http://jquerymobile.com/

And in terms of jQuery UI and jQuery Mobile, I’m being nice here. While you can apply raw JavaScript and jQuery to your UI and Mobile projects, setting UI and Mobile up is mostly done by adding attributes, IDs and classes to HTML elements. Things are made easy, an excellent goal that the jQuery team has achieved above and beyond all expectations.

Now, let’s look at this list:

### What You Know After Learning JavaScript *Before* jQuery

*   [jQuery][2]
*   [jQuery UI][3]
*   [jQuery Mobile][4]
*   [How to create jQuery plugins][5]
*   [Node.js][1]
*   [How to create Node.js modules][6]
*   [Modernizr][7]
*   [yepnope.js][8]
*   [ECMAscript 5][9]
*   [dojo][10]
*   [script.aculo.us][11]
*   [Prototype][12]
*   [MooTools][13]
*   [Spine][14]
*   [Backbone][15]
*   [JSON][16]
*   [JSONselect][17]
*   [PhoneGap][18]
*   [Titanium][19]
*   [HTML5 Canvas API][20]
*   [Geolocation API][21]
*   [Web Workers API][22]
*   [CoffeeScript][23]
*   [mustache.js][24]
*   [Handlebars.js][25]
*   [QUnit][26]
*   [Jasmine][27]
*   [github.js][28]

 [5]: http://docs.jquery.com/Plugins/Authoring
 [6]: http://howtonode.org/how-to-module
 [7]: http://modernizr.com/
 [8]: http://yepnopejs.com/
 [9]: http://www.ecma-international.org/publications/standards/Ecma-262.htm
 [10]: http://dojotoolkit.org/
 [11]: http://script.aculo.us/
 [12]: http://www.prototypejs.org/
 [13]: http://mootools.net/
 [14]: http://spinejs.com/
 [15]: http://documentcloud.github.com/backbone/
 [16]: http://www.json.org/
 [17]: http://jsonselect.org/#overview
 [18]: http://phonegap.com/
 [19]: http://www.appcelerator.com/platform/titanium-sdk
 [20]: https://developer.mozilla.org/en/HTML/Canvas
 [21]: https://developer.mozilla.org/en/Using_geolocation
 [22]: https://developer.mozilla.org/en/Using_web_workers
 [23]: http://coffeescript.org/
 [24]: https://github.com/janl/mustache.js
 [25]: http://handlebarsjs.com/
 [26]: https://github.com/jquery/qunit
 [27]: http://pivotal.github.com/jasmine/
 [28]: http://fitzgen.github.com/github-api/

…you get the idea.

While some of these things are so well-documented that a six-year old can use them, most of them are documented in a way that assumes the reader has pre-existing JavaScript knowledge. Many of these things assume you understand that a main object is loaded into the global namespace (like the `jQuery` and `Modernizr` objects) and that these objects have methods (like jQuery’s `.ajax()` method and Modernizr’s `addThis()` method). Also, knowing how to work with closures and callbacks is key to using many of these scripts and frameworks to their fullest.

## 2. Because understanding JavaScript makes it easier for you to learn object-oriented languages

JavaScript is not a full-on object-oriented language, it’s a [prototype-based language][29] that can be made to act like an object-oriented language. However, what you learn in JavaScript can cascade down to other languages. Case in point: PHP associative arrays are easy to pick up once you know how JavaScript’s module pattern works. And JavaScript closures introduce the idea of private, public and protected variables…major building blocks of C#, C , Java and ActionScript.

 [29]: https://developer.mozilla.org/en/JavaScript/Guide/Details_of_the_Object_Model#Class-based_vs._prototype-based_languages

## 3. Because there are many cases when using JavaScript is more efficient

Remember: your jQuery code doesn’t hit the page until it accesses the jQuery object that’s loaded into the browser. Accessing the object does happen fast but it’s faster if you write JavaScript that hits the browser directly.

The most obvious example here is adding, removing and manipulating DOM elements with things like `cloneNode` and [document fragments][30]. jQuery can help with these things but browsers can do them natively and more efficiently.

 [30]: https://developer.mozilla.org/en/DOM/document.createDocumentFragment

## 4. Because potential employers care more about your JavaScript knowledge than your jQuery knowledge

Why? Well for starters, lots of customer projects are created using the stuff in the number 1′s second list above, allowing web shops to charge the customers at a premium cost. And a good JavaScripter can figure out many things on that list over time, making them a very valuable employee. Second, employers want employees that can figure out coding problems on their own. They want an employee that can fix a Spine error one minute and a JSON one the next.

## 5. Because JavaScript is so popular right now, that many excellent, *free* beginning learning resources are now readily available

I’ll toot my own horn here and mention my last post on [great JavaScript books for beginners][31] but you have to pay for those. Here are some great free ones, two of which are jQuery-related:

 [31]: http://kaidez.com/useful-javascript-books/

### [Codecademy »][32] 
Great for beginners. It starts you at the JavaScript basics, building you up to creating structured JavaScript applications. Most importantly, [Mozilla Developer Network lists Codecademy as an excellent introductory level learning resource][33], which is a ringing endorsement.  

### [jQuery Fundamentals »][34]
Written by [Rebecca Murphey][35] who is, hands down, my favorite web developer right now. *jQuery Fundamentals* teaches you jQuery the right way: by teaching you the JavaScript basics and best practices first.

### [10 Things I Learned from the jQuery Source »][36]
Paul Irish walks you through the core JavaScript code behind the jQuery library, highlighting things like anonymous functions, robust module patterns and why they were written the way they were written.

Think I left some reasons or resources out? Feel free to comment. AND NO SPAM!! I know what it looks like.

 [32]: http://www.codecademy.com/
 [33]: https://developer.mozilla.org/en-US/learn/javascript
 [34]: http://jqfundamentals.com/
 [35]: http://rmurphey.com/
 [36]: http://www.youtube.com/watch?v=i_qE1iAmjFg