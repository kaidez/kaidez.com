---
title: 'Web Components Demo: Templates and (some) Shadow DOM'
comments: true
author: Kai Gittens
layout: post
permalink: /web-components-demo/
meta-excerpt: A Web Components demo using just templates and Shadow DOM, mostly templates. Post includes many links to Web Component learning resources.
category: coding-best-practices
cat-name: "Code Tips"
tags: [web components, shadow DOM, templates]
has-home-img: web-components-demo.jpg
---
*Author's Note: it's best to review the demo in Google Chrome 36+. To properly review the code, open up your Dev Tools and under "General" and then "Settings," make sure that the "Show user agent shadow DOM" box is checked.*

I spent some time hacking Web Components during a long flight layover and it was time well spent. I put together a small demo just so I could further comprehend WC as a whole.

Web Components are a concept based on four sub-concepts, but I focused on just two of them for the demo: templates and Shadow DOM, primarily templates. At the time of this post, a neat cross-browser/cross-device implementation of Web Components requires a polyfill library like [Polymer](http://www.polymer-project.org/ "visit the Polymer Web Components Library") or [X-Tag](http://x-tags.org/ "visit the X-tag Web Components Library"), but I wanted to study the internal workings of each sub-concept before a deep dive into the polyfills. 

### A Quick Web Components Description
Web Components are a set of emerging technologies that are working towards a firm specification thanks to the hard work of the W3C. The goal of Web Components is to allow developers to use HTML, CSS and JavaScript to create custom elements..

You can think of these custom elements as widgets and when discussing them, I mean things like the custom `<github-card>` element. If you have a GitHub account, [check out the <github-card> demo page](http://pazguille.github.io/github-card/ "go to <github-card> demo page"), add your name in the field so you can review the end result, then [read the <github-card> documentation](https://github.com/pazguille/github-card "go to <github-card> GitHub documentation") so you can see how to add it to your page using one simple page tag.

Web Components are a concept that's made up of four sub-concepts:

1. *__Templates__*: a chunk of formatted HTML that can be cloned, inserted and rendered based on instructions you give it. [Read more &raquo;](http://www.html5rocks.com/en/tutorials/webcomponents/template/) 
2. *__Shadow DOM__*: an encapsulated separate DOM that you can add code to. It's best to think of it as "a DOM within your DOM." [Read more &raquo;](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/)
3. *__Custom Elements__*: the ability to create custom page tags, with the above-mentioned `<github-card>` tag as an example. [Read more &raquo;](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/)
4. *__HTML Imports__*: the ability to load in small pieces of HTML code into your page when needed. [Read more&raquo;](http://www.html5rocks.com/en/tutorials/webcomponents/imports/)

All these sub-concepts can function on their own quite nicely but when they work together, they form Web Components. Conceptually, it's best to think of them in the same way as AJAX, where a group of technologies work together towards a single task.

*(Side note: there's another sub-concept called "decorators" but lots of developers don't like it, so it's not getting a lot of focus in terms of finalizing its specification. It may disappear.)*

### Started Out By Focusing on Templates:
I've read about all of these sub-concepts (including decorators) and played with the code a bit, but the best way to learn about a piece of code is to actually write it out. So I'm in the middle of hacking out code for each sub-concept and decided to start with templates.

For the templates, I wanted to display a simple list of books based on the data in a small JavaScript Object. Things started out like this...

__index.html__
{% prism markup %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript Books</title>
  <link rel="stylesheet" href="css/normalize.min.css">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <div id="container">
    <header>
      <h1 class="page-header">JavaScript Books</h1>
      <h2>Built with templates & Shadow DOM</h1>
    </header>
    <template id="singleBook">
      <style>
        .templateArticle {
          display: inline-block;
          margin: 6px;
        }
        .btn {
          margin: 10px;
          float: right;
        }
        .thumbnail {
          margin-bottom: 0;
        }
        .bookTitleClass {
          text-align: left;
        }
        #bookTitle {
          font-style: italic;
        }
      </style>
      <article class="templateArticle panel panel-default">
        <header class="panel-heading">
          <h2 class="panel-title bookTitleClass">
            <span id="bookTitle"></span>
            <br />
            by <span id="bookAuthor"></span>
          </h2>
        </header>
        <img src="" alt="" class="thumbnail">
        <a href="" id="btnPurchase" class="btn btn-primary" role="button" target="blank">Buy at Amazon</a>
      </article>
    </template>
    <section id="allBooks" class="allBooksClass"></section>
    <script src="scripts/main.js"></script>
  </div>
</body>
</html>
{% endprism %}

__styles.css__
{% prism css %}
body {
  margin: 20px;
}
h1, h2 {
  text-align: center;
}
footer {
  text-align: center;
  margin-top: 20px;
}
.allBooksClass {
  margin-top: 30px;
  text-align: center;
}
{% endprism %}

__scripts.js__
{% prism javascript %}
(function(){

  var jsBooks = {
    "book1" : {
      "title": "Object-Oriented Javascript",
      "author": "Stoyan Stefanov",
      "image": "images/ooj.jpg",
      "amazonLink": "http://amzn.to/1sRFbEC"
    },
    "book2" : {
      "title": "Effective Javascript",
      "author": "David Herman",
      "image": "images/effectivejs.jpg",
      "amazonLink": "http://amzn.to/1pLu1A5"
    },
    "book3" : {
      "title": "JavaScript: The Good Parts",
      "author": "Douglas Crockford",
      "image": "images/goodparts.jpg",
      "amazonLink": "http://amzn.to/1ukjoIN"
    },
    "book4" : {
      "title": "Eloquent Javascript",
      "author": "Marijn Haverbeke",
      "image": "images/eloquentjavascript.jpg",
      "amazonLink": "http://amzn.to/1lPP6pn"
    }
  };
  
  var template = document.querySelector("#singleBook"),
    templateContent = template.content,
    host = document.querySelector("#allBooks"),
    root = host.createShadowRoot();

  for (key in jsBooks) {
    var title = jsBooks[key].title,
      author = jsBooks[key].author,
      image = jsBooks[key].image,
      amazonLink = jsBooks[key].amazonLink;

    templateContent.querySelector("img").src = image;
    templateContent.querySelector("img").alt 
    = templateContent.querySelector("#bookTitle").innerHTML
    = title;
    templateContent.querySelector("#bookAuthor").innerHTML = author;
    templateContent.querySelector("#btnPurchase").href = amazonLink;
    root.appendChild(document.importNode(templateContent, true));
  }
})();
{% endprism %}

`index.html` contains both `normalize.css` and the main Bootstrap CSS file. Bootstrap is providing responsive functionality, but is mostly here to make parts of the site look pretty. `styles.css` adds extra styling to page elements.

Past that, there's basic HTML but there's also the Web Component-centric `<template>` with an ID of `singleBook`. The code inside `<template>` contains HTML, some CSS inside a `<style>` tag and is also inert...meaning it doesn't render on page load and cannot communicate with any outside code.

Some parts of the `<template>` are empty:

  * the two `<span>` tags.
  * the `src` and `alt` attributes for the only `<img>` tag.
  * the `href` attribute for the only `<a>` tag.

A simple JS `for..in` loop will populate these parts based on the aforementioned JS data object. And Shadow DOM will help...

{% prism javascript %}
(function(){
...
})();
{% endprism %}

Everything's wrapped in an [IIFE](http://benalman.com/news/2010/11/immediately-invoked-function-expression/ "Read more about IIFEs").

{% prism javascript %}
var jsBooks = {
...
};
{% endprism %}

The JavaScript Object. It contains four items, each about a particular JS book.  Each item has a `title`, `author`, `image` and `amazonLink` property.

The time has come to create Shadow DOM...

{% prism javascript %}
var template = document.querySelector("#singleBook"),
  templateContent = template.content,
  host = document.querySelector("#allBooks"),
  root = host.createShadowRoot(); 
{% endprism %}

I'm creating a single var pattern to define four variables...

  * `template` is a direct DOM reference to my only template, which has an ID of `singleBook`.
  * `templateContent` is a direct reference to this template's `content` property...the page tags, their attributes. Everything.
  * `host` is a direct reference to a `<section>` tag that's already on the page and directly below the template. Once the template content has been populated, it will load into this `<section>` tag and be visible to end-users. A page element like this is commonly referred to as the "shadow host" and can have any variable name you want, but it's convention to name it "host."
  * `root` is a direct reference to what's commonly referred to as the "shadow root"...it's the template populated with the object content. Thanks to the `host.createShadowRoot()` line, I'm placing this shadow root template inside of `host` which, again, refers to the `<section>` tag already on my page and outside my template. And it can also have any variable name you want, but it's convention to name it "root."

{% prism javascript %}
for (key in jsBooks) {
...
};
{% endprism %}

A for..in loop will take all the content in the `jsBooks` object and populate it with content based on the code inside of it.  Let's start looking at that code...

{% prism javascript %}
var title = jsBooks[key].title,
  author = jsBooks[key].author,
  image = jsBooks[key].image,
  amazonLink = jsBooks[key].amazonLink;
{% endprism %}

Assign simple variable names to all the `jsBooks` object properties.

{% prism javascript %}
templateContent.querySelector("img").src = image;
{% endprism %}

Look for the `<img>` tag in the template and populate its `src` attribute with whatever the value is of the `image` property at the time of the loop.

{% prism javascript %}
templateContent.querySelector("img").alt 
  = templateContent.querySelector("#bookTitle").innerHTML
  = title;
{% endprism %}

Look for the `<img>` tag in the template and populate its `alt` attribute with whatever the value is of the `title` property at the time of the loop.

At the same time, look for the `#bookTitle` element in the template (one of the `span` tags) and populate it with whatever the value is of the `title` property is at the time of the loop.

{% prism javascript %}
templateContent.querySelector("#bookAuthor").innerHTML = author;
{% endprism %}

Look for the `#bookAuthor` element in the template (the other `span` tag) and populate it with whatever the value is of the `author` property at the time of the loop.

{% prism javascript %}
templateContent.querySelector("#btnPurchase").href = amazonLink;
{% endprism %}

Look for the `#btnPurchase` element in the template (the only `a` tag) and populate its `href` attribute with whatever the value is of the current `amazonLink` property at the time of the loop.

{% prism javascript %}
root.appendChild(document.importNode(templateContent, true));
{% endprism %}

Okay, we need to spend some time talking about this line of code...

All our object data is inside the template and represented by the `templateContent` variable. But this is what was returned as the previously-mentioned document fragment.

The document fragment isn't part of the page DOM and, in this case, needs to be treated as an external document. The `document.importNode()` method can duplicate content from external documents and by passing the `deep` parameter, we're making sure to copy <em>everything</em> inside of it.

From there, we're treating the `root` as a parent element and appending (i.e., "adding") a child inside of it. The child we're adding is the template content we just brought over with `document.importNode()`.

*(Side note: `document.importNode()` is cool...[read more about it over on MDN](https://developer.mozilla.org/en-US/docs/Web/API/document.importNode.))*

So when reviewing `index.html` in a browser it should look like the demo. And if you do an "Inspect Element" check and look in the `<section>` tag (the shadow host), you'll see the template content (the shadow root).

<img src="/img/shadow-root.png" alt="The shadow host in the shadow root">

But there's a problem: Bootstrap styles that are applied to certain elements inside of `<template>` are being ignored...anything class names containing the word `panel` or `btn`.

### Import the styles.
The solution is to use `@import` to bring in the styles.

{% prism css %}
<style>
  @import url("css/bootstrap.min.css");
  @import url("css/normalize.min.css");
...
</style>
{% endprism %}