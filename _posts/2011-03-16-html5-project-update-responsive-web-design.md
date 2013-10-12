---
title: 'HTML5 Project Update: Changing To A Responsive Web Design Using CSS3 Media Queries'
comments: true
author: Kai Gittens
layout: post
meta-excerpt: An article on responsive web design, CSS3 media queries and using it in kaidez's HTML5 Project, resource list of links at the end
permalink: /html5-project-update-responsive-web-design/
category: coding-best-practices
cat-name: "Code Tips"
tags: [rwd, html5, media queries]
---
In 2005, Jesse James Garrett wrote [an excellent article describing and coining the term “Ajax.”][1] He demonstrated Ajax as a method of using multiple web programming languages to neatly load content onto a web page *without* actually refreshing the page.

 [1]: http://www.adaptivepath.com/ideas/essays/archives/000385.php

It’s tough to accurately describe this functionality to people not familiar with web development, and it’s even tougher for those people to actually *visualize* this functionality in action (although [this page will help you][2]). But trust me, Garrett’s article changed the game for web programmers. Ajax stretched the imagination of designers and developers, showing them the seemingly infinite list of possibilities of what they could do when creating web applications. 

 [2]: http://kaidez.com/ajax-jquery-html5-work-together/4/

Google has given us the most widely-used Ajax applications: Gmail, Maps and their [Suggest functionality][3], just to name a few. And many others besides Google have given us great Ajax applications as well but the point is, Garrett’s article got the creative juices flowing for lots of designers and developers. By showing them what was possible, he made them rethink their entire creative process.

 [3]: http://en.wikipedia.org/wiki/List_of_Google_products#Suggest

What Jesse James Garrett was to Ajax, [Ethan Marcotte][4] may end up being to *responsive web design*. The title of [his widely-cited *A List Apart* article][5], responsive web design is a big buzz phrase among the early adopter segment of the design/development body politic. And although there are concerns about its implementation, many of them valid, **responsive web design is an unquestionably forward-thinking concept**.

 [4]: http://ethanmarcotte.com/
 [5]: http://www.alistapart.com/articles/responsive-web-design/

Inspired by modern architectural theory, responsive web design uses CSS3 to detect the width of a device…a web browser, a tablet, a smartphone…whatever. Combine this detection process with traditional CSS techniques for positioning page elements, and **you’re able to create *one* website that neatly displays on *all* devices.**

I’d like to present this as an opportunity to our team at work, but I need to develop and test out code on my own first. So I may adjust the portfolio for [my HTML5 Project][6] to accommodate a responsive web design. Doing this requires my understanding of the process...here’s what I’ve learned so far.

 [6]: http://kaidez.com/html5-project/

### Setting Up CSS For Responsive Web Design

*Media queries*, a part of the new CSS3 specification, are the linchpin of responsive web design. They’re set up when you link stylesheets to your web page and look somewhat like this:
{% prism markup %}
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">
 
<link rel="stylesheet" media="screen and (min-width: 600px)" href="large.css" /> 

<link rel="stylesheet" media="screen and (max-width: 320px)" href="smartPhone.css" />

<link rel="stylesheet" media="screen and (max-width: 600px)" href="tablet.css" /> 
{% endprism %}

With this code in mind, let’s look at the following scenario:

*   you want a wide desktop web browser to load the “large.css” file, which displays a certain text block on your site with a left-aligned, 14 point font
*   you want a skinny iPhone web browser to load the “smartPhone.css” file, which displays the same text block on your site with a right-aligned, 6 point font
*   you want a semi-wide iPad web browser to load the “tablet.css” file, which displays the same text block on your site with a center-aligned, 10 point font
*   no problem for either bullet point…the previously-mentioned coding method will detect the device’s width, then apply the device’s proper CSS file

### Browser Detection

Before we discuss how all this works, let’s look at responsive web design in action. Since not every browser supports this functionality, I need to check out your browser first...

**It looks like you’re not using Internet Explorer 8 or lower** so you should be able to view this demo with no issues. But if you’re using a really old version of either Firefox, Safari, Opera Mobile or Opera Mini, you may need to update it.

### Sample Site

There are quite a few sites supporting a responsive web design, but I really like what web developer Chris Pederick has done with his site. So [let’s open that site up in a separate browser][7].

 [7]: http://chrispederick.com/

Now spend a few seconds clicking-and-dragging the bottom right corner of your browser to resize it. Notice how the page elements reformat themselves so that they neatly display on the page…regardless of its height and width.

Set your browser dimensions up so that it’s vertical like a skyscraper. Notice how the elements neatly adjust to fit on the page. You’ve just previewed how this site would look on an iPhone or Android.

Welcome to responsive web design!!!

### How Responsive Web Design Works

As I see it, responsive web design must utilize the following:

*   #### Media Queries
    Repeating myself here…a part of the new CSS3 specification that handles both the device detection process and the proper CSS file-loading based on that detection.

*   #### Fluid Grids
    Referring to [another Marcotte article over on *ALA*][8], fluid grids teach you how to apply 8th grade algebra to create CSS that neatly readjusts page elements, making things more responsive.

*   #### Fluid Images
    Marcotte whipped up some spiffy JavaScript code to properly resize images on responsive design sites. [Read about it on his Unstoppable Robot Ninja site.][9]
* #### The Viewport Meta Tag
    Needed when creating a site for any iOS device, i.e., the iPad and the Phone. It looks like this...

{% prism markup %}
<meta name = "viewport" content = "width = EnterYourOwnWidth">
{% endprism %} 

It’s good to know how the Viewport meta tag works so [read up on it over at the Apple Developer site][10].

*   ***Added Bonus:*** 
#### Marcotte’s Responsive Images JavaScript Library
    Another way to make images more responsive. It’s part of a project that Marcotte did for Filament Group and performs the same functionality as the code over at Unstoppable Robot Ninja, but does so with an external JavaScript library. [Check it out over at GitHub][11].
                
    This method doesn’t work on all browsers as of this article and also requires tweaking the .htaccess file, something I’ve never felt comfortable doing. But [the demo][12] shows that it works well in the browsers that it does support.

### Responsive Design Issues
                
But as I said earlier, there are issues, the main one being site optimization.
                
Let’s look at my previous code, without the viewport meta tag:              
                
The code above will detect a device’s width, then apply the proper CSS file. But while it will apply only one CSS file, it loads all three at once. The fact that you don’t use these files doesn’t matter-they will still load onto your computer. So your computer is loading resources it doesn’t need and won’t use, making things a little sluggish. 
                
Also, while either of the fluid image above techniques seem to work well, there’s a chance that you’ll want to load individual images for each stylesheet. Again, depending on which stylesheet is applied, you’re loading things that you don’t need. 
                
This loading of extra, unused resources may not be a big deal if you’re browsing a responsive-designed site on a ethernet cable-connected computer; however, a wireless device (especially one on a public network) will probably have issues.
                
A simple Google search brings up quite a few articles against issues with responsive web design, [the biggest one coming from web developer Jason Grigsby][13]. My suggestion is to read the negative articles on the subject as well as the positive ones, the Grigsby one at least.
                
Despite the articles showcasing the problems, there are quite a few articles providing workarounds to the problems. For starters, Amsterdam-based developer Peter-Paul Koch (aka PPK) counters Grigsby’s article quite nicely with [this article at his Quirksmode blog][14]. And let’s remember that Marcotte supplied both the fluid image code snippet and responsive image JavaScript library mentioned above: when these are applied properly, there’s no need to use multiple images per device. Plus, [Kayla Knight’s responsive web design guideline article over at Smashing Magazine][15] provides some techniques for dealing with the multiple CSS file calls. 
                
### Conclusion
                
So, yes, the responsive web design concept is new. REALLY new. I do see its promise but am not ready to recommend as “development best practice” at work until I get my hands dirty with it on my own first.
                
So, again, I’m now researching the possibility redoing [my HTML5 Project wireframes][16] to fit a responsive design so I can fully understand this concept. This will take time but I’m will to work as long as possible to get this done.
                
### Resources
                
There are tons of responsive design resources…here’s a complete list of ones that have helped me. Some of these resources have already been mentioned:
                
*   [Ethan Marcotte’s original “Responsive Web Design” article at A List Apart][5]
*   [Marcotte’s “Fluid Grid” article, also over at A List Apart][8]
*   [Marcotte’s great fluid image JavaScript code over at his Unstoppable Robot Ninja site][9]
*   [Marcotte’s responsive image JavaScript library over at GitHub][11]
*   [“Responsive Web Design” episode at “The Big Web Show,” featuring Ethan Marcotte][17]
*   [Stephen Hay’s “Real-world Responsive Design” lecture at the 2010 Fronteers conference][18]
*   [PPK’s “Combining media queries and JavaScript” over at his blog][14] 
*   [Viewport meta tag documentation for iOS on the Safari Web Content Guide][10] 
*   [Jason Grigsby’s “CSS Media Query for Mobile is Fool’s Gold” article over at his blog – an argument against responsive web design][13]
*   [*CSS3 First Look* course over at lynda.com, which includes a GREAT chapter on media queries][19] 
*   [Kayla Knight’s “Responsive Web Design: What It Is and How To Use It” article over at Smashing Magazine][15]
*   [Rachel Andrew’s “How To Use CSS3 Media Queries To Create a Mobile Version of Your Website” article, also over at Smashing Magazine][20]
*   [The LESS framework-a pre-built template for creating responsive web design sites][21]
*   [mediaqueri.es – a GREAT gallery of responsive web design sites][22] 

**Extra:** As of this article, Ethan Marcotte is set to release a book entitled (surprise!) [“Responsive Web Design” via A Book Apart][23] in a few monthsextension of his two ALA articles along with new content. To be alerted when it’s released, either sign up for their newsletter at the previously-mentioned link or [follow A Book Apart on Twitter][24].
                    
Feel free to share any responsive web design resources that you like…and your comments!!!! Responsive web design is new so the more info that goes around, the better for all of us.

 [8]: http://www.alistapart.com/articles/fluidgrids/
 [9]: http://unstoppablerobotninja.com/entry/fluid-images/
 [10]: http://developer.apple.com/library/safari/#documentation/appleapplications/reference/safariwebcontent/UsingtheViewport/UsingtheViewport.html
 [11]: https://github.com/filamentgroup/Responsive-Images
 [12]: http://filamentgroup.com/examples/responsive-images/
 [13]: http://www.cloudfour.com/css-media-query-for-mobile-is-fools-gold/
 [14]: http://www.quirksmode.org/blog/archives/2010/08/combining_media.html
 [15]: http://www.smashingmagazine.com/2011/01/12/guidelines-for-responsive-web-design/
 [16]: http://kaidez.com/html5-project-update-completed-wireframes/
 [17]: http://5by5.tv/bigwebshow/9
 [18]: http://vimeo.com/15986231
 [19]: http://www.lynda.com/CSS-training/css3-first-look/73288-2C.html
 [20]: http://www.smashingmagazine.com/2010/07/19/how-to-use-css3-media-queries-to-create-a-mobile-version-of-your-website/
 [21]: http://lessframework.com/
 [22]: http://mediaqueri.es/
 [23]: http://books.alistapart.com/products/responsive-web-design
 [24]: http://twitter.com/#!/abookapart