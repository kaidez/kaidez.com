---
title: 'TUTORIAL: Remove Files From GitHub'
comments: true
author: Kai Gittens
meta-excerpt: Get a quick answer first then learn how to delete files & folders from Git. Also learn how Git works with GitHub. Learning links at the end.
layout: post
permalink: /remove-files-from-github/
category: tutorials
cat-name: "Tutorials"
has-home-img: gitTutorial.jpg
tags: [git, github]
---

If you've every tried to remove files from a [GitHub](http://github.com/ "Go to GitHub") repository by dragging them to your Trash or Recycle Bin, you know that this doesn't work.

After making this mistake too many times, I read up on [Git](http://git-scm.com/ "Read about the Git source code management system"), the distributed version control system that GitHub's built on top of. I figured out how to properly delete stuff but also realized not only how Git interacts with GitHub, but also how Git *itself* actually works. Knowing these things will help lead you to GitHub guru-ness.

## Table of Contents

1.  [I just want to get the quick answers, then get out of here!](#quick-answers)
2.  [Assumptions & Tips](#assumptions)
3.  [A simple explanation of how Git & GitHub work »](#simple-git-github-explanation)
4.  [Prevent files from being uploaded to GitHub with .gitignore](#gitignore)
5.  [The *right* way to remove files from GitHub](#right-way-to-remove-files-from-GitHub)
6.  [The *right* way to remove directories from GitHub](#right-way-to-remove-directories-from-GitHub)
7.  [What to do if you've already deleted files from your machine and pushed things to GitHub](#you-already-deleted-files)
8.  [Further Reading](#further-reading)
9.  [Conclusion](#conclusion)

<a name="quick-answers"></a> 
## I just want to get the quick answers, then get out of here!

If you have already committed a file to Git, you should only delete it from the command line. One of the most common newbie mistakes is to not do this and, instead, drag it to the trash or something like it.

If you did that with a file named `oldFileAlreadyDeleted.html`, your terminal would return this message when you type `git status`:
{% prism markup %}
# Changes not staged for commit:
#   (use "git add/rm <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#   deleted:    oldFileAlreadyDeleted.html
{% endprism %}

You have to delete it via the command line at this point like this:

{% prism markup %}
$ git rm oldFileAlreadyDeleted.html
{% endprism %}

Then commit the delete, preferably with a proper `git commit` message:

{% prism markup %}
$ git commit -m 'remove oldFileAlreadyDeleted.html'
{% endprism %}

If `oldFileAlreadyDeleted.html` is viewable on GitHub, doing a `git push` will remove it:  
{% prism markup %}
$ git push all
{% endprism %}

Moving forward, any file you want to remove from Git and GitHub should be done so using the above command sequence.

But say you want to delete `oldFile.html` and you get this message when you typed `git status`:
{% prism markup %}
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
#   oldFile.html
{% endprism %}

This file hasn't been checked into Git yet, so just use `rm` to delete it and you're done:

{% prism markup %}
$ rm oldFile.html
{% endprism %}

So you have the quick answers but if you want to gain that "GitHub guru-ness," you should read on and go through some of the steps in the tutorial.
<a name="assumptions"></a> 
## Assumptions & Tips

I'm assuming a few things: 

*   that you know how to create a Git repo on your computer
*   how to upload its changes to a remote GitHub repo.
*   that you know how to access this repo from the Terminal.
*   that you know the three Git line commands that work together to upload your code to GitHub: `git add`, `git commit` and `git push`.

Some tips:

*   I'll be using the Mac Terminal for this tutorial. Except for [the section where I create a `.gitignore` file](#gitignore "Create a .gitignore file"), everything mentioned here should work cross-platform.
*   Feel free to follow this tutorial using your own repo, but proceed with caution if you do. I'll be deleting stuff and I don't want you to mistakenly delete something as you follow along. Instead, feel free to [download this test repo from GitHub](https://GitHub.com/kaidez/yourGitProject) and use it if you want to type and follow along.
*   If you opt to use your own repo while reading this tutorial as a whole, it's best that it be as clean as possible. Go to your Terminal and type `git status`. If you get a message saying that there's nothing to commit, keep going. If you get a message saying that some files need to be added or removed, you may have to clean up your repo a bit.
*   If your Terminal window starts getting full and you want to clear it, hit `Cmd K`. Note that everything you've typed will be gone once you do this and you may have wanted to save it somehow for future reference. If so, make sure you save stuff before hitting `Cmd K`.

<a name="simple-git-github-explanation"></a> 
## A simple explanation of how Git & GitHub work

First, we need to be clear about the differences between Git and GitHub, as well as how they work together.

*Git* is the software on your machine that tracks changes to your code repository and keeps copies of the repository 's previous versions. You upload a copy of the repo and its history of changes to *GitHub*, the online web service that provides a feature-rich graphical user interface to manage the repo.

If you're only Git education up to this point is doing what GitHub tells you to do when you setting up a repo, you should be familiar with `git add`. You use it as part of a command sequence in Terminal when you want to add files to or change files on GitHub.

So if you have a file called "myFile.html" that you've just created or changed and you want to upload it to GitHub, the sequence would look something like this:

{% prism bash %}
$ git add 'myFile.html'
$ git commit -m 'added myFile.html'
$ git push
{% endprism %}

The sequence for *deleting* files is the same, except for one change: you replace `add` with `rm`, which is the UNIX command for removing things.

So if you wanted to remove "myFile.html" from your repo, the sequence would look something like this:

{% prism bash %}
$ git rm 'myFile.html'
$ git commit -m 'removed myFile.html'
$ git push
{% endprism %}

Why is all this necessary? Because Git views adding to, removing from and updating things in your repo as a "change." Git can detect these changes but has absolutely no idea what to do with them: it's *your* job to tell Git what to do with them.

We just deleted a file from our repository in the last command sequence with `git rm`, meaning we made a change to our repo. Then, by "committing" this change with `git commit`, we "told" our repo to remove it. Lastly, we uploaded these changes to our remote repo on GitHub with `git push`: GitHub saw that a delete was performed on our local machine after the push and, as such, deleted `myFile.html`.

The "changes" concept is key to understanding the Git/GitHub relationship, Git in particular. Git's job is to "track," or "watch," every single, solitary change that occurs inside your local repo...adds, deletes, individual file content updates...whatever. GitHub can only "change" itself based on what your local Git repo actually tells it to "change". So in the case of deletions, if you don't use `git rm` to tell Git to remove a file and then commit it, Git can't tell GitHub to remove it. 

<a name="gitignore"></a> 
## Prevent files from being uploaded to GitHub with *.gitignore*

While you may be familiar with `git add` already, let's do one for good measure. For this tutorial, we actually need to use it to create a certain file called `.gitignore`.

If you already know which files you don't want uploaded to GitHub and want to avoid uploading them by mistake (meaning you'll never have to remove them with `git rm`), list them in a `.gitignore` file.

Let's create this file and tell it to ignore all `.DS_Store` files, which appear in Mac OS X directories anytime changes occur inside of them. Doing this doesn't remove `.DS_Store` files from our repo (we'll get to removing files shortly), it just prevents Git from tracking them. **If Git can't track them, Git can't upload them to GitHub**.

We'll create our file with nano, Terminal's built-in text editor (Windows users should use Notepad outside of their command line tool to create this file, add the content described in step 4, save it in your repo, then start following the directions at step 8).

1.  First, let's look at our Git repo on GitHub. Mine's called "yourGitProject" for this tutorial.  
    ![Remove files from GitHub tutorial][13] 
2.  Now let's look at our file in Terminal. There are hidden files and directories (the ones that start with a ".") and we want to look at those files as well. We need to tell Terminal to list all of our files and do so by typing in `ls -la` and hitting Enter. ![Remove files from GitHub tutorial][14] 
3.  Note that `.gitignore` isn't there yet so let's add it…Type `nano .gitignore` into Terminal and hit Enter.  
    ![Remove files from GitHub tutorial][15] 
4.  nano created `.gitignore` in our repo and opened it. Now we need to make sure that `.DS_Store` is not tracked in our root folder but as a best practice, let's also make sure that it's not tracked in our subfolders: "css" and "js". To do this, type content into `.gitignore` so it looks like it does below.  
    ![Remove files from GitHub tutorial][16] 
5.  Start to save it by hitting "Ctrl X".  
    ![Remove files from GitHub tutorial][17] 
6.  You'll receive a prompt at the bottom to save it: type "y" for Yes.  
    ![Remove files from GitHub tutorial][18] 
7.  You'll receive a prompt to write the file name, i.e., save it with the name ".gitignore", which you want to do. Hit Enter.  
    ![Remove files from GitHub tutorial][19] 
8.  Type `ls -la` again: you should now see the `.gitignore` file.  
    ![Remove files from GitHub tutorial][20] 
9.  Now we need to upload it to our GitHub-hosted repo doing the usual add/commit/push thing that we always do. The "add" comes first…type `git add .gitignore` into Terminal and hit Enter.  
    ![Remove files from GitHub tutorial][21] 
10. Now we'll commit it to our repo with a meaningful commit message…type `git commit -m 'added .gitignore to the repo'` and hit Enter.  
    ![Remove files from GitHub tutorial][22] 
11. Now let's push the change to GitHub…type `git push` and hitting Enter. Then when we check our repo, we see that ".gitignore" is now part of it.  
    ![Remove files from GitHub tutorial][23] 

 [13]: /img/repo1.png
 [14]: /img/terminalShot1.png
 [15]: /img/terminalShot2.png
 [16]: /img/terminalShot3.png
 [17]: /img/terminalShot4.png
 [18]: /img/terminalShot5.png
 [19]: /img/terminalShot6.png
 [20]: /img/terminalShot7.png
 [21]: /img/terminalShot8.png
 [22]: /img/terminalShot9.png
 [23]: /img/repo2.png

<a name="right-way-to-remove-files-from-GitHub"></a> 
## The *right* way to remove files from GitHub

Now let's remove a file using `rm`. Let's do this to delete the "page1.html" file.

1.  As a reminder, let's see what our code repo looks like.  
    ![Remove files from GitHub tutorial][24] 
2.  Tell Git to remove this file by typing `git rm page1.html` and hitting Enter. Git confirms this is done by displaying the message `rm 'page1.html'` in Terminal.  
    ![Remove files from GitHub tutorial][25] 
3.  Let's review the status of our repo by typing `git status` and hitting Enter. As we can see, "page1.html" has been deleted from our repo folder.  
    ![Remove files from GitHub tutorial][26] 
4.  We can confirm this by typing in `ls` and then hitting Enter. Notice that "page1.html" is no longer listed:  
    ![Remove files from GitHub tutorial][27] 
5.  So let's commit this deletion…type `git commit -m 'delete page1.html'` into Terminal and hit Enter. Note that "page1.html" has been flagged for a delete.  
    ![Remove files from GitHub tutorial][28] 
6.  Next comes the push to GitHub…type `git push` and hit Enter, then check our repo. "page1.html" is gone.  
    ![Remove files from GitHub tutorial][29] 

 [24]: /img/repo3.png
 [25]: /img/terminalShot10.png
 [26]: /img/terminalShot11.png
 [27]: /img/terminalShot12.png
 [28]: /img/terminalShot13.png
 [29]: /img/repo4.png

<a name="right-way-to-remove-directories-from-GitHub"></a>
## The *right* way to remove directories from GitHub

The process for removing directories is the same as files, except for one difference. Git views them as a big deal and makes you confirm you want to delete them.

1.  Let's go back to our repo on GitHub:  
    ![Remove files from GitHub tutorial][29] 
2.  Let's delete that "someFolder" directory but let's see what's inside of it first. 
    As we can see, "someFolder" contains a file called "somePage.html." This is important because if you want Git to delete directories at the command line level with `rm`, they need to contain content…I'll admit that I'm not sure why this is.  
    ![Remove files from GitHub tutorial][30]  
3.  So to delete "someFolder" from our local repo, we need to "remove it, but forcibly and recursively (i.e., also get rid of everything inside of it)." In the UNIX world, that means we need type `git rm -rf someFolder` into Terminal and hit Enter. Terminal send us message that this is what happened, *directly* referencing the file inside of `someFolder`.  
        ![Remove files from GitHub tutorial][31] 
4.  Now comes the commit…type `git commit -m 'delete someFolder'` and hit Enter.  
        ![Remove files from GitHub tutorial][32] 
5.  Now we do a `git push`, hit Enter and check our repo. The "someFolder" directory is now gone.  
        ![Remove files from GitHub tutorial][33]

<a name="you-already-deleted-files"></a>
## What to do if you've already deleted files from your machine and pushed things to GitHub
   
This is a newbie mistake that I've made more times than I can remember. But it's an easy fix.
    
1.  Let's see what the "status" of our repo is by typing `git status` into Terminal and hitting Enter. Since we've pushed everything, we get a message that there's nothing to commit for an upload to GitHub.  
        ![Remove files from GitHub tutorial][34] 
2.  Now let's drag "page2.html" to the Trash, then do another `git status` check. We didn't send out any Git commands, but Git is tracking the file anyway (side note: if you didn't do [the .gitignore part previously mentioned][5], you may see a reference to ".DS_Store" now).  
        ![Remove files from GitHub tutorial][35] 
3.  We need to "tell" Git that this file needs to be removed, and can do so by sending out a "remove" command again. Type in `git rm page2.html`, then hit Enter. We get another message that page2.html has been removed like we did in a previous example.  
        ![Remove files from GitHub tutorial][36] 
4.  And when we do `git status` again, we're told that the file is ready to be committed.  
        ![Remove files from GitHub tutorial][37] 
5.  So let's commit it: type in `git commit -m 'delete page2.html'` and hit Enter.  
        ![Remove files from GitHub tutorial][38] 
6.  Finally, we do a `git push`, hit Enter and check our repo. "page2.html" is gone.  
        ![Remove files from GitHub tutorial][39] 

<a name="further-reading"></a>
## Further Reading
This tutorial focused on how Git handles file and directory deletion but there's more to Git than that. From a beginner's level, here are some great learning resources:
    
### [The Git Site »](http://git-scm.com/ "Read about the Git source code management system")
Obviously your first stop. The site went through a major redesign a few months ago, greatly improving the UI. Documentation and downloads are much easier to find and read.

### [Try Git »](http://try.GitHub.com/ "A hands-on Git tutorial from Code School")
If you need your hand held a bit when first learning Git (which is not a sin), you can check this site out. Sponsored by [Code School][41], Try Git is a Codecademy-styled learning tool that takes you through some Git commands and processes that you may not be familiar with.

### [GitHub Training »][42]
One of the reasons that GitHub has become popular is the same reason that [Chris Coyier][43] and [Paul Irish][44] have become popular: their desire to share as much knowledge as humanly possible. While some of the training things they offer cost money, they offer many things for free. Check out their [Free Resources][45] section as well as their [Online Training][46] and [Events][47] sections. For the last two, some things are free and some are not, but I think they're reasonably priced.  

### [Common Git Commands »][48]
UK-based developer [Kerry Gallagher][49] put together a really useful list of Git commands. Print it out and tape it to the wall by your computer. 

### ["Git Is Simpler Than You Think" by Nick Farina »][50]
If you *really* want to know how Git works, check out this excellent post. Nick Farina opened Git up and spent a lot of time looking at its internal structure. Lots of great info in this post.  

### ["What is Version Control: Centralized vs. DVCS" by Giancarlo Lionetti »](https://blogs.atlassian.com/2012/02/version-control-centralized-dvcs/ "Learn about centralized and distributed version control systems")
I *really* want you to understand that Git is a distributed version control system as well as understand what that means. It's the part that makes sharing code via GitHub a snap and, let's be honest, a major reason behind their success. Lionetti provides the most in-depth, easy-to-understand article on the subject that I could find. 

### [*Pro Git* by Scott Chacon »](http://git-scm.com/book, "Read the free Pro Git Book")
*The* Git Book, and it's free! It's a little dense and doesn't flow as easily as these other resources…I'll admit that I haven't read all of it. But I have read enough of it to know that it's an important Git resource.   
     
<a name="conclusion"></a>           
## Conclusion                             
I hope you understand all the various ways to remove files from GitHub and learned some new Git stuff in the process. At the same time, I hope you've come to realize that the title of Farina's post is correct: Git *is* simpler than you think. The only thing that will keep you from learning Git is any fears you have of the command line. Get rid of that and you'll discover how bloody useful Git can be, along with a ton of other things.

 [30]: /img/repo5.png
 [31]: /img/terminalShot14.png
 [32]: /img/terminalShot15.png
 [33]: /img/repo6.png
 [34]: /img/terminalShot17.png
 [35]: /img/terminalShot18.png
 [36]: /img/terminalShot19.png
 [37]: /img/terminalShot20.png
 [38]: /img/terminalShot21.png
 [39]: /img/repo7.png
 [41]: http://codeschool.com/
 [42]: https://GitHub.com/training/
 [43]: http://css-tricks.com/
 [44]: http://paulirish.com/
 [45]: https://GitHub.com/training/free
 [46]: https://GitHub.com/training/online
 [47]: https://GitHub.com/training/events
 [48]: https://gist.GitHub.com/2043530#file_gistfile1.sh
 [49]: http://www.kerrygallagher.co.uk/
 [50]: http://nfarina.com/post/9868516270/git-is-simpler