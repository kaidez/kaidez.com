---
title: HTML5, SEO and Microdata
author: Kai Gittens
layout: post
permalink: /html5-seo-microdata/
categories: HTML5
---
# 

*MUCH thanks to at [Oli Studholme][1] at [HTML5 Doctor][2] for helping me understand this!!!!*

 [1]: http://oli.jp/
 [2]: http://html5doctor.com/

*Update February 21, 2011: Oli looked at this post and suggested some code & semantics changes. Simply put, **there are *a lot* of semantic mistakes in this article**. The code below was changed as per his suggestions but the semantics were many. So many that it was easier to create a new post listing them instead of editing this article. Review the code below as it contains his edits, then [read my post listing his semantic suggestions][3]. – k*

 [3]: http://kaidez.com/update-html5seomicrodata-post/

I’ve learned a few things about how HTML5 handles search engine optimization, or, SEO. The main thing I’ve learned is that we all need to fully understand ***microdata*** since Google uses it to collect detailed information about your web page.

While I’m still learning about microdata, I understand 95% of it…and let me be clear from the beginning about what I *do* understand: 

*   ***Microdata’s main job is to provide extra information about your site to search engines and machine readers so they can better understand the site content.***
*   ***Microdata MUST be written in 100% pure HTML5.***
*   ***Microdata does not make page content more meaningful or more keyphrase-rich.***
*   ***As with all SEO best practices, Microdata does not guarantee you a high Google site ranking.***

Hope I was clear. Now let’s move on…

Often called “HTML5′s best kept secret,” Microdata, allows you to place a custom vocabulary of data onto your web page. “If the microdata uses a Google “rich snippet” vocabulary, it may also be used by Google”.

Let’s see it in action:

I recently created [this test page][4] with the following code:

 [4]: http://kaidez.com/wp-content/themes/kaidez/kaidezUnique/Script/microdataTest.html