---
title: 'TUTORIAL: How AJAX, jQuery and HTML5 Work Together'
author: Kai Gittens
excerpt: |
  AJAX, jQuery and HTML5 are big buzz words in the web design/development community nowadays.  While getting these web technologies to work together is exciting, the programming required to do this isn't new.
layout: post
permalink: /ajax-jquery-html5-work-together/
custom_post_template:
  - googlePost.php
  - googlePost.php
category:
  - Tutorials
---
# 

AJAX, jQuery and HTML5 are big buzz words in the web design/development community nowadays. While getting these web technologies to work together is exciting, the programming required to do this isn’t new.  
  
AJAX, jQuery and HTML5 work together through the use of *page tags, page IDs* and *page classes* that exist between the two  tags of a web page. The JavaScript functionality embedded in jQuery and AJAX finds these tags , IDs and classes (which we’ll now call *page elements*) and “does” something to them; maybe it changes their background color, maybe it’s loading copy into them. Either way, it’s doing *something* to them.  
  
This process of “finding and doing something” to these page elements with JavaScript is more commonly known as *“traversing the DOM”*. Simply put, ***traversing the DOM is the key to getting AJAX, jQuery and HTML5 to work together***.  
  
Web developers have used DOM traversal for years so, again, there really isn’t that much new programming involved when it comes to syncing up AJAX, jQuery and HTML5. Still, a layman’s description of how all this works may be required, so I’ll give it a try.  
  
[***Next: Traversing the DOM The Old School Way With JavaScript »***][1]

 [1]: http://kaidez.com/ajax-jquery-html5-work-together/2/

 



## Traversing the DOM The Old School Way With JavaScript

DOM stands for **D**ocument **O**bject **M**odel. All the page elements live within the DOM, which is built into a web page. You find the elements by traversing the DOM with JavaScript, mostly through the use of the getElementById() function.

Here’s some HTML5-ready page code that uses it:

  
  
  
  
Load Text Into An ID Using JavaScript  
  
function loadText() {  
document.getElementById(‘words’).innerHTML = ‘Hello World!’;  
}  
  
  
  
  
  
  
  


Let’s look at the code and translate it…

**The  tag**

  
function loadText() {  
document.getElementById(‘words’).innerHTML = ‘Hello World!’;  
}  




TRANSLATION: create a JavaScript function called loadText(). When this function runs, it should find a page element with an id of ‘words’ and place some text inside of it that says *Hello World!*

**The  tag**









TRANSLATION: Whenever this button is clicked, run the loadText() function. This will load that *Hello World!* copy into that page element with an id of ‘words’.

**The  tag**









TRANSLATION: This empty  tag is the page element with an id of ‘words,’ so this is what’s affected when the loadText() function runs. Therefore, this is where the *Hello World!* text will be placed into when the button is clicked.

An ID must be unique on a web page so in our example, there can only be one page element with an ID of “words.” If you need to traverse the DOM with JavaScript to locate multiple page elements with the same name, it’s best if you look for tags using the getElementsByTagName() function:

  
  
  
  
Load Text Into Multiple Tags Using JavaScript  
  
function loadText() {  
var topDiv=document.getElementsByTagName(“p”)[0].innerHTML = “Hello World”;  
var bottomDiv=document.getElementsByTagName(“p”)[1].innerHTML = “Goodbye World”;  
}  
  
  
  
  
  
  
  
  


The function now creates two variables: one that looks for the first  tag on the page and one that looks for the second one. And since computers start counting at 0, each  tag is named [0] and [1], respectively. Just as before, the function executes when the button is clicked; when that happens, text gets loaded into each  tag.

It would be easier if you could find page elements with class names instead of tag names And you can traverse the DOM with getElementsByClassName(), but it doesn’t always work when using JavaScript.

It would be great if all of this could be made easier…jQuery does just that.  
  
[***Next: Traversing the DOM The New School Way With jQuery »***][2]

 [2]: http://kaidez.com/ajax-jquery-html5-work-together/3/

 



## Traversing the DOM The New School Way With jQuery 

jQuery is an extensive JavaScript library that, when attached to a web page, makes it easier for developers to write JavaScript. Its rise in popularity is mostly due to the neat effects it can produce: demos of effects like the accordion widget can be viewed at [the jQuery UI demo page][3]. 

 [3]: http://jqueryui.com/demos/

As cool as these effects are, the fact that ***jQuery makes DOM traversal easier*** is, I believe, its best feature. Let’s load the phrase “Hello World!” into a  tag with an ID like we did in our previous example, but with jQuery instead of JavaScript:

  
  
  
  
Load Text Into An ID Using jQuery  
  
  
**$(document).ready(function(){  
$(“input”).click(function () {  
$(‘#words’).html(“Hello World”);  
});  
});**  
  
  
  
  
  
  
  






We attached the jQuery library stored at Google Libraries to our web page:





Then we use the jQuery code in bold to create a function that traverses the DOM to find the  tag and loads text into it when it’s clicked. We just did this in JavaScript and now did it with jQuery, and used a little less code in the process.

Also with jQuery, we can now traverse the DOM with ease to locate classes, even if we have to locate more than one:

  
  
  
  
Load Text Into Multiple Classes Using jQuery  
  
  
**$(document).ready(function(){  
$(“input”).click(function () {  
$(‘.words’).html(“Hello World”);  
});  
});**  
  
  
  
  
  
  
  
  






And yes, jQuery lets us traverse the DOM to locate tags, multiple ones if we need to:

  
  
  
  
Load Text Into A Tag With jQuery  
  
  
**$(document).ready(function(){  
$(“input”).click(function () {  
$(‘p’).html(“Hello World”);  
});  
});**  
  
  
  
  
  
  
  
  






This was easy so let’s do something more advanced and add AJAX to our discussion.  
  
[***Next: Start Using AJAX With jQuery »***][4]

 [4]: http://kaidez.com/ajax-jquery-html5-work-together/4/

 



## Start Using AJAX With jQuery

AJAX is an acronym for **A**synchronous **J**avaScript **A**nd **X**ML. It is not a programming *language* but a programming *concept*. More specifically, AJAX is a set of unofficial rules for getting the following web technologies to work together on a website:

*   JavaScript
*   XML
*   HTML
*   The DOM

AJAX can do a lot but its main purpose in life is to load and unload page content without actually reloading the page. A good example of this is [the AJAX Example at W3 Schools][5]. Click the “Change Content” button while looking at any banners on the page. Notice that the example content refreshed while the banners (i.e. the page) did not. Now refresh your browser page while looking at the banners: notice that they, along with the content, refreshed this time.

 [5]: http://www.w3schools.com/ajax/ajax_example.asp

[![Grow your brain.][7]][7]JavaScript is what really brings AJAX together but the XMLHttpRequest object that’s embedded in “almost” all web browsers plays an important role here as well. 

 []: http://www.lynda.com/home/otl.aspx?utm_medium=affiliate&utm_source=ldc_affiliate&utm_content=58&utm_campaign=CD2146&bid=58&aid=CD2146&opt=

As I said, “almost” all browsers contain XMLHttpRequest. Not surprisingly, Internet Explorer 6 doesn’t. It can still perform AJAX: it just needs the ActiveXObject to do it instead of XMLHttpRequest. So you *always* need to detect the browser before you use AJAX.

The following code detects the browser, determines which version of AJAX to use based on the detection, then creates a JavaScript function that uses AJAX to load a text file that’s stored on the server called ajaxCopy.txt **(NOTE: you can only test this code if you upload it to your website)**:

  
  
  
  
AJAX Detection And Data Loading With JavaScript  
  
  
var xhrObject = false;  
  
  
if (window.XMLHttpRequest) {  
xhrObject = new XMLHttpRequest();  
  
  
} else if (window.ActiveXObject) {  
xhrObject = new ActiveXObject(“Microsoft.XMLHTTP”);  
}  
  
  
function loadCopy(externalTextFile, externalTextDiv) {  
  
  
if(xhrObject) {  
  
  
var pageText = document.getElementById(externalTextDiv);  
  
  
xhrObject.open(“GET”,externalTextFile);  
  
  
xhrObject.onreadystatechange = function () {  
if(xhrObject.readyState == 4 && xhrObject.status == 200) {  
pageText.innerHTML = xhrObject.responseText; } }  
  
  
xhrObject.send(null);  
}  
}  
  
  
  
  
  
