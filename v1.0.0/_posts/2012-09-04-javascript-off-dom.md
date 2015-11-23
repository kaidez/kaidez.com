---
title: 'SCREENCAST TUTORIAL: Using JavaScript Off-DOM'
comments: true
author: Kai Gittens
layout: post
meta-excerpt: How to create/change page elements off-DOM with JavaScript. Discusses createDocumentFragment, cloneNode, appendChild, jQuery .attr() & more.
permalink: /javascript-off-dom/
category: tutorials
cat-name: "Tutorials"
has-thumbnail: jsLogo.png
tags: [javascript,  screencast, tute]
---
  
Using JavaScript off-DOM is an efficient way to manipulate web page content. By “work off-DOM,” I mean “work inside of the browser memory instead of on a web page.”

A simple web search will display lots of good reasons for doing off-DOM JS. In my case, I was working on a personal project where it looked like I would need to do it so I could set my page up in a specific way. I may not need to do this anymore but still gained knowledge on doing off-DOM JavaScript and want to share what I learned.

The spark for my learning this stuff was Paul Irish’s excellent screencast, [“HTML5, CSS3, and DOM Performance”][1], recorded a little over a year ago from this post. I also read a ton of articles and blog posts on the subject and, of course, wrote some code to test things out. I share all this stuff in this three-part screencast tutorial.

 [1]: http://www.youtube.com/watch?v=q_O9_C2ZjoA

I do the following in this screencast:

*   create a document fragment off-DOM with `createDocumentFragment()`.
*   create a bunch of web page elements off-DOM with `createElement()` and `createTextNode()`.
*   arrange them the way I want to arrange them with `appendChild()`, `innerHTML` and the jQuery `.attr()` method.
*   load them into a document fragment with `appendChild()`.
*   load the document fragment onto the web page with, yet again, `appendChild()`.
*   duplicate the content that was just loaded on the page with `cloneNode()`.
*   adjust the duplicate content with the JavaScript stuff just discussed as well as `childNodes[]`.
*   load the duplicate content onto a web page with, one more time, `appendChild()`.

While certain aspects of this tutorial are for the beginner, I am assuming that you understand JavaScript variables and arrays…arrays especially. Please read up on them over at MDN if you don’t…variables link [here][2], arrays link [here][3].

 [2]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Statements/var
 [3]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array

I used a slide deck in this screencast, which has a boatload of useful links at the end…view it [here][4]. 

 [4]: http://slides.kaidez.com/work-off-dom/

And, of course, the tutorial’s final code on GitHub is [here][5].

 [5]: https://github.com/kaidez/work-off-dom-tutorial

ENJOY!!!

### Part 1
<iframe width="560" height="315" src="//www.youtube.com/embed/WhQbz1Zn72Y" frameborder="0" allowfullscreen></iframe>

### Part 2
<iframe width="560" height="315" src="//www.youtube.com/embed/dGC-YAxD4pw" frameborder="0" allowfullscreen></iframe>

### Part 3
<iframe width="560" height="315" src="//www.youtube.com/embed/MUvnKrXHwwk" frameborder="0" allowfullscreen></iframe>