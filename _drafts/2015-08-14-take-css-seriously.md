---
title: "Start Taking CSS Seriously"
comments: true
author: Kai Gittens
layout: post
meta-excerpt: Web developers should always optimize their CSS code but far too many don’t. The rise of the mobile web has now forced them to change.
permalink: /take-css-seriously/
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

Sass was a CSS preprocessor written in Ruby and was the first preprocessor to become popular. Less was a CSS preprocessor written in JavaScript and as a result, the JS community started to prefer it over Sass, particularly in the build-out process.

Compass added an extra layer of abstraction and a powerful sprite engine, all of which made non-developers really REALLY happy. And then more preprocessors like Myth and Stylus came out, each garnering their own fans.

As great as all these are, most of us never use all their features. Variables, mixins and color functions are commonplace, but the more unreadable features are pain to use and even forbidden from use in some web shops, particularly `extends`.

A current trend is to create a (usually) Node-based preprocessing solution, writing a custom preprocessor and bringing in only the features you need. Nicolas Gallagher, creator of [Normalize.css](http://necolas.github.io/normalize.css/ "Read more about Normalize.class") wrote a great post on this subject.

The article focuses on the two most popular custom preprocessors: [Rework](https://github.com/reworkcss/rework "Read more about the Rework plugin framework for CSS preprocessing"), which refers to itself as a "plugin framework for CSS preprocessing" and [PostCss](https://github.com/postcss/postcss "Read more about the PostCss CSS-to-Js transformer"), which focuses on "transforming CSS with JS plugins." Each allow you to use Node to run any specific preprocessing rules you write and each one has a set of plugins available to it.

I don't see a majority of developers abandoning Sass, Less similar software for custom preprocessors.