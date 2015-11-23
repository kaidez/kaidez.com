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
Revlon, my employer, recently launched [RevlonProBrands.com](http://www.revlonprobrands.com/us "visit RevlonProBrands.com"), a one-page site that  acts as a sales tool for the company's sales reps. It was designed by a Colorado web shop and passed on to Revlon's internal web team for integration into a [Sitecore](http://www.sitecore.net/ "visit Sitecore: a .NET based content management system") environment.

There wasn't a need for lots complicated client-side code, but working on this project gave me the chance to use certain web development tools and code techniques. Let's discuss them:

<h2 class="tableOfContentsHeader">Table of Contents</h2>
1. [GitHub Atom](#atom)
2. [Jade](#jade)
3. [OOCSS](#oocss)
4. [Modernizr &amp; yepnope](#modernizr-yepnope)
5. [Grunt &amp; Gulp](#grunt-gulp)
6. [Conclusion](#conclusion)

<a name="atom"></a>
### GitHub Atom
[Sublime Text](http://www.sublimetext.com/ "visit Sublime Text") was my primary development environment for this project, but there were a few instances when I switched to [Atom](https://atom.io/ "visit Atom"). Which is a web editor that [GitHub](https://github.com/ "visit GitHub") released to beta a few months ago from this blog post.

Atom definitely "takes inspiration" from Sublime Text in terms custom configuration...many features that needed to be installed in Sublime as third-party packages are native in Atom.

This includes Git and GitHub integration, which is obvious when you consider Atom's creator. If your project is already Git-configured (i.e., if you've already done a full `git init` inside of it and it's been pushed up to GitHub at least once), the configs can communicate with Atom and perform lots of Git-related tasks.

Here are a few of the tasks...

* Atom can read a project's `.gitignore` file  and tell you which files are ignored by greying them out in your project tree.
<figure class="postFigure">
  <img src="/img/atom_01.jpg" class="imgBorder" alt="Screenshot of how gitignore works with Atom">
  <figcaption class="postFigureCaption">Greyed-out files are in .gitignore</figcaption>
</figure>
* Atom tells you what branch you're currently working on.
<figure class="postFigure">
  <img src="/img/atom_02.jpg" class="imgBorder" alt="Screenshot of how Atom tracks your current Git branch">
  <figcaption class="postFigureCaption">Current Git branch appears in the bottom-left corner of your editor</figcaption>
</figure>
* Atom uses color-coding to indicate that files need to be commited to your git repo.
<figure class="postFigure">
  <img src="/img/atom_03.jpg" class="imgBorder" alt="Screenshot of how Atom tracks your current Git branch">
  <figcaption class="postFigureCaption">Orange indicates that an already-existing file has been updated while green indicates that a new file has been added to the project, but hasn't been committed yet</figcaption>
</figure>

This is not to say that Sublime can't do any of these things, because it can.  It's just that these features come pre-installed into Atom: as packages but pre-installed nonetheless.

That these features are installed as packages is key to Atom's design. Atom adopts a modularized architecture as a result, making it easy to configure and adjust the architecture if needed.

This highly configurable setup is mostly thanks to Atom's deep Node integration. Peek at most of Atom's pre-installed plugins and you'll see a basic Node architectural pattern...if you're a regular Node hacker then adding Atom to your toolkit is close to a no-brainer.

Managing settings in Atom is done using a nice user interface, something that Atom has over Sublime Text (at least I think so). Adding themes, installing/removing packages and creating custom settings is a breeze in Atom.

Again, Atom is in beta at the time of this post but it a version 1.o release is looming.  GitHub once said that there would be both free and paid versions of the editor, but it appears that it's now <em>100% free!!!</em>.

I'm not yet ready to leave Sublime Text for Atom...I've gotten extremely comfortable with Sublime Text over the years and have it setup just how I want it. Keystrokes are memorized, bash scripts are synced up, themes are picked, etc.

But this may change.  Will probably go full-on Atom for next project and put to the test.
<a name="jade"></a>
### Jade
RevlonProBrands.com is a *responsive/adaptive/insert-another-buzzword-here* website, but Sitecore is using server-side code to load in two versions of the page: one for desktops and another for everything else. So it made sense to use some sort of development-level templating system that would apply the common parts to each page.

I chose [Jade](http://jade-lang.com/ "visit the Jade templating") for this, a very simple templating engine that compile pages into HTML. In terms of what code you have to write to get things done, Jade is similar to things like [LESS](http://lesscss.org/ "visit LESS, a JavaScript-based CSS processor") and [Haml](http://haml.info/ "visit Haml, an HTML abstraction markup language") in the sense that indentation defines block structure.

So you [use npm to install Jade](https://www.npmjs.org/package/jade "install Jade with npm") on your machine. Then create `.jade` files like this...

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

That being said, I was approaching the delivery date for submitting the finalized code to the lead engineer, so I couldn't spend a whole lot of time on this problem. I'll will try to fix the issue but if it persists and I have to do a similar project in the future, I may just use [Jekyll](http://jekyllrb.com/ "visit Jekyll"), which has an incredibly straightforward templating system.
<a name="oocss"></a>
### OOCSS
As mentioned in my [2013 site redesign post](http://kaidez.com/site-redesign-2013/ "read 'kaidez.com 2013 Site Redesign' on kaidez.com"), I really wanted to use object-oriented CSS, or OOCSS, in a project. I chose this project to do so and I am happy with what I accomplished and what learned in the process.

There's not enough room in this blog post to go through all its characteristics. But, simply put, OOCSS is a CSS design pattern that implements what its name implies: an object-oriented method for writing CSS using some common best practices.

OOCSS is a beautifully crafted set of ideas by [Nicole Sullivan](https://twitter.com/stubbornella/ "stubbornella at Twitter"). The central ideas include:

* placing styles under CSS classes and not IDs, reserving IDs for JavaScript hooks.
* separating these classes into two formats...one for style and one for structure.
* in true object-oriented style, reusing these classes across your page elements as needed.
* avoid inefficient CSS selectors, such as descendant selectors.
* always [linting your CSS](http://csslint.net/ "lint you CSS with CSS Lint") to test for bugs and confirm that CSS best practices are being followed.

I applied these ideas to my Pro Brands page code, specifically the individual product image module. Each module contains lots and lots of shared CSS classes among the various page elements it contains.  Some of the module elements contain IDs; however, none of these elements have CSS styles applied on the ID level.

OOCSS definitely takes some getting used to and takes more work.  Quite a few people have personally told me they disagree with it as a practice and don't use it.  But I have noticed that the CSS parses faster than if I hadn't used it so I'm not going to give up on it.

<a name="modernizr-yepnope"></a>
### Modernizr &amp; yepnope
*(Author's note: Yepnope has sorta/kinda been deprecated ([read more about this](https://github.com/SlexAxton/yepnope.js#deprecation-notice)) so this part of the post is here for historical purposes.)*

Sitecore loads one version of the site for desktops and a (slightly) different version of the site handheldz.

Each product image reacts to a jQuery-powered `mouseover` on desktops and a jQuery-powered `click` on handhelds. The image reaction is, when one of those events happens, a window scrolls up over it displaying some product info using `jQuery.animate()`.

The group of images is placed in a JS array where a `forEach` method loops over it, but `forEach` isn't supported in legacy Internet Explorer. That meant building a feature-detect for `forEach` and, if the site loaded into a browser that didn't support that, loading in a polyfill that would apply `forEach` support in such browsers.

This whole process was managed by [Modernizr](http://modernizr.com "Read more about Modernizr") and its [Modernizr.load() method](http://modernizr.com/docs/#load "Read more about Modernizr.load()").  And it's a pretty straightforward process when keeping a few things in mind...

  * Note that [MDN provides a great piece of polyfill code<sup>1</sup>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill "Get the 'forEach' polyfill code at Mozilla Developer Network")...I copied it into a file called `forEachPolyfill.js`.
  * Remember that a full Modernizr build performs features detects for many things by default, but not everything.
  * Remember that you can [create a custom Modernizr build](http://modernizr.com/download/ "Create a custom Modernizr build") with only the features-detects you want, and can also create your own custom features-detects for the things that Modernizr doesn't look for by default...this is done with Modernizr's sorely under-used `addTest()` method.
  * Note that Modernizr provides a well-stocked list of [pre-written feature-detects in its GitHub repo](https://github.com/Modernizr/Modernizr/tree/master/feature-detects "See some Modernizr pre-written feature detects").

<small><em><sup>1</sup> the polyfill code has been updated since I first used it, but all works well for both versions.</em></small>

But most importantly, remember that Modernizr has a `Modernizr.load()` method that's based on yepnope.js 
I applied a custom feature-detect based on one of these pre-written pieces of code: [the ECMAScript 5.1 array feature-detects](https://github.com/Modernizr/Modernizr/blob/master/feature-detects/es5/array.js "See Modernizer's ES5 feature-detect polyfill"). I then placed the code in a file called `forEachTest.js`.

There are two versions of `app.js`: one for desktops and one for mobiles & handhelds. Sitecore uses device detection to decide which one to load.

The .js files look like this:

__forEachTest.js__
{% prism javascript %}
/*
 * Make Modernizr test for "Array.prototype.forEach" so it can work
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


__app.js (Mobile/Handheld Version)__
{% prism javascript %}
function ScrollContent() {}

/*
 * "buildScrolls" method: runs faster if it's attached to core
 * function's prototype and not inside core function.
 */
ScrollContent.prototype.buildScrolls = function(element) {

  /*
   * scroll up code/down for mobile/handhelds using "jQuery.click()"
   * below since this is the mobile/handheld version. In the desktop
   * version, "jQuery.click()" is replaced by "jQuery.mouseover()".
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
["productOne","productTwo","productThree","productFour","productFive","productSix","productSeven"].forEach(products.buildScrolls);
{% endprism %}

And the HTML code for each scroll looks somewhat like this...
{% prism markup %}
<div id="productOneId">
  <div id="productOneContent">...</div>
</div>
<div id="productTwoId">
  <div id="productTwoContent">...</div>
</div>
<div id="productThreeId">
  <div id="productThreeContent">...</div>
</div>
<div id="productFourId">
  <div id="productFourContent">...</div>
</div>
<div id="productFiveId">
  <div id="productFiveContent">...</div>
</div>
<div id="productSixId">
  <div id="productSixContent">...</div>
</div>
<div id="productSevenId">
  <div id="productSevenContent">...</div>
</div>
{% endprism %}

The divs that end in "Id" are buttons that run one of the mouse events while the divs that end in "Content" contain the  product images that appear on the mouse events.

So on page-load, everything works as follows...

1. Inside `forEachTest.js`, Modernizr tests for the existence of `forEach` in the browser.
2. If `forEach` exists, the "yep" part of the code runs and loads `app.js` into the browser.
3. If `forEach` does NOT exist, the "nope" part of the code runs and adds both the polyfill code and `app.js` into the browser.
4. When one of the divs ending in id receives one of the mouse events, the `ScrollContent.buildScrolls()` method in `app.js` runs.
5. `ScrollContent.buildScrolls()` takes an array of text strings, and each array item in the array is  passed as the `element` parameter in `buildScrolls()`.
6. The parameters are text strings that get passed to the `element` reference in the jQuery event calls. So for example:

    * the value of `element` in the forEach loop is "productOne".
    * two text strings are built as a result: "#productOneId" and "#productOneContent".
    * both text strings match the name of the div in the HTML code, synchronizing with the jQuery event calls

<a name="grunt-gulp"></a>
### Grunt &amp; Gulp
I can't see task tools like [Grunt](http://gruntjs.com "Learn more about the Grunt task runner") being omitted from my workflow and as discussed in my last site redesign post, [Grunt ruled my workflow](/site-redesign-2013/#grunt-deployment-workflow "Read about kaidez.com's 2013 site redesign"). But [Gulp](http://gulpjs.com/, "Learn more about Gulp") has emerged as formidable challenger to Grunt.

Grunt and Gulp are Node-based task runners that run from the command line. Both let you build custom tasks but there are tons of plugins available for each that let you run pre-built tasks. There are probably more similarities but these are the two that stick out to me the most.

The BIG difference is how Gulp works behind the scenes...Gulp uses Node's streaming system to build and synchronize its tasks. Gulp creator Eric Schoffstall has said that you need to be a programmer to understand Gulp, but I think that the streaming system makes parts of it easier. Gulp streams allow for the easy chaining of tasks as well as requiring less configuration, and I like that.

I used Gulp and Grunt while coding the Pro Brands site because for all of Gulp's advantage, there are more plug-ins available for Grunt. So in order to get certain tasks done within a short development timeline, I used Grunt to fill in the spots where a Gulp plugin wasn't available.

The fact that there are less Gulp plugins that Grunt ones ties into Gulp's philosophy. Eric Schoffstall outlined this philosophy quite well on the [JavaScript Jabber Podcast](http://javascriptjabber.com/097-jsj-gulp-js-with-eric-schoffstall/ "Listen to Eric Schoffstall on JavaScript Jabber")...give it a listen.

<a name="conclusion"></a>
### Conclusion
There weren't REALLY a lot of code challenges for me in this project...a simple one-pager like this doesn't bring any. But I pushed myself with code a little and played with some new tools. I accomplished what I wanted to and as a developer, that's enough.