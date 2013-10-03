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
After five months and a little less then 2,000 Git commits, kaidez.com gets a redesign. It was a struggle due to the lack of free time but it was also a lot of fun and an incredible learning experience.

The resulting site code is open source and [freely available on GitHub](https://github.com/kaidez/kaidez.com/). The repo includes a [pretty lengthy README](https://github.com/kaidez/kaidez.com/blob/master/README.md) that gives a high-level look at the site's functionality.

The README uses a lot of verbose code-speak so a simpler (albeit lengthy) walk-through is required. Let's proceed with that:

## Table of Contents
1. [Goodbye, WordPress...](#wordpress)
2. [...Hello, Jekyll](#jekyll)
3. [Design In-Browser](#designInBrowser)
4. [Mobile First](#mobileFirst)
5. [Overall Design](#overallDesign)
6. [JavaScript...RequireJS Specifically](#jsRequireJS)
7. [Bower](#bower)
8. [SEO &amp; Accessibility](#seoAccessibility)
9. [Web Hosting](#webHosting)
10. [Grunt &amp; Development Workflow](#gruntWorkflow)
11. [Post-Launch Tasks](#postLaunchTasks)
12. [Conclusion](#conclusion)

<a name="wordpress"></a>
### Goodbye, WordPress... 
My initial plan was to design the site on top of WordPress while severely limiting WordPress' overall role. WP was to manage the back-end only: store data, implement security, optimize SQL, etc.

WordPress would add as little JavaScript and CSS as possible and I would add all that myself...JavaScript especially. But a standard WordPress install comes stock with JavaScript libraries and manages them in a way that kept me from controlling the JS the way I wanted to (more about this in a future blog post).

Truthfully? I could have lived with what WordPress was doing with the JS and was just being anal-retentive.  Still, I was anal-retentive so I moved away from WordPress. 

<a name="jekyll"></a>
### ...Hello, Jekyll
If you're around GitHub enough, you've heard of [Jekyll](http://jekyllrb.com/), the free blog-aware static site generator. [GitHub Pages](http://pages.github.com/), which power GitHub-hosted blogs, provide Jekyll its underlying HTML structure.

I've created HTML site templates that are applied to all the site content.  The templates also contain [Liquid markup](http://wiki.shopify.com/Liquid), a templating language with some logic under its hood. All post content is written in [Markdown](http://daringfireball.net/projects/markdown/).

Whenever I run `jekyll build` from the command line while in the project folder, Jekyll outputs a static, production-ready copy of the site. Logic created by the template/Liquid combo generates the content the way I tell it to.

So I did some dynamic stuff while building the site, ran a command and Jekyll turned the dynamic stuff into a static site.  kaidez.com does things that were once not possible unless a back-end database did a lot of heavy lifting at runtime.

Here are some features that Jekyll builds out before production deployments:

* pre-defined template/Liquid logic displays posts on the home page in a very specific way, and by category (more on this in a future blog post).
* category-specific pages are also generated.
* a pagination structure is generated, which is good for SEO.
* an RSS/XML file is created.
* a short list of related posts embeds itself onto all the individual post pages.

Ruby is a hard dependency for both Jekyll and Liquid and this site does use two Ruby-based plugins: one for generating an [XML Sitemap](http://davidensinger.com/2013/03/generating-a-sitemap-in-jekyll-without-a-plugin/) for the search engines and one used in conjunction with [Lea Verou's](http://lea.verou.me/) excellent [Prism syntax highlighter plugin](http://prismjs.com/). But Jekyll really does the work of prepping this site for deployment.

The end result of all this: kaidez.com's site weight is very light.  There aren't a bunch of SQL requests going back in forth, nor is there a lot of server-side scripting parsing stuff behind the scenes.

Combine this with code minification, applying a cache manifest and using [MaxCDN](http://maxcdn.com) to serve up static assets, and kaidez.com loads into a web browser pretty fast. Ads, social networking widgets and the Disqus commenting system slow things down sometimes, but the site's overall page-load time is still minimal.

I exported content from my old WordPress site to Jekyll using [this plugin](https://github.com/benbalter/wordpress-to-jekyll-exporter) but the [Jekyll migration docs](http://jekyllrb.com/docs/migrations/) offer alternative migration methods. Also, this [two-part article on importing content from WordPress to Jekyll](http://vitobotta.com/migrating-from-wordpress-to-jekyll-part-one-why-i-gave-up-on-wordpress/#sthash.qDZ0Y6Qr.dpbs) is the definitive article on the subject.

As happy as I am with Jekyll, please note that walking away from WordPress was not easy. WordPress did a lot of work via its related plugins...a lot of work that I now have to do on my own.

Also, Jekyll is geared towards the blogger that likes to write code and is probably not a client solution. WordPress, Drupal, SiteCore and Joomla are still best of breed in this arena.

Jekyll is increasing in popularity: I'm guessing this is due to the fact that it can [easily create a site that can be hosted for free on GitHub](https://help.github.com/articles/setting-up-a-custom-domain-with-pages). Also, Jekyll's attracting [lots of contributors](https://github.com/mojombo/jekyll/graphs/contributors) that are working together to make the platform better.

I'm very happy with Jekyll but in all fairness, there are other options in terms of static site generators. [Dave Rupert](http://daverupert.com/) put together [a GitHub Gist of static site generators that was extended by commenters](https://gist.github.com/davatron5000/2254924). And in the .NET realm, there's lots of community action around Pretzel...check out [Pretzel's Github repo](https://github.com/Code52/pretzel) but surfing around [Pretzel's Trello Board](https://trello.com/b/2IUErvJ2/pretzel) is also a good idea.

<a name="designInBrowser"></a>
### Design In-Browser
While I did use a pencil and paper to sketch out the site before coding, I completely disregarded wireframes and PhotoShop mockups.  Reason being, mockups can't account for the differences among browsers and devices...at least, not well.

Instead, I designed this site within a browser using a variety of desktop and remote developer tools to debug against browsers and devices. This was easy when I started working in WordPress and ridiculously easy when I jumped over to Jekyll.

[Divya Manian](http://nimbupani.com/) outlines the design-in-browser process better than me...
<div class="centerVideo">
	<iframe width="560" height="315" src="//www.youtube.com/embed/h52uumn3sZc" frameborder="0" allowfullscreen></iframe>
</div>

<a name="mobileFirst"></a>
### Mobile First
"Mobile First" has gone from a buzz word to a *de facto* web standard. It basically means "properly develop and position content for mobile devices before doing so for desktop devices"...this should be applied to both content strategy and code.

No issues with going Mobile First with the content strategy for this redesign. I did a complete content audit of the previous site, then either eliminated lots of content I didn't need or moved it to the bottom of the page.

Doing this for the code was a bit of problem which, honestly, still needs to be fixed. This site is responsive via CSS3 media queries and I implemented [the method outlined by Jon Korpi](http://www.jonikorpi.com/leaving-old-IE-behind/), coding a vertically thin, non-responsive layout outside the media queries (using [Sass](http://sass-lang.com/), of course) which benefits oldIE.

I may not have implemented properly...I ended up adding more code than I thought I would have to. The code "works" the way I want it to but it can be neater...I will need to revisit this.

Important note: by "oldIE," I mean Internet Explorer 8 only.  In terms of supporting IE versions prior to that, I'll just paraphrase Shakespeare:

> *"By my head, you don't support IE7 and IE6!!!"*
>
> *"By my heel, I care not!"*

<a name="overallDesign"></a>
### Overall Design
Blogs are usually simple in design...I stuck with that rule when redesigning kaidez.com.  I'm fine with the site's overall look &amp; feel but think the header could be a bit better, especially since the two modules at the bottom look really nice...at least, I think so.  I may revisit the header sometime in the future.

The blue color is just something I came up with, color scheme-wise. I used [this color palette over at Colour Lovers as an overall guide](http://www.colourlovers.com/palette/2892492/azure_sea.).

The site uses two Google fonts: Open Sans (mostly for page content) and Robot Condensed (mostly for headers). Some font icons are also being used courtesy of [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/).

I employed the aforementioned (and awesome) PrismJS for syntax highlighting. It has [a really cool build tool](http://prismjs.com/download.html) which generates the plugin code needed to implement syntax highlighting wherever you want to on your site.

By walking away from oldIE, I also was able to apply some CSS3 animations and transitions to the site...not as much as I wanted to though.  I did try to do some things that were more grand but ran into cross-browser issues on the modern browsers. CSS3 animations/transitions are limited to link rollovers right now on this site: more may come in the future.

I did spend a few hours trying to apply a [flat design](http://fltdsgn.com/) but that's tough. Flat design, like [Swiss/International design](http://www.smashingmagazine.com/2009/07/17/lessons-from-swiss-style-graphic-design/) before it, is all about "designing a whole lot more with a whole lot less"...easier said than done. Probably the next design.

*Side note: flat design leads to a more optimized, high-performance site...oh, yes it does, for Paul Irish tells us so*.
<div class="centerVideo">
	<iframe width="420" height="315" src="//www.youtube.com/embed/Z1IqzeA3XXg" frameborder="0" allowfullscreen></iframe>
</div>

<a name="jsRequireJS"></a>
### JavaScript...RequireJS Specifically
As mentioned earlier, my primary goal in developing this site was to maintain total control over all of its front-end code, especially the JavaScript. And I'm proud to say that I reached this goal.

The big thing about this site's JavaScript code is that it's not 100% jQuery-dependent...lots of pure JS is implemented. jQuery is certainly used on the site, it just wasn't my default position when writing JS code like it was in the past.

Many leaders in the developer community are pushing for devs to use more pure JavaScript and less jQuery in our work. For my money, [Remy Sharp](http://remysharp.com/2013/04/19/i-know-jquery-now-what/) and [Todd Motto](http://toddmotto.com/is-it-time-to-drop-jquery-essentials-to-learning-javascript-from-a-jquery-background/) have provided the most compelling arguments.

Past that, Here's a rundown of how JS is being used:

* to run PrismJS.
* to power the site's search functionality with the [Tipue plugin for jQuery](http://www.tipue.com/search/).
* to execute the mobile menu's show/hide functionality.
* to create both affiliate ads and the site's search box off-DOM in document fragments (a DEFINITE future blog post).
* to show and hide the affiliate ads based on media queries with the help of the [enquire.js](http://wicky.nillia.ms/enquire.js/).
* to run client-side form validation.
* to let AJAX process form submissions.

All of the above-mentioned JavaScript is managed by [RequireJS](http://requirejs.org/), the popular JavaScript module loader. Let's discuss...

At the time of this blog post, there are 16 particular JS files I brought into the site build.  Some are core libraries, some are plugins and some contain code I wrote.

Some of the code I wrote treats some of the libraries and plugins as hard dependencies. In the past, this meant I would have make sure that all my files were listed in a specific order on my page in `<script>` tags so none of the functionality would break.

Of course, I would concatenate and minify these 16 files into one, but would still need to ensure that the files were concatenated/minified in the proper order so, again, nothing broke. You have to worry about this stuff when doing JS development.

RequireJS now does all the worrying for me. I made sure it was properly configured on my page, wrote single modules of code, made sure the modules defined any library/plugin dependencies and RequireJS did the rest.

RequireJS doesn't manage ALL of this site's JavaScript: things like Modernizr and Google Analytics are separated out for good reason. But RequireJS manages most of it.

There's not enough space in this post to discuss the brilliance of RequireJS so if you want to get up and running with it, I'm going to push you to [read the RequireJS API docs](http://requirejs.org/docs/api.html). The JavaScript/WordPress issues mentioned above were RequireJS-related so the promised blog post will discuss it. And MIGHT do a full-on RequireJS screencast in the future.

I also suggest you [read this GitHub Gist](https://gist.github.com/desandro/4686136) where David Desandro from Twitter asked a question that sparked an excellent debate on the benefits of RequireJS. There are some great comments here, including those by well-known members of the JS Community. Read them all but I'm of the opinion that the first comment by [Ben Alman A.K.A. "cowboy"](http://benalman.com/) nicely sums up how RequireJS effectively eliminates a lot of worry from JavaScript development.

<a name="bower"></a>
### Bower
The JavaScript/CSS libraries and frameworks get updated when they need to, but keeping tracking of these updates on a consistent basis is a pain...[Bower](http://bower.io) makes it easy.

Bower is a browser-based package manager that runs on top of Node and (sorta/kinda) depends on Git. When Bower is properly configured and you type `bower list` on the command line from your project folder, Bower checks to see if any of these files needs to be updated (as well as Bower itself). If any packages need updating, simply type `bower update <whatever-the-package>`.

Bower does not track EVERY library on kaidez.com: its job is to download packages from remote repos, usually ones hosted on GitHub. Some packages like Tipue aren't on remote repos...no worries.

<a name="seoAccessibility"></a>
### SEO &amp; Accessibility
The best SEO practices one can implement are creating compelling new content and cultivating your existing content to make it *more* compelling. Compelling content is primarily defined by the main search engines as content with a significant amount of back-links.

If your content strategy plan doesn't implement these two tasks, you have no content strategy. So moving forward, I'll try to make my content as standout as possible: this will require lengthy keyword research, running some all-in-title searches and crafting enticing meta descriptions.

Still, I did the following SEO technical stuff behind the scenes:

* implemented [Schema.org](http://schema.org) data.
* made sure each page had a canonical link.
* generated an XML sitemap for the search engines.
* made sure at least one section had pagination...view this [here](/pages/).
* embedded [Open Graph](http://ogp.me/) protocols into the site code.
* signed up for [Twitter Cards](https://dev.twitter.com/docs/cards).

I also made sure that the site was accessible to people with disabilities by:

* marking up the links with a `title` attribute for easy tab-throughs.
* running some pages through a screen-reader.
* turning off all styles and reading the rendered page content out loud instead of letting a screen-reader do it.
* making sure that any elements that need to be hidden were done so properly as per [Yahoo's accessibility suggestions](http://yaccessibilityblog.com/library/css-clip-hidden-content.html). There are a few spots that don't do this, but it's mostly done site-wide.

And if you don't think making your site accessible to people with disabilities is worth your time, you're dead wrong. Because as [Jen Kramer](http://www.jenkramer.org/) puts it:

> *"Websites that are built to be accessible will also be accessible your number one blind user: Google."*

<a name="webHosting"></a>
### Web Hosting
I'm sticking with my basic [Media Temple](http://www.mediatemple.net#a_aid=5068b81963acf) Grid Server package but deciding on a web host was really something I struggled with up to the last minute.

I wanted a host that would let me run my site as well as install things like Node and Ruby, that latter of which my current hosting package doesn't allow. I could either up my package to Media Temple [DV Managed](http://mediatemple.net/webhosting/vps/managed/) or sign up a with cloud-based host...either [Rackspace](http://www.rackspace.com/) or [Amazon Web Services](http://aws.amazon.com/) in this case.

DV Managed, Rackspace and AWS required installing a LAMP stack on my own, which I'd never done up to that point. So I wanted SOME customer service in case I needed help and Rackspace seemed to pride itself on NOT providing it. So they were out.

Media Temple has EXCELLENT customer service but AWS seemed to be cheaper than DV Managed, so I passed on upgrading my MT account and temporarily settled on AWS. And while AWS doesn't provide customer service as well, they have a ton of documentation on their various services.

Through its [S3 service](http://aws.amazon.com/s3/), AWS is well-suited for static sites....many people host static sites on S3 and serve their static content off of MaxCDN. [Kyle Rush](http://kylerush.net/) from the 2012 Obama campaign runs this setup and wrote about it [here](http://blog.maxcdn.com/supercharge-your-site-with-jekyll-s3-and-maxcdn/).

My contact form requires PHP, which can't run on S3 unless you [use Composer to install Amazon's SDK for PHP](http://docs.aws.amazon.com/aws-sdk-php-2/guide/latest/installation.html). I was researching how to do this until I discovered [Heroku](https://www.heroku.com/)...which insanely awesome!!

Heroku allows me to do a limited amount of Node/Ruby stuff for free. I'm still researching if this is doable but if it is, there's no reason to upgrade my current hosting package.

So I'm sticking with my generic MT plan for now and will do some fancy coding stuff on Heroku...all of this is subject to change. But regardless of my taking all of the above tech stuff into consideration, I have to say that I stuck with Media Temple because of their customer service.

MT recently released a [DV Developer Package](http://mediatemple.net/webhosting/vps/developer/) that offers a little less features than DV Managed, but may suit my specific needs.

<a name="gruntWorkflow"></a>
### Grunt &amp; Development Workflow
So far, we've discussed using Jekyll to build out my site for production, managing my CSS with Sass, using Bower to manage site runtime dependencies, using RequireJS to minify a lot of JavaScript, creating a cache manifest, running Modernizr and concatenating/minifying assets.

Managing all these processes require that various tasks be run at various times. And instead of doing the tasks one-by-one when needed, I've automated all of them under [Grunt](http://gruntjs.com).

And as I've told anyone in earshot for the past four months, Grunt is my new God.

Similar to things like Rake, Grunt is a JavaScript task runner that manages all of the just-mentioned tasks, and then some. It runs on top of Node and is installed local to my project folder. The local Grunt interacts with a globally-installed Grunt command line interface tool.

There are a boatload of [Grunt plugins](http://gruntjs.com/plugins) available, created by both the community and the Grunt core committers. One of the most popular plugins is [grunt-contrib-watch](https://npmjs.org/package/grunt-contrib-watch)...over 7,000 downloads for the DAY this post was published.

All Grunt plugins must be configured in a `Gruntfile.js` file at the root of your project folder. Once grunt-contrib-watch is configured, it can watch for changes to certain files, then run other Grunt tasks against those changed files based on your configurations.


<a name="postLaunchTasks"></a>
### Post-Launch Tasks

<a name="conclusion"></a>
### Conclusion