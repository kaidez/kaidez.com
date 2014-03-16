---
title: New Almay Project I Worked On
comments: true
author: Kai Gittens
layout: post
permalink: /almay-project-using-html5-net-jquery/
meta-excerpt: Kaidez developed four micro-sites for Almay using HTML5 video, jQuery, .NET and CSS
category: personal
cat-name: "Personal"
tags: [almay, css, .NET]
---
[Almay][1], which is wholly-owned by [my employer][2], launched four new products this week:

 [1]: http://almay.com/
 [2]: http://revlon.com/

*   [almay wake-up™ makeup][3]
*   [almay intense i-color smoky-i™ kit][4]
*   [almay smart shade smart balance™ powder][5]
*   [almay one coat get up and grow™ mascara][6]

 [3]: http://www.almay.com/microsites/WakeUpMakeup/Default.aspx
 [4]: http://www.almay.com/microsites/IICSmokyIKit/Default.aspx
 [5]: http://www.almay.com/microsites/SmartShadeBalance/Default.aspx
 [6]: http://www.almay.com/microsites/GetUp/Default.aspx

Each product required a unique micro-site: the other web designer mocked them up in PhotoShop, I then converted the design to page code with CSS, .NET, jQuery and HTML5. Visual Studio 2008 was my development environment.

Breaking down my code…

### CSS

All the microsites shared the same skeletal layout so I created a global CSS template for this in about two hours. 

### .NET

For each individual micro-site, almost all of their pages shared the same header and product shot: I dumped this into a user control.

### jQuery

The client wanted a fade-in/fade-out animation on each micro-site home page so I used (surprise!) the fadeIn() and fadeOut() functions embedded in jQuery. I also used jQuery to create a much more effective rollover for all the micro-site navigations.

### HTML5

Some micro-site pages displayed video and the client requested that it display on mobile phones. This gave me an opportunity to use the  tag in my work. This was…interesting.

Working with .NET was very rewarding. I’ve been working in Visual Studio for a little over five years now and am comfortable doing so, but it was the first time that I created user controls from the ground up. I had figure out how to place them on the page and how to tweak their various CodeBehinds, so I got a really good feel for how .NET works as a whole.

Working with HTML5 video was just as rewarding and I’m glad I did it, but it was definitely a learning experience. The client requested that videos display on as many mobile devices as possible, so I had to figure out a lot of things on the fly. It was frustrating at times but I’m glad I went through the process.

Starting next week, I’ll be posting tutorials for my jQuery code, which was very easy. I’ll also be discussing my HTML5 video findings, which were…interesting.