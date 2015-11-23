---
title: 'SCREENCAST TUTORIAL: JavaScript for() loop That Creates A jQuery Fade In/Fade Out'
comments: true
author: Kai Gittens
layout: post
meta-excerpt: JavaScript for loop dynamically creates a jQuery fade in/fade out effect with a delay; includes a demo, code sample and screencast tutorial.
permalink: /javascript-for-loop-creates-jquery-fade/
category: tutorials
cat-name: "Tutorials"
tags: [javascript, screencast, tute]
---

[VIEW THE DEMO FIRST »][1]

 [1]: http://jsfiddle.net/kaidez/6xfKN/33/

My most visited article (as of this one) is my [jQuery fade in/fade out tutorial][2]. Thanks to a clean title tag and a click-inducing meta description, this 58-post blog (also, as of this one) gets roughly 300 unique visits a day...all of which, I’m humbled by.

 [2]: /tutorial-simple-jquery-fade-in-fade-out/

As I saw how people were using the tutorial’s code, a need to make it dynamic became very obvious. I did so with a JavaScript for() loop….here’s the complete code breakdown:

## HTML

{% prism markup %}   
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="main.css">
    <title>jQuery fade-ins with a JavaScript for() loop</title>
</head>
<body>  
    <div id="elem0" class="toBeFaded">Here's the first message...</div>
    <div id="elem1" class="toBeFaded">We have second one here...</div>
    <div id="elem2" class="toBeFaded">And here's the third message...</div>
    <div id="elem3" class="toBeFaded">OMG!!! Here's the fourth message!</div>
 
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
 
    <script src="fadeCode.js" defer="defer"></script>
 
</body>
</html>
{% endprism %} 

## CSS (main.css)

{% prism css %} 
.toBeFaded {
  display: none;
  position:absolute;
  font-size:70pt;
}
{% endprism %}    

## JavaScript (fadeCode.js)

{% prism javascript %} 
$(function (){
    	
  var yourFade = 1, // the amount of time in seconds that the elements will fade in fade out
  yourDelay = 2, // the amount of time in seconds that there will be a delay between the fade ins and fade outs
  fadeTime = yourFade * 1000, //convert fade seconds to milliseconds (1000)
  delayTime = yourDelay * 1000, // convert delay seconds to milliseconds (2000)
  totalTime = fadeTime   delayTime, //3000 milliseconds...needed for all those delays we talked about
  allElems, // find out exactly how many page elements have the 'toBeFaded' class (4)
  elemNoFade, // Will help us find the last element represent the last element (3)
  i,
  fadingElem;
    
  for (i = 0, allElems = $('.toBeFaded').length, elemNoFade = allElems - 1; i < allElems; i = 1) {
    fadingElem = "#elem" + i;
    if (i === 0) {	
    	$(fadingElem).fadeIn(fadeTime).delay(delayTime).fadeOut(fadeTime);
    } else if (i === elemNoFade) {
    	$(fadingElem).delay(totalTime * i).fadeIn(fadeTime);
    } else {
    	$(fadingElem).delay(totalTime * i).fadeIn(fadeTime).delay(delayTime).fadeOut(fadeTime);
    }
  }
});
{% endprism %}

What's happening here:

*   The elements that you want to fade in and out *must* be placed on your page with a unique ID that starts with "elem" and ends with a number. The numbers *must* start counting at 0 (ie. `'elem0'` first, `'elem1'` next, `'elem2'` after that, etc...)
*   Each fading page element *must* have a classname of `'toBeFaded'`.
*   The JavaScript uses those IDs and classnames to detect the page elements and, based on this detection, create jQuery code that fades the elements in and out.
*   There will be a delay between each element's fade in and fade out. The JavaScript dynamically detects the length of the delay.
*   If you want to adjust the seconds of fade in and fade out time, change the number value of the `'yourFade'` variable in the JavaScript.
*   If you want to adjust the seconds of the delay, change the number value of the `'yourDelay'` variable in the JavaScript.

The code is fully dynamic: all you have to do is layout the HTML and tweak the JavaScript variables as described above; the code does the rest. You can style things however you want as the CSS but you probably want to keep the `display:none` and `position:absolute` settings.

As far as teaching people *how* to do this, I always assume that those reading my code are web design/dev beginners and try to walk them through it. But the JavaScript for() loop is what's running things here...walking through that isn't a simple process.

I remember struggling with the JavaScript for() loop and believe that others do so as well. So I've created this three-part screencast tutorial that explains the JavaScript for() loop in excruciating detail.

No doubt about it, this screencast tutorial is for the JavaScript beginner. The JavaScript pro may be bored by it; however, if you are a JavaScript pro but have never read either Douglas Crockford's [JavaScript: The Good Parts][3] or Stoyan Stevanov's [JavaScript Patterns][4], you may want to check out the third video.

 [3]: http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742
 [4]: http://www.amazon.com/JavaScript-Patterns-Stoyan-Stefanov/dp/0596806752/ref=sr_1_1?s=books&ie=UTF8&qid=1330662444&sr=1-1

Enjoy!!!

## Part One
<iframe width="560" height="315" src="//www.youtube.com/embed/Wc_kLZTyTjQ" frameborder="0" allowfullscreen></iframe>

## Part Two
<iframe width="560" height="315" src="//www.youtube.com/embed/q0EYJfOz9Mg" frameborder="0" allowfullscreen></iframe>


## Part Three
<iframe width="560" height="315" src="//www.youtube.com/embed/tFRC1tKeMJ0" frameborder="0" allowfullscreen></iframe>