---
title: 5 Reasons To Design Websites For Internet Explorer 6
comments: true
author: Kai Gittens
permalink: /reasons-design-websites-internet-explorer-6/
layout: post
meta-excerpt: HTML5 Gallery, mostly maintained by the HTML5 expert over at HTML5 Doctor, is added to kaidez.com's Coolsite list
category: coding-best-practices
cat-name: "Code Tips"
tags: [Internet Explorer]
---
# 

Bring up Internet Explorer Version 6 to a seasoned web designer and you’ll get an earful.

Real quick: Internet Explorer 6, or IE 6, is exactly as its name implies. It’s the sixth version of Microsoft’s Internet Explorer browser….it’s REALLY old! 

Whenever a web designer designs a website, there’s a 70/30 chance that IE6 will not display the design properly. And since there are quite a few people out there still using it, some designers feel obliged to write extra code to insure that IE6 displays things right. 

There’s a strong belief that web designers should ignore this obligation and simply stop coding for IE6 when creating websites, hereby forcing those still using it to stop. My boss and I have had an on/off discussion in recent months and he somewhat supports this view.

Nevertheless, I see a few benefits for continuing to code for IE6:

## 1. It Keeps My Coding Skills Sharp

Developing for IE6 is one of the main ways I practice web development. It keeps me sharp and forces me to solve problems on my own, and I take that characteristic to other aspects of web dev.

## 2. Coding For IE6 Provides Better Customer Service To Clients

Again, there are still a lot of folks using IE6: you may be surfing the web on your shiny new iPad, but your mother-in-law is probably still using her seven year-old Gateway to do the same thing, and is probably using IE6. I have a freelance client with a Canada-based online business and data shows that their clients still use IE6.

The ability to tell a client that you can build their site to look good for end users like the ones just mentioned is going above and beyond for the client: that’s providing *great* customer service. And if you’re an entrepreneur, providing great customer service should be one of your goals.

## 3. CSS Is The Only Real IE6 Issue

CSS is the primary code used to layout a web page and the fact that IE6 renders it improperly is the main issue that people have with the browser. But IE6 doesn’t really have issues with other coding platforms. It still renders Flash properly as well as dynamic applications developed in PHP and .NET. Most notably, JavaScript is fine with IE6 for the most part so there are no real issues with things like jQuery and MooTools.

## 4. No AJAX Issues

This is a sort of continuation of the point above but it bears having its own section. The AJAX concept is JavaScript-based but it’s the XMLHttpRequest object that really makes the concept work. XMLHttpRequest was introduced by Microsoft when it released Internet Explorer 5, so any AJAX issues in IE6 are small and manageable.

## 5. HTML5 And CSS3 Can Be Dealt With In IE6

The [Modernizr][1] JavaScript library deals with rendering HTML5 sites properly in IE6. And the recently released, very cool [CSS3 PIE][2] helps out with CSS3.

 [1]: http://modernizr.com/
 [2]: http://css3pie.com/

I know that I’m committing web designer heresy by suggesting that we should still code for IE6 so feel free to disagree with me here.

On a related side note, Smashing Magazine posted [an excellent HTML5/CSS3 article][3] that included a discussion why it’s not good to code for every browser.

 [3]: http://www.smashingmagazine.com/2010/12/10/why-we-should-start-using-css3-and-html5-today/