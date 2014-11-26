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

Simple Example (<a href="http://codepen.io/kaidez/pen/WbvEab" target="blank">See the CodePen Demo</a>)
---------------------
This example is pretty simple: store content in data attributes for certain elements, then use JavaScript to load the content into other elements.
 The HTML looks like this:
{% prism markup %}
<a href="#" id="chelseaLink">Load Chelsea FC Info &raquo;</a>

<div
id="teamInfo"
data-team="Chelsea"
data-home-pitch="Stanford Bridge"
data-manager="José Mourinho">


</div>  

<div id="team" class="dataTarget"></div>
<div id="homePitch" class="dataTarget"></div>
<div id="manager" class="dataTarget"></div>
{% endprism %}


The CSS looks like this...the CSS will remain the same for all future code samples and demos:
{% prism css %}
body {
  background: grey;
  color: #000;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 900;
  font-size: 18px;
}


a:link {
  color: #fff;
  font-weight: 700;
  font-size: 22px;
}

a:visited {
  color: #fff;
}

a:hover {
  color: #fff;
  text-decoration: none;
}

.dataTarget {
  margin: 10px 0;
}
{% endprism %}


Cross-browser coding for android: as close to hell on earth as I've ever gotten.

http://ejohn.org/blog/html-5-data-attributes/

make sure the CSS is consistent across all CodePen samples
