---
title: "SCREENCAST: CSS Build Demo"
comments: true
author: Kai Gittens
layout: post
meta-excerpt: A demo of how to optimize CSS with Gulp, Grunt and tasks like uncss and critical path css. Has a link to fully-commented code on GitHub.
permalink: /css-build-demo/
category: coding-best-practices
cat-name: "Code Tips"
has-home-img: css-build-demo.jpg
tags: [javascript, gulp, css, screencast]
---
I interviewed a consultant once to help with some web projects at Revlon. As should be expected, I quizzed her on some various frameworks and libraries to gauge how up-to-date her skill-set was.

The subject of using [Twitter Bootstrap](http://getbootstrap.com "Read more about Twitter Bootstrap") as a tool for building responsive sites came up and she said that she didn't believe in using it, along with similar tools. She felt that they were too bloated to use in a real-world project and offered to demonstrate this to me so I had a better understanding of her opinion.

It's important to note that we hired her for the position and that she did a fantastic job. Her opinion on web dev tooling didn't hinder her performance.

If someone wants to use a flathead screwdriver to screw in a Phillips screw, the fact that they got the screw in there is all that matters.  The tools they used to get the job done is of no concern, at least, not to me.

Still, her opinion haunts me to this day. Bootstrap *is* bloated, but removing it easy with all the available web tools we have nowadays, specifically the ones in Node-land.

Most profoundly, this is not the first time I've heard this opinion...either from someone in person or online. And I wonder if enough developers are aware of how tools like [Gulp](http://gulpjs.com/ "Read more about Gulp") and [Grunt](http://gruntjs.com/ "Read more about Grunt") allow us to properly deal with issues like Bootstrap code bloat.

To raise awareness, I did a screencast to demonstrate this tooling. I use Gulp (and a little Grunt) to create a severally-optimized CSS file...which contains Bootstrap.

The tooling minifies and lints the code, and also does a swell job of handling auto-prefixing for the various browser vendors. But the highlights here are 1) the uncss task, which remove styles not in use in the site, and 2) the critical path task, which embeds above-the-fold CSS onto your page for faster rendering.

*(Note: managing critical path CSS is really REALLY new at the time of this screencast and is also recommended by Google. Read [Google's critical path discussion on their Web Developers Fundamentals page](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/ "Read Google's critical path CSS recommendations"), plus, [Addy Osmani](https://twitter.com/addyosmani "Visit Addy Osmani on Twitter") discusses it during his excellent ["CSS Performance Tooling" talk at CSSconf EU 2014](https://www.youtube.com/watch?v=FEs2jgZBaQA "Watch Addy Osmani's CSS Performance Tooling talk at CSSconf EU 2014")).*

To be clear: this is NOT a tutorial. I do review some of the code that makes up the various tasks but as this is a demo, the reviews are not as thorough when compared to my other tutorials and screencasts.

But if you want to learn more about how all this works, [view the code on GitHub](https://github.com/kaidez/build-css-demo/tree/tutorial-branch "View this tutorial's code on GitHub"). `gulpfile.js` is the key file to look at...it's well-commented and should give you a better understanding of how all this works.

You may also want to give both `Gruntfile.js` and `package.json` a peek. And if you have any questions from there, feel free to leave a comment in this blog post.

Now...view the screencast...either below or [on YouTube](https://www.youtube.com/watch?v=UDm6e7OKi4M "View this screencast on YouTube").

ENJOY!!!!!!!!

<iframe width="420" height="315" src="https://www.youtube.com/embed/UDm6e7OKi4M" frameborder="0" allowfullscreen></iframe>