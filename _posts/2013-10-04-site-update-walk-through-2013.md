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
After five months and a little less then 2,000 Git commits, kaidez.com gets a redesign. It was a struggle mostly due to the lack of free time, but was also fun as hell and an incredible learning experience.

This site's code is completely open source and [freely available on GitHub](https://github.com/kaidez/kaidez.com/). The repo includes a [pretty lengthy README](https://github.com/kaidez/kaidez.com/blob/master/README.md) that gives a high-level look at the site's functionality.


But the README is verbose so a simple functionality walk-through is probably required, so let's proceed:

## Table of Contents
1. [Goodbye WordPress...](#wordpress)
2. [...Hello Jekyll &amp; Liquid](#jekyllLiquid)
3. [Design In-Browser](#designInBrowser)
4. [Mobile First](#mobileFirst)
5. [Overall Design](#overallDesign)
6. [JavaScript...RequireJS Specifically](#jsRequireJS)
7. [Bower](#bower)
8. [Web Hosting](#webHosting)

<a name="wordpress"></a>
### Goodbye WordPress... 
My initial plan to design the site on top of WordPress, minimizing WordPress' overall role. WordPress was to manage the back-end: storing data, implementing security, optimize the SQL,etc.

This plan was based around my primary goal: to create and manage all of the front-end code, especially the JavaScript.  But because of how WordPress the JS libraries it comes packaged with, I couldn't exert the level of control over the JavaScript that I wanted to (more about this in a future blog post).

Truthfully? I could have lived with WordPress was doing with the JS and was just being anal-retentive.  Still, I was anal-retentive and needed to move away from WordPress. 

<a name="jekyllLiquid"></a>
### ...Hello Jekyll &amp; Liquid
If you're around GitHub enough, you've heard of [Jekyll](http://jekyllrb.com/), the blog-aware static site generator. [GitHub Pages](http://pages.github.com/) (which powers GitHub-hosted blogs) provides its underlying page structure.

I've created HTML site templates that are applied to all the site content.  These templates contained [Liquid markup](http://wiki.shopify.com/Liquid), a pretty powerful templating language with some logic under its hood. All blog post pages are created in [Markdown](http://daringfireball.net/projects/markdown/).

Whenever I run `jekyll build` from the command line, Jekyll compiles a static, production-ready copy of the site. The logic created by the HTML templates and Liquid markup generate content the way I want to.

So static site content is generated in ways that were once not possible unless some sort of back-end database did the heavy lifting. Some examples:

* the Liquid logic displays posts on home page displays posts in a very specific way (more on this in a future blog post).
* a pagination structure is generated, which is good for SEO.
* category-specific pages are generated.
* an RSS/XML file is created.
* a short list of related posts embeds itself on individual post pages.

Ruby is a hard dependency for both Jekyll and Liquid and this site does use a few Ruby-based plugins: one for generating an [XML Sitemap](http://davidensinger.com/2013/03/generating-a-sitemap-in-jekyll-without-a-plugin/) for the search engines and one used in conjunction with [Lea Verou's](http://lea.verou.me/) excellent [Prism syntax highlighter plugin](http://prismjs.com/). But the Jekyll/Liquid combination is really doing the work of prepping this site for deployment.

The end result of all this is that kaidez.com is very light in terms of site weight.  There are no SQL requests and server-side scripting parsing stuff behind the scenes, so things load really fast. Pages running ads and the Disqus commenting system load a little slow, but overall page-load is still minimal.

I exported content from my old WordPress site to Jekyll using [this plugin](https://github.com/benbalter/wordpress-to-jekyll-exporter), but the [Jekyll migration docs](http://jekyllrb.com/docs/migrations/) offer some good alternatives. Also, this [two-part article on importing content from WordPress to Jekyll](http://vitobotta.com/migrating-from-wordpress-to-jekyll-part-one-why-i-gave-up-on-wordpress/#sthash.qDZ0Y6Qr.dpbs) is choked fill of information.

As happy as I am with Jekyll, please note that walking away from WordPress was not easy. WordPress did a lot of work via its related plugins...work that I now have to do on my own.

Also, Jekyll is geared towards the blogger that likes to write code and probably not a client solution. WordPress, Drupal, SiteCore and Joomla are still best of breed in this arena.

Jekyll is definitely increasing in popularity: I'm guessing this is due to the fact that Jekyll can [create a site that can be hosted for free on GitHub](https://help.github.com/articles/setting-up-a-custom-domain-with-pages). Also, Jekyll's attracting [lots of contributors](https://github.com/mojombo/jekyll/graphs/contributors) that are working together to make the platform better.

In all fairness there, are other options in terms of static site generators. [Dave Rupert](http://daverupert.com/) put together [a GitHub Gist of static site generators that was extended by commenters](https://gist.github.com/davatron5000/2254924). And in the .NET realm, there's lots of community action around Pretzel...check out [Pretzel's Github repo](https://github.com/Code52/pretzel) but surfing around [Pretzel Trello Board](https://trello.com/b/2IUErvJ2/pretzel) is also a good idea.

<a name="designInBrowser"></a>
### Design In-Browser
While I did use a pencil and paper to sketch out the site layout, I completely disregarded wireframes and PhotoShop mockups.  Reason being, mockups don't account for differences among browsers and devices...at least, not well.

Instead, I designed this site within the browser, which allowed me to debug against browsers and devices very early in the process.  This was easy when I started working in WordPress and ridiculously easy when I jumped over to Jekyll.

[Divya Manian](http://nimbupani.com/) outlines the design-in-browser process better than me...
<div class="centerVideo">
	<iframe width="560" height="315" src="//www.youtube.com/embed/h52uumn3sZc" frameborder="0" allowfullscreen></iframe>
</div>

<a name="mobileFirst"></a>
### Mobile First
"Mobile First" has gone from a buzz word to a *de facto* web standard. It basically means "properly develop and position content for mobile devices before doing so for desktop devices"...this should be applied to both content strategy and code.

No issues with going Mobile First with the content strategy for this redesign. I did a complete content audit of the previous site, then either eliminated lots of content I didn't need or moved it to the bottom of the page.

Doing this for the code was a problem which, honestly, still needs to be fixed. I implemented [the method outlined by Jon Korpi](http://www.jonikorpi.com/leaving-old-IE-behind/), coding a vertically thin, non-responsive layout outside of the CSS media queries (using [Sass](http://sass-lang.com/), of course) for the benefit of oldIE. I may not have implemented properly, plus, I think I would have to add more code in certain spots even if I do apply a proper implementation.  I will need to revisit this.

Important note: by "oldIE," I mean Internet Explorer 8 only.  In terms of supporting IE versions prior to that, I'll just paraphrase Shakespeare:

> *"By my head, you don't support IE7 and IE6!!!"*
>
> *"By my heel, I care not!"*

<a name="overallDesign"></a>
### Overall Design
Blogs are usually simple in design so I stuck with that rule.  I'm fine with the site's overall look and feel but think that the header could be a bit better, especially since the two modules at the bottom look really nice...at least I think so.  I may revisit the header sometime in the future.

The blue color is just something I came up with, color scheme-wise. I used [this color palette over at Colour Lovers as an overall guide](http://www.colourlovers.com/palette/2892492/azure_sea.).

The site uses two Google fonts: Open Sans (mostly for page content) and Robot Condensed (mostly for headers). There also some font icons being used...these are courtesy of [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/).

I employed the aforementioned (and awesome) PrismJS for syntax highlighting. It has [a really cool build tool for generating the highlight code](http://prismjs.com/download.html), that generates nice, clean, well-optimized code.

By walking away from oldIE, I was able to apply some CSS3 transitions and animations to the site...not as much as I wanted to though.  I did try to do some things that were more grand but ran into cross browser issues on the modern browsers. They're really just restricted to text link rollovers right now: maybe more in the future.

I did spend a few hours trying to apply a [flat design](http://fltdsgn.com/) to the site, but it's tough. Flat design, like [Swiss/International design](http://www.smashingmagazine.com/2009/07/17/lessons-from-swiss-style-graphic-design/) before it, is all about "designing a whole lot more with a whole lot less"...easier said than done. Probably the next design.

*Side note: flat design leads to a more optimized, high-performance site...oh, yes it does, for Paul Irish tells us so*.
<div class="centerVideo">
	<iframe width="420" height="315" src="//www.youtube.com/embed/Z1IqzeA3XXg" frameborder="0" allowfullscreen></iframe>
</div>

<a name="jsRequireJS"></a>
### JavaScript...RequireJS Specifically
As mentioned earlier, my primary goal in developing this site was to maintain total control over all of its front-end code, especially the JavaScript. And I'm proud to say that I reached this goal.

The big thing about this site's JavaScript code isn't 100% dependent on jQuery and pure JS is implemented as often as possible. jQuery is certainly used on the site, it just wasn't my default position when writing code.

Many leaders in the developer community have been pushing for all of us to use more pure JavaScript and less jQuery in our work. For my money, [Remy Sharp](http://remysharp.com/2013/04/19/i-know-jquery-now-what/) and [Todd Motto](http://toddmotto.com/is-it-time-to-drop-jquery-essentials-to-learning-javascript-from-a-jquery-background/) have provided the most compelling arguments.

Past that, Here's a rundown of how JS is being used:

* to run the aforementioned PrismJS.
* to power the site's search functionality using the jQuery-powered [Tipue](http://www.tipue.com/search/).
* to execute the mobile menu's show/hide functionality.
* to create both affiliate ad elements and the site's search box off-DOM, then load them onto the page (a DEFINITE future blog post).
* to show and hide the affiliate ads based on media queries with the help of the [enquire.js](http://wicky.nillia.ms/enquire.js/).
* to run client-side form validation.
* to implement AJAX to process form submissions.

Best of all, all of the above-mentioned JavaScript is 100% managed by [RequireJS](http://requirejs.org/), the popular JavaScript module loader. WordPress prevented RequireJS from functioning *exactly* the way I wanted it to and was the main reason I jumped over to Jekyll.

At the time of this blog post, there are 16 particular JS files I brought into the site build.  Some are core libraries, some are plugins and some contain code I wrote.

Some my code treats some of libraries and plugins as hard dependencies. Usually, this means that I would have make sure that all of my files are listed in a specific order in `<script>` tags to ensure that everything functions properly.  Of course, I would concatenate and minify these 16 files into one, but I would still have to make sure that it would do it in the proper order so, again, everything works as it should. These are things to worry about when doing JS development.

In this case, RequireJS did all of the worrying for me. I made sure it was properly configured on my page, wrote single modules of code, made sure the modules defined any dependencies and RequireJS did the rest.

RequireJS doesn't manage ALL the JavaScript: things like Modernizr, social sharing code and Google Analytics are separated out for good reason.  But RequireJS manages enough of it.

There's not enough space in this post to discuss the brilliance of RequireJS so if you want to get up and running with it, I'm going to push you to [read the RequireJS API docs](http://requirejs.org/docs/api.html). As mentioned above, I'll do a blog post on my RequireJS/WordPress issues in the near future and MIGHT do a screencast.

I also suggest that you [read this GitHub Gist by David Desandro of Twitter](https://gist.github.com/desandro/4686136) where he asked a question that sparked an excellent debate on the benefits of RequireJS. There are some great comments here, including those by well-known members of the JS Community. Read them all but I'm of the opinion that the first comment by [Ben Alman A.K.A. "cowboy"](http://benalman.com/) nicely sums up how RequireJS effectively eliminates a lot of worry from JavaScript development.

<a name="bower"></a>
### Bower
The JavaScript and CSS libraries and frameworks will get updated but tracking the updates for all of them is a pain...Bower](http://bower.io) makes it easy.

Bower is a browser-based package manager that runs on top of Node. When you type `bower list` on the command line from your project folder, Bower checks to see if anything needs to be updated (including Bower itself). For updating packages from there, simply type `bower list`.

Bower does not track EVERY library on kaidez.com: its job is to download packages from remote repos, usually ones hosted on GitHub...some packages like Tipue aren't on remote repos...no worries.

<a name="webHosting"></a>
### Web Hosting