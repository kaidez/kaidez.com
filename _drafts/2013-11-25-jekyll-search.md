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

A common solution to this problem is to create custom search functionality powered by either JavaScript or jQuery, but none of these solutions will work if the end-user disables JavaScript. This can create accessibility issues; therefore, this tutorial walks through how to create a Jekyll custom search with a fallback if not only JavaScript is disabled, but also CSS.

## Table of Contents
1. [Assumptions &amp; Notes](#assumptions-notes)
2. [Setup Our Fallback Code First](#setup-fallback-code)

<a name="assumptions-notes"></a>
## Assumptions &amp; Notes

I'm assuming that you've got Jekyll already installed on your machine. If you don't, [the Jekyll installation documentation](http://jekyllrb.com/docs/installation/) thoroughly walks through the process.

Some notes...

The only way to test this code is to disable both JavaScript and CSS are __BEFORE__ the code runs in a browser.  You can't run the code and then disable JavaScript and CSS with something like [Chris Pederick's Web Developer extension](http://chrispederick.com/work/web-developer/ "Get Chris Pederick's Web Developer extension").

This tutorial is based on my implementing the [Tipue search jQuery plugin](http://www.tipue.com/search/ "Read more about Tipue Search") when I redesigned my site and while I'm very happy with it, I'm not suggesting that you use it yourself. The point of the tutorial is to teach you how to create JavaScript-powered search for a Jekyll site and to create fallback search functionality if JavaScript and/or CSS is disabled, not push you towards the search solution I like. I list soon other search solutions towards the end of this post.

You may read this and some point and say "Isn't it easier to just use `<noscript>` for the fallback code?". If you're writing HTML5 and are only concerned about modern browsers, 

<a name="setup-fallback-code"></a>
## Setup Our Fallback Code First
First, let's setup the search functionality that will run if either JavaScript or CSS is disabled.


<!-- <form id="cse-search-box" action="http://google.com/cse">
  <input type="hidden" name="cx" value="002415104166026759813:ndlid96e1nk" />
  <input type="hidden" name="ie" value="UTF-8" />
  <input type="text" name="q" size="31" />
  <input type="submit" name="sa" value="Search" />
</form>
<img src="http://www.google.com/cse/images/google_custom_search_smwide.gif"> -->