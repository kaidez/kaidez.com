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

Web Components is a concept based on four sub-concepts, but I focused on just two of them for the demo: templates and Shadow DOM, primarily templates. At the time of this post, a neat cross-browser/cross-device implementation of Web Components requires a polyfill library like [Polymer](http://www.polymer-project.org/ "visit the Polymer Web Components Library") or [X-Tag](http://x-tags.org/ "visit the X-tag Web Components Library"), but I wanted to study the internal workings of each sub-concept before a deep dive into the polyfills. 

### A quick Web Components description
Web Components are a set of emerging technologies that are working towards a firm specification thanks to the hard work of the W3C. The goal of Web Components is to allow developers to use HTML, CSS and JavaScript to create custom elements.

You can think of these custom elements as widgets and by this, I mean things like the custom `<github-card>` element. If you have a GitHub account, [check out the &lt;github-card> demo page](http://pazguille.github.io/github-card/ "go to <github-card> demo page"), add your name in the field so you can review the end result, then [read the &lt;github-card> documentation](https://github.com/pazguille/github-card "go to <github-card> GitHub documentation") so you can see how to add it to your page using one simple page tag.

Web Components are a concept made up of four sub-concepts *(all links courtesy of [HTML5 Rocks](http://www.html5rocks.com/)):*

1. *__Templates__*: a chunk of formatted HTML that can be cloned, inserted and rendered based on instructions you give it. [Read more &raquo;](http://www.html5rocks.com/en/tutorials/webcomponents/template/) 
2. *__Shadow DOM__*: an encapsulated separate DOM that you can add code to. It's best to think of it as "a DOM within your DOM." [Read more &raquo;](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/)
3. *__Custom Elements__*: the ability to create custom page tags, with the above-mentioned `<github-card>` tag as an example. [Read more &raquo;](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/)
4. *__HTML Imports__*: the ability to load in small pieces of HTML code into your page when needed. [Read more&raquo;](http://www.html5rocks.com/en/tutorials/webcomponents/imports/)

All these sub-concepts can function on their own quite nicely but when they work together, they form Web Components. Conceptually, it's best to think of them in the same way as AJAX, where a group of technologies work together towards a single task.

*(Side note: there's another sub-concept called "decorators" but lots of developers don't like it, so it's not getting a lot of focus in terms of finalizing its specification. It may disappear.)*

### Started out by focusing on templates...mostly
I've read about all of these sub-concepts (including decorators) and played with the code a bit, but the best way to learn about a piece of code is to actually write it out. So I'm in the middle of hacking out code for each sub-concept, and I'm starting with templates.

For the templates, I wanted to display a simple list of books based on a small JavaScript data object. Things started out like this...

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

`index.html` contains both `normalize.css` and the main Twitter Bootstrap CSS file. Bootstrap is providing responsive functionality, but is mostly here to make parts of the site look pretty. `styles.css` adds extra styling to page elements.

Past that, there's basic HTML but there's also the Web Component-centric `<template>` with an ID of `singleBook`. The code inside `<template>` contains HTML, some CSS inside a `<style>` tag.

The template tag is also inert...meaning it doesn't render on page load and cannot communicate with any outside code.

Some parts of the `<template>` are empty:

  * the two `<span>` tags.
  * the `src` and `alt` attributes for the only `<img>` tag.
  * the `href` attribute for the only `<a>` tag.

A simple JS `for...in` loop will populate these parts based on the aforementioned JS data object. And Shadow DOM will help...

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

The JavaScript object. It contains four items, each about a particular JS book.  Each item has a `title`, `author`, `image` and `amazonLink` property.

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
  * `root` is a direct reference to what's commonly referred to as the "shadow root"...it's the template populated with the object content. Thanks to the `host.createShadowRoot()` line, I'm placing this shadow root template inside of `host`, which, again, refers to the `<section>` tag already on my page and outside my template. And it can also have any variable name you want, but it's convention to name it "root."

{% prism javascript %}
for (key in jsBooks) {
...
};
{% endprism %}

A for...in loop will take all the content in the `jsBooks` object and populate it with content based on the code inside of it.  Let's start looking at that code...

{% prism javascript %}
var title = jsBooks[key].title,
  author = jsBooks[key].author,
  image = jsBooks[key].image,
  amazonLink = jsBooks[key].amazonLink;
{% endprism %}

Assign simple variable references to all the `jsBooks` object properties.

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

*(Side note: `document.importNode()` is cool...[read more about it over on MDN](https://developer.mozilla.org/en-US/docs/Web/API/document.importNode)).*

And if we review index.html in Chrome 36 or higher with the "Show user agent shadow DOM" box checked, it should look (almost) like the demo. And if we then do an "Inspect Element" check and look in the `<section>` tag (which is the shadow host), you'll see the template content (which is the shadow root).

<img src="/img/shadow-root.png" class="imgBorderMaxWidth" alt="The shadow host in the shadow root">

But there's a problem: Bootstrap styles that are applied to certain elements inside of `<template>` are being ignored.  Anything class names containing the word `panel` or `btn` should have well-recognized Bootstrap styles, especially the buttons.

<img src="/img/pageScreenshot.jpg" class="imgBorderMaxWidth" alt="homepage screenshot with no Bootstrap styling">

This is happening because, as mentioned above, the code inside `<template>` can't communicate with any outside code and, technically speaking, `<template>` is in the Shadow DOM, which is naturally-encapsulated. So none of the page's three stylesheets (`normalize.min.css`, `bootstrap.min.css` and `styles.css`) can affect the template's layout. And for now, adding stylesheets to templates using `<link>` isn't allowed.


### Import the styles
`styles.css` doesn't need to interact with the layout but the other two have to.  The solution is to use `@import` inside the template's `<style>` tag to bring both of them in:

{% prism css %}
<style>
  @import url("css/normalize.min.css");
  @import url("css/bootstrap.min.css");
...
</style>
{% endprism %}

Using `@import` is frowned upon from a performance standpoint, but it's how this particular problem gets solved. And as Google's Rob Dodson points out in his [excellent Web Components article](http://css-tricks.com/modular-future-web-components/), using Polymer avoids doing this by bringing in the stylesheets using XHR requests.

But there's another problem: by doing deep clones of template content for each iteration of the loop, the `<style>` tag is getting copied four times when it only needs to be copied once.

<img src="/img/shadow-root-02.png" class="imgBorderMaxWidth" alt="The shadow host in the shadow root">

### Adjust the loop
This can be fixed by changing the loop procedure...deep-copy and append <em>just</em> the `<article>` tags by referring to their "templateArticle" class for each single loop iteration, then append the `<style>` tag immediately <em>outside</em> the loop. This requires changing the end of JS code from this...


{% prism javascript %}
(function(){
...
    root.appendChild(document.importNode(templateContent, true));
  }
})();
{% endprism %}


...to this


{% prism javascript %}
(function(){
...
    root.appendChild(document.importNode(templateContent.querySelector(".templateArticle"), true));
  }
  root.appendChild(document.importNode(templateContent.querySelector("style"), true));
})();
{% endprism %}

And now there's only one style tag inside the shadow root and it's properly applying the styles.

<img src="/img/shadow-root-03.png" class="imgBorderMaxWidth" alt="The shadow host in the shadow root">

Because the code uses `append()`, the style tag is placed at the bottom of the shadow host.  If this were live production code I was working on, I would (probably) use something like `jQuery.prepend()` to place it at the top.

But placing it at the bottom doesn't affect what I wanted to accomplish with this project, which was to learn how this stuff works. Still, read more about `jQuery.prepend()` [here](http://api.jquery.com/prepend/).

### Further reading

There are links above to a Rob Dodson article and a group of links to various articles over on HTML5 Rocks. The Dodson article provides a great high-level view of Web Components so if you're at the early stages of discovering them, I would read that one first...the HTML5 Rocks articles next.


The W3C has an older article called [Introduction to Web Components](http://www.w3.org/TR/2013/WD-components-intro-20130606/). It's a working draft and is over a year old based on this post's publish date but is still another high-level view that's slightly more technical....read it with caution though.

Truthfully, the W3C has been referring people to the [Web Components Wiki](http://www.w3.org/wiki/WebComponents/) lately so you may want to review that.  It points to the HTML5 Rocks links and the specs for [Shadow DOM](http://w3c.github.io/webcomponents/spec/shadow/ "Read the Shadow DOM specification"), [Custom Elements](http://w3c.github.io/webcomponents/spec/custom/ "Read the Shadow Custom Elements specification") and [HTML Imports](http://w3c.github.io/webcomponents/spec/imports/ "Read the HTML Imports specification"). The WHATWG has the proper version of [the Template spec](http://www.whatwg.org/specs/web-apps/current-work/multipage/scripting.html#the-template-element).

Specs may be verbose to read at times, but it's always a good idea to read them.

Most profoundly, take note that IE has made no firm decision on what Web Component features they will and will not support at the time of this post's publish date. I'm assuming that will change in the future though...read more on the [modern.ie status page](http://status.modern.ie/?iestatuses=underconsideration&browserstatuses=notsupported,indevelopment,implemented&browsers=chrome,firefox,opera,safari&ieversion=11).

Finally, take note that Polymer is the most popular Web Component polyfill for now, but only supports IE 10 and up.  Read more on [Polymer's Browser Compatibility page](http://www.polymer-project.org/resources/compatibility.html).

X-Tag isn't as feature-rich as Polymer but supports a wider array of browsers, including IE 9 and up. Read more on [X-Tag's Docs page](http://x-tags.org/docs).

### Conclusion
Using something like Polymer or X-Tag is what's needed to use Web Components in production-level code, but these libraries work ON TOP of Web Components. So it's best to learn the underlying code first.

I can't say that my code is perfect, but I achieved the goal I set for myself and was able to solve any problems I faced by actually writing the code instead of just reading about it. I have a much better handle in templates and Shadow DOM then I did before, and that's enough for me right now.

