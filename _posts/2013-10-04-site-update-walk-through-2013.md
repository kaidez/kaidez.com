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
After five months and a little less then 2,000 Git commits, kaidez.com gets a redesign. It was a struggle mostly due to the lack of free time, but was also fun as hell and an *incredible* learning experience.

This site's code is completely open source and [freely available on GitHub][1]. The repo includes a [pretty lengthy README][2] that gives a high-level look at the site's functionality.

But the README is verbose so a simpler functionality walk-through is probably required, so let's proceed:

## Goodbye WordPress...
My initial plan to design the site on top of WordPress, minimizing WordPress' overall role. WordPress was to manage the back-end: storing data, implementing security, SQL optimization, etc.

This plan was based around my primary goal: create and manage all of the front-end code, especially the JavaScript.  But because of how WordPress works, I was unable to exert the level of control over the JavaScript that I wanted to (more about this in a future blog post).

Truthfully? I could have lived with the way WordPress did things with JavaScript and was just being anal-retentive.  Still, I was anal-retentive and needed to move away from WordPress. 

## ...Hello Jekyll &amp; Liquid
If you're around GitHub enough, you've heard of [Jekyll][3], the blog-aware static site generator. [GitHub Pages][4] (which powers GitHub-hosted blogs) provides its underlying page structure.

I've created HTML site templates that are applied to all the site content.  These templates contained [Liquid markup][5], a pretty powerful templating language with some logic under its hood. All blog post pages are created in [Markdown][6].

Whenever I run `jekyll build` from the command line, Jekyll compiles a static, production-ready copy of the site. The logic created by the HTML templates and Liquid markup generate content the way I want to.

So static site content is generated in ways that were once not possible unless some sort of back-end database did the heavy lifting. Some examples:

* the Liquid logic displays posts on home page displays posts in a very specific way (more on this in a future blog post).
* a pagination structure is generated, which is good for SEO.
* category-specific pages are generated.
* an RSS/XML file is created.
* a short list of related posts embeds itself on individual post pages.

Ruby is a hard dependency for both Jekyll and Liquid and this site does use a few Ruby-based plugins: one for generating an [XML Sitemap][7] for the search engines and one used in conjunction with [Lea Verou's][8] excellent [Prism syntax highlighter plugin][9]. But the Jekyll/Liquid combination is really doing the work of prepping this site for deployment.

The end result of all this is that kaidez.com is very light in terms of site weight.  There are no SQL requests and script parsing going on behind the scenes, so things load really fast. Pages running ads and the Disqus commenting system slow things down in some spots, but overall site-load is still quite minimal.

As happy as I am with Jekyll, please note that walking away from WordPress was not easy. WordPress did a lot of work via its related plugins...work that I now have to do on my own.

Also, Jekyll is geared towards the blogger that likes to write code and probably not a client solution. WordPress, Drupal, SiteCore and Joomla are still best of breed in these arena.

Jekyll is definitely increasing in popularity: I'm guessing this is due to the fact that [Jekyll can create a site that can be hosted for free on GitHub][10]. Also, Jekyll's attracting [lots of contributors][11] that are working together to make the platform better

But in all fairness there are other options in terms of static site generators. [Dave Rupert][12] put together [a short list of static site generators in the form of a GitHub Gist that was extended by commenters][13]. And in the .NET realm, there's lots of community action around Pretzel...check out [Pretzel's Github repo][14] but surfing around its [Trello Board][15] is also a good idea.

## Mobile First


[1]: https://github.com/kaidez/kaidez.com/
[2]: https://github.com/kaidez/kaidez.com/blob/master/README.md
[3]: http://jekyllrb.com/
[4]: http://pages.github.com/
[5]: http://wiki.shopify.com/Liquid
[6]: http://daringfireball.net/projects/markdown/
[7]: http://davidensinger.com/2013/03/generating-a-sitemap-in-jekyll-without-a-plugin/
[8]: http://lea.verou.me/
[9]: http://prismjs.com/
[10]: https://help.github.com/articles/setting-up-a-custom-domain-with-pages
[11]: https://github.com/mojombo/jekyll/graphs/contributors
[12]: http://daverupert.com/
[13]: https://gist.github.com/davatron5000/2254924
[14]: https://github.com/Code52/pretzel
[15]: https://trello.com/b/2IUErvJ2/pretzel
