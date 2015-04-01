---
title: "10 CSS Development Trends Resources You Need To Read & Watch"
comments: true
author: Kai Gittens
layout: post
meta-excerpt: A list of links to articles & videos that discuss exciting trends in CSS development. 10 core links and many honorable mention links.
permalink: /css-trends-list/
category: coding-best-practices
cat-name: "Code Tips"
has-home-img: css-trends.jpg
tags: [css]
---
There were a *lot* of great articles and videos on CSS development in 2014 and 2015. A wide array of topics were covered, with performance and build processes being the most popular ones.

As a group, they indicate that how we write and ship CSS is changing and employers will want to see that potential hires have a better-than-basic understanding of them. Here's 10 core links (and a few honorable mention ones) to start your education.

<h2 style="clear:both;"> 1. Addy Osmani: *CSS Performance Tooling* Talk at CSSconf EU 2014</h2>
<div class="video-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/FEs2jgZBaQA" frameborder="0" allowfullscreen></iframe>
</div>CSS trends currently making their way through the web development community: uncss, critical path, etc. Addy Osmani at Google has done a great job of educating other developers on performance and continues to do so with this talk.

## 2. *Custom CSS Preprocessing* by Nicolas Gallagher ([link](http://nicolasgallagher.com/custom-css-preprocessing "Read Custom CSS Preprocessing* by Nicolas Gallagher"/))
OK...a bit of a rant:

Sass was a CSS preprocessor written in Ruby and was the first preprocessor to become popular. Sass was a CSS preprocessor written in JavaScript and as a result, the JS community started to prefer it over Sass, particularly in the build-out process.

Compass added an extra layer of abstraction and a powerful sprite engine, all of which made non-developers really REALLY happy. And then more preprocessors like Myth and Stylus came out, each garnering their own fans.

As great as all these are, most of us never use all their features. Variables, mixins and color functions are commonplace, but the more unreadable features are pain to use and even forbidden from use in some web shops, particularly `extends`.

A current trend is to create your own (usually) Node-based preprocessing solution, where you write a custom preprocessor bringing in only the features you need.