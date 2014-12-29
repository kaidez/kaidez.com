---
title: "TUTORIAL: Filter Content On A Click With jQuery"
comments: true
author: Kai Gittens
layout: post
meta-excerpt: Use jQuery.filter(), jQuery :not(), jQuery :contains and data attributes to filter out categorized content on a click. Includes a code demo.
permalink: /filter-categories-jquery/
category: tutorials
cat-name: "Tutorials"
has-home-img: effective-js.jpg
tags: [jquery, javascript data attributes]
---
A recent personal project required that content in a certain category be removed on a link click. So if the page has two groups of content, clicking on one link would filter out the first group, displaying that first group while removing the second one.

Armed with [my recent knowledge of data attributes](/load-data-attributes-mouseclicks/ "Read kaidez's blog post on loading in page content with data attributes"), I solved the problem using it along with a handful of jQuery methods: `jQuery.filter()`, `jQuery :not()` and `jQuery :contains`. There are probably a few different ways to solve this problem but this is how I did it.
