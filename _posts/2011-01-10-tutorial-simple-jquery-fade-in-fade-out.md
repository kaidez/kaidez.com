---
title: 'TUTORIAL: A Simple jQuery Image Fade In/Fade Out With A Delay'
author: Kai Gittens
layout: post
permalink: /tutorial-simple-jquery-fade-in-fade-out/
custom_post_template:
  - googlePost.php
  - googlePost.php
twitter_failure_reason:
  - Settings do not permit the auto-tweeting of old posts
  - Settings do not permit the auto-tweeting of old posts
has_been_twittered:
  - failed
  - failed
twitter_failure_code:
  - 400
  - 400
category:
  - Tutorials
---
# 

*Update: March 3rd, 2012: the code below is simple and will do the job. But if you’re looking for something more dynamic, [please see this code’s update][1]. It still uses jQuery, but uses a for() loop to make things dynamic. A detailed screencast tutorial on how to create a JavaScript for() loop is included as well!*

 [1]: http://kaidez.com/javascript-for-loop-creates-jquery-fade/

Clients *looooooove* images that fade in and fade out on home pages. Flash was once the main tool of choice for this but jQuery now lets us do it with less code and guarantees that things will show up on multiple devices, iPhones included.

I had to do this recently for the project I mentioned in [my previous post][2]. You can view the end-result of this [over at the Almay site][3].

 [2]: http://kaidez.com/almay-project-using-html5-net-jquery/
 [3]: http://www.almay.com/microsites/WakeUpMakeup/Default.aspx

Here’s how I did it: 

 

    
    
    
    
    A Simple jQuery Fade In/Fade Out
    
    
    #picOne, #picTwo {
    position:absolute;
    display: none;
    }
    
    #pics {
    width:100px;
    height:100px;
    }
    
    
    
    
    
    $(document).ready(function() { 
        $('#picOne').fadeIn(1500).delay(3500).fadeOut(1500);
        $('#picTwo').delay(5000).fadeIn(1500);
    });
    
    
    
    
    
    
    
    
    
    
    
    

Let’s review the specific parts of the code that make the fade in/fade out work…

We create unique CSS IDs for each of our two images. They need to be hidden when the page first loads and also need to be stacked one on top of the other, so we respectively use display:none and position:absolute. We also need to create a containing  for our images, so we create a unique CSS ID called “pics”:

    
    #picOne, #picTwo {
    display: none;
    position:absolute;
    }
    
    #pics {
    width:100px;
    height:100px;
    }
    
    

 

 

We have to embed the jQuery library into our web page…in this case, I embedded the one hosted over at [jQuery.com][4]:

 [4]: http://jquery.com/

    
    

 

As soon as the page is loaded, the jQuery .fadeIn() function fades in our first image in 1500 milliseconds (or, 1.5 seconds). The .delay() function acts as a counter and waits 3500 milliseconds (or, 3.5 seconds), then the .fadeOut() function fades it out in 1500 milliseconds (or, 1.5 seconds).

    $('#picOne').fadeIn(1500).delay(3500).fadeOut(1500);
    

 

 

At the same time that the first image is doing its thing on page load, the .delay() function makes the second image wait 5 seconds before the .fadeIn()function fades it in in 1.5 seconds. 

    $('#picTwo').delay(5000).fadeIn(1500);
    

 

 

We place our two images in our “pics”  tag. The images and  tag are of equal width and height. And since the images were styled with position: absolute, they will be stacked one on top of the other. Whichever one is listed first is the one on top:

    
    
    
    
    

That should do it…but let me make two points:

*   I used transparent GIFs for this because transparent PNGs looked weird when they faded in and out. Of course, you can use a JPEG if your images don’t need to be transparent.  

*   Properly syncing the various fades took a little planning. Note the combined time for .fadeIn() and .delay() for the first image is five seconds, equal to the timing on the .delay() for the second image. Also note that the first image takes 1.5 seconds to fade out while the second one takes the same amount of time to fade in. This keeps everything neat. 

My HTML5 video posts are coming soon but another short jQuery-related post is coming next.