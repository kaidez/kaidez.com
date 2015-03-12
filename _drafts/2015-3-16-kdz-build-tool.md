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

I solved the problem by creating a Node-based scaffolding tool to be used at the command line level. I'm also being cute about all this and naming the tool based on my hacker alias, calling it "kdz".

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

[The code is thoroughly commented code on GitHub](https://github.com/kaidez/kdz "See the kdz code on GitHub") and you can feel free to ask me questions about it either on Twitter or as a post comment. You would want to look at the npm modules in both the ["config" folder](https://github.com/kaidez/kdz/tree/master/config "review the npm code modules for kdz") as well as [the core `kdz.js` file](https://github.com/kaidez/kdz/blob/master/kdz.js "Review the core "kdz.js" file").

<a name="the-situation"></a>
## The Situation

I had a project at work where I basically had to create a single page website using a standard HTML/CSS/JavaScript web stack. My development environment was configured like this:

* [Jade](http://jade-lang.com/ "Review the Jade HTML template engine") was used for HTML pre-processing.
* [LESS](http://lesscss.org/ "Review the LESS pre-processor") was used for CSS pre-processing.
* [CoffeeScript](http://coffeescript.org/ "Review the CoffeeScript JS pre-processor") was used for JavaScript pre-processing.
* I used the core CSS file that comes with [Twitter Bootstrap](http://getbootstrap.com/ "Review Twitter Bootstrap") because I find myself to very productive with it while constructing responsive web design.
* [Bower](http://bower.io/ "Review the Bower web package manager") was used to managed browser-level dependencies via a `bower.json` file.
* [npm](https://www.npmjs.com/ "Review the npm package manager for Node") was used to managed development-level dependencies via a `package.json` file.
* [Grunt](http://gruntjs.com/ "Review the Grunt task runner") and [Gulp](http://gulpjs.com/ "Review the Gulp build system") were used to automate processes related to the items above, including building out the final page.

I was at an EXTREMELY high comfort level with these tools when I started the project. I had used them a lot prior to starting and was able to configure them all to the point that they worked well as a team.

This was especially true of the CSS, which was (mostly) centered around Gulp. I was able to use all the tools to create an efficient process for generating a single CSS file...linting, minifying, concatenating, etc.

In fact, I felt compelled to tweet this...

<blockquote class="twitter-tweet" lang="en"><p>Got my Gulp CSS build-out process working EXACTLY the way I want it to…only took 3 weeks.</p>&mdash; kai gittens (@kaidez) <a href="https://twitter.com/kaidez/status/529054310379053056">November 2, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

There was a rush to ship this project and as a result, things got deployed when the code was "good enough," but "not as good as it could've been." It was obvious that some things needed refactoring.

There was no time to refactor it during work hours due to other projects on my team's plate, so I decided to refactor the bad code parts on my own time. And since I had already used these tools to create a productive dev environment for the project, I decide to reuse the same tooling/environment setup for the refactor.

<a name="the-problem"></a>
## The Problem
Recreating the setup was a pain in the a**. Since I was only refactoring parts of the site code and not the whole site itself, not every part was needed.

For example: I didn't need all the dependencies listed in the `package.json` and `bower.json` files. I just needed the ones related to the code pieces I was refactoring, so I had to spend some time adjusting those files.

OK...that was more of an inconvenience than a pain in the a**. But setting up the CSS build again? That sucked.

Again, I'm a fan of how well Bootstrap does responsive web design and I based my LESS setup around that. My `.less` files were named based on media queries pre-defined by Bootstrap.

So since Bootstrap has a media query called `@media (min-width: 1200px)`, I have a file called `min-width-1200.less` that contains the following code:

{% prism css %}
@media (min-width: 1200px) {

}
{% endprism %}

And since it also has a media query called `@media screen and (min-width: 768px)`, I have a file called `screen-and-min-width-768.less` that contains the following code:

{% prism css %}
@media screen and (min-width: 768px) {

}
{% endprism %}

You get the idea...
