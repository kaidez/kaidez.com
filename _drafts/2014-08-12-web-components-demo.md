---
title: 'Web Components Demo: Templates and (some) Shadow DOM'
comments: true
author: Kai Gittens
layout: post
permalink: /web-components-demo/
meta-excerpt: A Web Components demo using just templates and Shadow DOM, mostly templates. Post includes many links to Web Component learning resources.
category: coding-best-practices
cat-name: "Code Tips"
tags: [web components, shadow DOM, templates]
has-home-img: web-components-demo.jpg
---
*Author's Note: it's best to review the demo and its code in Google Chrome 36+.*

I spent some time hacking Web Components during a long flight layover and it was time well spent. I put together a small demo just so I could further comprehend WC as a whole.

Web Components are a concept based on four sub-concepts, but I focused on just two of them for the demo: templates and Shadow DOM, primarily templates. At the time of this post, a neat cross-browser/cross-device implementation of Web Components requires a polyfill library like [Polymer](http://www.polymer-project.org/ "visit the Polymer Web Components Library") or [X-Tag](http://x-tags.org/ "visit the X-tag Web Components Library"), but I wanted to study the internal workings of each sub-concept before looking at the polyfills. 

### A Quick Web Components Description
Web Components are a set of emerging technologies that are working towards a firm specification thanks to the hard work of the W3C. The goal of Web Components is to allow developers to use HTML, CSS and JavaScript to create custom elements.

By custom elements, I mean things like the custom `<github-card>` element that you can add to your web page. If you have a GitHub account, [check out the <github-card> demo page](http://pazguille.github.io/github-card/ "go to <github-card> demo page"), add your name in the field so you can review the end result, then [go to the <github-card> documentation](https://github.com/pazguille/github-card "go to <github-card> GitHub documentation") so you can see how to add it to your page using one simple page tag.

Web Components are a concept that's made up of four sub-concepts:

1. *__Templates__*: a chunk of formatted HTML that can be cloned, inserted and rendered based on instructions you give it. [Read more &raquo;](http://www.html5rocks.com/en/tutorials/webcomponents/template/) 
2. *__Shadow DOM__*: an area in your page DOM that you can not only add code to, but can also keep the code neatly encapsulated. [Read more &raquo;](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/)
3. *__Custom Elements__*: the ability to create custom page tags, with the above-mentioned `<github-card>` tag as an example. [Read more](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/)
4. *__HTML Imports__*: the ability to load in small pieces of HTML code into your page when needed. [Read more](http://www.html5rocks.com/en/tutorials/webcomponents/imports/)

*(Side note: there's another concept called "decorators" but lots of developers don't like it, so it's not getting a lot of focus in terms of finalizing its specification and may disappear.)*

### Started Out By Focusing on Templates:
I've read about all of these sub-concepts (including decorators) and played with the code a bit, but the best way to learn about code is to actually write it out. So I'm in the middle of hacking out code for each sub-concept and decided to start with templates.

Things started like this...

__index.html__
{% prism markup %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript Books</title>
  <link rel="stylesheet" href="css/normalize.min.css">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <div id="container">
    <h1 class="page-header">JavaScript Books</h1>
    <template id="singleBook">
      <style>
        .templateArticle {
          display: inline-block;
          margin: 6px;
        }
        .btn {
          margin: 10px;
          float: right;
        }
        .thumbnail {
          margin-bottom: 0;
        }
        .bookTitleClass {
          text-align: left;
        }
        #bookTitle {
          font-style: italic;
        }
      </style>
      <article class="templateArticle panel panel-default">
        <header class="panel-heading">
          <h2 class="panel-title bookTitleClass">
            <span id="bookTitle"></span>
            <br />
            by <span id="bookAuthor"></span>
          </h2>
        </header>
        <img src="" alt="" class="thumbnail">
        <a href="" id="btnPurchase" class="btn btn-primary" role="button" target="blank">Buy at Amazon</a>
      </article>
    </template>
    <section id="allBooks" class="allBooksClass"></section>
    <footer role="contentinfo">
      <small>Open source, guys...use the code how you want to!!! But if you buy any of these books through the "Buy at Amazon" links, you're making me money!!!</small>
    </footer>
    <script src="scripts/main.js"></script>
  </div>
</body>
</html>
{% endprism %}

__styles.css__
{% prism css %}
body {
  margin: 20px;
}
h1 {
  text-align: center;
}
footer {
  text-align: center;
  margin-top: 20px;
}
.allBooksClass {
  margin-top: 30px;
  text-align: center;
}
{% endprism %}

__scripts.js__
{% prism javascript %}
(function(){

  var jsBooks = {
    "book1" : {
      "title": "Object-Oriented Javascript",
      "author": "Stoyan Stefanov",
      "image": "images/ooj.jpg",
      "amazonLink": "http://www.amazon.com/gp/product/1849693129/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1849693129&linkCode=as2&tag=kaidez-20&linkId=CK7X5SMYEHL3BMEQ"
    },
    "book2" : {
      "title": "Effective Javascript",
      "author": "David Herman",
      "image": "images/effectivejs.jpg",
      "amazonLink": "http://www.amazon.com/gp/product/0321812182/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0321812182&linkCode=as2&tag=kaidez-20&linkId=KC4WGKUBOQWXNFBA"
    },
    "book3" : {
      "title": "JavaScript: The Good Parts",
      "author": "Douglas Crockford",
      "image": "images/goodparts.jpg",
      "amazonLink": "http://www.amazon.com/gp/product/0596517742/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0596517742&linkCode=as2&tag=kaidez-20&linkId=DMIEK65EIJ33NXHM"
    },
    "book4" : {
      "title": "Eloquent Javascript",
      "author": "Marijn Haverbeke",
      "image": "images/eloquentjavascript.jpg",
      "amazonLink": "http://www.amazon.com/gp/product/1593275846/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1593275846&linkCode=as2&tag=kaidez-20&linkId=3EF3Y6ZCF3VNMI2N"
    }
  };
  
  var template = document.querySelector("#singleBook"),
    templateContent = template.content,
    host = document.querySelector("#allBooks"),
    root = host.createShadowRoot(); // "#allBooks" is the Shadow Root

  for (key in jsBooks) {
    var title = jsBooks[key].title,
      author = jsBooks[key].author,
      image = jsBooks[key].image,
      amazonLink = jsBooks[key].amazonLink;

    templateContent.querySelector("img").src = image;
    templateContent.querySelector("img").alt 
    = templateContent.querySelector("#bookTitle").innerHTML
    = title;
    templateContent.querySelector("#bookAuthor").innerHTML = author;
    templateContent.querySelector("#btnPurchase").href = amazonLink;
    root.appendChild(document.importNode(templateContent, true));
  }
})();
{% endprism %}