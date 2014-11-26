---
title: 'TUTORIAL: Change "data" Attributes with Mouse Clicks'
comments: true
author: Kai Gittens
layout: post
permalink: /data-attribute-click/
meta-excerpt: "Load/unload information stored in data-* attributes inside HTML with mouse clicks in a cross-browser compatible way. Includes demos."
category: tutorials
cat-name: "Tutorials"
tags: [html5, javascript]
has-home-img: data-attribute.jpg
---
A recent project at work *almost* required the use of swapping information in and out of the HTML DOM with data attributes (usually referred to as `data-*`), and to do so with mouseclicks. I researched some current production code we had and also did some web searches.

The final functionality specs forced us to not use swap out data attributes witch clicks; however, I was shocked at the lack of good tutorials on the subject. So I spent a few days hacking some code together, all while taking note of the cross-browser issues, and created this tutorial.
