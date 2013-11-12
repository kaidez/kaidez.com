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

<a name="assumptions-notes"></a>
## Assumptions &amp; Notes

I'm assuming that you've got Jekyll already installed on your machine. If you don't, [the Jekyll installation documentation](http://jekyllrb.com/docs/installation/) thoroughly walks through the process.

Some notes...

This tutorial is based on my implementing the [Tipue search jQuery plugin](http://www.tipue.com/search/ "Read more about Tipue Search")when I redesigned my site and while I'm very happy with it, I'm not suggesting that you use it your self. The point of the tutorial is to teach you how to create JavaScript-powered search for a Jekyll site and to create fallback search functionality if JavaScript and/or CSS is disabled.