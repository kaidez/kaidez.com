---
title: Two JavaScript Tasks That jQuery Does Not Replace
comments: true
author: Kai Gittens
layout: post
permalink: /two-javascript-tasks-jquery-does-not-replace/
meta-excerpt: Short article about how jQuery does not have a replacement for JavaScript's document.write and has a not-so-great replacement for its navigator.UserAgent
category: coding-best-practices
cat-name: "Code Tips"
tags: [jquery, javascript]
---
While developing HTML5 video for [my recent Almay project][1], I discovered two widely-used JavaScript techniques that, as of now, have no firm jQuery replacement. This should serve as a reminder that, while many believe that jQuery replaces every single solitary JavaScript task, this is simply not true.

 [1]: http://kaidez.com/almay-project-using-html5-net-jquery/

These are the two tasks that I’ve found *so far*...I expect find more as time goes by: 

## 1. document.write

`document.write` automatically inserts copy and/or HTML code into a web page. So if the following  
code was placed between the two body tags: 

{% prism markup %}
document.write("This is some text.");
{% endprism %}
    
The following text would appear wherever you placed this code on your web page:

{% prism markup %}
This is some text.
{% endprism %}

As widely used as it is, serious JavaScripters believe that using document.write is bad practice. The development team behind jQuery is made up of nothing but serious JavaScripters, so don’t expect a jQuery equivalent of this anytime soon. I suppose you could rig up some jQuery code to do the same thing, but you’ll probably end up doing a lot of work to create somewhat sloppy code that accomplishes very little in the end. 

## 2. navigator.userAgent

This one is a bit confusing: 

Developers sometimes need to detect which web browser their sites are loading into. While this can be done with both ASP.NET and PHP, many find it easier to do this using JavaScript’s navigator.userAgent function. 

The main reason for detecting browser types is if you’re writing multiple code blocks that are browser-specific. You use some variation of navigator.userAgent to detect which browser your site is being viewed in, then tell JavaScript to load in the proper code block. Most programmers, not just JavaScripters, frown upon writing browser-specific code. Plus, navigator.userAgent doesn’t always work so it’s recommended that you don’t use this as well.  

Now for the confusing part… 

jQuery actually *does* offer an alternative to `navigator.userAgent` in the form of the .browser property, but the jQuery team strongly recommends that you don’t use it!!!! In order for .browser to actually work, navigator.userAgent still needs to be working behind the scenes in the jQuery library. And since many recommend avoiding navigator.userAgent altogether, the team says “we don’t think that you should use .browser.” They further state that .browser will be implemented in future versions, most likely via a plug-in.

So to recap: jQuery offers a coding alternative to a piece of JavaScript code that everyone says is bad, but their alternative code still needs the bad code to work properly. Because of this, the jQuery dev team recommends avoiding their alternative altogether, but promises to include it in a future version. Do you see the confusion? 

It’s important to note that even *if* you use the .browser property in your code, it can only detect Internet Explorer, Firefox, Opera and the various Webkit browsers. In other words, it can’t detect Androids or older Blackberries and it may or may not detect iPhones, newer Blackberries and the various tablets like the iPad and the new [Blackberry Playbook][3]. 

 [3]: http://us.blackberry.com/playbook-tablet/

As an alternative to .browser, jQuery offers the .support property which detects browser-specific properties. The jQuery documentation goes in great detail on [how to use .support][4] as well as [why you shouldn’t use <em>.browser</em>][5]. I suggest that you read up on both of them before you attempt you use the code. 

 [4]: http://api.jquery.com/jQuery.support/
 [5]: http://api.jquery.com/jQuery.browser/

Next up: my take on HTML5 video!