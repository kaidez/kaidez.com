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
Many, many, many years ago, I created a Flash site for a close friend of mines hair salon, Parlor Hair Studio in Montclair, NJ. At the time, I was was really good with Flash and was able to design and develop a site that was aligned with the times.

Times have changed: Flash doesn't work on mobile, is not SEO-friendly, is not easy to update and according to Brendan Eich, both Chrome and Firefox have blacklisted it. It was clearly a time for a change, so a new site for [parlorhairstudio.com](http://parlorhairstudio.com, "Visit parlorhairstudio.com") was needed.

##Table of Contents
1. [Client Requirements](#client-requirements)
2. [A Modern Design](#modern-design)
3. [Using WordPress](#wordpress)
4. [Using Bootstrap](#bootstrap)

<a name="client-requirements"></a>
###Client Requirements

The client requirements were very straight-forward:

* make the design as modern as possible.

* make it easy to update via WordPress.

* make it responsive.

* make it mobile-friendly.

* make as SEO-friendly as possible.

<a name="modern-design"></a>
###A Modern Design

My friend requested a clean, minimalist design...which is actually hard to do. This is because minimalist/flat/Swiss designs require that you do more with less.

You have to use whitespace, fonts and color in way that conveys an inviting design. This takes time: it took about three weeks of image mock-up iterations before all parties were in agreement with the final look-and-feel.

<a name="wordpress"></a>
###Using WordPress

My friend wanted to use WordPress to both contain the design and that was no-brainer. Other content management systems like Joomla and Drupal have their strengths, but WordPress made more sense for this project due to its ease of use and wider swath of community support.

Development-wise, I created [a custom child theme](https://codex.wordpress.org/Child_Themes "Read more about creating a WordPress child theme") against WordPress' stock twentythirteen theme. This meant I could safely duplicate the core WordPress files and customize them as needed to implement the design...all in all very easy.

That being said, I made a point to NOT duplicate a lot of core files and only did so when I had no choice. I've been in situations where duplicating a lot of files for the sake of child-themes makes updating WordPress a pain.

Plus, customizing a lot of files would make the site harder for my friend to maintain. I didn't want to create core functionality that could only be updated by changing code and not a plugin, so I mostly customized the site by making changes to the core stylesheet.
<a name="bootstrap"></a>
###Using Bootstrap

Speaking of stylesheets, I used the core CSS file that comes with [Twitter Bootstrap](http://getbootstrap.com/ "Read more about Twitter Bootstrap") to make the responsive, which was also pretty easy. I used its [Grid system](http://getbootstrap.com/css/#grid, "Read more about Twitter Bootstrap's Grid system") to create a variety 