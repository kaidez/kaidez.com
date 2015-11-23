---
title: 'TUTORIAL: Creating A Rounded Corner, Transparent CSS3 Link For IE 6 Through 8 With CSS3 Pie'
comments: true
author: Kai Gittens
layout: post
meta-excerpt: A tutorial on creating a rounded corner, transparent CSS3 link in Internet Explorer 6 through 8 with CSS3 PIE
permalink: /css3-pie-link-tutorial/
category: tutorials
cat-name: "Tutorials"
tags: [css, tute]
---
*NOTE: [Grab the finished code for this tutorial over at GitHub][1] if you don’t want to read the whole thing.*

 [1]: https://github.com/kaidez/Files-For-kaidez-CSS3-PIE-Rollover-Tutorial

With all the talk about fancy JavaScript libraries like [jQuery][3] and [Modernizr][4], Jason Johnston’s [CSS3 PIE][5] gets overlooked. Its features may not be as extensive as the other two, but it’s still good at what it does.

 [3]: http://jquery.com/
 [4]: http://www.modernizr.com/
 [5]: http://css3pie.com/

<img src="/img/CSS3-PIE.png" class="post-pic" />
Internet Explorer 9 provides wide CSS3 support while the previous versions of IE don’t support it at all. But CSS3 PIE is a lightweight library (32kb as of this post) that allows developers to apply a limited amount of CSS3 features to Internet Explorer versions 6 through 8. Let’s take a peek at these features by creating a link with rounded corners and transparency.

This tutorial will first create code that’s not friendly for older versions of IE, progressively adding the CSS3 PIE code so you get a before-and-after view of things. I’ll be using both Internet Explorer 8 and Google Chrome to test my code.

1) Create a new folder on your Desktop, naming it “PIETest” (without the quotes, of course).
2) Download the most recent version of CSS3 PIE by [going to their site][5] and clicking the “Download” button in the far right column. It should download as a .zip file.
3) Unzip the PIE files.
4) Open your “PIETest” folder and create another folder called “PIEFiles.” Find the “PIE.htc” file and place it into this new “PIEFIles” folder.
5) Using the web editor of your choice, create an html file called “PIEpage.html” and save it to your main “PIETest” folder.
6) Copy and paste the code below into “PIEpage.html”:

{% prism markup %}
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>A CSS3 Rollover for Internet Explorer 6 thru 8</title>

  <style>
    body {
      background-color:#f43a3a;
    }

    a.links {
      padding: 5px 10px;
      color:#fff;
      background: rgba(58, 101, 241, 0.4);
      -webkit-border-radius: 14px;
      -moz-border-radius: 14px;
      -o-border-radius: 14px;
      border-radius: 14px;
    }

    a.links:hover {
      background: rgba(0, 0, 0, 0.4);
    }
  </style>

  </head>
  <body>
    <a href="#" class="links">Test Link</a>
  </body>
</html>
{% endprism %}

7).  Let’s take a moment to review the stuff in between the  tags:
{% prism css %}
body {
  background-color:#f43a3a;
}
{% endprism %}

We’re giving the page an orange-ish red background so we can see the transparencies we’re about to create.

{% prism css %}
a.links {
  padding: 5px 10px;
  color:#fff;
  background: rgba(58, 101, 241, 0.4);
  -webkit-border-radius: 14px;
  -moz-border-radius: 14px;
  -o-border-radius: 14px;
  border-radius: 14px;
}
{% endprism %}

Any page link with a class name of “links” will have 5 pixels of space on the top and bottom and have 10 pixels of space on the left and right. The link’s text color will be white.

We’re now going to create a transparent background using the rgba property which is new in CSS3. The first three numbers represent the RGB values of a color, a muted purple in this case, and an alpha property of .04, giving it a fair amount of transparency.

Then we have to add the rounded corners for the background by styling the browser’s border-radius property. You can only do this if you target each browser by its *vendor prefix* in the CSS code. So…

*   the -webkit- vendor prefix targets Webkit browsers (Chrome, Safari, Rockmelt, etc.).
*   the -moz- vendor prefix targets Mozilla-based browsers (Firefox).
*   the -o- vendor prefix targets the Opera browser.
*   no vendor prefix mentioned as it appears in line 8 is meant to target the other browsers. In this case, it refers to Internet Explorer.

{% prism css %}
a.links:hover {
  background: rgba(0, 0, 0, 0.4);
}
{% endprism %}


Any time a link with a class of “links” gets a mouseover, it should shift to the rgba settings we created. In this case, it should be black and have same transparency value as the non-hover CSS class above.

8)  Now let’s look at the only code inside of the  tag:
   Test Link

We create a link with a class name of “links” so it responds based on the CSS code above when rolled over as well as rolled off.

9) If you review PIEpage.html in Chrome, it should look like this:  
![][6]

But if you review it in Internet Explorer 8 or lower, it should look like this:  
![][7]

CSS3 PIE will neaten things up for us.  

10)   Add code to the a.links class so it looks like this:
{% prism css %}  
a.links {
  padding: 5px 10px;
  color:#fff;
  background: rgba(58, 101, 241, 0.4);
  -pie-background: rgba(58, 101, 241, 0.4);
  -webkit-border-radius: 14px;
  -moz-border-radius: 14px;
  -o-border-radius: 14px;
  border-radius: 14px;
  behavior: url(PIEFiles/PIE.htc);  
}
{% endprism %}
The first line of code adds the -pie- prefix to the background, allowing the CSS3 PIE code to attach our CSS3 rgba values to the background when viewed in older versions of IE.

The second line of code attaches the CSS3 PIE library to our page, giving the page CSS3 functionality. It also forces the rounded corners to appear in IE.  

11)   Now, we add the -pie- prefix to the background of our hover class, allowing the CSS3 PIE code to attach our CSS3 rgba values to the background when viewed in older versions of IE.
{% prism css %}
a.links:hover {
  background: rgba(0, 0, 0, 0.4);
  -pie-background: rgba(0, 0, 0, 0.4);
}
{% endprism %}

12) So our final code should look like this:

{% prism css %}  
body {
  background-color:#f43a3a;
}

a.links {
  padding: 5px 10px;
	color:#fff;
	background: rgba(58, 101, 241, 0.4);
	-pie-background: rgba(58, 101, 241, 0.4);
 	-webkit-border-radius: 14px;
 	-moz-border-radius: 14px;
 	-o-border-radius: 14px;
	border-radius: 14px;
	behavior: url(PIEFiles/PIE.htc);
}

a.links:hover {
  background: rgba(0, 0, 0, 0.4);
  -pie-background: rgba(0, 0, 0, 0.4);
}
{% endprism %}

And with that, everything works in all browsers, including IE8, IE7, and yes, IE6.

That’s it but let me make a few points…

*   CSS3 PIE is in beta as of this article and still in its growing period, so you should keep yourself up to date in terms of its development. [Following them on Twitter][8] is a great idea!
*   Since IE9+ currently supports all the CSS3 features that CSS3 PIE currently supports, CSS3 PIE is disabled in IE9. At least, for now.
*   Remember that CSS3 PIE targets IE only. Older versions of Firefox and the Webkit browsers have their own issues in terms of rendering rounded corners and transparencies…this tutorial won’t fix any of them.
*   In [a previous post about my HTML5 Project][9], I said that I may or may not use CSS3 PIE in the project as it may conflict with Modernizr, which I’ll definitely be using. There was a point in developing this tutorial where I used both CSS3 PIE and Modernizr-the latter was obviously removed in the end but I did perform some browser checks before getting rid of it.  

  In the scope of this tutorial, creating a rounded corner link with transparency, there were no issues. There may be other instances where using these two libraries together causes issues, but the final code result created in this tutorial isn’t one of them.

Please help me get better at explaining things…feel free to let me know if I’m not clear on something. And, again, [feel free to grab the completed code for this tutorial over at GitHub][1].

 [6]: /img/nonIE.png "nonIE"
 [7]: /img/pie-tut-IE.png "IE"
 [8]: http://twitter.com/css3pie
 [9]: http://kaidez.com/html5-project-update-january-21-2011/
