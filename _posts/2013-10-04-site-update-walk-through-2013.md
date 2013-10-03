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

WordPress would add very little JavaScript and CSS and I would most of it manually...JavaScript especially. But a standard WordPress install comes stock with JavaScript libraries and manages them in a way that kept me from controlling the JS the way I wanted to (more about this in a future blog post).

Truthfully? I could have lived with what WordPress was doing with the JS and was just being anal-retentive.  Still, I was anal-retentive so I moved away from WordPress. 

<a name="jekyll"></a>
### ...Hello, Jekyll
If you're around GitHub enough, you've heard of [Jekyll](http://jekyllrb.com/), the free blog-aware static site generator. [GitHub Pages](http://pages.github.com/), which powers GitHub-hosted sites, provide Jekyll its underlying HTML structure.

I've created HTML site templates that are applied to all the site content.  The templates also contain [Liquid markup](http://wiki.shopify.com/Liquid), a templating language with some logic under its hood. All post content is written in [Markdown](http://daringfireball.net/projects/markdown/).

Whenever I run `jekyll build` from the command line while in the project folder, Jekyll outputs a static, production-ready copy of the site. Logic created by the template/Liquid combo generates the content the way I tell it to.

So I did some dynamic stuff while coding up web pages, ran a command and Jekyll outputted the dynamic stuff onto a static site.  kaidez.com does things that were once not possible unless a back-end database did a lot of heavy lifting at runtime.

Here are some features that Jekyll builds out before production deployments:

* pre-defined template/Liquid logic displays posts on the home page in a very specific way, and by category (more on this in a future blog post).
* category-specific pages are also generated.
* a pagination structure is generated, which is good for SEO.
* an RSS/XML file is created.
* a short list of related posts embeds itself onto all the individual post pages.

Ruby is a hard dependency for both Jekyll and Liquid and this site does use two Ruby-based plugins: one for generating an [XML Sitemap](http://davidensinger.com/2013/03/generating-a-sitemap-in-jekyll-without-a-plugin/) for the search engines and one used in conjunction with [Lea Verou's](http://lea.verou.me/) excellent [PrismJS syntax highlighter plugin](http://prismjs.com/). But Jekyll really does the work of prepping this site for deployment.

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

Doing this for the code was a bit of problem and it still needs to be cleaned up a bit. This site is responsive via CSS3 media queries and I implemented [the method outlined by Jon Korpi](http://www.jonikorpi.com/leaving-old-IE-behind/), coding a vertically thin, non-responsive layout outside the media queries (using [Sass](http://sass-lang.com/), of course).  All this benefits oldIE.

I may not have implemented this method properly...I ended up adding more code than I thought I would have to. The code "works" the way I want it to but it can be neater...I will need to revisit this.

Important note: by "oldIE," I mean Internet Explorer 8 only.  In terms of supporting IE versions prior to that, I'll just paraphrase Shakespeare:

> *"By my head, you don't support IE7 and IE6!!!"*
>
> *"By my heel, I care not!!!"*

<a name="overallDesign"></a>
### Overall Design
Blogs are usually simple in design...I stuck with that rule when redesigning kaidez.com.  I'm fine with the site's overall look &amp; feel but think the header could be a bit better, especially since the two modules at the bottom look really nice...at least, I think so.  I may revisit the header sometime in the future.

The blue color is just something I came up with, color scheme-wise. I used [this color palette over at Colour Lovers as an overall guide](http://www.colourlovers.com/palette/2892492/azure_sea.).

The site uses two Google fonts: Open Sans (mostly for page content) and Robot Condensed (mostly for headers). Some font icons are also being used courtesy of [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/).

I employed the aforementioned (and awesome) PrismJS for code snippet highlighting. It has [a great build tool](http://prismjs.com/download.html) which generates the plugin code needed to implement syntax highlighting wherever you want to on your site.

By walking away from oldIE, I was able to apply some CSS3 animations and transitions to the site...not as much as I wanted to though.  I did try to do some things that were more "grand" but ran into cross-browser issues on the modern browsers. CSS3 animations/transitions are limited to some of the link rollovers right now: more may come in the future.

I did spend a few hours trying to apply a [flat design](http://fltdsgn.com/) to the site, but this is tough. Flat design, like [Swiss/International design](http://www.smashingmagazine.com/2009/07/17/lessons-from-swiss-style-graphic-design/) before it, is all about "designing a whole lot more with a whole lot less"...easier said than done.

But while flat design's simplicity is difficult to implement, it ties in well with the general simplicity of most blog layouts. So I'll probably go with a flat design next time.

*Side note: flat design leads to a more optimized, high-performance site...oh, yes it does, for Paul Irish tells us so*.
<div class="centerVideo">
	<iframe width="420" height="315" src="//www.youtube.com/embed/Z1IqzeA3XXg" frameborder="0" allowfullscreen></iframe>
</div>

<a name="jsRequireJS"></a>
### JavaScript...RequireJS Specifically
As mentioned earlier, my primary goal while developing this site was to maintain total control over all of its front-end code, especially the JavaScript. And I'm proud to say that I reached this goal.

The best thing about kaidez.com's JavaScript code is that it's not 100% jQuery-dependent...lots of pure JS is implemented. jQuery is certainly used on the site, it just wasn't my default position when writing JS code...like it has been in the past.

Many leaders in the developer community are pushing for other devs to use more pure JavaScript and less jQuery in their work. For my money, [Remy Sharp](http://remysharp.com/2013/04/19/i-know-jquery-now-what/) and [Todd Motto](http://toddmotto.com/is-it-time-to-drop-jquery-essentials-to-learning-javascript-from-a-jquery-background/) have provided the most compelling arguments here.

Here's a rundown of how JS is being used on kaidez.com:

* to run PrismJS.
* to power the site's search functionality via the [Tipue plugin for jQuery](http://www.tipue.com/search/).
* to execute the mobile menu's show/hide functionality.
* to create both affiliate ads and the site's search box off-DOM, then load them onto the page (a DEFINITE future blog post).
* to show and hide the affiliate ads based on media queries with the help of the [enquire.js](http://wicky.nillia.ms/enquire.js/).
* to run client-side form validation.
* to let AJAX process form submissions.

All of the above-mentioned JavaScript is managed by [RequireJS](http://requirejs.org/), the popular JavaScript module loader. And we need to talk about that...

At the time of this blog post, there are 16 particular JS files I brought into the site build.  Some are core libraries, some are plugins and some contain code I wrote.

Some of the code I wrote treats some of the libraries and plugins as hard dependencies. In the past, this meant I would have make sure all these files were listed in `<script>` tags and in a specific order on my web page. This was the only way to ensure that none of the functionality would break.

Of course, I would concatenate and minify these 16 files into one, but would still need to ensure that the files were concatenated/minified in the proper order so, again, nothing broke. You have to worry about this stuff when doing JS development.

RequireJS now all the worrying for me. I made sure it was properly configured on my page, wrote single modules of code, and made sure the modules listed any libraries and/or plugins as dependencies. RequireJS did the rest, including minifying and concatenating things correctly.

RequireJS doesn't manage ALL of this site's JavaScript: things like Modernizr and Google Analytics are separated out for good reason. But RequireJS manages most of it.

There's not enough space in this post to discuss the brilliance of RequireJS so if you want to get up and running with it, I'm going to push you to [read the RequireJS API docs](http://requirejs.org/docs/api.html). The JavaScript/WordPress issues mentioned above were RequireJS-related so the promised blog post will discuss it a bit. And I MIGHT do a full-on RequireJS screencast in the future.

I also suggest that you [read this GitHub Gist](https://gist.github.com/desandro/4686136) where David Desandro from Twitter asked a question that sparked an excellent discussion about the benefits of RequireJS.  It also discusses [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD), which RequireJS is heavily based upon.

There are some great comments in the Gist, many by well-known members of the JS Community. Read them all, especially the first comment from [Ben Alman A.K.A. "cowboy"](http://benalman.com/) that nicely sums up how RequireJS eliminates a lot of worry from JavaScript development.

<a name="bower"></a>
### Bower
The JavaScript/CSS libraries and frameworks get updated when they need to, but keeping tracking of these updates on a consistent basis is a pain...[Bower](http://bower.io) makes it easy.

Bower is a browser-based package manager that runs on top of Node and (sorta/kinda) depends on Git. When Bower is properly configured and you type `bower list` on the command line from your project folder, Bower checks to see if any of these files needs to be updated (as well as Bower itself). If any packages need updating, simply type `bower update <whatever-the-package>`.

Bower does not track EVERY library on kaidez.com: its job is to download packages from remote repos, usually ones hosted on GitHub. Some packages like Tipue aren't on remote repos...no worries.

<a name="seoAccessibility"></a>
### SEO &amp; Accessibility
The two best SEO practices you can implement on your site are 1) creating compelling new content, and 2) cultivating your existing content to make it *more* compelling. Compelling content is primarily defined by the main search engines as content with a significant amount of back-links.

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
* making sure that any elements that needs to be hidden were done so properly as per [Yahoo's accessibility suggestions](http://yaccessibilityblog.com/library/css-clip-hidden-content.html). There are a few spots that I didn't do this, but it's mostly done site-wide.

And if you don't think making your site accessible to people with disabilities is worth your time, you're dead wrong. Because as [Jen Kramer](http://www.jenkramer.org/) puts it:

> *"Websites that are built to be accessible will also be accessible your number one blind user: Google."*

<a name="webHosting"></a>
### Web Hosting
I'm sticking with my basic [Media Temple](http://www.mediatemple.net#a_aid=5068b81963acf) Grid Server package but deciding on a web host was really something I struggled with up to the last minute.

I wanted a host that would run my site as well as let me install things like Node and Ruby.  The last two things aren't allowed with my current hosting package so I could either upgrade to Media Temple [DV Managed](http://mediatemple.net/webhosting/vps/managed/) or sign up a with cloud-based host...either [Rackspace](http://www.rackspace.com/) or [Amazon Web Services](http://aws.amazon.com/) in this case.

DV Managed, Rackspace and AWS required installing a LAMP stack on my own, which I'd never done up to that point. So I wanted SOME tech support in case I needed help and Rackspace seemed to pride itself on NOT providing it. So they were out.

Media Temple has EXCELLENT customer service but AWS seemed to be cheaper than DV Managed, so I passed on upgrading my MT account and temporarily settled on signing up with AWS at some point. And while AWS doesn't provide tech support as well, they have a ton of documentation on their various services.

Through its [S3 service](http://aws.amazon.com/s3/), AWS is well-suited for static sites....many people host static sites on S3 and serve their static content off of MaxCDN. [Kyle Rush](http://kylerush.net/) from the 2012 Obama campaign runs this setup and has [a great write-up about it](http://blog.maxcdn.com/supercharge-your-site-with-jekyll-s3-and-maxcdn/).

My contact form requires PHP, which can't run on S3 unless you [use Composer to install Amazon's SDK for PHP](http://docs.aws.amazon.com/aws-sdk-php-2/guide/latest/installation.html). I was researching how to do this until I discovered [Heroku](https://www.heroku.com/)...which insanely awesome!!

Heroku allows me to do a limited amount of Node/Ruby stuff for free. I'm still researching how much stuff is free but if it ends up being enough, there's no reason to upgrade my current hosting package.

So I'm sticking with my generic MT plan for now and will do some fancy coding stuff on Heroku...all of this is subject to change. But regardless of my taking all of the above tech stuff into consideration, I have to say that Media Temple's excellent customer service was a big reason I stayed with them.

MT recently released a [DV Developer Package](http://mediatemple.net/webhosting/vps/developer/) that offers a little less features than DV Managed, but still may suit my specific future needs.

<a name="gruntWorkflow"></a>
### Grunt &amp; Development Workflow
So far, we've discussed using Jekyll to build out my site for deployment, managing my CSS with Sass, using Bower to manage site runtime dependencies, creating a cache manifest, running Modernizr, using RequireJS to manage/concate/minify a lot of JavaScript and concatenating/minifying other assets.

All these various processes means various tasks will run at various times. And instead of doing the tasks one-by-one when needed, I've automated all of them under [Grunt](http://gruntjs.com).

And as I've told anyone in earshot for the past two months, Grunt is my new God.

Similar to things like [Rake](http://jasonseifer.com/2010/04/06/rake-tutorial), Grunt is a JavaScript task runner that manages all of the just-mentioned tasks in my development environment. It runs on top of Node and is locally installed in my project folder. This local installation interacts with a globally-installed Grunt command line interface tool.

A boatload of [Grunt plugins](http://gruntjs.com/plugins) have been created by both the community and the Grunt core committers. One of the most popular plugins is [grunt-contrib-watch](https://npmjs.org/package/grunt-contrib-watch)...over 7,000 downloads for the DAY this post was published.

Grunt plugins must be configured in a `Gruntfile.js` file at the root of your project folder. Once grunt-contrib-watch is configured, it can watch for changes to certain files, then run other Grunt tasks against those changed files based on your plugin configs.

The power of all this can be seen in my development workflow. It changed many times during development (and will change many more times in the future), but this is how I was doing things at the time of the site relaunch:

1. Launch iTerm.

2. Run a bash alias that 1) jumps to my site project folder, 2) runs `bower list` to check for dependency updates, and 3) launches my `grunt watch` task.

3. Open another iTerm tab: if Bower says something needs to be updated in the other tab (including Bower), update it in this new window.

4. If nothing needs to be updated, keep the window open to run bash aliases and Git commits.

5. The `watch` command launched in the other window is "watching" things and performing tasks as follows:

    * If Bower updates a CSS site dependency, Grunt automatically copies it over to another folder, converts its extention to `.scss`, uses Sass to minify it with other `.scss` files into the site's main `styles.min.css`, then makes Jekyll rebuild the site.

    * If Bower updates a JS site dependency, Grunt automatically copies it over to another folder, uses RequireJS to minify/concatenate it with other JS files into the site's main `scripts.min.css`, then makes Jekyll rebuild the site.

    * If Sass files are edited or added, the above-mentioned CSS task is run.

    * If JavaScript files are added or updated, the above-mentioned JS task is run.

    * If `.html`, `.xml`, `.php` or `.md` files are added or updated, Jekyll rebuilds the site.

    * If `.jpg` or `.png` files are added or updated, they're minified with, respectively, [jpegtran](http://jpegclub.org/jpegtran/) or [optiping](http://optipng.sourceforge.net/), then Jekyll rebuilds the site.

6. If the `grunt-modernizr` task is run, my project folder is scanned for things that Modernizr may need to feature detect (JSON, local storage, etc). Based on that scan, a custom build of Modernizr is created, bringing in only the things I need. This custom build is based on [Modernizr's online build tool](http://modernizr.com/download/).

7. Code changes are made in Sublime Text and checked into Git in small bits using the [Tim Pope commit style](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

8. For production deployments, my custom `grunt push` command does the following:

   * Makes Jekyll build the site again, but adds the extra step of embedding related posts to the bottom of all post pages.

   * Minifies the site's HTML.

   * Builds out the cache manifest.

   * Deploys the minified, optimized site build to production.

I'm being bombastic when outline my workflow like this but am doing so to prove a point. The combination of Grunt and all the above-mentioned tools allowed me to craft a powerful, lightweight, highly-customizable integrated development environment that not only made me work efficiently but made the entire development process FUN!!!!! And within this environment, Grunt really ran the show.

<a name="postLaunchTasks"></a>
### Post-Launch Tasks
If you've ever read [*The Pragmatic Programmer*](http://www.amazon.com/gp/product/B000SEGEKI/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B000SEGEKI&linkCode=as2&tag=kaidez-20), you're familiar with the term "good enough software". It means, "the code may not be perfect, but does the job well enough."  And I do feel that way about some parts of the site.

I do wish that the header was better but am absolutely fine with the code on the live site. It's optimized for mobile, renders no console errors, loads fast in a browser, looks & acts great across different browsers & devices, utilizes SEO best practices and executes most events at the current 60 fps recommendation.

But I'm somewhat critical of how things are working at the development level and the "good enough software" principal encourages such critism. So here are some things that I want to improve upon at a later date:

  * __Make some Grunt stuff DRYer__: there are some things in my Gruntfile where the same task is repeats itself, particularly within the Bower tasks. Grunt has a programmatic API that (I think) can help [make things DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself) but I haven't really looked at it.  I need to do that.


  * __Make the mobile menu/searchbox run off of CSS transitions instead of jQuery__: when the site's width is set to 568px or less in a media query-enabled browser, both the menu and searchbox can only appear and disappear by clicking on some buttons at the top.  This show/hide animation is powered by jQuery but powering it off of CSS3 animations is the more optimal approach (read more about this [here](http://dev.opera.com/articles/view/css3-vs-jquery-animations/)). Implementing animations correctly on this site means restructuring the header, and I was too close to being done with the redesign when I started thinking about all this.  This may be done later and if so, it will also be an opportunity to redo the header.

  * __Using Backbone in the contact form__: I'm really itching to use Backbone in a project and started to do so with my contact form, but it would add rendering/event weight to the form's performance and might be too much.  I still want to use Backbone though so I may do this in the future.

  * __A better deployment method__: if your Jekyll site is more than just a home page and blog posts AND is hosted anyplace other than GitHub, you may have to redeploy the ENTIRE site every time you make a change...even a small one/ There are ways to use Git commit hooks to deploy your site after it's pushed up to a remote repo like GitHub, but it's tough to do with Jekyll.  Still need to research this.


<a name="conclusion"></a>
### Conclusion

Utilizing all these tools & techniques was just as rewarding as redesigning the site. I received a WHOLE lot of education by doing all this and am the better developer for it.

Thanks for reading this very VERY long post and feel free to ask me questions!!!

 -kdz