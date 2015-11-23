---
title: 10 Things To Remember About HTML5 Video
comments: true
author: Kai Gittens
layout: post
permalink: /html5-video-tips-january-2011/
meta-excerpt: HTML5 Video Tips from kaidez
category: coding-best-practices
cat-name: "Code Tips"
tags: [html5, mobile]
---
Setting up HTML5 video for [my recent Almay project][1] was certainly a learning experience (thanks to Max at [image0][2] for the help during this part of the project). Here’s what I learned…and will *never* forget:

 [1]: http://kaidez.com/almay-project-using-html5-net-jquery/
 [2]: http://blog.image0.com/

## 1. You Need To Budget Enough Time To Do This

As of this post, there are no hard-and-fast rules for HTML5 video development. Setting it up requires trial and error, so give yourself enough time to finish the job.

## 2. Confirm That Your Site Can Support HTML5 Video

HTML5 supports four video files types: .mp4, .m4v, .ogv and .webm. You can’t display these video types unless your site’s server/host supports them. Make sure they do before you do any HTML5 video work. You don’t want to spend three hours coding HTML5 video only to find out you can’t use it.

## 3. If Your Video Doesn’t Need To Show Up Mobile Devices, You Don’t Need HTML5 Video

I advocate experimenting with all aspects of HTML5 as soon as you can, but don’t bother setting up HTML5-ready videos if they don’t need to display on smart-phones or tablets. Flash video files (or, .flvs) are fine if you’re only concerned about desktops and laptops. Still, keep in mind that demand for mobile video is growing.

## 4. If Your Video Does Need To Show Up Mobile Devices, Consider Building A Mobile Version Of Your Site

HTML5 video does not look and sound universal across all devices. I still need to experiment with this, but I'm thinking that building a straight website that loads a mobile version upon detection is the way to go. The mobile version would play the HTML5 video while the normal site runs .flvs. Again, I have to experiment.

## 5. Creating *Any* Kind Of Video For Blackberrys Will Be A Problem

If you're a seasoned web developer that tries to code for multiple web browsers, think of the Blackberry as the Internet Explorer 6 of web video. Blackberrys were initially built for corporate types that wanted to check their email every five minutes, not mobile app lovers. As such, they don't really support video streaming. The newer ones (sort of) let you download an .mp4 and then play it via its installed media player. The older ones don't even do that so it's best to offer a link for downloading the video...probably .mp4 but you should test things out first. In all fairness, upcoming Blackberrys will probably support video much better than their predecessors.

## 6. HTML 5 Video In Androids Is Just As Much Of A Pain As Blackberrys Are

Android's issues with HTML5 video are well documented. Sometimes, HTML5 video works on the device. Other times, it doesn't. Furthermore, there are no Android emulators to test your work: you will *have* to test things out on an actual Android. I was lucky to have access to three during my recent project.

## 7. You've Have Lots of Free Video Conversion Tools At Your Disposal

The four HTML5 video types are open source so you have many good, **free** video converters to choose from. I used the following converters for my recent project:

*   [Firefogg Firefox plug-in][3] to convert files to both .ogv and .webm.
*   [Handbrake][4] to convert files to.m4v, which you'll need to do for Androids (free app for both Mac and PC).
*   [Any Video Converter][5] to convert files to .mp4. (free and paid app for both Mac and PC...seems to work better on a PC).

 [3]: http://firefogg.org/
 [4]: http://handbrake.fr/
 [5]: http://www.any-video-converter.com/

It may be possible to use Handbrake for both .mp4 and .m4v, but I had some issues trying to do this.

## 8. Convert Videos From Either An .mpg Or .mov

These two formats best preserve a video file's characteristics and should be the only file types you work with. You may not need the .mov version but as previously mentioned, HTML5 video requires trial and error. You have to test various video conversions to see what works best and the .mov may perform for you better than the .mpg. It's better to have it and not need it than need it and not have it.

## 9. Your Fallback Doesn't Need To Use An .flv

A fallback is extra code that lets end-users view a Flash version of the movie in case their browser doesn't support HTML5. The general rule for Flash video is to use the .flv format. No need to for this in HTML5 as Flash video can use both .mp4 and .m4v. Plus, I had some streaming issues when I ran an .flv through the HTML5 tag.

## 10. Be Wary Of HTML5 Video Online Tutorials

If you want to use HTML5 video code you that you found on an online tutorial, only use it if they provide a demo of the finished product first, and make sure it works the way you want it to work. I found a great tutorial that solved all my problems, only to discover a JavaScript error in the code that I couldn't solve. Four hours of work down the drain.

These resources helped me tremendously while I was setting up HTML5 video...**still, test them out before you use them!!!**

*   [Video For Everybody][6] (the end-all-be-all for HTML5 video...it's what used)
*   [Displaying HTML5 Video for Android Tutorial at Broken Links][7]
*   [Encoding HTML5 Video for Android Tutorial at Broken Links][8]

 [6]: http://camendesign.com/code/video_for_everybody
 [7]: http://www.broken-links.com/2010/07/08/making-html5-video-work-on-android-phones/
 [8]: http://www.broken-links.com/2010/07/30/encoding-video-for-android/

Feel free to add your HTML5 video tips and ideas.