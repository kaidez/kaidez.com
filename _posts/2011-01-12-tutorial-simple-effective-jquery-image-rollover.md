---
title: 'TUTORIAL: A Simple, Effective jQuery Image Rollover'
comments: true
author: Kai Gittens
layout: post
permalink: /tutorial-simple-effective-jquery-image-rollover/
meta-excerpt: A very popular, cross-browser complaint jQuery image rollover
category: tutorials
cat-name: "Tutorials"
tags: [ajax, jquery, html5]
---
I used the following code to create the image rollovers for [the recent Almay project I worked on][1].

 [1]: http://kaidez.com/almay-project-using-html5-net-jquery/

Truthfully, I wasn't going to post this: I found it on another site and felt that re-posting it here would be claiming it as my own creation. But I found quite a few other sites using the exact same script, so I'm not the only one re-posting it. Plus, this rollover code works…well I might add. It doesn't use CSS, making it much more cross-browser compliant; it's not as buggy as some other JavaScript rollover code I've encountered, and it gets the job done with very little code. 

I'm viewing all those other re-posts as an endorsement of how almost-perfect this code is. Here's my endorsement: 

{% prism markup %}

<!DOCTYPE html> 
<html dir="ltr" lang="en-US">
<head>
<meta charset="UTF-8" />
<title>A Simple jQuery Image Rollover</title>

<script src="http://code.jquery.com/jquery-1.4.4.min.js" type="text/javascript"></script>

<script type="text/javascript">
$(document).ready(function() {
$("img.rollover").hover( 
function() { this.src = this.src.replace("_off", "_on"); 
}, 
function() { this.src = this.src.replace("_on", "_off"); 
});
}); 
</script>

</head>
<body> 

<a href="#"><img src="imageOne_off.png" class="rollover" /></a> 
<br />
<a href="#"><img src="imageTwo_off.png" class="rollover" /></a>

</body>
</html>
    
{% endprism %}

First, make sure that you create your rollover images. Each individual rollover needs two images attached to it: one named 'yourFilename_off.gif' and the other named 'yourFilename_on.gif'. As long as these images are of the same file type, it doesn't matter what file type it is. GIF, JPEG, PNG…it doesn't matter. For this example, I have four images that will be used in two rollovers:

{% prism markup %}
imageOne_off.png  

imageOne_on.png 

imageTwo_off.png  

imageTwo_off.png  
{% endprism %}


And now the code breakdown…

We make sure to embed the jQuery library into our web page grabbing the one stored over at jquery.com:

Next, we tell jQuery that every time an image tag with a class name of “rollover” gets moused over, it should **simultaneously** perform two tasks:

*   it should see if the image contains the word “\_off” in the filename…if it does, replace it with “\_on” which will force the “_on” version of image to load.  

*   it should see if the image contains the word “\_on” in the filename…if it does, replace it with “\_off” which will force the “_off” version of image to load.

{% prism javascript %}
<script type="text/javascript">
$(document).ready(function() {
$("img.rollover").hover( 
function() { this.src = this.src.replace("_off", "_on"); 
}, 
function() { this.src = this.src.replace("_on", "_off"); 
});
}); 
</script>
{% endprism %}
    
    
And from here, we just place the images on the web page, making sure that they have a class name of “rollover”:
{% prism markup %}
<a href="#"><img src="imageOne_off.png" class="rollover" /></a> 
<br />
<a href="#"><img src="imageTwo_off.png" class="rollover" /></a>
{% endprism %}

That's it!!! The best rollover code I've ever used!!!

One more jQuery-related post, then it's time to discuss HTML5 video!!!!!!