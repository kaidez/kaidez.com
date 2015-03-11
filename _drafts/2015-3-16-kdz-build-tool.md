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
2. [he Situation](#the-situation)
3. [Proper naming of data attributes](#proper-naming-data attributes)
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

I had a project at work where I basically had to create a single page website using the typical HTML/CSS/JavaScript web stack.
