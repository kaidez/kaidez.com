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
A recent project at work *almost* required the use of swapping information in and out of the HTML DOM with data attributes (usually referred to as `data-*`), and to do so with mouseclicks. I hadn't used them much so I researched some current production code we had and also did some web searches.

The final project requirements forced us to not use swap out data attributes with clicks but while doing the web searches, I was unable to find any good, descriptive tutorials on the subject. That surprised me so I spent a few days hacking some code together, all while taking note of the cross-browser issues, and created this tutorial.

{% prism markup %}
<div
    id="myInfo"
    data-name="Kai Gittens"
    data-home="New York"
    data-work="Revlon">

  <a href="#" id="myLink">Load My Info</a>
  
</div>  

<div id="name"></div>
<div id="home"></div>
<div id="work"></div>
{% endprism %}


Cross-browser coding for android: as close to hell on earth as I;ve ever gotten.
