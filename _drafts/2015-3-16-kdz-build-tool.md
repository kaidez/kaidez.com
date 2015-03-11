---
title: "kdz - My Personal Scaffolding Tool"
comments: true
author: Kai Gittens
layout: post
meta-excerpt: kaidez used Node to create a tool for scaffolding out web development projects. Includes a link to thoroughly commented code on GitHub.
permalink: /kdz-node-build-tool/
category: coding-best-practices
cat-name: "Code Tips"
has-home-img: kdz-header.jpg
tags: [javascript, node, kaidez]
---
After doing a set of web development projects, I came up with some best practices that I knew I would use over and over again. And I also knew that I needed to come up with an easy way to apply these practices to any future projects.

After trying a few different approaches, I solved the problem by creating a Node-based scaffolding tool to be used at the command line level. I'm also being cute about all this and naming the tool based on my hacker alias, calling it "kdz".

## Table of Contents
1. [This is not a tutorial](#not-a-tutorial)
2. [The Situation](#the-situation)
3. [The Problem](#the-problem)
4. [Store the data attributes in a link](#store-data attributes-link)
5. [Store the data attributes in multiple links](#store-data attributes-multiple-link)
6. [Use "getAttribute()" as fallback code for "dataset"](#getattribute-fallback)
7. [Conclusion](#conclusion)

<a name="not-a-tutorial"></a>
## This is not a tutorial

To be clear, this is not a tutorial. I may do tutorials on certain parts of the code in the future but for now, this is just my documenting my approach to solving a problem.

[The code is thoroughly commented code on GitHub](https://github.com/kaidez/kdz "See the kdz code on GitHub") and you can feel free to ask me questions about it either on Twitter or as a post comment. You would want to look at the npm modules in both the ["config" folder](https://github.com/kaidez/kdz/tree/master/config "review the npm code modules for kdz) as well as[ the core `kdz.js` file](https://github.com/kaidez/kdz/blob/master/kdz.js "Review the core "kdz.js" file).

<a name="the-situation"></a>
## The Situation

I had a project at work where I basically had to create a single page website using a standard HTML/CSS/JavaScript web stack. Here's how the enviroment was configured:

* [Jade](http://jade-lang.com/ "Review the Jade HTML template engine") was used for HTML pre-processing.
* [LESS](http://lesscss.org/ "Review the LESS pre-processor") was used for CSS pre-processing.
* [CoffeeScript](http://coffeescript.org/ "Review the CoffeeScript JS pre-processor") was used for JavaScript pre-processing.
* [Bower](http://bower.io/ "Review the Bower web package manager") was used to managed browser-level dependencies via a `bower.json` file.
* [npm](https://www.npmjs.com/ "Review the npm package manager for Node") was used to managed development-task dependencies via a `package.json` file.
* [Grunt](http://gruntjs.com/ "Review the Grunt task runnder") and [Gulp](http://gulpjs.com/ "Review the Gulp build system") were used to automate processes related to the items above.

While all these things above do different things,

<a name="the-problem"></a>
## The Problem
