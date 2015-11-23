---
title: 'HTML5 Project: WIREFRAME SERIES #2 –  WORK &#038; NIKO&#8217;S PLAYLIST PAGES'
comments: true
author: Kai Gittens
layout: post
permalink: /html5-project-series-2-work-subcategory-playlist-wireframes/
meta-excerpt: Part Two of my explanation on how I created wireframed my HTML5 site before I developed and designed it
category: personal
cat-name: "Personal"
tags: [html5]
---

***Read the entire “Wirefame Series” [Intro»][1] | [Page 1»][2] | Page 2» | [Page 3»][3]***

 [1]: /html5-project-update-completed-wireframes/
 [2]: /html5-project-series-1-homepage-wireframe/
 [3]: /html5-project-series-3-about-contact-wireframes/

[Continuing the “portfolio wireframe” series][1] for my [HTML5 Project][4], we’ll be reviewing the main Work page, the three Work subcategory pages and the Niko’s Playlist page. Discussion will focus on the proper use of the  tag.

 [4]: http://kaidez.com/html5-project/

*(Important: I’ll be sending the final site to [HTML5 Doctor][5] and/or [HTML5 Gallery][6] for review when it’s done. While I’m confident that my site conforms to the HTML5 specification, these guys may say it doesn’t. Please keep that in mind when reading this.)*

 [5]: http://html5doctor.com/
 [6]: http://html5gallery.com/

This article is structured as follows:

*   [Wireframe Review][7]
*   [The Three Work Subcategory pages and the  Tag][8]
*   [Niko’s Playlist Page][9]
*   [Summary][10]

 [7]: #wfReview
 [8]: #subcatAside
 [9]: #playlist
 [10]: #summary

  
## Wireframe Review

  
First, let’s look at all these pages…

 

Now, let’s break it all down…

## The Main Work Page

[![][12]][12] 

 

This page was laid out using methods discussed in great detail [in my last article][2] where I discuss  tags and  &  tags. So I’m just going to skim over this page’s explanation:

*   While the HTML5 specification (from here on referred to as *the spec*) encourages you to use  as little as possible, it’s fine to use it if it’s your only option. I needed to wrap and position three  tags ***which were not related to each other***, so  was my only option. [*Read where I discuss  use in greater detail »*][12]
*   The page displays three subcategory rows: Experiments, Freelance and Day Job. Each row contains samples of my work. Since the samples are of the same type and ***are related to one another***, I’ve put each sample in an  tag and wrapped the grouped samples in a  tag. [*Read where I discuss  and  use in greater detail »*][13] 

## The Three Work Subcategory pages and the  Tag

You’ll notice that I highlighted the two phrases above that discuss “related elements”…this was done so I could neatly segue into the discussion about the  tag.

The spec says, if page elements are related to each other, code your page so the relationship is obvious to search engines and machine readers.  does this very well: it’s basically saying the following sentence out loud to the engines and readers: 

> “All of the content inside of me is related to some main content that’s very close by”

Let’s look at how I did it on the Experiments page:

[![][16]][16] 

 

I have an  tag containing information about an individual piece of my work. To the right of it is a column of links to my other experiments. Since all these experiments are related to the content in the  tag, we can make this column an  tag. Lastly, this relationship allows me to wrap up both of these page elements in a  tag.

Based on the location of the  tag, it’s tempting to treat it like a traditional sidebar and put things like banners and blogrolls inside of it. Let me be clear: ***the spec says this is bad HTML5 practice because things like that, most likely, do NOT relate to your primary content***. On a properly-formatted HTML5 page, sidebar content like banners and blogrolls should be placed into traditional  tags.

[This article over at HTML5 Doctor ][15]was my main reference when laying out the  tag.

## Niko’s Playlist Page

[![][17]][17] 

 

This page shares the same  /  ***Read the entire “Wirefame Series”: [Intro»][1] | [Page 1»][2] | Page 2» | [Page 3»][3]***

 [9]: /img/Work.jpg
 [12]: http://kaidez.com/html5-project-series-1-homepage-wireframe/#div
 [13]: http://kaidez.com/html5-project-series-1-homepage-wireframe/#articleSection
 []: /img/Experiments-02.jpg
 [15]: http://html5doctor.com/aside-revisited/
 [16]: /img/Playlist.jpg