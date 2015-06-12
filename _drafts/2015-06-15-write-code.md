---
title: "Write Code Every F#%king Day!"
comments: true
author: Kai Gittens
layout: post
meta-excerpt: "Writing code every day, especially JavaScript, teaches you to solve problems: the KEY skill-set needed to be a web developer."
permalink: /write-code-every-f--king-day/
has-home-img: git-contrib-map.jpg
category: personal
cat-name: "Personal"
tags: [personal]
---
I've been thinking about this particular post for a few months now. My initial plan was to make this my 100th post, marking that milestone as a time to review my growth as a web developer.

But some satisfying events during my first month at [my new job](/revlon/ "Read about kaidez leaving Revlon") have forced me to publish it now in the hopes it will help other web devs, especially beginning ones. The things discussed here have helped me grow as a developer in more ways then I can count.

Other developers like [Christian Heilmann](http://christianheilmann.com/2013/05/10/justcode/ "Read '#JUSTCODE' by Christian Heilmann") and [John Resig](http://ejohn.org/blog/write-code-every-day/ "Read 'Write Code Every Day' by John Resig") have discussed these things before, and probably more elegantly than I'm about to discuss them here. But these things must transcend to all developers, so one more blog post about them won't hurt.

Simply put: write code every day.

Every.

F#%king.

Day.

## About the new job
As mentioned in my last post, I took a front end dev job at a health and wellness-based digital company called [Everyday Health](http://www.everydayhealth.com/ "Visit Everyday Health") where I perform a variety of web stack-based tasks. By web stack, I mean I work primarily with HTML, CSS and JavaScript.

The first tasks I was giving were bug fixes, JavaScript and CSS ones. I also had to rewrite some HTML for the sake of cross-browser/device compliance, but I started off by dealing with those bugs. 

Then I was handed a project where I had to refactor some JavaScript related to the redesign of a web form. This was obviously tougher than the bug fixes.

I've always been a bit insecure about my web stack skills being up to par, specifically the JavaScript one. JS is an anomaly that seemingly goes through changes every minute, so I've always been a little worried as to whether or not my JS skills were up-to-date.

And I went into the new job with this concern but a funny thing happened. I was able to do everything I was asked to do.

I'm not saying that the bugs were so easy that a five-year old could fix them (they weren't), or that finishing the refactor makes me the world's greatest web developer (it doesn't). I saying to say that I wasn't intimidated by tasks I was given because my skills are better than I'm giving myself credit for.

## Why are my skills are better than I'm giving myself credit for?

I am 100% convinced that my ability to do the job with no issues is a result of a decision I made months ago to try write at least one piece of web stack code a day. I missed some days but I've mostly followed through with this decision.

Some of that code was for work, some of it was for [the lynda.com courses I created](/lynda-kaidez/ "Read about the lynda.com courses I created"). A lot of it was just my trying out some new tool or framework, or playing with a specific part of the JavaScript core API.

And in many cases, the daily code I wrote required I learn something I didn't know before. Promises, complex JavaScript inheritance, web components, developing in a Node environment, etc.

But I wrote a lot of code...lots and lots and lots of code. Here's a recent snapshot of my GitHub commit map that proves it:

<figure style="text-align: center; margin:50px 0;">
  <img src="/img/git-contrib-map.jpg" class="imgBorderMaxWidth" alt="kaidez GitHub Contribution Map" /> 
  <figcaption style="margin:20px auto 0;"><em>Includes private repos...</em></figcaption>
</figure>


As a result of all this, here's what happened at the new job:

* parsing a complex JSON API to load content onto a page wasn't a problem for me.

* using jQuery to manage state and data instead of using it to make fancy fade-ins wasn't a problem for me.

* fixing a cross-browser error related to CSS transitions wasn't a problem for me.

* writing feature detection in pure JavaScript instead of using Modernizr to do it wasn't a problem for me.

* creating responsive web design code without using something like Bootstrap or Foundation wasn't a problem for me.

By writing code for free before on my own time before asking to be paid to do it, I was well-prepared for my new job. 

## You are a Web ~~Developer~~ Engineer
I also learned about a lot of crazy code quirks problems while doing my daily coding. In fact, lots of the previously-mentioned bugs I had to fix were done by remembering what I did to solve these problems.

This is __the__ most important thing I want you take away from this post: _a big part of a web developer's job is solving problems._ I think it's easily 75% of the job while, at the same time, think it's the most under-spoken part of it.

It's a given skill-set for engineers of all types however...mechanical, electrical, etc. The railroads built in across the continental United States in the mid-1800's wouldn't have come to be without engineers....someone had to solve the problem of laying flat tracks across the the Rocky and Appalachian mountains. 

Since solving problems is a big part of what we do, I'm now uncomfortable with the term "web developer" and think "web engineer" better describes our jobs. But solving problems doesn't mean that we're _just_ bug-fixers.

We are also architects that get to build cool things with code, but our jobs require us to be engineers when we build the cool things.  We need to not only solve problems with the things we build, but we need to anticipate them before we start building in the first place...as engineers do.

## Where do you go from here?

You go and start coding...this is what helped me:

* __Track your progress with GitHub__: building up that above commit map was a nice way to track the progress of my daily coding.  Lengthening my "Current Streak" as much as I could was always a nice pat on the back I gave myself.

* __Write a lot of code, but make sure you maintain a work/life balance__: [I tweeted about coding everyday once](https://twitter.com/kaidez/status/596670528515104768) but Christian Heilmann chimed in saying that a social life is also needed. I didn't say that in my original tweet but do agree with him. Too many programmers code morning, noon and night while sacrificing their social life.  To be clear I DEFINETLY don't recommend that.

* __Learn tooling while you lean code__: I had to understand the web stack to fix those work bugs but also had know about preprocessors like Sass, browser-based package managers like npm and build tools like Gulp. And I wouldn't have gotten this job if I didn't know this stuff. Lots of strides have been made in 