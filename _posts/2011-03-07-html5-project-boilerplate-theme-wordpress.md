---
title: 'HTML5 Project: Boilerplate WordPress Theme'
comments: true
author: Kai Gittens
layout: post
permalink: /html5-project-boilerplate-theme-wordpress/
meta-excerpt: Walk-through of Aaron T. Grogg's excellent HTML5 Boilerplate-based WordPress theme. Includes a great admin screen for custom configuration.
category: coding-best-practices
cat-name: "Code Tips"
tags: [html5, wordpress]
---
*IMPORTANT: This article discusses [the HTML5 Boilerplate template][1] and assumes that you have, at least, a basic understanding of its page layout. I will discuss the layout in a very roundabout way, not in depth. I STRONGLY suggest that you not only [read the HTML5 Boilerplate documentation][2], but also [watch the really good 40 minute walk-through video of the code][3].*

 [1]: http://html5boilerplate.com/
 [2]: https://github.com/paulirish/html5-boilerplate/wiki
 [3]: http://kaidez.com/html5-boilerplate-video/

With [the wireframes][4] completed for the portfolio site for [my HTML5 Project][5], I’ve been researching the best way to use HTML5 page tags while developing within WordPress. 

 [4]: http://kaidez.com/html5-project-update-completed-wireframes/
 [5]: http://kaidez.com/html5-project/

My initial plan was to duplicate the default TwentyTen theme that comes with WordPress, then convert it to HTML5. I REALLY didn’t want to use a pre-built WP HTML5 theme, preferring to instead convert the  tags to HTML5 myself, learning things as I go. In other words, I wanted to figure out the answers to the test myself instead of copying off of someone else’s paper.

I was going to use [the excellent HTML5 Boilerplate][1] as a coding guide to hack TwentyTen up until I found [Aaron T. Grogg’s awesome Boilerplate Theme for WordPress][6]. Based on HTML5 Boilerplate’s structure and another WP theme called [Starkers][7], it does everything I need. It correctly inserts all the Boilerplate CSS and JavaScript files while providing a bare page code layout that forces me to figure things out on my own while coding. 

 [6]: http://wordpress.org/extend/themes/boilerplate
 [7]: http://starkerstheme.com/

The theme uses the same layout and external file structure that made HTML5 Boilerplate famous. Most notably…

*   the [Modernizr][8] JavaScript library for HTML5 & CSS3 feature detection
*   the JavaScript file for [YUI Profiler][9] to test page loads
*   the empty “script.js” file to be used for your own JavaScript code
*   the “plugin.js” file to be used to safely store third-party plugin code
*   the [HTML5 Reset Stylesheet][10] for CSS cross-browser compatibility
*   the two CSS files for both mobile and print layouts
*   the “viewport” meta tag which has many uses, including use within a [responsive web design][11] setup
*   the functionality that force-loads the most-recent IE rendering engine and Google Chrome Frame when needed
*   the conditional browser detection statements for loading the proper  tag and its respective classes

 [8]: http://www.modernizr.com/
 [9]: http://developer.yahoo.com/yui/profiler/
 [10]: http://html5doctor.com/html-5-reset-stylesheet/
 [11]: http://www.alistapart.com/articles/responsive-web-design/

Best of all, the Boilerplate theme installs a really good Admin panel under the appearance tab in WordPress. With this, you can pick and choose which files and functionality you want to include on your site. You don’t want to use Modernizr on your site? Un-check a box in the admin panel. Prefer to install and update jQuery core file on your own instead of the theme auto-installing it for you? Un-check a box in the admin panel. 

[View a screenshot of the Boilerplate Admin panel][12].

 [12]: http://kaidez.com/wp-content/uploads/2011/03/boilerplate.png

Boilerplate theme is really bare-bones, suiting all my development needs. This may be my main starter them for WordPress development from here on in.

WordPress research is done…***on to site mockups!!!!!***

*One final note: if I was still going to recode the TwentyTen theme into HTML5, I would follow the info in [Richard Shepard’s wonderful Smashing Magazine article on this topic][13]. I left a very polite comment that Boilerplate is already HTML5-ready and saves you the time…it got deleted. Glean from it what you will.* Update: March 7th, 2011: It’s since been put back.

 [13]: http://www.smashingmagazine.com/2011/02/22/using-html5-to-transform-wordpress-twentyten-theme/