---
title: 'WordPress &#038; WebMatrix'
comments: true
author: Kai Gittens
layout: post
permalink: /wordpress-webmatrix/
meta-excerpt: Using WebMatrix to create a WordPress development site
category: coding-best-practices
cat-name: "Code Tips"
tags: [wordpress]
---
HAPPY GROUNDHOG DAY!!!!!!!!!!!!!

This post actually started off as a referral to [a great WordPress.tv video on how to install a WordPress development site on a Windows machine with Microsoft WebMatrix][1]. But when I started doing extra research on the subject, I learned quite a bit about WebMatrix’s potential.

 [1]: http://wordpress.tv/2010/12/22/wordpress-on-windows-server/

WebMatrix is Microsoft’s recently-released open source web development application (yes, you read that right: Microsoft released an open source web dev app). Along with supporting the obvious MS applications like IIS and .NET, it also supports PHP and MySQL...meaning it can support a WordPress development environment without Linux.

It’s already possible to run a local WordPress development site without Linux, as well as a live site. WAMP packages can be downloaded to your PC to create a localhost setup that runs PHP, Apache and MySQL. And hosting companies like GoDaddy already offer WordPress hosting via one of their Windows packages.

But when talking about creating a WordPress testing environment on your home computer, there are advantages to using WebMatrix over WAMP:

## Simple Installation

Using an installation wizard, WebMatrix provides an easier setup and configuration process for a localhost WordPress dev site.

## WebDeploy

WebDeploy functionality in WebMatrix allows for an easier deployment from your development site to your live site if it’s running on a Windows server.

I can’t see WebMatrix becoming my main web development tool. It’s not robust enough for real web-based object-oriented programming and Microsoft Visual Studio is much better at interacting with databases. But am starting to see the advantages for using different web dev tools for different products. And since I have access to five computers when you combine work and home, I can probably do this without overloading resources.

Therefore, when I redesign my blog (which won’t be for a while), I may use this method; developing code on my PC with Web Matrix and then deploying it to my live site. 

In the meantime, read these links:

*   [MSDN WebMatrix Site][2]
*   [Free MSDN Course on Webmatrix Development][3]
*   [Video snippet on Installing a WordPress development site on a Windows machine with Microsoft WebMatrix][1]

 [2]: http://www.microsoft.com/web/webmatrix/
 [3]: http://www.microsoft.com/web/post/web/post/Web-Development-101-Part-1-Getting-Started-with-WebMatrix