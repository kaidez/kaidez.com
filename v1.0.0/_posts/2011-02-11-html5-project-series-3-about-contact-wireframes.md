---
title: 'HTML5 Project: WIREFRAME SERIES #3 –  ABOUT &#038; CONTACT PAGES'
comments: true
author: Kai Gittens
layout: post
permalink: /html5-project-series-3-about-contact-wireframes/
meta-excerpt: Final article in the HTML5 wireframe series for the kaidez portfolio site
category: personal
cat-name: "Personal"
tags: [html5]
---

***Read the entire “Wirefame Series”  
[Intro»][1]  [Page 1»][2]  [Page 2»][3]  Page 3»***

 [1]: http://kaidez.com/html5-project-update-completed-wireframes/
 [2]: http://kaidez.com/html5-project-series-1-homepage-wireframe/
 [3]: http://kaidez.com/html5-project-series-2-work-subcategory-playlist-wireframes/

This concludes [the “portfolio wireframe” series][1] for my [HTML5 Project][4]. We’ll be reviewing the easiest pages from a coding standpoint: the About and Contact pages.

 [4]: http://kaidez.com/html5-project/

*(Important: I’ll be sending the final site to [HTML5 Doctor][5] and/or [HTML5 Gallery][6] for review when it’s done. While I’m confident that my site conforms to the HTML5 specification, these guys may say it doesn’t. Please keep that in mind when reading this.)*

 [5]: http://html5doctor.com/
 [6]: http://html5gallery.com/

This article is structured as follows:

*   [Wireframe Review][7]
*   [The  Tag][8]
*   [Summary][9]
*   [Series Conclusion][10]

 [7]: #wfReview
 [8]: #article
 [9]: #summary
 [10]: #conclusion

## Wireframe Review

First, let’s look at the pages:  
  
Now, let’s break it all down…

 

## The  Tag 

Page elements like ,  and  were discussed in the series’ first article so [feel free to read that here][2] if you want to learn more about those things. That article also discussed the  tag: we’ll be revisiting that tag.

[HTML5 Doctor][5] gave us some advice on how to use the various HTML5 page content tag…let’s look at that again:

> *   Would the content would make sense on its own in a feed reader? If so use 
> *   Is the content related? If so use 
> *   Finally if there’s no semantic relationship use 
> 
> [Read the whole article (no pun intended) »][11]
> 
>  

 [11]: http://html5doctor.com/the-article-element/

 

The content for the About page is a simply-formatted block of text, while the content for the Contact page is a simple email form. The content for both of these pages would make sense on its own in a feed reader so  should be OK here. I’m sure HTML5 Doctor or HTML5 Gallery will set me straight if I’m wrong.

The Contact Page’s email form may look weird in a feed reader so maybe a  would be better . But looking at how the form is laid out on [this site][12], and considering that [HTML5 Gallery gave it a four-star rating][13] while not criticizing the Contact page, I should be fine here.

 [12]: http://www.re-d.jp/contact/
 [13]: http://html5gallery.com/2011/02/redesign/

Also, I suppose I could have placed the  tag in a  first. But if we follow HTML5 Doctor’s advice to the letter, then this is may be a bad idea, because…

 

*   single blocks of page content can go directly into  tags.
*    seems to be reserved for a group of related  tags, not just one. My main Work page uses this type grouping.

<img src="/img/Work.jpg" alt="Kaidez Old HTML5 Project">

## Summary

The  tag is one of the primary containers of content on an HTML5 page so it’s best to understand how it works. [HTML5 Doctor’s  post][11] does a great job of explaining it’s use in easy to read terms.

## Series Conclusion

This concludes my HTML5 Project Wireframe Series. I learned a lot about HTML5 page structure by not only creating the wireframes, but by blogging about the process of creating them…I hope you did too! Please give me feedback on any part of the series, or the series as a whole. You should also feel free to critique my wireframes.

Looking at [the task list I created for this project][15], my next task should be the creation of a simple site architectural document; i.e., sketch out how I’m going to link up all external script files & stylesheets as well as what the directory structure will be. But [HTML5 Boilerplate][16] already demonstrates the best way to plug in the external files (so much so that I’ve added it as a Coding Favorites Coolsite), so I’m just going to copy their method.

 [15]: http://kaidez.com/html5-project-update-january-21-2011/
 [16]: http://html5boilerplate.com/

As far as sketching out the directory structure, I’ll be using WordPress which will automatically build the structure for me when the time comes…no need for a sketch, I suppose. I still have some WordPress work to do though, so I’m going to strikeout the architectural document and replace it with this:

> “research WordPress page layouts to understand the best way to convert them to HTML5″

I’m going to duplicate WordPress’ TwentyTen theme into a child theme, then tweak the child them to my own design. **This is going to be a lot of work**: I’ve started to look at the TwentyTen code and there’s a lot I have to tweak, but I’ve done it before so I should be OK. Update: instead of tweaking the TwentyTen theme to suit my needs, I’ll be tweaking using [Aaron Grogg’s HTML5-ready Boilerplate theme][17].) 

 [17]: http://wordpress.org/extend/themes/boilerplate

Thanks for sticking with me through my series. And again, any and all feedback is appreciated!!!

-kaidez

*P.S. – I’m going to take a very short break from discussing HTML5 and code-related stuff. My next two articles will be a mini-review of **JWT’s Social Media Week Event** (for which, I attended the two big panel discussions. I’ll be critiquing the panel, discussing the new knowledge I gained and how this new knowledge affects my skillset learning track.*

> ***Read the entire “Wirefame Series”: [Intro»][1] | [Page 1»][2] | [Page 2»][3] | Page 3»***