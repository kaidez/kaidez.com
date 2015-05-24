---
title: "AJAX Tutorial Update"
comments: true
author: Kai Gittens
layout: post
meta-excerpt: kaidez's old AJAX tutorial was updated. jQuery AJAX is discussed in depth and there's a short discussion on JavaScript Promises.
permalink: /update-ajax-tutorial/
category: personal
cat-name: "Personal"
has-home-img: ajax-image.jpg
tags: [ajax, javascript, kaidez]
---
Happy 10th Birthday AJAX!!!!

Ten years ago today, web developer [Jesse James Garrett wrote his ground-breaking AJAX article](http://www.adaptivepath.com/ideas/ajax-new-approach-web-applications/) and changed the world in the process. At least the world of web development.

If you're reading this and are a non-technical person, understand that AJAX described an efficient method to load content onto a web page.  This method *would* come about eventually...the Internet was evolving towards it.

But *if* AJAX didn't happen for some bizarre reason, then the growth of the Internet would have stagnated. And Facebook, Twitter, Instagram, Foursquare, Pinterest, Apple and Google (*especially* Google) wouldn't have enjoyed the success they're enjoying today.

I have a really old AJAX tutorial that's in need of a serious update. So in honor of this birthday, I'm releasing [an updated new, in-depth AJAX tutorial](/ajax-tutorial/).

A preamble...

Every January 1st, I review my site's traffic for the previous year. For the past two years, my tutorial titled ["How AJAX, HTML5 and jQuery Work Together"](/ajax-jquery-html5-work-together/) is always close to the top.

Again, this article is old...it was published on January 11th, 2011. Looking at it from that point a view, the article has some issues:

* I readily admit to doing some keyword stuffing for this post. I didn't need to mention "HTML5" in the article because you can do AJAX stuff without it. HTML5 was a hot topic at the time and although I did tie it to AJAX, I didn't need to.

* The old post discussed jQuery's AJAX functionality when jQuery was at version 1.4.4. But when jQuery went to 1.5, its AJAX engine got a major rewrite. It was made to be faster and also introduced the concept of Promises via its AJAX-based jqXHR object.  jQuery's use of Promises is controversial, but still worth knowing.

Another issue: Google Analytics showed that this post received little engagement despite the high traffic it was getting. People were staying on for a few seconds at most, no one shared it on social networks or linked to it.

My tutorial on [removing files from GitHub](/remove-files-from-github/) was in the exact same position and I rewrote it in the hopes of increasing engagement...[read about that here](/github-tutorial-update/). I got to the point of the tutorial much quicker, made the content more "scannable", removed the images and used shorter words where possible.

__The result of all this was an average of 1.5+ minutes more spent on the page and more Twitter shares__.

I'm happy with that.

All this showed me that it's worth it to rewrite a post when the numbers indicate it, so I rewrote the AJAX post as a direct result. There are a few significant changes:

* Where I shorten the GitHub post's content, the new AJAX page's content is longer...much, much longer. I'll concede this is a bit of a risk so in order to make things as easy to read as possible, I included a very scannable in-page navigation, added links throughout the post which jump back to the navigation, performed readability tests with [Readability Score](https://readability-score.com/) and used as many short words as possible.  All told, it took me a month to rewrite this tutorial to the point that I was 100% comfortable with its content.

* Focused more on jQuery's excellent AJAX functionality and discussed its (controversial) Promise functionality.

* Included lots of demos that can be viewed as well as [downloaded from GitHub](https://github.com/kaidez/ajax-tutorial-samples).

* I'm trying to get the search engines to view this page as "cornerstone content", content that represents the best of the best on my blog. In that scenario, it's best to treat the content as a "page" and not a "blog post". I did this by changing things around in my site structure as well as link to this article in the site's main navigation, all in the hopes of the search engines understanding that this content is top-notch. Yoast has [an excellent post on setting up cornerstone content](https://yoast.com/cornerstone-content-rank/).

* As a sidenote, the site navigation was redone overall. Along with adding a direct link to the AJAX tutorial, the various site categories and are condensed under a single "BLOG" link. I've also directly-linked to my site's newly-created "ARTICLES" section, which contains content that I consider high-quality. For now, this section just contains the AJAX tutorial and the page that discusses my lynda.com courses, which is also placed as a link in the main navigation. These two articles are things I'm trying to monetize so I'm trying to make them as high-profile on my blog as possible.

* Speaking of monetizing things, I farmed myself out a little with this tutorial by advertising it on both Twitter and Facebook. Don't know how this will go but I'll be watching.

I wanted to discuss jQuery Promises a little more and discuss [XHR2](http://www.w3.org/TR/XMLHttpRequest2/), but all this would make the article longer than it already is and I want to avoid that. If this tutorial is well-received, I'll update things and consider adding those things.

Finally, if you read this I'm REALLY curious about your feedback. Is it too long? Too short? Is an important part not covered? Or covered too much?

Please let me know by either add a comment to this blog post or created an issue in [the tutorial's issue tracker](https://github.com/kaidez/ajax-tutorial-samples/issues).

Now, please check out the updated [AJAX beginners tutorial](/ajax-tutorial/).
