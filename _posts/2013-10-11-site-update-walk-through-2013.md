---
title: 'kaidez.com 2013 Site Redesign'
comments: true
author: Kai Gittens
layout: post
permalink: /site-redesign-2013/
meta-excerpt: kaidez.com uses Jekyll as a blog engine, Grunt as a task runner, RequireJS for modular JavaScript management, & Bower for package management
category: personal
cat-name: "Personal"
tags: [jekyll, bower, requirejs, grunt, amd ]
has-home-img: site-relaunch.jpg
---
After over 2,000 Git commits, kaidez.com gets a redesign. It was a struggle due to limited free time, but it was also a lot of fun and an excellent learning experience.

The site code is open source and [freely available on GitHub](https://github.com/kaidez/kaidez.com/ "go to kaidez.com GitHub repo"). The repo's [README](https://github.com/kaidez/kaidez.com/blob/master/README.md "read the kaidez.com README on GitHub") is a lengthy birds-eye view description of the code at the development level.

The README uses a lot of verbose code-speak so a non-verbose (but also lengthy) walk-through is needed. Let's proceed with that:

## Table of Contents
1. [Goodbye, WordPress...](#wordpress)
2. [...Hello, Jekyll](#jekyll)
3. [Design In-Browser](#design-in-browser)
4. [Mobile First](#mobile-first)
5. [Overall Design](#overall-design)
6. [JavaScript...RequireJS Specifically](#RequireJS)
7. [The Rest Of The JavaScript](#other-javscript)
8. [Bower](#bower)
9. [SEO &amp; Accessibility](#seo-accessibility)
10. [Web Hosting](#web-hosting)
11. [Grunt &amp; Development Workflow](#grunt-development-workflow)
12. [Post-Launch Tasks](#post-launch-tasks)
13. [Conclusion](#conclusion)

<a name="wordpress"></a> 
### Goodbye, WordPress... 
My initial plan was to design the site on top of WordPress while severely limiting its role on the front-end. WordPress would oversee the back-end (manage data, optimize SQL, etc.) but do little in terms of managing any JavaScript and CSS. That would be my job, particularly the JavaScript.

WordPress manages its internal JS libraries in a way that kept me from controlling the JavaScript the way I wanted to (more about that in a future blog post). I probably could have lived with this but chose to be anal-retentive about it and moved away from WordPress. 

<a name="jekyll" title="go to the jekyll section of this article"></a>
### ...Hello, Jekyll
If you're a regular GitHub user then you're probably familiar with [Jekyll](http://jekyllrb.com/ "Visit to the Jekyll site"), the blog-aware static site generator. Sites that run using [GitHub Pages](http://pages.github.com/) give Jekyll its underlying HTML structure, so the word "Jekyll" is regularly thrown around in GitHub circles.

I created multiple site layouts using [Liquid](http://liquidmarkup.org/ "visit the liquid markup page"), a templating markup language with some internal logic. Whenever I run `jekyll build` from the command line while in my project folder, Jekyll utilizes the templates and logic to output a static, production-ready copy of the site.

The outputted site does some very cool things...here's short list:

* lots of content is written in [Markdown](http://daringfireball.net/projects/markdown/ "visit the markdown documentation page")...it all gets converted to to HTML.
* the logic displays posts on the [home page](/) in a very "dynamic" way (more on this in a future post).
* four category-specific pages are generated.
* an XML-powered RSS file for syndication is built.
* an HTML site map is created.
* a short list of related posts is placed at the end of each post.

Ruby is a Jekyll dependency so this site does use two Ruby-based plugins at the development level: one for generating a [search engine-friendly XML Sitemap,](http://davidensinger.com/2013/03/generating-a-sitemap-in-jekyll-without-a-plugin/ "tutorial for creating an XML Sitemap for Jekyll") and one used in conjunction with [Lea Verou's](http://lea.verou.me/ "visit Lea Verou's personal web site") excellent [PrismJS syntax highlighter plugin](http://prismjs.com/ "review the PrismJS syntax highlighter plugin"). But Jekyll really does the work of prepping this site's content for deployment.

Because it generates static sites, Jekyll eliminates the need for SQL queries and server-side script parsing. Combine that with asset minification, applying a cache manifest and using [MaxCDN](http://maxcdn.com "review MaxCDN, a kaidez.com affiliate partner") to serve up static content, kaidez.com loads into a web browser pretty fast. Ads, social networking widgets and images slow things down sometimes, but the site's overall page-load time is still minimal.

I exported the content from my old WordPress site to Jekyll using the [WordPress to Jekyll Exporter](https://github.com/benbalter/wordpress-to-jekyll-exporter), but the [Jekyll migration docs](http://jekyllrb.com/docs/migrations/ "read the Jekyll migration documentation") lists alternative export methods. Also, [Vito Botta's two-part article on importing content from WordPress to Jekyll](http://vitobotta.com/migrating-from-wordpress-to-jekyll-part-one-why-i-gave-up-on-wordpress/#sthash.qDZ0Y6Qr.dpbs) is *the* definitive article on the subject.

I'm happy with Jekyll but please note that walking away from WordPress was not easy after using it for five years. WordPress did a lot of work via its high-quality plugins...work that's now 100% my responsibility.

Also, Jekyll is definitely geared towards the blogger that likes to write code so in most cases, it probably won't be used for a client solution. WordPress, Drupal, SiteCore and Joomla are still best of breed in this arena, my personal preference being WordPress.

Jekyll is increasing in popularity: I'm guessing this is due to the fact that it can [easily create a site which can be hosted on GitHub for free](https://help.github.com/articles/setting-up-a-custom-domain-with-pages). Also, Jekyll's attracting [lots of contributors](https://github.com/mojombo/jekyll/graphs/contributors) that are working together to make the platform better.

<a name="design-in-browser"></a>
### Design In-Browser
While I did use a pencil and paper to sketch out the site before coding things, I completely disregarded wireframes and PhotoShop mockups.  Reason being, wireframes and mockups don't account for the differences among the various browsers and devices...at least, not well.

Instead, I designed this site within a browser using various desktop and remote tools to debug against the different browsers and devices. This was easy when I started working in WordPress and even easier when I jumped over to Jekyll.

[Divya Manian](http://nimbupani.com/) outlines the design-in-browser process better than me...
<div class="centerVideo">
	<iframe width="560" height="315" src="//www.youtube.com/embed/h52uumn3sZc" frameborder="0" allowfullscreen></iframe>
</div>

<a name="mobile-first"></a>
### Mobile First
"Mobile First" has gone from a buzz word to a *de facto* standard. It basically means "develop and position content for mobile devices before doing so for desktop devices"...this should always be applied to both content strategy and code.

No issues with applying Mobile First to my content strategy. I did a complete content audit of my previous site based on [the ROT principle](http://blog.braintraffic.com/2011/08/content-strategy-can-save-us-all-from-slobdom/ "What is ROT when talking about content strategy"), then either eliminated lots of content I didn't need or moved it to the bottom of the page.

Going Mobile First with the code was a bit of problem that still needs to be cleaned up a bit. This site is responsive via CSS3 media queries and I implemented [the method outlined by Jon Korpi](http://www.jonikorpi.com/leaving-old-IE-behind/), coding a vertically thin, non-responsive layout outside the media queries, with the help of [Sass](http://sass-lang.com/ "Learn about the Sass CSS preprocessor" ), of course.  All of this is for the benefit of oldIE.

I may not have implemented this method properly...I ended up writing more code than I planned on. The code "works" but I know it can be neater and need to revisit it.

Important note: by "oldIE," I mean Internet Explorer 8 only. The site looks crappy in IE8 at the time of the relaunch, but I'm planning to fix it post-launch.

In terms of supporting IE versions prior to 8, I'll just paraphrase Shakespeare:

> *"By my head, you don't support IE7 and IE6!!!"*
>
> *"By my heel, I care not!!!"*

Past all this, some Mobile First things are done right:

* no third-party affiliate ads load in the site's mobile view.  Google ads *have* to load in this view due to their rules, but they	do so asynchronously...*and* [responsively](https://support.google.com/adsense/answer/3213689?hl=en). More on all this shortly.

* four vendor fonts load on to the site, but only three are available to the mobile view...that number may drop at some point.

* CSS3 gradients, box shadows and text shadows render heavy browser paints that can impend site load time...they appear on the site's tablet and desktop views but are removed from the its mobile view.

<a name="overall-design"></a>
### Overall Design
Blogs are usually simple in design...I stuck with that rule when redesigning kaidez.com.  I'm fine with the site's overall look &amp; feel but think the header could be better, especially since the two modules at the bottom look (I think) really nice.  I may revisit the header sometime in the future.

The blue color is just something I came up with, color scheme-wise. I used [this color palette over at Colour Lovers as an overall guide](http://www.colourlovers.com/palette/2892492/azure_sea.).

The site uses Google's Open Sans and Open Sans Bold fonts (mostly for page content) as well as Robot Condensed (mostly for headers). Some font icons also appear on the page courtesy of [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/).

I employed the aforementioned (and awesome) PrismJS for code snippet highlighting. It has [a great build tool](http://prismjs.com/download.html) which generates the plugin code needed to implement syntax highlighting wherever you want to on your site.

I created a [404 page](/404.html) with a little humor, but added content to it in the hopes of further engaging whomever lands on it.

By ignoring oldIE, I was able to apply some CSS3 animations and transitions to the site...although not as much as I wanted to.  I did try to do some things that were more "grand" but ran into cross-browser issues on the modern browsers. So for now, these animations and transitions are limited to some of the link rollovers.

I did spend a few hours trying to apply a [flat design](http://fltdsgn.com/) to the site, but it's tough. Like [Swiss/International design](http://www.smashingmagazine.com/2009/07/17/lessons-from-swiss-style-graphic-design/) before it, flat design is all about designing a whole lot more with a whole lot less...this is easier said than done.

But while its simplicity is difficult to implement, flat design ties in well with the general simplicity of most blog layouts. So I'll probably go with a flat design next time.

*Side note: flat design leads to a higher-performing site...oh, yes it does, for Paul Irish tells us so*.
<div class="centerVideo">
	<iframe width="420" height="315" src="//www.youtube.com/embed/Z1IqzeA3XXg" frameborder="0" allowfullscreen></iframe>
</div>

<a name="RequireJS"></a>
### JavaScript...RequireJS Specifically
As mentioned earlier, my primary goal while developing this site was to maintain total control over all the front-end code, especially the JavaScript. I'm proud to say I achieved that goal.

The best thing about this site's JavaScript is that it's not 100% jQuery-dependent...lots of pure JS is implemented. jQuery is certainly used on the site, it just wasn't my starting point for writing JS like it has been in the past.

Many leaders in the developer community are pushing for other devs to use more pure JavaScript and less jQuery. For my money, [Remy Sharp](http://remysharp.com/2013/04/19/i-know-jquery-now-what/) and [Todd Motto](http://toddmotto.com/is-it-time-to-drop-jquery-essentials-to-learning-javascript-from-a-jquery-background/) have provided the most compelling arguments here.

Here's a rundown of how some of the JavaScript is being used on kaidez.com:

* to run PrismJS.
* to power the site's search functionality via the [Tipue plugin for jQuery](http://www.tipue.com/search/).
* to execute the mobile menu's show/hide functionality.
* to create both affiliate ads and the search box off-DOM, then load them onto the page (a DEFINITE future blog post).
* to show and hide the affiliate ads based on media queries with the help of the [enquire.js](http://wicky.nillia.ms/enquire.js/).
* to run client-side form validation.
* to let AJAX process form submissions.

All of the above-mentioned JavaScript is managed by [RequireJS](http://requirejs.org/), the popular JavaScript module loader. And we need to talk about that...

At the time of this blog post, there are 16 particular JS files I brought into the site build.  Some are core libraries, some are plugins and some contain code I wrote.

In order to work, some of the code I wrote depends on some of the libraries and plugins. In the past, this meant I would have make sure all these files were listed in `<script>` tags on my page, and in a specific order to ensure that none of their functionality would break.

Of course, I would concatenate and minify these 16 files into one, but would still need to ensure that the files were concatenated/minified in the proper order so, again, nothing broke. You have to worry about this stuff when doing JS development.

RequireJS does all of the worrying for me. I made sure it was properly configured on my page, wrote single code modules, and made sure the modules referenced any libraries and/or plugins it depended on. RequireJS did the rest, including minifying and concatenating things in the proper order.

RequireJS doesn't manage ALL of this site's JavaScript...we'll discuss that in a minute. But RequireJS manages most of it very well.

Which is an important point: while it takes optimization seriously, RequireJS' main purpose in life is to allow developers to write JS in a modular, well-organized fashion (its [documentation](http://requirejs.org/docs/api.html#usage) is very clear about this purpose	). I wrote singular bits of JavaScript in separate files without worrying about minification, things loading in the proper order, global variable leakage, etc...developing with RequireJS made my life so much easier.

There's not enough space in this post to discuss the brilliance of RequireJS so [read the RequireJS API docs](http://requirejs.org/docs/api.html) so you can get up and running. The previously mentioned JavaScript/WordPress issues were RequireJS-related so that future post will discuss it a bit. And I MIGHT do a RequireJS screencast in the future...not 100% sure about this yet.

I also suggest that you [read this GitHub Gist](https://gist.github.com/desandro/4686136) where David Desandro from Twitter asked a question that sparked an excellent discussion about the benefits of RequireJS as well as [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD), which RequireJS is heavily based upon.

There are some great comments in the Gist, many by well-known members of the JS Community. Read them all, especially the first comment from cowboy that perfectly sums up how RequireJS eliminates lots of stress from JavaScript development.

<a name="other-javscript"></a>
### The Rest Of The JavaScript
RequireJS doesn't interact with *all* the site's JavaScipt. It ignores JS bought in by ads and Disqus but there are other things it ignores.

Modernizr is one such thing.  While your RequireJS file should be placed as to close to the bottom as possible, it's best practice to place Modernizr above the closing `<head>` tag. The Google Fonts load in using the JS-based [Google/Typekit Web Font Loader](https://github.com/typekit/webfontloader) and should be placed at the top of the page before Modernizr.

The rest of the JavaScript that's outside of the RequireJS process loads asynchronously, i.e., it loads in a manner that doesn't hinder asset loading or content rendering. In this context, note two things:

1. RequireJS also runs its code asynchronously.

2. the Web Font Loader code actually loads __synchronously__, but *can* load __asynchronously__. But, [as its documentation states](https://github.com/typekit/webfontloader#get-started), lots of [FOUTS](http://www.paulirish.com/2009/fighting-the-font-face-fout/) will be generated if the Loader comes into your page asynchronously.

This other asynchronous code consists of:

* __[Google Analytics](https://support.google.com/analytics/answer/1142414?hl=en)__: watches/analyzes traffic.

* __[Google Webmaster Tools](https://support.google.com/analytics/answer/1142414?hl=en)__: tracks crawl errors, validates XML sitemaps, etc.

* __[Google Adsense](https://support.google.com/adsense/answer/3221666?hl=en)__: for loading ads.

* __[Social sharing functionality on the post pages](https://gist.github.com/necolas/1025811)__: props to Nicholas Gallagher here.

I also have to give props to the Google Dev Team: all their code mentioned here has been in need of a cleanup for the few years leading up to this writing. They certainly cleaned it up.

Especially the ad code...not only is it async, but it's also **RESPONSIVE!**

Google ads don't scale when the window is resized. Its related code just uses media queries to detect the window width on page-load, then loads in a Google ad based on this detection. Your ads sizes can only be  [the ones that Google has already designated](https://support.google.com/adsense/answer/2953032?hl=en).

All is not perfect with the Google stuff: the Adsense code still loads in a lot of unoptimized assets, causing a bit of a performance hit. But many of these assets loading async (as do the Disqus ones).

None of that matters to me though...this responsive solution solves a MAJOR problem that many people were having with Google ads. I'm happy with (and respect) what the Google team has done here.
<a name="bower"></a>
### Bower
This site's JavaScript/CSS libraries and frameworks get updated when they need to, but consistently keeping track of the updates is a pain. [Bower](http://bower.io) makes it easy.

Bower is a browser-based package manager that runs on top of Node. When it's properly configured and you type `bower list` on the command line from your project folder, Bower checks to see if any of these packages needs to be updated (as well as Bower itself). If any packages need updating, typing `bower update <whatever-the-package>` into the CLI takes care of the update.

Bower does not track EVERY library on kaidez.com: it downloads packages from remote repos, primarily those hosted on GitHub. Some packages like Tipue aren't on remote repos...no worries.

<a name="seo-accessibility"></a>
### SEO &amp; Accessibility
The two best SEO practices you can implement on your site are 1) create compelling new content, and 2) regularly cultivate your existing content to make it *more* compelling. Compelling content is primarily (but not singularly) defined by the main search engines as content with a significant amount of back-links.

If your content strategy doesn't implement these two tasks, you don't have a content strategy. And I've definitely gotten slight traffic bumps when I publish even a trivial post so there's definitely something to creating new content.

So moving forward, I'll try to be more consistent with publishing stuff	 with the goal of making it as standout as possible to garner more back-links. This will require lengthy keyword research, running Google all-in-title searches and crafting enticing meta descriptions.

Still, I did the following SEO technical stuff behind the scenes:

* implemented [Schema.org](http://schema.org) data.
* made sure each page had a canonical link.
* generated an XML sitemap for the search engines.
* made sure at least one section had pagination...view this [here](/pages/).
* embedded [Open Graph](http://ogp.me/) protocols.
* signed up for [Twitter Cards](https://dev.twitter.com/docs/cards).

Making a site accessible to people with disabilities is also a good SEO practice...and something you should just do anyway. So I did the following:

* marked up the links with a `title` attribute for easy tab-throughs.
* ran some pages through a screen-reader.
* turned off all styles and read the unstyled page content out loud (which is basically what a screen-reader does).
* made sure that any elements that needed to be hidden were done so properly as per [Yahoo's accessibility suggestions](http://yaccessibilityblog.com/library/css-clip-hidden-content.html). There are a few spots that I didn't do this, but it's mostly done site-wide.

If you don't think making your site accessible to people with disabilities is worth your time, you're dead wrong. Accessibilty is important...especially on mobile. Austin Seraphin [eloquently explains why](http://behindthecurtain.us/2010/06/12/my-first-week-with-the-iphone/).

If you still need convincing after reading that, refer to what [Jen Kramer](http://www.jenkramer.org/) says:

> *"Websites that are built to be accessible will also be accessible your number one blind user: Google."*

<a name="web-hosting"></a>
### Web Hosting
I'm sticking with my basic [Media Temple](http://www.mediatemple.net#a_aid=5068b81963acf) Grid Server package but deciding on a web host was really something I struggled with up to the last minute.

I wanted a hosting package that would run my site as well as let me install things like Node and Ruby.  My Grid Server package doesn't really let me install anything extra so I could either upgrade to Media Temple [DV Managed](http://mediatemple.net/webhosting/vps/managed/) or sign up a with cloud-based host...either [Rackspace](http://www.rackspace.com/) or [Amazon Web Services](http://aws.amazon.com/) in this case.

Going with either DV Managed, Rackspace or AWS meant installing a LAMP stack on my own, which I'd never done up to that point. So I wanted SOME tech support in case I needed help and Rackspace seemed to pride itself on NOT providing any. So they were out.

Media Temple has EXCELLENT customer service but DV Managed was bit more expensive then a general AWS package. So I passed on upgrading my MT account and planned on hooking up with AWS at some point. 

AWS also doesn't provide tech support but I got a better vibe from them, customer service-wise.  Plus, their popularity is steadily increasing to the point that there's tons of documentation for their various services online. So much so that I figured out how to install a LAMP stack on [a (somewhat) free Amazon Usage Tier](http://aws.amazon.com/free/).

Through its [S3 service](http://aws.amazon.com/s3/), AWS is well-suited for static sites....many people host static sites on S3 and serve their static content off of MaxCDN. [Kyle Rush](http://kylerush.net/) from the 2012 Obama campaign runs this setup and has [a great write-up about it](http://blog.maxcdn.com/supercharge-your-site-with-jekyll-s3-and-maxcdn/).

My contact form requires PHP, which can't run on S3 unless you [install the Amazon PHP SDK with Composer](http://docs.aws.amazon.com/aws-sdk-php-2/guide/latest/installation.html). I was researching how to do this...until I started poking around [Heroku](https://www.heroku.com/).

Heroku is insanely awesome! It will let me do a limited amount of Node/Ruby stuff for free....limited but powerful. I'm still researching how much of it is free but if it's enough, there's no reason to upgrade my current hosting package.

I'm sticking with my generic, PHP-included Media Temple plan for now and will do some fancy coding stuff on Heroku. But while I took all of the above tech stuff into consideration, I have to say that MT's excellent customer service was a big reason I stayed with them.

Media Temple recently began offering a [DV Developer Package](http://mediatemple.net/webhosting/vps/developer/) that offers a few less features than DV Managed (it doesn't come with [Plesk](http://www.parallels.com/products/plesk/)). It doesn't appear to be cloud-based but appears to be "AWS-like" in other ways and may suit my specific future needs.

<a name="grunt-development-workflow"></a>
### Grunt &amp; Development Workflow
So far, we've discussed using Jekyll to build out my site for deployment, managing my CSS with Sass, using Bower to manage site runtime dependencies, creating a cache manifest, running Modernizr, using RequireJS to manage/concate/minify a lot of JavaScript and concatenating/minifying other assets.

All these various processes means various tasks need to run at various times. And instead of manually performing the tasks one-by-one when needed, I've automated all of them under [Grunt](http://gruntjs.com).

And as I've told anyone that would listen for the past two months, Grunt is my new God.

Created by the previously-mentioned [@cowboy (A.K.A Ben Alman)](https://twitter.com/cowboy) and similar to things like [Rake](http://jasonseifer.com/2010/04/06/rake-tutorial), Grunt is a JavaScript task runner. It runs on top of Node and is locally installed in my project folder. This local installation interacts with a globally-installed Grunt CLI tool.

A boatload of [Grunt plugins](http://gruntjs.com/plugins) have been created by both the community and the Grunt core committers. These plugins let me create tasks within my dev environment, giving it a high level of functionality.

For example: I have a single Grunt task that sequentially performs a bunch of sub-tasks for a production deployment. One of these sub-tasks is powered by the [grunt cdn](https://github.com/tactivos/grunt-cdn) plugin and it appends the MaxCDN URL to the the required images and CSS/JS files. But because of how Jekyll works, these URLs are appended inside the directory that hosts my local development site.

I constantly load/relaod the local dev site in a browser when writing code and the CDN assets get called every time that happens.  This incurs unnecessary costs so when the production push to the remote server is done, another sub-task related to the [grunt jekyll](https://github.com/dannygarcia/grunt-jekyll) plugin "resets" the dev site by removing the CDN URLs. These and other tasks run using a single Grunt command...I LOVE IT!

Grunt add a lot of flexibility to my development workflow, which changed many times during the redesign and will change many more times now that it's done. But this is how it was working at the time of the relaunch: it lists two non-Grunt things for clarity:

1. Launch a command prompt with [iTerm](http://iterm.sourceforge.net/).

2. Run a bash alias that 1) jumps to my site project folder, 2) runs `bower list` to check for dependency updates, and 3) launches my `grunt watch` task which watches for certain file additions and changes.

3. Open another iTerm tab: if Bower says something needs to be updated in the other tab (including Bower), update it in this new window.

4. If nothing needs to be updated, keep the new tab open to run bash aliases and Git commits.

5. As mentioned, `grunt watch` looks out for certain file additions/changes. It works and performs as follows:

    * if Bower updates a CSS file, Grunt converts its extension to `.scss`, copies it over to another folder, uses Sass to process it with other `.scss` files into the site's main stylesheet, then makes Jekyll rebuild the site.

    * if Sass files are added or updated, the above-mentioned CSS task is run...except for the extension conversion.

    * if Bower updates a JS file, Grunt automatically copies it over to another folder, uses RequireJS to process it with other JS files into the site's main JavaScript file, then makes Jekyll rebuild the site.

    * if other JavaScript files are added or updated, the above-mentioned JS task is run.

    * if `.html`, `.xml`, `.php` or `.md` files are added or updated, Jekyll rebuilds the site.

    * if `.jpg` or `.png` files are added or updated, they're minified with, respectively, [jpegtran](http://jpegclub.org/jpegtran/) or [optiping](http://optipng.sourceforge.net/), then Jekyll rebuilds the site.

6. If the `grunt-modernizr` task is run, a pre-defined group of files is scanned for things that Modernizr may need to feature-detect. Based on that scan, a slimmed-down custom build of Modernizr is created, bringing in only the feature-detects I need. This custom build is based on [Modernizr's online build tool](http://modernizr.com/download/).

7. Code changes are made in Sublime Text and committed to Git in small bits using the [Tim Pope style](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)...one of the "non-Grunt" things.

8. Code changes are reviewed on `localhost` running on [MAMP](http://www.mamp.info/)...the other "non-Grunt" things.

9. The `grunt push` task executes the above-discussed deployment sequence which does the following:

   * makes Jekyll build the site again, but adds the extra step of embedding related posts to the bottom of all post pages.

   * appends the MaxCDN URL to the proper assets, as mentioned above.

   * minifies the site's HTML.

   * builds out the cache manifest.

   * deploys the minified, optimized site build to production.

   * rebuilds Jekyll, which removes the MaxCDN URLs from the site build for the reasons mentioned above.

I'm being bombastic when outline my workflow like this but am doing so to prove a point. The combination all the above-mentioned tools allowed me to craft a powerful, lightweight, highly-customizable IDE that not only lets me work efficiently but made the entire development process FUN! And within this process, Grunt really ran the show.

<a name="post-launch-tasks"></a>
### Post-Launch Tasks
If you've ever read [*The Pragmatic Programmer*](http://www.amazon.com/gp/product/B000SEGEKI/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B000SEGEKI&linkCode=as2&tag=kaidez-20 "Buy The Pragmatic Programmer from Amazon"), you're familiar with the term "good enough software". It means, "the code may not be perfect, but it gets the job done."  And I do feel that way about some parts of the site.

Except for the overall neatness of the CSS, I'm fine with the production code. It's optimized for mobile, renders no console errors (although some 3rd-party code does), loads fast, looks and acts great across different browsers/devices (except oldIE-based stuff), utilizes SEO best practices and executes most post-load events at [the current recommended target rate of 60 frames per second](http://www.smashingmagazine.com/2013/06/10/pinterest-paint-performance-case-study/).

But I'm obviously critical about the CSS and somewhat critical of how some things are working at the development level.  The "good enough software" principle actually encourages such criticism so here are some things that I want to improve upon at a (not too) later date:

  * __Modify Grunt some more__: Grunt tasks can be configured to some very finite degrees and I know that I can do more in this area. The image minification task is acting odd...need to figure that out. Also, some tasks are repetitive, particularly with the Bower stuff. Grunt has a programmatic API that (I think) can help [make things DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself "What is the DRY principle?") but I haven't really looked at it. I need to do that.

  * __Clean up the CSS &amp; Sass__: Again, I KNOW that the CSS in its current format could be cleaned up and optimized.  And I do want to make it work in IE8. My hope is to do all this using the [OOCSS principle](http://coding.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/ "Read the Smashing Magazine Article about OOCSS").  

  * __Make the mobile menu/searchbox run off of CSS transitions instead of jQuery__: when the site's width is set to 568px or less in a media query-enabled browser, both the menu and searchbox will only appear and disappear by clicking on some buttons at the top.This show/hide animation is powered by jQuery but powering it off of CSS3 animations is the more optimal approach (read more about this [here](http://dev.opera.com/articles/view/css3-vs-jquery-animations/)). Doing this means restructuring the header and I was too close to being done with the redesign to do all that.  So this may be done later and if so, it will also be an opportunity to redo the header.

  * __Using Backbone in the contact form__: I'm really itching to use Backbone in a project and started to do so with my contact form, but this would add rendering/event weight to the form's performance and be too much.  I still want to use Backbone though so I may do this in the future.

  * __A better deployment method__: if your Jekyll site content is more than just a home page and blog posts AND is hosted anyplace other than GitHub, you may have to redeploy the ENTIRE site every time you make a change...even a small one. There are ways to use Git commit hooks to deploy your site after it's pushed up to a remote repo like GitHub, but it's tough to do with Jekyll.  Still researching this.

<a name="conclusion"></a>
### Conclusion

Utilizing all these dev tools & techniques was just as rewarding as redesigning the site. I received a WHOLE lot of education by doing all this and am the better developer for it.

Thanks for reading this very VERY long post and feel free to ask me questions!!!

 -kdz