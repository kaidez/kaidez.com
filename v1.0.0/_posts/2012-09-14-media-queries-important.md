---
title: Media Queries Are Important
comments: true
author: Kai Gittens
layout: post
meta-excerpt: CSS3 media queries can help sites perform better in Google search results and the W3C officially recommends them as a web standard.
permalink: /media-queries-important/
category: coding-best-practices
cat-name: "Code Tips"
has-home-img: HP-media-queries.jpg
tags: [css3, media queries, best practice]
---

CSS3 media queries have become a hit in recent years thanks to the increased popularity of responsive web design, which [I’ve previously written about][1]. This popularity is set to increase even more thanks to recent actions by Google and the W3C.

 [1]: http://kaidez.com/html5-project-update-responsive-web-design/

On June 6, 2012 via their [Webmaster Central Blog][2], Google stated that sites well-optimized for mobile have “the best chance of performing well in Google’s search results,” making it clear that using media queries is the ideal way to optimize things. Thirteen days later, [the World Wide Web Consortium (W3C) formally recommended media queries as a web standard][3].

 [2]: http://googlewebmastercentral.blogspot.com/2012/06/recommendations-for-building-smartphone.html
 [3]: http://www.w3.org/TR/css3-mediaqueries/

To be clear about Google’s statement: **they have given absolutely NO indication that building your site with media queries will make it rank higher in Google’s search results, it just gives your site a better chance of that happening**. I’ll discuss this in-depth later but don’t let this keep you from using them on your site, because **these recent moves by Google and the W3C have placed a high premium on media queries as they pertain to proper web development**.

Let’s discuss the W3C’s actions first and they need to be placed in their proper context…

## The W3C & Media Queries

The W3C is the web standards watchdog, doing its best to enforce them globally. A potential standard goes through five phases of approval: “Working Draft,” “Last Call Working Draft,” “Candidate Recommendation,” “Proposed Recommendation” and “Recommendation.” There is some variation among the various standards committees but they all share these five phases. 

Nothing reaches Recommendation status until all of its features are 100% implemented in at least two web browsers and if you’re familiar with the [Browser Wars][4], you know that’s an uphill battle. Case in point: the CSS2 specification was released in 1996 but didn’t reach Recommendation status until 2011.

 [4]: http://en.wikipedia.org/wiki/Browser_wars

The W3C wanted CSS3 to gain Recommendation status at a faster pace than earlier versions so [they decided to break CSS3 into separate modules][5]. This meant that instead of the world waiting for the entire spec to go to Reco, the modules could reach the status on their own. The decision was a smart one and allowed media queries to go to Recommendation quickly.

 [5]: http://www.w3.org/Style/2011/CSS-process

By being defined as a web standard, media queries are now seen as a key component in making your site widely accessible. The more accessible it is, the more end-users who can access it on a variety of devices. People can view your site on smartphones, laptops, desktops, e-readers, gaming consoles, etc…yes, [people do browse sites on gaming consoles][6]. Making sure that *anyone* can view your site on *any device* is a good goal for you to have as a site owner.

 [6]: http://www.alistapart.com/articles/testing-websites-in-game-console-browsers/

In truth, this was a no-brainer move for the W3C. Layout-based media queries have been an immediate hit with developers, mostly due to [Ethan Marcotte’s set of ALA articles][7]. Their rise in popularity [caused most modern browsers to support them][8] before the spec even went to Reco.

 [7]: http://www.alistapart.com/authors/m/emarcotte
 [8]: http://caniuse.com/css-mediaqueries

It was Google’s move that was a surprise but, if you look some of their recent actions, not a big one.

## Google & Media Queries

The primary thing that helps your site achieve high rankings in Google’s search results is to produce high quality content and, in all fairness, the process by which Google determines content as high quality is pretty fair. The second thing, which most ignore, is to make the content as easy for Google to find and understand as possible.

If you have both a desktop and mobile version of your site, Google must crawl both versions, parse them, then decide how to properly index each site if they ever need to list the sites in their search results. It takes Google more time to do this for two sites than it would for one site.

A responsive website built with media queries keeps both the desktop and mobile versions under one URL, reducing the amount of time it takes Google to find and parse content. And if you make it easy for them, they’ll *try* help you as best as they can.

This action falls in line with Google’s growing love affair with fast-loading sites. They’ve invested heavily in their [PageSpeed suite of site optimization tools for web developers][9] and grabbed site speed guru [Steve Souders][10] from Yahoo. Plus, they announced in 2010 that [a fast-loading site *can* get a higher search rank][11]. While it carries a low weight and affects less than 1% of sites, the sum is greater than the parts. Because site speed matters so much to mobile devices, Google is paying strict attention to it at a much higher level than their competitors. 

 [9]: https://developers.google.com/speed/pagespeed/
 [10]: http://stevesouders.com/
 [11]: http://googlewebmastercentral.blogspot.com/2010/04/using-site-speed-in-web-search-ranking.html

Media queries are part of that sum but I’ll say it again: don’t take this to mean that a media query-enabled site guarantees you high search engine rankings. The link above where Google praises media queries also states that they understand that “it may not be possible or appropriate to use responsive web design” in certain situations. They offer site optimization tips for just such situations, which they wouldn’t do if they wanted to penalize sites for not using media queries.

## This is all a big deal

A web dev-based blog post like this is basically a time capsule: a snapshot of what’s going on at a certain period of time. If this post survives the test of time and is still on the interwebs 20 years from now, people will look at it then and say, “how quaint.”

So why create this post? Because the actions of Google and the W3C just made media queries a big deal *right now* and that needs to be screamed from the rooftops. The W3C has deemed it that MQs make can make sites more accessible. An accessible site makes Google’s job easier, so much so that they’ve flat-out told us that they care about the accessibility potential of media queries and want us to use them. We have been given a clear roadmap to making better websites with these statements…I’m skeptical that enough people are on the right path.

I don’t think building, or rebuilding a site with media queries is easy. To the contrary: it’s incredibly tough! But some good reasons have just come up why you should at least consider using them, even if it means rebuilding your site from the ground up.

Of course, you may do some research and decide that a media query-enabled website is not for you, and that’s perfectly fine. Not using media queries is not a sin: not realizing their importance is.