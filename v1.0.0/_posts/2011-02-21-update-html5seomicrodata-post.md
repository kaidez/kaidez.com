---
title: Update to My HTML5/SEO/Microdata Post
comments: true
author: Kai Gittens
layout: post
permalink: /update-html5seomicrodata-post/
meta-excerpt: Oli Studholme from HTML5 Doctor corrects my previous post on HTML5, SEO and microdata
category: coding-best-practices
cat-name: "Code Tips"
tags: [html5, review]
---

I published a well-read article entitled “[“HTML5, SEO and Microdata”][1]” on January 28, 2011. [Oli Studholme][2] from [HTML5 Doctor][3] helped me understand and adjust the code.

 [1]: http://kaidez.com/html5-seo-microdata/
 [2]: http://twitter.com/boblet
 [3]: http://html5doctor.com/

He recently alerted me to some things that were incorrect: some were huge and some were small. The big thing that came out of this was that **I can’t say that Microdata helps with search rankings. Google certainly uses it, but not in their search algorithm**. So much so, that I renamed the post ***“HTML5, SEO and Microdata”***

As embarrassing as it may be, ***I’m a big believer in HTML5 semantics*** and believe that every single solitary web developer should follow its rules. And if I have to take it on the chin to help that happen, so be it.

I changed the example code on that article as per his comments…here are some other semantical things that he suggested:

*   > “itemscope tells the browser that everything within the  
    >  tags is microdata and should be treated as such.”
    
    -> “…is a microdata item” (I don’t understand what you mean by “should be treated as such”)

*   > “itemtype attaches the microdata to the “Person” vocabulary library stored at data-vocabulary.org.”
    
    -> “itemtype indicates the microdata item uses the “Person” vocabulary” — there’s no requirement for anything to be at itemtype URLs, they’re just acting as unique names. If browsers accessed itemtype URLs it’d be a DDOS ![;)][4] 

*   > “But RDFa needs to be written in XHTML, which is headed for W3C deprecation”
    
    not true -> [http://dev.w3.org/html5/rdfa/][5] and I think it’s a little early for “headed for W3C depreciation” just yet ![;)][4] 

*   > “microformats don’t really work without CSS”
    
    also not true. microformats don’t require a stylesheet at all, and class names are not solely for CSS

*   > “It’s due to the fact that Twenty Ten, which is HTML5-ready, uses a lot of the same CSS classes as the ones used by the ‘hatom’ feed format”
    
    -> no they *are* using the hatom microformat — that’s why they have those classes.

*   > “hatom classes like entry-title and entry-content, the presence of these classes is forcing the Snippet tool to look for hatom feed content in my About page”
    
    -> no the classes that trigger this behaviour are “hfeed” and “hentry”. without them this on’t occur even if you do use “entry-title” etc

*   > “If you want to get a feel of how much microdata is out there, check out the Operator plug-in for Firefox”
    
    Operator currently doesn’t support microdata, unless you have an unreleased version ![;)][4] You can check on: [http://html5doctor.com/microdata/][6] The only things that show up are microformats in the default template (author profile and tags)

*   > “Microdata only works if placed into a page with the bare minimum of HTML5 formatting”
    
    -> not true. while they won’t be valid you can use them on any page, including HTML4 and XHTML1. I don’t understand what you mean by HTML5 formatting

*   > “If you try to hide microdata on your page (i.e. putting it into a page tag set to display:none), Google will totally ignore it”
    
    and
    
    > “Microdata must be placed in the main content of your web page; if you place it among header or footer content, Google will totally ignore it”
    
    -> not true — you can put microdata in attributes via (with some caveats), and adding author microdata in  makes a lot of sense [http://html5doctor.com/microdata/#meta][7]

*   > “Commit the info in Google’s Webmaster Tools documentation to memory”
    
    Google have a dedicated SEO guide too, that you might enjoy: 

 [4]: http://localhost:8888/wp-includes/images/smilies/icon_wink.gif
 [5]: http://dev.w3.org/html5/rdfa/ "HTML RDFa 1.1"
 [6]: http://html5doctor.com/microdata/ "Extending HTML5 — Microdata | HTML5 Doctor"
 [7]: http://html5doctor.com/microdata/#meta "Extending HTML5 — Microdata | HTML5 Doctor"