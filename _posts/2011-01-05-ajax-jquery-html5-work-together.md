---
title: 'TUTORIAL: How AJAX, jQuery and HTML5 Work Together'
author: Kai Gittens
meta-excerpt: AJAX, jQuery and HTML5 are big buzz words in the web design/development community nowadays.  While getting these web technologies to work together is exciting, the programming required to do this isn't new.
layout: post
permalink: /ajax-jquery-html5-work-together/
category: tutorials
cat-name: "Tutorial"
tags: [ajax, jquery, html5]
---
# 

AJAX, jQuery and HTML5 are big buzz words in the web design/development community nowadays. While getting these web technologies to work together is exciting, the programming required to do this isn’t new.  
  
AJAX, jQuery and HTML5 work together through the use of *page tags, page IDs* and *page classes* that exist between the two  tags of a web page. The JavaScript functionality embedded in jQuery and AJAX finds these tags , IDs and classes (which we’ll now call *page elements*) and “does" something to them; maybe it changes their background color, maybe it’s loading copy into them. Either way, it’s doing *something* to them.  
  
This process of “finding and doing something" to these page elements with JavaScript is more commonly known as *“traversing the DOM"*. Simply put, ***traversing the DOM is the key to getting AJAX, jQuery and HTML5 to work together***.  
  
Web developers have used DOM traversal for years so, again, there really isn’t that much new programming involved when it comes to syncing up AJAX, jQuery and HTML5. Still, a layman’s description of how all this works may be required, so I’ll give it a try.  
  
<h2>Traversing the DOM The Old School Way With JavaScript</h2>

DOM stands for Document Object Model. All the page elements live within the DOM, which is built into a web page. You find the elements by traversing the DOM with JavaScript, mostly through the use of the `getElementById()` function.

Here’s some HTML5-ready page code that uses it:

{% prism markup %}  
<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
<meta charset="UTF-8" />
<title>Load Text Into An ID Using JavaScript</title>
<script type="text/javascript">
function loadText() {
document.getElementById(‘words’).innerHTML = ‘Hello World!’;
}
</script>
</head>
<body>
<input type="button" onclick="loadText()" value="Load Some Copy!"/>
<br />
<div id="words"></div>
</body>
</html>
{% endprism %}
Let’s look at the code and translate it..

The `<script>` tag

{% prism javascript %} 
<script type="text/javascript">
function loadText() {
document.getElementById(‘words’).innerHTML = ‘Hello World!’;
}
</script>
{% endprism %}
TRANSLATION: create a JavaScript function called loadText(). When this function runs, it should find a page element with an id of ‘words’ and place some text inside of it that says Hello World!

The `<input>` tag

{% prism markup %}<input type="button" onclick="loadText()" value="Load Some Text!"/> {% endprism %}
TRANSLATION: Whenever this button is clicked, run the loadText() function. This will load that Hello World! copy into that page element with an id of ‘words’.

The `<div>` tag

{% prism javascript %}<div id="words"></div>{% endprism %}
TRANSLATION: This empty `<div>` tag is the page element with an id of ‘words,’ so this is what’s affected when the loadText() function runs. Therefore, this is where the Hello World! text will be placed into when the button is clicked.

An ID must be unique on a web page so in our example, there can only be one page element with an ID of “words." If you need to traverse the DOM with JavaScript to locate multiple page elements with the same name, it’s best if you look for tags using the `getElementsByTagName()` function:
{% prism markup %} 
<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
<meta charset="UTF-8" />
<title>Load Text Into Multiple Tags Using JavaScript</title>
<script type="text/javascript">
function loadText() {
var topDiv=document.getElementsByTagName(“p")[0].innerHTML = “Hello World";
var bottomDiv=document.getElementsByTagName(“p")[1].innerHTML = “Goodbye World";
}
</script>
</head>
<body>
<input type='button' onclick='loadText()' value='Load Some Copy!'/>
<br />
<p></p>
<p></p>
</body>
</html>
{% endprism %}
The function now creates two variables: one that looks for the first `<p>` tag on the page and one that looks for the second one. And since computers start counting at 0, each `<p>` tag is named `[0]` and `[1]`, respectively. Just as before, the function executes when the button is clicked; when that happens, text gets loaded into each `<p>` tag.

It would be easier if you could find page elements with class names instead of tag names And you can traverse the DOM with `getElementsByClassName()`, but it doesn’t always work when using JavaScript.

It would be great if all of this could be made easier...jQuery does just that.

<h2>Traversing the DOM The New School Way With jQuery</h2>

jQuery is an extensive JavaScript library that, when attached to a web page, makes it easier for developers to write JavaScript. Its rise in popularity is mostly due to the neat effects it can produce: demos of effects like the accordion widget can be viewed at the jQuery UI demo page.

As cool as these effects are, the fact that jQuery makes DOM traversal easier is, I believe, its best feature. Let’s load the phrase “Hello World!" into a `<div>` tag with an ID like we did in our previous example, but with jQuery instead of JavaScript:

{% prism markup %}
<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
<meta charset="UTF-8" />
<title>Load Text Into An ID Using jQuery</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function(){
$(“input").click(function () {
$(‘#words’).html(“Hello World");
});
});
</script>
</head>
<body>
<input type="button" value="Load Some Copy!"/>
<br />
<div id="words"></div>
</body>
</html>
{% endprism %}
We attached the jQuery library stored at Google Libraries to our web page:

{% prism markup %}
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.js" type="text/javascript"></script>
{% endprism %}
Then we use the jQuery code in bold to create a function that traverses the DOM to find the <div> tag and loads text into it when it’s clicked. We just did this in JavaScript and now did it with jQuery, and used a little less code in the process.

Also with jQuery, we can now traverse the DOM with ease to locate classes, even if we have to locate more than one:

{% prism markup %}
<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
<meta charset="UTF-8" />
<title>Load Text Into Multiple Classes Using jQuery</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function(){
$(“input").click(function () {
$(‘.words’).html(“Hello World");
});
});
</script>
</head>
<body>
<input type=’button’ value=’Load Some Copy!’/>
<br />
<div class="words"></div>
<div class="words"></div>
</body>
</html>
{% endprism %}
And yes, jQuery lets us traverse the DOM to locate tags, multiple ones if we need to:

{% prism markup %}
<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
<meta charset="UTF-8" />
<title>Load Text Into A Tag With jQuery</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function(){
$(“input").click(function () {
$(‘p’).html(“Hello World");
});
});
</script>
</head>
<body>
<input type=’button’ value=’Load Some Copy!’/>
<br />
<p></p>
<p></p>
</body>
</html>
{% endprism %}

This was easy so let’s do something more advanced and add AJAX to our discussion.