---
title: 'New Site I Worked On: parlorhairstudio.com'
comments: true
author: Kai Gittens
layout: post
meta-excerpt: kaidez created a WordPress site for a Montclair, NJ hair salon, with a strong focus on optimizing the site for local SEO. 
permalink: /parlor-redesign/
category: personal
cat-name: "Personal"
has-home-img: parlor-redesign.jpg
tags: [personal, wordpress]
---
Many, many, many years ago, I created a Flash site for a close friend of mine's Montclair, NJ hair salon, Parlor Hair Studio. At the time, I was really good with Flash and was able to design and develop a site that was aligned with the times.

Times have changed: Flash doesn't work on mobile, is not SEO-friendly, is not easy to update and, according to Brendan Eich, both Chrome and Firefox have blacklisted it. It was clearly a time for a change, so a new site for [parlorhairstudio.com](http://parlorhairstudio.com "Visit parlorhairstudio.com") was needed.

<h2 style="clear:both;">Table of Contents</h2>
1. [Client Requirements](#client-requirements)
2. [A Modern Design](#modern-design)
3. [Using WordPress &amp; Bootstrap](#wordpress-bootstrap)
4. [Local SEO](#local-seo)
5. [On a personal note...](#personal)
6. [Conclusion](#conclusion)

<a name="client-requirements"></a>
###Client Requirements

The client requirements were very straightforward:

* make the design as modern as possible.

* make it easy to update via WordPress.

* make it responsive.

* make it mobile-friendly.

* make as SEO-friendly as possible.

<a name="modern-design"></a>
###A Modern Design

My friend requested a clean, minimalist design...which is actually hard to do. This is because minimalist/flat/Swiss/whatever designs require doing more with less.

You have to use whitespace, fonts and color in ways that conveys an inviting design. This takes time: it actually took about three weeks of image mock-up iterations before all parties were in agreement with the final look-and-feel.

<a name="wordpress-bootstrap"></a>
###Using WordPress &amp; Bootstrap

My friend wanted to use WordPress to both contain the design and that was no-brainer. Other content management systems like Joomla and Drupal have their strengths, but WordPress made more sense for this project due to its ease of use and wider swath of community plugin support.

Development-wise, I created [a custom child theme](https://codex.wordpress.org/Child_Themes "Read more about creating a WordPress child theme") against WordPress' stock twentythirteen theme. This meant I could safely duplicate the core WordPress files and customize them as needed to implement the design...all-in-all very easy.

That being said, I made a point to NOT duplicate a lot of core files and only did so when I had no choice. I've been in situations where duplicating a lot of files for the sake of child-themes makes updating WordPress a pain.

Plus, customizing a lot of files would make the site harder for my friend to maintain. I didn't want to create core functionality that could only be updated by editing a Coffeescript file and note a plugin, so I mostly customized the Parlor site by making changes to the core stylesheet and installed a small set of plugins.

Speaking of stylesheets, I used the core CSS file that comes with [Twitter Bootstrap](http://getbootstrap.com/ "Read more about Twitter Bootstrap") to make the site responsive, which was also pretty easy. I used its [Grid system](http://getbootstrap.com/css/#grid "Read more about Twitter Bootstrap's Grid system") to create a variety of responsive layouts...this also helped to make the site as mobile-friendly as possible.

*(Side note: this project needed to be scaffolded with Bootstrap and a few other WordPress-centric files. I did this using my custom "kdz" tool...[see it on GitHub](https://github.com/kaidez/kdz "See custom kdz scaffolding tool on GitHub") and [read my blog post on this](/kdz-build-tool/ "Read about kaidez's custom scaffolding tool, kdz")).*

<a name="local-seo"></a>
###Local SEO

Managing search engine optimization is pretty easy with WordPress. It's SEO-ready out of the box and if you then install [Yoast's WordPress SEO plugin](https://wordpress.org/plugins/wordpress-seo/ "Read more about Yoast's WordPress SEO plugin"), configuring SEO on your WordPress site is a straightforward process.

But Parlor is a local business and there are other hair salons in the area competing for the same dollar. So placing higher in search results isn't easy: a local SEO strategy was required.

We spent some time reviewing what other salons were doing for their websites, SEO-wise. And while some dropped the ball completely, there were much more that were doing things right then wrong.

We looked at their web presence and code to see where we can better them. I'm not going to go into great detail about what we did because, well, competition is competition.

But I will say this...

* code needs to be added to some core WordPress files to make it more local SEO-friendly.

* Google likes mobile-friendly sites more and more everyday.

* offline SEO is just as important as online SEO.

<a name="personal"></a>
###On a personal note...

Personally, it was really good to get back into WordPress development. [Jekyll](http://jekyllrb.com/ "Read more about the Jekyll static site generator") was used to create the version of this site current to this post's publish date, and it has benefits. But there are things that are just too easy to do with WordPress.

As a result of this, I will probably redesign this site using WordPress in the (hopefully) not-too-distant future. I'll go into more detail on what's easier when that redesign happens.

<a name="conclusion"></a>
###Conclusion

There are a few post-launch tasks that need to be performed, but none of them are show-stoppers for not delivering a site that the client wanted. Everyone was happy when the site was launched so I really can't ask for anything more.