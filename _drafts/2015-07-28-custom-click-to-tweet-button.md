---
title: "TUTORIAL: Create Custom 'Click to Tweet' link with JavaScript"
comments: true
author: Kai Gittens
layout: post
meta-excerpt: "Create an optimized, dynamic Click to Tweet link with JavaScript. Includes a demo and code samples."
permalink: /click-to-tweet-link/
has-home-img: click-to-tweet.jpg
category: tutorial
cat-name: "Tutorials"
tags: [tutorials]
---
<a href="#" class="demoLink" target="blank">VIEW THE DEMO</a>
Click to Tweet links are a highly-recommended method for promoting your site's content. Placing a link at the end of your content that politely asks readers to Tweet it through their personal Twitter accounts has proven to be effective way of spreading your message.

I'm redesigning my blog in WordPress at the time of this post and wanted to add this functionality to the new design. I wanted the code optimized to run as fast as possible, so I used JavaScript to create this functionality instead of depending on a WordPress plugin...meaning __this code can work outside of WordPress__.

<h2 style="clear:both;">Table of Contents</h2>

1. [Some Notes](#notes)
2. [Why Is This Optimized?](#optimized)
10. [Conclusion](#conclusion)

<a name="notes"></a>
## Some Notes
While this code can work *outside* of WordPress, It does assume that it should work dynamically. The Click To Tweet functionality discussed here uses JavaScript (and SOME jQuery) to find already-existing web page elements, add attributes to them and set up click events...very dynamic. If you want to hard-code a Click to Tweet link, I suggest reading [Guillaume Piot excellent tutorial](http://gpiot.com/blog/elegant-twitter-share-button-and-dialog-with-jquery/ "Read Guillaume Piot's Click to Tweet tutorial"), which was the main source of inspiration for my code.