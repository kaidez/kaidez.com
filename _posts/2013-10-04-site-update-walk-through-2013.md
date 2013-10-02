---
title: '2013 Site Redesign'
comments: true
author: Kai Gittens
layout: post
permalink: /site-redesign-walkthrough-2013/
meta-excerpt: kaidez.com uses Jekyll as a blog engine, Grunt as a task runner, RequireJS for modular JavaScript management, & Bower for package management
category: personal
cat-name: "Personal"
tags: [jekyll, bower, requirejs, grunt]
has-home-img: site-relaunch.jpg
---
After five months and a little less then 2,000 Git commits, kaidez.com gets a redesign. It was a struggle but was also fun as hell and an *incredible* learning experience.

This site's code is open source and [freely available on GitHub][1]. The repo also includes a [pretty lengthy README][2] that gives a high-level look at the site code.

But a less verbose code walk-through may be required, so let's proceed:

## Goodbye WordPress...
My initial plan to design the site on top of WordPress, minimizing WordPress' overall role. WordPress was to manage the back-end: storing data, server configs, security, SQL optimization, etc.

My primary goal was to create and manage all of the front-end code, specifically the JavaScript.  But because of how WordPress works, I was unable to exert the control over the JavaScript the way I wanted to (more about this in a future blog post).

Truthfully? I probably could have lived with the way WordPress did things with its JavaScript and was just being anal-retentive.  Still, I was anal-retentive and needed to drop WordPress. 

## ...Hello Jekyll &amp; Liquid
If you're around GitHub enough, you've heard of [Jekyll][3], the blog-aware static site generator. [GitHub Pages][4] (which powers GitHub-hosted blogs) provides its underlying page structure, making overall site weight pretty light.

I created HTML site templates that were applied to all the site content.  These templates contained [Liquid markup][5], a pretty powerful templating language with some logic under its hood. All blog post pages are created in [Markdown][6].

Whenever I ran `jekyll build` from the command line, Jekyll built out a production-ready copy of the site based on the my templates and logic. The end-result was, I generated some pretty dynamic content out to a dynamic site, including:

* load blog posts onto the home page based on specific logic (more on this in a future blog posts).
* create category-specific pages.
* generate an XML-based RSS feed.
* load related posts onto individual post pages

Jekyll and Liquid depend on Ruby and the site does use a few Ruby-based plugins: one for generating an [XML Sitemap][7] and one used in conjunction with Lea Verou's excellent [Prism syntax highlighter plugin][8]. But the Jekyll/Liquid combination is really doing the work of prepping this site for deployment.

The end result of all this is that kaidez.com is running without the overhead of SQL requests and PHP parsing, making things load really fast. One of my pages that contains a boatload of images, Disqus commenting and ads loads up in 2.5 seconds, hitting the `domReady` event much earlier than that...all with an unprimed cache.

Jekyll is one of the most popular static site generators because of its tight integration with GitHub. But static site generators are quite popular at the time of this post and a few of them are worth mentioning:


[1]: https://github.com/kaidez/kaidez.com/
[2]: https://github.com/kaidez/kaidez.com/blob/master/README.md
[3]: http://jekyllrb.com/
[4]: http://pages.github.com/
[5]: http://wiki.shopify.com/Liquid
[6]: http://daringfireball.net/projects/markdown/
[7]: http://davidensinger.com/2013/03/generating-a-sitemap-in-jekyll-without-a-plugin/
[8]: http://prismjs.com/
