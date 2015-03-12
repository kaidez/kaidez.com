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
I came up with some cool web development techniques after doing a bunch of web development projects, techniques based mostly around tooling.  I knew I would use the techniques and tools for future projects, and also knew that I had to find a way to easily set them up at the start of each project.

I solved the problem by creating a [Node](https://nodejs.org/ "Go to the Node site") scaffolding tool. I'm also being cute about it and naming it based on my hacker alias, calling it "kdz".

<h2 style="clear:both;">Table of Contents</h2>
1. [This is not a tutorial](#not-a-tutorial)
2. [The Situation](#the-situation)
3. [The Problem](#the-problem)
4. [More Problems](#more-problems)
5. [Store the data attributes in multiple links](#store-data attributes-multiple-link)
6. [Use "getAttribute()" as fallback code for "dataset"](#getattribute-fallback)
7. [Conclusion](#conclusion)

<a name="not-a-tutorial"></a>
## This is not a tutorial

To be clear, this is not a tutorial. I may do tutorials on certain parts of the code in the future but for now, I'm just my documenting my approach to solving a problem.

[The code is thoroughly commented code on GitHub](https://github.com/kaidez/kdz "See the kdz code on GitHub") where you can review it and also feel free to ask me questions about it either on Twitter or as a post comment. You would want to look at the modules in the [`config` folder](https://github.com/kaidez/kdz/tree/master/config "review the npm code modules for kdz") as well as [the core `kdz.js` file](https://github.com/kaidez/kdz/blob/master/kdz.js "Review the core "kdz.js" file").

<a name="the-situation"></a>
## The Situation

I had a project at work where I basically had to create a single page website using a standard HTML/CSS/JavaScript web stack. The tools in my development environment were configured like this:

* [Jade](http://jade-lang.com/ "Review the Jade HTML template engine") was used for HTML pre-processing.
* [LESS](http://lesscss.org/ "Review the LESS pre-processor") was used for CSS pre-processing.
* [CoffeeScript](http://coffeescript.org/ "Review the CoffeeScript JS pre-processor") was used for JavaScript pre-processing.
* I used the core CSS file that comes with [Twitter Bootstrap](http://getbootstrap.com/ "Review Twitter Bootstrap") because it makes me very productive inside my dev environment with it while building a responsive web design.
* [Bower](http://bower.io/ "Review the Bower web package manager") was used to managed browser-level dependencies via a `bower.json` file.
* [npm](https://www.npmjs.com/ "Review the npm package manager for Node") was used to managed development-level dependencies via a `package.json` file.
* [Grunt](http://gruntjs.com/ "Review the Grunt task runner") and [Gulp](http://gulpjs.com/ "Review the Gulp build system") were used to automate tasks related to the things above, including building out the final page.

I was at an EXTREMELY high comfort level with these tools when I started the project. I had used them a lot previously and understood what it took to configure them to the point that they worked well as a team.

This was especially true of the CSS, which was (mostly) centered around Gulp. I was able to use all the tools to create an efficient process for generating a single CSS file...linting, minifying, concatenating, etc.

In fact, I hit a point where I felt compelled to tweet this...

<blockquote class="twitter-tweet" lang="en" style="margin: 0 auto;"><p>Got my Gulp CSS build-out process working EXACTLY the way I want it to…only took 3 weeks.</p>&mdash; kai gittens (@kaidez) <a href="https://twitter.com/kaidez/status/529054310379053056">November 2, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

There was a rush to launch this project and as a result, things were launched when the code was "good enough," but "not as good as it could've been." It was obvious that some things needed refactoring.

There was no time to refactor it during work hours due to other projects on my team's plate, so I decided to refactor the bad code parts on my own time. And since I had already used these tools to create a productive dev environment for the actual project, I decide to reuse the same tooling/environment setup for the refactor.

<a name="the-problem"></a>
## The Problem
Recreating this setup was a pain in the a**. Since I was only refactoring parts of the site code and not the whole site itself, not every part was needed.

For example: I didn't need all the dependencies listed in the `package.json` and `bower.json` files. I just needed the ones related to the code pieces I was refactoring, so I had to spend some time removing the listed dependencies.

OK...that was more of an inconvenience than a pain in the a**. But setting up the CSS build again? That sucked.

Again, I'm a fan of how well Bootstrap does responsive web design and I based my LESS setup around that. My `.less` files were named based on Bootstraps's pre-defined set of media queries.

So since Bootstrap has a media query called `@media (min-width: 1200px)`, I have a file called `min-width-1200.less` that contains the following code:

{% prism css %}
@media (min-width: 1200px) {
  // code is already here
}
{% endprism %}

And since it also has a media query called `@media screen and (min-width: 768px)`, I have a file called `screen-and-min-width-768.less` that contains the following code:

{% prism css %}
@media screen and (min-width: 768px) {
  // code is already here
}
{% endprism %}

You get the idea...

This was the LESS setup for the project and as with the `package.json` and `bower.json` files, they needed to be setup differently for the refactor. I started redoing the `.less` files like I did with the `.json` files and while redoing the `.json` dependencies was a manageable inconvenience, redoing the style setup was a mind-numbing experience.

I knew I had to create a standard template for all this stuff. So I took notes on the tooling while doing the refactor and when it was finished, I started to create the template.

<a name="more-problems"></a>
## More Problems
The template started off as a bunch files in GitHub repo. It contained the `.less` and `.json` files, and other things like the Grunt and Gulp files, and a `.gitignore` file.

Another set of problems soon appeared:

* setting up this project from the repo wasn't really convenient. I could `git clone` it but that would download a folder with the files and not just files themselves. I would then either have the rename the folder to match the project or copy the files to another folder...doable but not convenient.

* The template contained LESS files but I knew there would be instances where I would need to use another pre-processor. For example, [Jekyll has built-in Sass integration](http://jekyllrb.com/docs/assets/) so using [Sass](http://sass-lang.com/ "Review the Sass pre-processor") in that situation may make more sense.  Plus, I've been reading up on [Rework](https://github.com/reworkcss/rework) which lets you build a customizable pre-processor, so there may when I don't even need LESS or Sass.

* The template contained a `.gitignore` that listed some common files that are ignored with Git commits. But my day job requires my working in a .NET environment that contains requirements that have been codified for almost a decade. One of the chief requirements is that we manage version control with [TFS](https://www.visualstudio.com/en-us/products/tfs-overview-vs.aspx "Review Microft's Team Foundation Server") instead of Git.

* The template was configured really well for single page applications (SPAs), but I do a fair amount of WordPress work as well.  The template wasn't really set up for that: some Gulp/Grunt plugins wouldn't work the way I needed them to, the CSS needed a slightly difference build-out process in some spots and `.gitignore` needed a few more files added to it.

So a downloadable template wouldn't work because it would be too opinionated. It assumed that every project required the same tooling setup when that obviously wasn't true.

It was clear that I had to find a way to programmatically scaffold each project so I could configure based on a passed (or not-passed) set of options. [Yeoman](http://yeoman.io/) is the current popular scaffolding app and I could have spent some time searching through [Yeoman's generators](http://yeoman.io/generators/ "Review Yeoman's generators") to find what I need.

But what I wanted was too specific so I doubted the generators would have what I needed. Plus, I wanted to see if I could use Node to build it myself.
