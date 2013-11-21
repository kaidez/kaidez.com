---
title: 'TUTORIAL: Create The Building Blocks For An HTML5 Page'
comments: true
author: Kai Gittens
layout: post
permalink: /create-html5-page/
meta-excerpt: Understanding the HTML5 DTD and Character Set Needed For Your First HTML5 Page.
category: tutorials
cat-name: "Tutorials"
tags: [tutorial, html5]
---

This is a very simple tutorial. It won’t teach you how to use ,  or any other HTML5-specific tags. All it does is describe what building blocks are needed BEFORE you insert those tags. And it all comes down to two lines of code.

Cut-and-paste the code below into your favorite web editor:

 
{% prism markup %}
<!DOCTYPE html>
<html>
  <head>
   <title>Your First HTML5 Page</title>
   <meta charset=”UTF-8″ />
  </head>
  <body>
     Your content goes here.
  </body>
</html> 
{% endprism %}
 

 

That’s it! See those two bolded lines of copy above? They are the only building blocks needed for creating an HTML5 page: a document type declaration that’s simpler then the previous ones (which is the first bolded line above) and a character set definition that’s simpler then the previous ones (which is the second bolded line above).

Of course, to REALLY make this an HTML5 page, you need to throw in some specific tags like  and . You will also want to add in some CSS3.

But the key thing to remember is this: your pages can be HTML5-ready without all the HTML5-specific tags and CSS3. It absolutely cannot be HTML5-ready if it doesn’t have that new document type declaration and that new character set definition. You do the document type declaration and character set definition first, *then* you add those tags and CSS3. That’s how you create an HTML5 page.

A suggestion: start typing in those two lines of code by hand for every new web page that you create from now on. Don’t cut-and-paste them from another web page or a program like Dreamweaver: just type them in by hand.

This is my first tutorial. Was I clear or was I not clear enough? Please let me know so I can shape up.