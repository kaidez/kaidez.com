---
title: 5 Mobile Web Development Best Practice Resources
comments: true
author: Kai Gittens
permalink: /mobile-web-development-best-practice-resources/
layout: post
meta-excerpt: Great mobile web development best practice resource list-includes site speed gurus, blogs & a podcast featuring jQuery creator, John Resig. 
category: coding-best-practices
cat-name: "Code Tips"
has-thumbnail: mobileBestPractices.jpg
tags: [mobile, html5, jquery, steve souders, practice]
---
# 

My last batch of articles have discussed which mobile web development best practices I’ve adopted. I obviously can’t claim them as my own creation and should share my resources for these practices.

Some are more mobile-specific then others but all focus on optimizing sites for speed: the number one mobile web development best practice:

## 1) Steve Souders

The one that really showed developers the way in terms of creating fast-loading sites. Formerly at Yahoo! and now at Google, [Steve Souders][1] is *the* speed site guru mostly on the strength of his two books: [*High Performance Web Sites*][2] and [*Even Faster Websites*][3]. Paul Irish took the best tips from both of these books and applied them to the [HTML5 Boilerplate build script][4]. 

 [1]: http://stevesouders.com/
 [2]: http://www.amazon.com/gp/product/0596529309?ie=UTF8&tag=stevsoud-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0596529309
 [3]: http://www.amazon.com/gp/product/0596522304?ie=UTF8&tag=stevsoud-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0596522304
 [4]: http://html5boilerplate.com/docs/#Build-script

## 2) PPK

Web developer Peter-Paul Koch, also known as PPK, is next on the speed guru list. He’s well-known for performing tons of mobile device/browser tests, displaying the results on [the mobile section of his Quirksmode blog][5]…spend some reading the Compatibility table on this page.

 [5]: http://www.quirksmode.org/mobile/

As he lives in Amsterdam, PPK can perform thorough tests on the [Symbian][6] browser, which not only gets heavy usage in Europe, but is also the world’s most popular mobile web browser. So…American-based web developers need to read his Symbiam results on his [Quirksmode blog][7] because they will have to code for it sooner than later.

 [6]: http://symbian.nokia.com/
 [7]: http://www.quirksmode.org/

## 3) Yahoo’s YUI and YDN blogs

Right now, Yahoo! is to site optimization what Google is to SEO: a well-respected authority in their area of expertise. Nowhere is this more clear than within [the Performance category of their Yahoo! User Interface Blog (or just the YUIBlog)][8]. All of these posts offer great site speed tips, particularly the ones by [Stoyan Stefanov][9].

 [8]: http://www.yuiblog.com/blog/category/performance/
 [9]: http://www.phpied.com/

Yahoo! also maintains the Yahoo! Developer Network blog (YDN), which doesn’t have the depth of site speed advice that YUI does, but is still good. Their “[Best Practices for Speeding Up Your Web Site][10]” article is pretty much required reading for any web developer right now, plus, YDN maintains the awesome Steve Souders-created [YSlow browser plugin][11], used for testing a web page’s optimization. 

 [10]: http://developer.yahoo.com/performance/rules.html
 [11]: http://developer.yahoo.com/yslow/

*(A related side-note: Yahoo released a [beta version of YSlow for Mobile][12] the day before this article’s posting. I downloaded it and believe me when I say that you should too). *

 [12]: http://developer.yahoo.com/blogs/ydn/posts/2011/06/yslowmobile/

## 4) YayQuery podcast with John Resig

[YayQuery][13] is an excellent jQuery podcast hosted by four jQuery experts: Paul Irish, Rebecca Murphey, Adam J. Sontag and Alex Sexton. jQuery creator John Resig appeared on the show in mid-2010, mostly discussing [jQuery Mobile][14].

 [13]: http://yayquery.com/
 [14]: http://jquerymobile.com/

Prior to jQ Mobile’s release, Resig did a boatload of mobile device research, all of it interesting, quite a bit of it surprising. He shared his findings during this podcast…it’s a must-watch.



## 5) HTML5 Boilerplate Build Script

[I’ve mentioned this before][15] but let me be crystal clear right now: HTML5 Boilerplate’s build script does an incredible job of optimizing site files. With a simple command line prompt (or Windows batch file), you can run all your site files through YUI Compresser, optipng, jpegtran and many other applications to dramatically reduce their file size. The end-result is a faster-loading site. 

 [15]: http://kaidez.com/html5-boilerplate-version-1/

Watch the Boilerplate how-to video..it’s well worth 28 minutes of your time:



Those are my biggies…feel free to share what you think are good mobile web development best practices because I can’t name them all!