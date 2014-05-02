---
title: 'New Site I Worked On: RevlonProBrands.com'
comments: true
author: Kai Gittens
layout: post
permalink: /revlon-pro-brands/
meta-excerpt: kaidez developed the RevlonProBrands.com site using GitHub Atom, Jade, OOCSS, Gulp, Grunt, & Modernizr’s yepnope functionality for tooling.
category: personal
cat-name: "Personal"
tags: [revlon, atom, jade, sass, oocss, gulp, grunt, Modernizr, yepnope]
has-home-img: revlon-pro-brands.jpg
---
Revlon, my employer, recently launched [RevlonProBrands.com](http://revlonprobrands.com "visit RevlonProBrands.com"), a one-page site that will mostly act as a sales tool for the company's sales reps. It was designed by Colorado web shop and passed onto the Revlon's internal web team for integration in a [Sitecore](http://www.sitecore.net/ "visit Sitecore: a .NET based content management system") environment.

There wasn't a need for lots complicated code due to the site's overall simplicity, but it did give me the chance to use certain web development tools and code techniques. And while all the code techniques didn't make it to the site's final production build, I'm glad I got to practice a bit.

<h2 class="tableOfContentsHeader">Table of Contents</h2>
1. [GitHub Atom](#atom)
2. [Jade](#jade)
3. [OOCSS](#oocss)
4. [Mobile First](#mobile-first)
5. [Overall Design](#overall-design)
6. [JavaScript...RequireJS Specifically](#RequireJS)
7. [The Rest Of The JavaScript](#other-javscript)
8. [Bower](#bower)
9. [SEO &amp; Accessibility](#seo-accessibility)
10. [Web Hosting](#web-hosting)
11. [Grunt &amp; My Deployment Workflow](#grunt-deployment-workflow)
12. [Post-Launch Tasks](#post-launch-tasks)
13. [Conclusion](#conclusion)

<a name="atom"></a>
### GitHub Atom
Most of my work for this project was done in the office using [Sublime Text](http://www.sublimetext.com/, "visit Sublime Text") as a development environment but there were a few instances when I did some work at home. In those instances, I swapped dev environments and used  [Atom](https://atom.io/ "visit Atom"), a web-based text editor that [GitHub](https://github.com/ "visit GitHub") released to beta a few months ago from this blog post.

Atom definitely "takes inspitation" from Sublime Text in terms custom configuration...many features that needed to be installed in Sublime as third-party packages are native in Atom. Whitespace removal, code-hinting/completion, spell-checking...all come pre-installed in Atom.

This includes Git and GitHub integration, which is obvious when you consider Atom's creator. If your project is already Git-configured (i.e., if you've already done a full `git init` inside of it), the configs can communicate with Atom can manage lots of related tasks.

Here are a few of the tasks...

  * Atom can read a `.gitignore` file  and tell you which files are ignored by greying them out in your project tree.

  * Atom tells you what branch you're currently working on, telling you if changes need to be committed and/or pushed.

  * Atom can look at the page your working on and jump to its history on GitHub.

This is not to say that Sublime can't do any of these things, because it can.  It's just that these features come pre-installed into Atom: as packages but pre-intalled nonetheless.

Installing these features as packages is key to Atom's design. By installing them as packages, Atom takes on a modularized architecture, making it easy to configure and adjust the editor's architecture if needed.

This highly configurable setup is mostly thanks to Atom's deep Node integration. Peek at most of Atom's pre-installed plugins and you'll see a basic Node architectural pattern...if you're a regular Node hacker then adding Atom to your toolkit is close to a no-brainer.

Managing settings in Atom is done using a nice user interface, something that Atom has over Sublime Text (at least I think so). Adding themes, installing/removing packages and creating custom settings is a breeze in Atom.

Again, Atom is in beta at the time of this post but GitHub has indicated that it will be released in both "fully-closed and fully-open" formats, which I take to mean as "free and paid versions". I personally see no issue with that: Atom has all the markings of a solid, viable application and I see no problem with charging money for it.

That being said, I can't say that I'll pay for out after it comes out of beta.  Not because Atom is bad, and it's nowhere near being bad. But I have gotten extremely confortable with Sublime Text over the years...getting my editor configs just as I want them, syncing the editor up with my bash scripts, settling in on themes I like, etc.

I've also toyed around with [Adobe Brackets](http://brackets.io/ "visit Adobe Brackets") a bit, which has its own set of stand-out features. And the best of Brackets' features eventually make their way to Adobe's new commercial web editor [Edge Code](http://html.adobe.com/edge/code/, "visit Adobe Edge Code"), which I recently received thanks to the good graces of my employer when I got a [Creative Cloud](https://creative.adobe.com/plans "learn more about Adobe Creative Cloud") membership.

I suppose the point is, Atom's awesome but, in my case, it may not be necessary. I'm continuing to play with it and LOVE what I see but because of my current needs and what tools I already have, I can't say I'll buy it when the time comes....still undecided.
<a name="jade"></a>
### Jade
RevlonProBrands.com is a *responsive/adaptive/insert-another-buzzword-here* website, but Sitecore is using server-side code to load in two versions of the page: one for desktops and another for everything else. So it made sense to use some sort of development-level templating system that would apply the common parts to each page.

I chose [Jade](http://jade-lang.com/ "visit the Jade templating") for this, a very simple templating engine that compile pages into HTML. In terms of what code you have to write to get things done, Jade is similar to things like [LESS](http://lesscss.org/ "visit LESS, a JavaScript-based CSS processor") and [Haml](http://haml.info/ "visit Haml, an HTML abstraction markup language") in the sense that indentation defines page structure.

So you use [npm](https://www.npmjs.org/package/jade, "install Jade with npm") to install Jade on your machine. Then create `.jade` files like this...
{% prism javascript %}
doctype html
html
  head
    title kaidez.com
  body
    h1 My Page Header
    p My Content
{% endprism %}

And with a few keystrokes, this file will output an `.html` file like this
{% prism markup %}
<!doctype html>
<html>
  <head>
    <title>kaidez.com</title>
  </head>
  <body>
    <h1>My Page Header</h1>
    <p>My Content</p>
  </body>
</html>
{% endprism %}

I went with Jade because I've been playing with the [MEAN stack](http://mean.io/ "review the MEAN stack") lately and [Express](http://expressjs.com/ "visit Express, the Node-based web server framework") (the "E" in MEAN) likes to use Jade. So I figured it made sense for me to figure out.

Jade has "includes" functionality similar to PHP includes and .NET user controls. In other words, small parts of page code can be broken out into their own files and then embedded into other pages for output.

So in other words, these two `.jade` files..

{% prism javascript %}
//index.jade
doctype html
html
  include includes/header //this is an include file
  body
    h1 My Page Header
    p My Content
{% endprism %}


{% prism javascript %}
//includes/header.jade
head
  title kaidez.com
{% endprism %}

...*SHOULD* output a single `.html` file like this...
{% prism markup %}
<!doctype html>
<html>
  <head>
    <title>kaidez.com</title>
  </head>
  <body>
    <h1>My Page Header</h1>
    <p>My Content</p>
  </body>
</html>
{% endprism %}

The indentation didn't QUITE work out the way I wanted to when I used a `<header>` tag...not sure why that was after a doing a web search for an answer. I think I can figure out why this is later on down the line, or maybe just asking for an answer on Stack Overflow will work as well.

That being said, I was approaching the delivery date for submitting the finalized code to the lead engineer and couldn't spend a whole lot of time on this problem. I'll will try to fix the issue but if it persists and I have to do a similar project in the future, I may just use [Jekyll](http://jekyllrb.com/ "visit Jekyll"), which has an incredibly straight-forward includes system.
<a name="oocss"></a>
### OOCSS
As mentioned in my [2013 site redesign post](http://kaidez.com/site-redesign-2013/, "read 'kaidez.com 2013 Site Redesign' on kaidez.com"), I really wanted to use object-oriented CSS, or OOCSS, in a project. I chose this project to do so and I am happy with what I accomplished and what learned in the process.

There's not enough room in this blog post to go through all its characteristics. But, simply put, OOCSS is a CSS design pattern that implements what its name implies: to apply object-oriented best practices to CSS.

OOCSS is a beautifully crafted set of ideas by [Nicole Sullivan](https://twitter.com/stubbornella, "stubbornella at Twitter"). The ideas include...

* applying alls styling to CSS classes and not IDs, reserving IDs for JavaScript hooks.
* separating these classes into two formats...one for style and one for structure.
* in true object-oriented style, reusing these classes across your page elements as needed.

I applied these ideas to my page code 


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

* no third-party affiliate ads load in the site's mobile view.  Google ads *have* to load in this view due to their rules and restrictions, but they do so asynchronously...*and* [responsively](https://support.google.com/adsense/answer/3213689?hl=en). More on that shortly.

* the site utilizes four vendor fonts but only two are available to the mobile view, resulting in two less server requests.

* CSS3 gradients, box shadows and text shadows render heavy browser paints that can impend site load time...they appear on the site's tablet and desktop views but are removed from the its mobile view.

<a name="overall-design"></a>
### Overall Design
Blogs are usually simple in design...I stuck with that rule when redesigning kaidez.com.  I'm fine with the site's overall look &amp; feel but think the header could be better, especially since the two modules at the bottom look (I think) really nice.  I may revisit the header sometime in the future.

The blue color is just something I came up with, color scheme-wise. I used [this color palette over at Colour Lovers as an overall guide](http://www.colourlovers.com/palette/2892492/azure_sea.).

The site uses Google's Open Sans and Open Sans Bold fonts (mostly for page content) as well as Robot Condensed (mostly for headers). Some font icons also appear on the page courtesy of [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/).

I employed the aforementioned (and awesome) PrismJS for code snippet highlighting. It has [a great build tool](http://prismjs.com/download.html) which generates the plugin code needed to implement syntax highlighting wherever you want to on your site.

I created a [404 page](/404.html) with a little humor, but added content to it in the hopes of further engaging whomever lands on it.

By ignoring oldIE, I was able to apply some CSS3 animations and transitions to the site...although not as much as I wanted to.  I did try to do some things that were more "grand" but ran into cross-browser issues on the modern browsers. So for now, these animations and transitions are limited to some of the link rollovers on the desktop view only.

I did spend a few hours trying to apply a [flat design](http://fltdsgn.com/) to the site, but it's tough. Like [Swiss/International style](http://www.smashingmagazine.com/2009/07/17/lessons-from-swiss-style-graphic-design/) before it, flat design is all about designing a whole lot more with a whole lot less...this is easier said than done.

But while its simplicity is difficult to implement, flat design ties in well with the general simplicity of most blog layouts. So I'll probably go with a flat design next time.

*Side note: flat design leads to a higher-performing site...oh, yes it does, for Paul Irish tells us so*.
<div class="vidWrapper">
	<div class="centerVideo">
	  <iframe width="420" height="315" src="//www.youtube.com/embed/Z1IqzeA3XXg" frameborder="0" allowfullscreen></iframe>
  </div>
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

Some of the code I wrote depends on some of the libraries and plugins. In the past, this meant I would have make sure all these files were listed in `<script>` tags on my page, and in a specific order to ensure that none of their functionality would break.

Of course, I would concatenate and minify these 16 files into one, but would still need to ensure that the files were concatenated/minified in the proper order so, again, nothing broke. You have to worry about this stuff when doing JS development.

RequireJS does all of the worrying for me. I made sure it was properly configured on my page, wrote single code modules, and made sure the modules referenced any libraries and/or plugins it depended on. RequireJS did the rest, including minifying and concatenating things in the proper order.

RequireJS doesn't manage ALL of this site's JavaScript...we'll discuss that in a minute. But RequireJS manages most of it very well.

Which is an important point: while it takes optimization seriously, RequireJS' main purpose in life is to allow developers to write JS in a modular, well-organized fashion (its [documentation](http://requirejs.org/docs/api.html#usage) is very clear about this purpose	). I wrote singular bits of JavaScript in separate files without worrying about global variable leakage, things loading in the proper order, etc...developing with RequireJS made my life so much easier.

There's not enough space in this post to discuss the brilliance of RequireJS so [read the RequireJS API docs](http://requirejs.org/docs/api.html) so you can get up and running. The previously mentioned JavaScript/WordPress issues were RequireJS-related and are discussed [here](/requirejs-wordpress/ "Read kaidez's Using RequireJS In WordPress' post"). And I MIGHT do a RequireJS screencast in the future...not 100% sure about this yet.

I also suggest that you [read this GitHub Gist](https://gist.github.com/desandro/4686136 "read this GitHub Gist about RequireJS") where David Desandro from Twitter asked a question that sparked an excellent discussion about the benefits of RequireJS as well as [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD "Go to the Asynchronous Module Definition Page"), which RequireJS is heavily based upon.

There are some great comments in the Gist, many by well-known members of the JS Community. Read them all, especially the first comment from [@cowboy](http://twitter.com/cowboy "Visit @cowboy A.K.A Ben Alman on Twitter ") that perfectly sums up how RequireJS eliminates lots of stress from JavaScript development.

<a name="other-javscript"></a>
### The Rest Of The JavaScript
RequireJS doesn't interact with *all* the site's JavaScipt. It ignores proxy JS bought in by ads and [Disqus](http://disqus.com/ "Learn more above the Disqus commenting system") but there are other things it ignores.

Modernizr is one such thing.  While your RequireJS file should be placed as to close to the bottom as possible, it's best practice to place Modernizr above the closing `<head>` tag. The Google Fonts load in using the JS-based [Google/Typekit Web Font Loader](https://github.com/typekit/webfontloader) and should be placed at the top of the page before Modernizr.

The rest of the JavaScript that's outside of the RequireJS process loads asynchronously, i.e., it loads in a manner that doesn't hinder asset loading or content rendering. In this context, note two things:

1. RequireJS also runs its code asynchronously.

2. the Web Font Loader code actually loads __synchronously__, but *can* load __asynchronously__. But, [as its documentation states](https://github.com/typekit/webfontloader#get-started "Read the Web Font Loader documentation"), lots of [FOUTS](http://www.paulirish.com/2009/fighting-the-font-face-fout/ "Read about FOUT (Flash Of Unstyled Text") will be generated if the Loader comes into your page asynchronously.

This other asynchronous code consists of:

* [Google Analytics](https://support.google.com/analytics/answer/1142414?hl=en "Learn more about Google Analytics"): watches/analyzes traffic.

* [Google Webmaster Tools](https://support.google.com/analytics/answer/1142414?hl=en "Learn more about Google Webmaster Tools"): tracks crawl errors, validates XML sitemaps, etc.

* [Google Adsense](https://support.google.com/adsense/answer/3221666?hl=en "Learn more about Google Adsense"): for loading ads.

* [Social sharing functionality on the post pages](https://gist.github.com/necolas/1025811 "Get Nicholas Gallagher's asynchronous social widget code snippet"): props to Nicholas Gallagher here.

I also have to give props to the Google Dev Team: all their code mentioned here has been in need of a cleanup for the few years leading up to this writing. They certainly cleaned it up.

Especially the ad code...not only is it async, but it's also **RESPONSIVE!**

Google ads don't scale when the window is resized. Its related code just uses media queries to detect the window width on page-load, then loads in a Google ad based on this detection. Your ads sizes can only be  [the ones that Google has already designated](https://support.google.com/adsense/answer/2953032?hl=en "get Google's approved ad sizes").

All is not perfect with the Google stuff: the Adsense code still loads in a lot of unoptimized assets, causing a bit of a performance hit. But many of these assets load in async (as do the Disqus ones).

None of that matters to me though...this responsive solution solves a MAJOR problem that many people were having with Google ads. I'm happy with (and respect) what the Google team has done here.
<a name="bower"></a>
### Bower
This site's JavaScript/CSS libraries and frameworks get updated when they need to, but consistently keeping track of the updates is a pain. [Bower](http://bower.io "Download Bower: a task manager for the web") makes it easy.

Bower is a browser-based package manager that runs on top of Node. When it's properly configured and you type `bower list` on the command line from your project folder, Bower checks to see if any of these packages needs to be updated (as well as Bower itself). If any packages need updating, typing `bower update <whatever-the-package>` into the CLI takes care of the update.

Bower does not track EVERY library on kaidez.com: it downloads packages from remote repos, primarily those hosted on GitHub. Some packages like Tipue aren't on remote repos...no worries.

<a name="seo-accessibility"></a>
### SEO &amp; Accessibility
The two best SEO practices you can implement on your site are 1) create compelling new content, and 2) regularly cultivate your existing content to make it *more* compelling. Compelling content is primarily (but not singularly) defined by the main search engines as content with a significant amount of external backlinks.

If your content strategy doesn't implement these two tasks, you don't have a content strategy. And I've definitely gotten slight traffic bumps when I publish even a trivial post so there's definitely something to creating new content.

So moving forward, I'll try to be more consistent with publishing stuff	 with the goal of making it as standout as possible to garner more external backlinks. This will require lengthy keyword research, running Google all-in-title searches and crafting enticing meta descriptions. I'll also be updating my existing GitHub tutorial post as it's in desperate need of cultivating.

Still, I did the following SEO technical stuff behind the scenes:

* implemented [Schema.org](http://schema.org "Learn more about schema.org") data.
* made sure each page had a canonical link.
* generated an XML sitemap for the search engines.
* made sure at least one section had pagination...view this [here](/pages/ "").
* embedded [Open Graph](http://ogp.me/ "Learn more about Open Graph protocol") protocols.
* signed up for [Twitter Cards](https://dev.twitter.com/docs/cards "Sign up for Twitter Cards").

Making a site accessible to people with disabilities is also a good SEO practice...and something you should just do anyway. So I did the following:

* started marking up the links with a `title` attribute for easy tab-throughs (this will be "in progress" for a quite while).
* ran some pages through a screen-reader.
* turned off all styles and read the unstyled page content out loud (which is basically what a screen-reader does).
* made sure that any elements that needed to be hidden were done so properly as per [Yahoo's accessibility suggestions](http://developer.yahoo.com/blogs/ydn/clip-hidden-content-better-accessibility-53456.html "Accessibility suggestions from Yahoo"). There are a few spots that I didn't do this, but it's mostly done site-wide.

If you don't think making your site accessible to people with disabilities is worth your time, you're dead wrong. Accessibility is important...especially on mobile. Austin Seraphin [eloquently explains why](http://behindthecurtain.us/2010/06/12/my-first-week-with-the-iphone/ "Austin Seraphin article on iPhone providing great accessibility functions for the disabled").

If you still need convincing after reading that, refer to what [Jen Kramer](http://www.jenkramer.org/ "Go to technology instructor Jen Kramer's site") says:

> *"Websites that are built to be accessible will also be accessible your number one blind user: Google."*

All this being said, spending some time on [the Yahoo! Accessibility blog](http://yaccessibilityblog.com/library/ "Go to Yahoo!'s Accessibility blog") is time well spent.

<a name="web-hosting"></a>
### Web Hosting
I'm sticking with my basic [Media Temple](http://www.mediatemple.net#a_aid=5068b81963acf "Visit Media Temple: a kaidez.com affiliate") Grid Server package but deciding on a web host was really something I struggled with up to the last minute.

I wanted a hosting package that would run my site as well as let me install things like Node and Ruby.  My Grid Server package doesn't really let me install anything extra so I could either upgrade to Media Temple [DV Managed](http://mediatemple.net/webhosting/vps/managed/#a_aid=5068b81963acf "Review Media Temple's DV Managed Package") or sign up a with cloud-based host...either [Rackspace](http://www.rackspace.com/ "Check out Rackspace") or [Amazon Web Services](http://aws.amazon.com/ "Check out Amazon Web Services") in this case.

Going with either DV Managed, Rackspace or AWS meant installing a LAMP stack on my own, which I'd never done up to that point. So I wanted SOME tech support in case I needed help and Rackspace seemed to pride itself on NOT providing any. So they were out.

Media Temple has EXCELLENT customer service but DV Managed was bit more expensive then a general AWS package. So I passed on upgrading my MT account and planned on hooking up with AWS at some point.

AWS also doesn't provide tech support but I got a better vibe from them, customer service-wise.  Plus, their popularity is steadily increasing to the point that there's tons of documentation for their various services online. So much so that I figured out how to install a LAMP stack on [a (somewhat) free AWS Usage Tier](http://aws.amazon.com/free/ "Read more about AWS's free Usage Tier").

Through its [S3 service](http://aws.amazon.com/s3/), AWS is well-suited for static sites....many people host static sites on S3 and serve their static content off of MaxCDN. [Kyle Rush](http://kylerush.net/ "Go to Kyle Rush's site") from the 2012 Obama campaign runs this setup and has [a great write-up about it](http://blog.maxcdn.com/supercharge-your-site-with-jekyll-s3-and-maxcdn/ "Learn how to set up a static site with Jekyll, Amazon S3 and MaxCDN").

My contact form requires PHP, which can't run on S3 unless you [install the Amazon PHP SDK with Composer](http://docs.aws.amazon.com/aws-sdk-php-2/guide/latest/installation.html "Install the Amazon PHP SDK with Composer"). I was researching how to do this...until I started poking around [Heroku](https://www.heroku.com/ "Review the Heroku Cloud Application Platform").

Heroku is insanely awesome. It's a cloud application platform that's "AWS-like" but focuses on creating single-page applications whereas AWS can create SPAs but is focused on creating a whole lot more.

Heroku will let me do a limited amount of Node/Ruby stuff for free....limited but powerful. I'm still researching how much of it is free but if it's enough, there's no reason to upgrade my current hosting package.

I'm sticking with my generic, PHP-included Media Temple plan for now and will do some fancy coding stuff on Heroku. But while I took all of the above tech stuff into consideration, I have to say that MT's excellent customer service was a big reason I stayed with them.

Media Temple recently began offering a [DV Developer Package](http://mediatemple.net/webhosting/vps/developer/#a_aid=5068b81963acf "Review Media Temple's DV Developer Package") that offers a bare virtual machine. It may be too bare but it still may suit my specific future needs...still researching this as of this post.

<a name="grunt-deployment-workflow"></a>
### Grunt &amp; My Deployment Workflow
So far, we've discussed using Jekyll to build out my site for deployment, managing my CSS with Sass, using Bower to manage site runtime dependencies, creating a cache manifest, running Modernizr, using RequireJS to manage/concate/minify a lot of JavaScript and concatenating/minifying other assets.

All these various processes means various tasks need to run at various times. And instead of manually performing the tasks one-by-one when needed, I've automated all of them under [Grunt](http://gruntjs.com "Go get Grunt: the JavScript task runner").

And as I've told anyone that would listen for the past two months, Grunt is my new God.

Created by the previously-mentioned [cowboy (A.K.A Ben Alman)](http://benalman.com/ "Go to Ben Alman's site") and similar to things like [Rake](http://jasonseifer.com/2010/04/06/rake-tutorial "Learn more about Rake"), Grunt is a JavaScript task runner. It runs on top of Node and is locally installed in my project folder. This local installation interacts with a globally-installed Grunt CLI tool.

A boatload of [Grunt plugins](http://gruntjs.com/plugins "Look through all the Grunt plugins") have been created by both the community and the Grunt core committers. These plugins let me create tasks within my dev environment, giving it a high level of functionality.

For example: there's a [grunt-watch plugin](https://github.com/gruntjs/grunt-contrib-watch "Get the grunt-contrib-watch plugin") that lets me watch for file additions and changes, performing specific tasks when these additions/changes occur. If Bower updates jQuery core, Grunt automatically copies it over to a spot in my project folder. If a .png file is added to a certain folder, Grunt automatically fires up [optiping](http://optipng.sourceforge.net/ "Get optipng") to minify it.

All the `grunt watch` stuff is awesome but it's my `grunt ppush` task where things really rock out. It's the task that triggers the production deployment sequence and works as follows:

1. The [grunt-shell plugin](https://github.com/sindresorhus/grunt-shell "Get the grunt-shell plugin") runs a task that executes a bash command that creates a "_deploy" directory in my project folder.

2. The [grunt-targethtml plugin](https://github.com/changer/grunt-targethtml "Get grunt-targethtml plugin") runs a task that embeds both Google Analytics code and a production-ready copy of the site's main  CSS file to the previously mentioned page layouts.

3. The [grunt-jekyll plugin](https://github.com/dannygarcia/grunt-jekyll "Get grunt-jekyll plugin") runs a task that uses Jekyll to build the site based on the layouts and dumps the build into "_deploy".

4. The [grunt-cdn plugin](https://github.com/tactivos/grunt-cdn "Get grunt-cdn plugin") runs a task that appends the MaxCDN URL to the proper images, CSS and JS files in "_deploy".

5. The [grunt-contrib-htmlmin plugin](https://github.com/gruntjs/grunt-contrib-htmlmin "Get grunt-contrib-htmlmin plugin") runs a task that minifies the HTML in "_deploy".

6. The [grunt-manifest plugin](https://github.com/gunta/grunt-manifest "Get grunt-manifest plugin") runs a task that builds the cache manifest and dumps it into "_deploy".

7. The [grunt-sftp-deploy plugin](https://github.com/thrashr888/grunt-sftp-deploy "Get grunt-sftp-deploy plugin") runs a task that deploys the minified, optimized site build in "_deploy" up to my live site.

8. The grunt-targethtml plugin runs another task that not only removes the Google Analytics code and minified CSS from the templates, but also adds an unminified dev version of the CSS file to the templates.  All this has to be done so the templates can safely build a dev version of the site.

9. The grunt-jekyll plugin runs another task that builds a dev copy of the site. This is really just done as test to see if the previous task properly rebuilt the templates for the dev site and may be removed eventually.

10. The grunt-shell plugin runs another task that executes a bash command that deletes "_deploy" from my project folder.

I'm being bombastic when outlining my deployment sequence like this but am doing so to prove a point. The combination all the above-mentioned Grunt tasks allowed me to craft a powerful, lightweight, highly-customizable IDE that not only lets me work efficiently but made the entire development process FUN!

<a name="post-launch-tasks"></a>
### Post-Launch Tasks
If you've ever read [*The Pragmatic Programmer*](http://www.amazon.com/gp/product/B000SEGEKI/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B000SEGEKI&linkCode=as2&tag=kaidez-20 "Buy The Pragmatic Programmer from Amazon"), you're familiar with the term "good enough software". It means, "the code may not be perfect, but it gets the job done."  And I do feel that way about some parts of the site.

Except for the overall neatness of the CSS, I'm fine with the production code. It's optimized for mobile, renders no console errors (although some 3rd-party code does), loads fast, looks and acts great across different browsers/devices (except oldIE-based stuff), utilizes SEO best practices and executes most post-load events at [the current recommended target rate of 60 frames per second](http://www.smashingmagazine.com/2013/06/10/pinterest-paint-performance-case-study/ "Smasing Magazine article about browser paint performance").

But I'm obviously critical about the CSS and somewhat critical of how some things are working at the development level.  The "good enough software" principle actually encourages such criticism so here are some things that I want to improve upon at a (not too) later date:

  * __Modify Grunt some more__: Grunt tasks can be configured to some very finite degrees and I know that I can do more in this area. The image minification task is acting odd...need to figure that out. Also, some tasks are repetitive, particularly with the Bower stuff. Grunt has a programmatic API that (I think) can help [make things DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself "What is the DRY principle?") but I need to delve into it some more.

  * __Clean up the CSS &amp; Sass__: Again, I KNOW that the CSS/Sass in its current format could be cleaned up and optimized.  And I do want to make it work in IE8. My hope is to do all this using [OOCSS principles](http://coding.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/ "Smashing Magazine Article about OOCSS").  

  * __Make the mobile menu/searchbox run off of CSS transitions instead of jQuery__: when the site's width is set to 568px or less in a media query-enabled browser, both the menu and searchbox will only appear and disappear by clicking on some buttons at the top.This show/hide animation is powered by jQuery but powering it off of CSS3 animations is the more optimal approach (read more about this [here](http://dev.opera.com/articles/view/css3-vs-jquery-animations/)). Doing this means restructuring the header and I was too close to being done with the redesign to do all that.  So this may be done later and if so, it will also be an opportunity to redo the header from a styling standpoint.

  * __Using Backbone in the contact form__: I'm really itching to use Backbone in a project and started to do so with my contact form, but this would add rendering/event weight to the form's performance and be too much.  I still want to use Backbone though so I may do this in the future.

  * __A better deployment method__: if your Jekyll site content is more than just a home page and blog posts AND is hosted anyplace other than GitHub, you may have to redeploy the ENTIRE site every time you make a change...even a small one. There are ways to use Git commit hooks to deploy your site after it's pushed up to GitHub, but it's tough to do with Jekyll.  Still researching this.

<a name="conclusion"></a>
### Conclusion

Utilizing all these dev tools & techniques was just as rewarding as redesigning the site. I received a WHOLE lot of education by doing all this and am the better developer for it.

Thanks for reading this very VERY long post and feel free to ask me questions!!!

 -kdz
