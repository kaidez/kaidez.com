---
title: 'New Site I Worked On: RevlonProBrands.com'
comments: true
author: Kai Gittens
layout: post
permalink: /revlon-pro-brands/
meta-excerpt: kaidez developed the RevlonProBrands.com site using GitHub Atom, Jade, OOCSS, Modernizr’s yepnope functionality, Gulp & Grunt.
category: personal
cat-name: "Personal"
tags: [revlon, atom, jade, oocss, gulp, grunt, Modernizr, yepnope, GitHub]
has-home-img: revlon-pro-brands.jpg
---
Revlon, my employer, recently launched [RevlonProBrands.com](http://www.revlonprobrands.com/us "visit RevlonProBrands.com"), a one-page site that will mostly act as a sales tool for the company's sales reps. It was designed by Colorado web shop and passed on to Revlon's internal web team for integration into a [Sitecore](http://www.sitecore.net/ "visit Sitecore: a .NET based content management system") environment.

There wasn't a need for lots complicated code, but it did give me the chance to use certain web development tools and code techniques. And while there were slight adjustments to the code before it got pushed up to production, I'm glad I got to practice a few of the techniques.

<h2 class="tableOfContentsHeader">Table of Contents</h2>
1. [GitHub Atom](#atom)
2. [Jade](#jade)
3. [OOCSS](#oocss)
4. [Modernizr &amp; yepnope](#modernizr-yepnope)
4. [Grunt &amp; Gulp](#grunt-gulp)

<a name="atom"></a>
### GitHub Atom
Most of my work for this project was done in the office using [Sublime Text](http://www.sublimetext.com/, "visit Sublime Text") as a development environment but there were a few instances when I did some work at home. In those instances, I swapped dev environments and used  [Atom](https://atom.io/ "visit Atom"), a web-based text editor that [GitHub](https://github.com/ "visit GitHub") released to beta a few months ago from this blog post.

Atom definitely "takes inspiration" from Sublime Text in terms custom configuration...many features that needed to be installed in Sublime as third-party packages are native in Atom. Whitespace removal, code-hinting/completion, spell-checking...all come pre-installed in Atom.

This includes Git and GitHub integration, which is obvious when you consider Atom's creator. If your project is already Git-configured (i.e., if you've already done a full `git init` inside of it and it's been pushed up to GitHub at least once), the configs can communicate with Atom and perform lots of Git-related tasks.

Here are a few of the tasks...

* Atom can read a project's `.gitignore` file  and tell you which files are ignored by greying them out in your project tree.
<figure class="postFigure">
  <img src="/img/atom_01.jpg" class="imgBorder" alt="Screenshot of how gitignore work with atom">
  <figcaption class="postFigureCaption">Greyed-out files are in .gitignore</figcaption>
</figure>
* Atom tells you what branch you're currently working on and if changes need to be committed and/or pushed.
* Atom can look at the page your working on and jump to its history on GitHub.

This is not to say that Sublime can't do any of these things, because it can.  It's just that these features come pre-installed into Atom: as packages but pre-installed nonetheless.

Installing these features as packages is key to Atom's design. By installing them as packages, Atom takes on a modularized architecture, making it easy to configure and adjust the editor's architecture if needed.

This highly configurable setup is mostly thanks to Atom's deep Node integration. Peek at most of Atom's pre-installed plugins and you'll see a basic Node architectural pattern...if you're a regular Node hacker then adding Atom to your toolkit is close to a no-brainer.

Managing settings in Atom is done using a nice user interface, something that Atom has over Sublime Text (at least I think so). Adding themes, installing/removing packages and creating custom settings is a breeze in Atom.

Again, Atom is in beta at the time of this post but GitHub has indicated that it will be released in both "fully-closed and fully-open" formats, which I take to mean as "free and paid versions". I personally see no issue with that: Atom has all the markings of a solid, viable application and I see no problem with charging money for it.

That being said, I can't say that I'll pay for out after it comes out of beta.  Not because Atom is bad...it's nowhere near that. But I have gotten extremely comfortable with Sublime Text over the years...memorizing its keystrokes, syncing the editor up with my bash scripts, settling in on themes I like, etc.

I've also toyed around with [Adobe Brackets](http://brackets.io/ "visit Adobe Brackets") a bit, which has its own set of stand-out features. And the best of Brackets' features eventually make their way to Adobe's newest commercial web editor [Edge Code](http://html.adobe.com/edge/code/, "visit Adobe Edge Code"), which I recently received thanks to the good graces of my employer when I got a [Creative Cloud](https://creative.adobe.com/plans "learn more about Adobe Creative Cloud") membership.

I suppose the point is, Atom's awesome but it may not be necessary for my specific needs. I'm continuing to play with it and LOVE what I see but because of my current needs and what tools I already have, I can't say I'll buy it when the time comes....still undecided.
<a name="jade"></a>
### Jade
RevlonProBrands.com is a *responsive/adaptive/insert-another-buzzword-here* website, but Sitecore is using server-side code to load in two versions of the page: one for desktops and another for everything else. So it made sense to use some sort of development-level templating system that would apply the common parts to each page.

I chose [Jade](http://jade-lang.com/ "visit the Jade templating") for this, a very simple templating engine that compile pages into HTML. In terms of what code you have to write to get things done, Jade is similar to things like [LESS](http://lesscss.org/ "visit LESS, a JavaScript-based CSS processor") and [Haml](http://haml.info/ "visit Haml, an HTML abstraction markup language") in the sense that indentation defines block structure.

So you use [npm](https://www.npmjs.org/package/jade, "install Jade with npm") to install Jade on your machine. Then create `.jade` files like this...

{% prism markup %}
doctype html
html
  head
    title kaidez.com
  body
    h1 My Page Header
{% endprism %}

And with a few keystrokes, this file will output an `.html` file like this

{% prism markup %}
<!doctype html>
<html>
  <head>
    <title>kaidez.com</title>
  </head>
  <body>
    <h1>My Page Header</h1>
    <p>My Content</p>
  </body>
</html>
{% endprism %}

I went with Jade because I've been playing with the [MEAN stack](http://mean.io/ "review the MEAN stack") lately and [Express](http://expressjs.com/ "visit Express, the Node-based web server framework") (the "E" in MEAN) likes to use Jade. So I figured it made sense for me to figure out.

Jade has "includes" functionality similar to PHP includes and .NET user controls. In other words, small parts of page code can be broken out into their own files and then embedded into other pages for output.

So in other words, these two `.jade` files...

{% prism markup %}
//index.jade
doctype html
html
  include includes/header //this is an include file
  body
    h1 My Page Header
    p My Content
{% endprism %}

{% prism markup %}
//includes/header.jade
head
  title kaidez.com
{% endprism %}

...*SHOULD* output a single `.html` file like this...

{% prism markup %}
<!doctype html>
<html>
  <head>
    <title>kaidez.com</title>
  </head>
  <body>
    <h1>My Page Header</h1>
    <p>My Content</p>
  </body>
</html>
{% endprism %}

The indentation didn't QUITE work out the way I wanted to when I used a `<header>` tag...not sure why that was after a doing a web search for an answer. I think I can figure out why this is later on down the line, or maybe just asking for an answer on Stack Overflow will work as well.

That being said, I was approaching the delivery date for submitting the finalized code to the lead engineer and couldn't spend a whole lot of time on this problem. I'll will try to fix the issue but if it persists and I have to do a similar project in the future, I may just use [Jekyll](http://jekyllrb.com/ "visit Jekyll"), which has an incredibly straight-forward includes system.
<a name="oocss"></a>
### OOCSS
As mentioned in my [2013 site redesign post](http://kaidez.com/site-redesign-2013/, "read 'kaidez.com 2013 Site Redesign' on kaidez.com"), I really wanted to use object-oriented CSS, or OOCSS, in a project. I chose this project to do so and I am happy with what I accomplished and what learned in the process.

There's not enough room in this blog post to go through all its characteristics. But, simply put, OOCSS is a CSS design pattern that implements what its name implies: to apply object-oriented best practices to CSS.

OOCSS is a beautifully crafted set of ideas by [Nicole Sullivan](https://twitter.com/stubbornella, "stubbornella at Twitter"). The central ideas include...

* placing styles under CSS classes and not IDs, reserving IDs for JavaScript hooks.
* separating these classes into two formats...one for style and one for structure.
* in true object-oriented style, reusing these classes across your page elements as needed.
* avoid inefficient CSS selectors, such as descendant selectors.
* always [lint your CSS](http://csslint.net/ "lint you CSS with CSS Lint").

I applied these ideas to my Pro Brands page code, specifically the individual product image module. Each module contains lots and lots of shared CSS classes among the various page elements it contains.  Some of the module elements contain IDs; however, none of these elements have CSS styles applied on the ID level.

OOCSS definitely takes some getting used to and takes more work.  Quite a few people have personally told me they disagree with it as a practice and don't use it.  But I have noticed that the CSS parses faster than if I hadn't used it so I'm not going to give up on it.

<a name="modernizr-yepnope"></a>
### Modernizr &amp; yepnope
*(Author's note: I may have written the code but Revlon owns it, so I can't just drop it in files on a public GitHub repo. I'm going to be as descriptive about the code as I can...[tweet me any questions you may have](http://twitter.com/kaidez "kaidez on Twitter").*

Sitecore loads a (slightly) different version of the site, depending on whether it loads on either a desktop or some sort of handheld. Each product image reacts to a jQuery-powered `mouseover` on desktops and a jQuery-powered `click` on handhelds.

The image reaction is, when one of those events happens, a window scrolls over it displaying some product info using `jQuery.animate()`. Because this affected a group of elements it made sense to build the functionality using a JavaScript array instead of building it for each image one-by-one. The functionality would iterate over the each array element and apply the jQuery code mouseevent code to each element.

I also wanted to use ECMAScript's `forEach` method for the array iteration, which isn't supported in legacy Internet Explorer. That meant building a feature-detect for `forEach` and if the site loaded into a browser that didn't support that, a polyfill would load in code that forced it to be supported.

This whole process was managed by [Modernizr](http://modernizr.com "Read more about Modernizr") and its internal yepnope functionality.  And it's a pretty straight-forward process when keeping a few things in mind...

  * Note that [MDN provides a great piece of polyfill code<sup>1</sup>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill "Get the 'forEach' polyfill code at Mozilla Developer Network")...I copied it into a file called `forEachPolyfill.js`.
  * Remember that that a full Modernizr build features detects for many things by default, but not everything.
  * Remember that you can also [create a custom Modernizr build](http://modernizr.com/download/ "Create a custom Modernizr build") with only the features-detects you want, and can also create your own custom features-detects with Modernizr's sorely under-used `addTest()` method.
  * Note that Modernizr provides a well-stocked list of [pre-written feature-detects in its GitHub repo](https://github.com/Modernizr/Modernizr/tree/master/feature-detects "See some Modernizr pre-written feature detects").

<small><em><sup>1</sup> the polyfill code has been updated since I first used it, but all works well for both versions.</em></small>

I applied a custom feature-detect based on one of these pre-written pieces of code: [the ECMAScript 5.1 array feature-detects](https://github.com/Modernizr/Modernizr/blob/master/feature-detects/es5/array.js "See Modernizer's ES5 feature-detect polyfill"). I then placed it in a file called `forEachTest.js`.

The code that [the ECMAScript 5.1 array feature-detects](https://github.com/Modernizr/Modernizr/blob/master/feature-detects/es5/array.js "See Modernizer's ES5 feature-detect polyfill")...it went into the above-mentioned `forEachPolyfill.js`.

The code that tests for the existence of `forEach` goes into a file called `forEachTest.js`.  The code that actually runs the `jQuery.animate()` scroll code with the help of `forEach` goes into a file called `app.js`.

__forEachTest.js__
{% prism javascript %}
/*
 * Make Modernizr test for 'Array.prototype.forEach' so it can work 
 * cross-browser when building out the single product modules. When 
 * the test passes, "Modernizr.foreach" is attached to the list of 
 * Modernizr classes in the <html> tag.
 */
Modernizr.addTest("foreach", function(){
  var forEachFunc = Array.prototype.forEach;
  return typeof forEachFunc === "function"
});

Modernizr.load({
  test: Modernizr.foreach,
  yep: "js/app.js",
  nope: ["forEachPolyfill.js", "app.js"]
});
{% endprism %}


__app.js__
{% prism javascript %}
function ScrollContent() {}

ScrollContent.prototype.buildScrolls = function(element) {

  /*
   * scroll up code/down for handhelds...use "mouseover" instead of
   * click for desktops
   */

   // scroll up
  $("#" + element + "Id").click(function() {
    $("#" + element + "Content").animate({
      top: "-=434px"
    }, "fast");
  });

  // scroll down
  $("#" + element + "Content").click(function() {
    $(this).animate({
      top: "+=434px"
    }, "fast");
  });

};

var products = new ScrollContent();
["americanCrew","cnd","dfi","abba","orofludio","uniq1","voila"].forEach(products.buildScrolls);
{% endprism %}

And the HTML code for each scroll looks somewhat like this...
{% prism markup %}
<div id="americanCrewId">...</div>
<div id="cnd">...</div>
<div id="dfi">...</div>
<div id="abba">...</div>
<div id="orofludio">...</div>
<div id="uniq1">...</div>
<div id="voila">...</div>
{% endprism %}

So, everything works as follows...

1. Inside of`forEachTest.js`, a test is created for ES5's `forEach` method .
2. Modernizr runs this test on page-load.
3. If the test finds `forEach` in the browser, do the "yep" part of the code in `app.js` and run juts the scroll code in `app.js`.
4. If the test does NOT find `forEach` in the browser, do the "nope" part of the code in `app.js`...add the polyfill code, then run `app.js`.
5. The `forEach` loop is applied to an array, which contains the names of the div ids on the page as well as the name of the page element that appears on either a mouseover or a click.
6. The loop takes these names and concatenates them 