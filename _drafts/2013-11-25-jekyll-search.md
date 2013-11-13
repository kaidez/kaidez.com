---
title: 'TUTORIAL: Custom Search In Jekyll'
comments: true
author: Kai Gittens
layout: post
meta-excerpt: Create jQuery-powered search functionality in a Jekyll site & create fallback search functionality if JavaScript and/or CSS is disabled.
permalink: /custom-jekyll-search/
category: tutorials
cat-name: "Tutorials"
has-home-img: require-wordpress.jpg
tags: [jekyll, accessibility, javascript, tute]
---  
[Jekyll](http://jekyllrb.com/ "Go to the Jekyll blog engine site") generates static sites and not database-driven sites. This means that it can't provide the custom search functionality provided by content management systems like WordPress and Drupal.

A common solution to this problem is to create custom search functionality powered by either JavaScript or jQuery, but none of these solutions will work if the end-user disables JavaScript. This can create accessibility issues; therefore, this tutorial walks through how to create a Jekyll custom search with a fallback for situations where not only JavaScript is disabled, but also CSS.

## Table of Contents
1. [Assumptions &amp; Notes](#assumptions-notes)
2. [The Various Versions Of Google CSE We Can Use For Our Fallback Code](#fallback-code)

<a name="assumptions-notes"></a>
## Assumptions &amp; Notes

I'm assuming that you've got Jekyll already installed on your machine. If you don't, [the Jekyll installation documentation](http://jekyllrb.com/docs/installation/) thoroughly walks through the process.

Some notes...

The fallback code used in this tutorial is provided by [Google Custom Search Engine](https://www.google.com/cse/ "Learn about Google Custom Search Engine") which comes in a few versions. This site currently uses an older version that Google still supports but I'm using different form attributes in some places. The version that Google currently recommends loads in the searchbox code faster and is highly customizable, but doesn't provide the user experience I wanted to create.  I go through all this versions in the next section, showing you the pros and cons for each and allowing you to make your own choice.

The proper way to test this code is to disable both JavaScript and CSS are __BEFORE__ the code runs in a browser.  For this, I found that using [Chris Pederick's Web Developer extension](http://chrispederick.com/work/web-developer/ "Get Chris Pederick's Web Developer extension") in Firefox was the best way to initially test, then doing  a full test in the other browsers. The Web Developer extension does work in Chrome and Opera but it reloads the page after you use it to disable JavaScript and CSS, which is not what you want. 


This tutorial is based on my implementing the [Tipue search jQuery plugin](http://www.tipue.com/search/ "Read more about Tipue Search") when I redesigned my site and while I'm very happy with it, I'm not suggesting that you use it yourself. The point of the tutorial is to teach you how to create JavaScript-powered search for a Jekyll site and to create fallback search functionality if JavaScript and/or CSS is disabled, not push you towards the search solution I like. I list soon other search solutions towards the end of this post.

You may read this and some point and say "Isn't it easier to just use `<noscript>` for the fallback code?". No, because it doesn't always work and if you're coding in XHTML instead of HTML5, it won't work at all. [The W3C HTML5 specification is clear about all this](http://www.w3.org/html/wg/drafts/html/master/scripting-1.html#the-noscript-element "Read the noscript section of the HTML5 specification").

<a name="fallback-code"></a>
## The Various Versions Of Google CSE We Can Use For Our Fallback Code
First, let's setup the search functionality that will run if either JavaScript or CSS is disabled.


CSE UPDATE: http://googlecustomsearch.blogspot.com/2012/08/introducing-custom-search-element-v2.html
