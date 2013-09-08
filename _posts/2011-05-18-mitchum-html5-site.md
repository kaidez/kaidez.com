---
title: New Mitchum Project I Worked On
comments: true
author: Kai Gittens
layout: post
meta-excerpt: The new Mitchum site was developed with HTML5 using HTML5 Boilerplate, Visual Studio 2010 with NuGet, CSS and some light jQuery
permalink: /mitchum-html5-site/
category: personal
cat-name: "Personal"
tags: [css, jquery, mitchum, html5, microsoft, kai]
---

It has been INSANELY busy at work lately, hence, no blog posts in over a month. One of the projects that has literally kept me up late is the new Mitchum deodorant website. And yes, HTML5 was used.

[Mitchum][1], which is wholly owned by [my employer][2], launched a new site on Sunday, May 15, 2011. While Max over at [image0][3], set up the back-end development on Sitecore and managed the development process with Scrummy (check out his in-depth post about this [here][4]), I wired up the front-end code. As with [a previous site I worked on for my bosses][5], I just hooked up most of the front-end code and didn’t design it.

 [1]: http://www.mitchum.com/
 [2]: http://www.revlon.com/
 [3]: http://blog.image0.com/
 [4]: http://blog.image0.com/sitecore/inside-look-at-a-web-project/
 [5]: http://kaidez.com/almay-project-using-html5-net-jquery/

Despite the tight time constraint and late nights, this was a pretty easy project. I walked away with two major positives: I used a lot of cool new front-end development tools in my work and really refined the process of “thinking” like a developer.

Starting with the tools first…

## HTML5 Boilerplate
    
The Mitchum site marks the first time I’ve coded an HTML5 site from scratch and there’s no way in the world that I would’ve done it without [the HTML5 Boilerplate template][6]. While I didn’t use all of Boilerplate’s features, I did follow its best practices: CSS at the top, almost all the JavaScript at the bottom, creating browser-specific CSS based on the embedded classes in the body tag, etc. I didn’t use [Modernizr][7] as much has I’d hoped to but it’s there making all the HTML5 tags cross-browser friendly.
    
Prior to coding, I spent a fair amount of time reviewing [Ben Schwarz’s simplified HTML5 spec][8] and wireframed the page elements once the design was about 50% approved. I *think* that my code meets the spec, although there is an  tag structure in one spot that may be questionable and I should have used a  tag in the footer; I may have to clean these up a little further down the road.
    
As I neither designed nor own this site, I can’t confirm how close to spec my code is by sending it to [HTML5 Doctor][9] and [HTML5 Gallery][10].

## Visual Studio 2010 Ultimate
        
I’ve used Visual Studio web development tool pretty intensely for about six years and while I don’t know all the ins and outs, I’ll notice some differences when a new version comes out.
VS 2010 is faster, has a cleaner interface and is much more intuitive than its predecessors. Were it more LAMP-friendly, it would be my primary web dev tool.
        
As implied, I used HTML5 Boilerplate inside Visual Studio. Syncing these two things was achieved with…  
## NuGet
            
The best piece of knowledge that I walked out with at [MIX11][11].
            
NuGet is a Visual Studio extension that allows you to add, subtract and update tools and features within the IDE. The tools and features are compiled into [.NET packages hosted at nuget.org][12], and can be added to VS by either adding package references in the VS Tools menu or via the Package Manager command line tool that comes with the extension.
            
NuGet hosts a few different packages of HTML5 Boilerplate package so I added the one for web forms to my Visual Studio setup. The package contained an older version of jQuery so I updated it using NuGet as well. I’m also looking to clean up and optimize the code on the near future so I’m looking at some NuGet minify packages right now.
            
Simply put, NuGet is an incredibly awesome tool and I can’t visualize myself using Visual Studio without it. It also runs on Visual Web Developer but not WebMatrix or SharePoint Designer. It will, most likely, never run on the last two.
            
I saw a couple of NuGet demos at MIX11, with the best one being the demo hosted by Scott Hanselman and Phil Haack. Check it out [here][13]. The Silverlight’s pretty crappy though; I suggest watching the WMV with Window Media Player.   
            
As far as how I’ve been “thinking” like a developer, I have to jump back to MIX11:
            
Before attending the NuGet session at MIX11, I attended [Jeff Croft’s][14] session on being a designer/developer hybrid. During the Q&A panel, I asked him if thought that mobile was driving people to be both designers and developers since mobile puts less emphasis on design. He provided a very simple answer, which I’m paraphrasing here:
            
            
> *“Mobile may be pushing some in directions where they need to be both designers and developers, but they’re directions that we should have been going anyway. We need to be thinking about developing for many devices.”*
            
I was somewhat applying this mindset to my work before he said this but his answer forced me to make this mindset conducive to my nature, starting with Mitchum. I really thought about image optimization, cleaner CSS and smaller external files during this project, doing whatever it takes to make the site load faster.
            
Factor in all the reading on mobile design and media queries that I’ve been doing on my own lately, and I really believe that all designers and developers should think this way-strive to create clean, optimized code that work on as many devices as possible. It will better prepare us for the future and is how I’m living my life moving forward on all of my work.
            
Coding Mitchum was a good project for me…I’m glad I did it.
            
Again, check out Max’s post [here][4] to see what he did on the back-end.

 [6]: http://html5boilerplate.com/
 [7]: http://www.modernizr.com/
 [8]: http://developers.whatwg.org/
 [9]: http://html5doctor.com/
 [10]: http://html5gallery.com/
 [11]: http://kaidez.com/at-mix11/
 [12]: http://nuget.org/
 [13]: http://channel9.msdn.com/Events/MIX/MIX11/FRM09
 [14]: http://jeffcroft.com/