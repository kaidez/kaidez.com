---
title: 2 Bad Things About the Facebook App Setup
comments: true
author: Kai Gittens
permalink: /2-bad-facebook-app-things/
layout: post
meta-excerpt: Creating a Facebook app is easy but doing so generates CSS expressions and creates page reflows, all of which reduce page optimization
category: coding-best-practices
cat-name: "Code Tips"
tags: [almay, facebook, practice]
---
# 

For the [Almay/Facebook][1] project I recently worked on, I had to create a Facebook app under their new set of rules, which was interesting.

 [1]: http://kaidez.com/almay-facebook-page/

Creating Facebook apps, which are basically web pages, used to require the Facebook Markup Language (FBML) which is simply a flavor of XML. Facebook recently changed this, saying that developers now simply need to create FB app web pages with HTML, CSS, JavaScript, etc., then host the pages on their own web server. These pages then get fed to Facebook via an iframe.

This is an easier web development process and all the page content displays fine. But I’m in a headspace of creating page code that’s as optimized and as fast-loading as I can get it….my current [“thinking mobile”][2] process. That being said, there are two things about the Facebook app setup which, I think, could be made better from a page optimization standpoint.

 [2]: http://kaidez.com/mobile-web-development-best-practices-starting-tips/

And it all points back to a JavaScript file named “all.js” that needs to be installed on your web pages in order for the app to work:

## 1. CSS Expressions

According to my app page’s [YSlow][3] report, this “all.js” file is capable of inserting three inline CSS expressions on to the page. Affecting Internet Explorer 8 and lower only, CSS expressions are CSS selectors that are updated and manipulated with JavaScript. Here’s the CSS expression example from [YDN page][4]:  
  
 {% prism css %}background-color: expression( (new Date()).getHours()%2 ? “#B8D4FF” : “#F08A00″ );{% endprism %}
  
Basically, this code updates the background color ever hour; however, it runs much more frequently then that. Simple things like scrolling and mouse movements can fire this code off, which slows down the page overall.

 [3]: http://developer.yahoo.com/yslow/
 [4]: http://developer.yahoo.com/performance/rules.html#css_expressions

This sucks, but no where NEAR as bad as…

## 2. Render Tree Reflows

According to Safari’s Activity Monitor, the “all.js” dynamically adjusts lots of DOM properties when scrolling the page. One simple scroll changed the following DOM properties on the fly:

*   `clientWidth`
*   `clientHeight`
*   `scrollLeft`
*   `scrollTop`
*   `offsetLeft`
*   `offsetTop`

Changing properties like this triggers a render tree reflow, the recalculation of a web page’s layout and geometry. All of this takes time and browser resources, meaning all of this slows down a page…no good.

Paul Irish discusses this in his most-recent how-to video, “HTML5, CSS3, and DOM Performance” that’s listed below. He alludes to Stoyan Stefanov’s brilliant [reflow/relayout article][5], which is the end-all-be-all discussion on the subject.

 [5]: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/



So Facebook apps are now easier to create but, I feel, still need improvement in terms of page optimization. Feel free to comment and agree or disagree.