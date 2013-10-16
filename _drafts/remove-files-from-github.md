---
title: 'TUTORIAL: Remove Files From GitHub'
comments: true
author: Kai Gittens
meta-excerpt: Get quick answers first, then learn how Git works with GitHub. This post also has an excellent list of Git/GitHub learning links at the end.
layout: post
permalink: /remove-files-from-github/
category: tutorials
cat-name: "Tutorials"
has-home-img: gitTutorial.jpg
tags: [git, github]
---

If you've every tried to remove files from a [GitHub](http://github.com/ "Go to GitHub") repository by dragging them to your Trash or Recycle Bin and then doing a `git push`, you know that this doesn't work.

After making this mistake too many times, I read up on [Git](http://git-scm.com/ "Read about the Git source code management system"), the distributed version control system that GitHub's built on top of. I figured out how to properly delete stuff but also realized not only how Git interacts with GitHub, but also how Git *itself* actually works. Knowing these things will help lead you to GitHub guru-ness.

## If you deleted an already-committed file outside of the command line
If you have already committed a file to Git, you should only delete it from the command line. One of the most common GitHub newbie mistakes is to not do this and to just drag it to the trash, or something like it.

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

Why do things need to be done this way? First, we need to be clear about the differences between Git and GitHub, as well as how they work together.

## A simple explanation of how Git & GitHub work

*Git* is version control software on that tracks changes to your code repository as well as retain the entire change history. You upload your code repo's changes and change history to *GitHub*, the online web service that provides a feature-rich graphical user interface to manage the repo.

If your only Git education up to this point is doing what GitHub tells you to do when you creating a repo, you should be familiar with `git add`. You use it as part of a command sequence in Terminal when you either add new files to GitHub or update existing ones.

So to recap the command sequence, if you have a file called "myFile.html" that you've just created or changed and you want to upload it to GitHub, you would type these three commands in the following order:

{% prism bash %}
$ git add 'myFile.html'
{% endprism %}
{% prism bash %}
$ git commit -m 'added myFile.html'
{% endprism %}
{% prism bash %}
$ git push
{% endprism %}

The sequence for *deleting* files is the same, except for one change: you replace `add` with `rm`, which is the UNIX command for removing things.

So if you wanted to remove "myFile.html" from your repo, your typed-in command sequence would look something like this:

{% prism bash %}
$ git rm 'myFile.html'
{% endprism %}
{% prism bash %}
$ git commit -m 'removed myFile.html'
{% endprism %}
{% prism bash %}
$ git push
{% endprism %}

Why is all this necessary? Because Git views any type of update to your repo as a "change." Git can detect these changes but has absolutely no idea what to do with them: it's *your* job to tell Git what to do with them.

We just deleted a file from our project folder in the last command sequence with `git rm`, meaning we made a change to our repo. Then, by "committing" this change with `git commit`, we told our repo "this file really MUST go". Lastly, we uploaded these changes to our remote repo on GitHub with `git push`: GitHub saw that a delete was performed on our local machine after the push so it deleted `myFile.html` from the GitHub repo's view.

The "changes" concept is a central characteristic of Git and is key to understanding the Git/GitHub relationship. Git's job is to "track," or "watch," every single, solitary change that occurs inside your local repo...adds, deletes, updates...whatever. GitHub can only "change" itself based on what your local Git repo actually tells it to "change". So in the case of deletions, if you don't use `git rm` to tell Git to remove a file, Git can't tell GitHub to remove it after you do a `git push`.

<a name="further-reading"></a>
## Further Reading
This tutorial focused on how Git handles file and directory deletion but there's more to Git than that. From a beginner's level, here are some great learning resources:
    
### [The Git Site »](http://git-scm.com/ "Read about the Git source code management system")
Obviously your first stop. The site went through a major redesign a while back, greatly improving the UI. Documentation and downloads are much easier to find and read.

### [Try Git »](http://try.GitHub.com/ "A hands-on Git tutorial from Code School")
If you need your hand held a bit when first learning Git (which is not a sin), you can check this site out. Sponsored by [Code School](http://codeschool.com/ "Visit Code School"), Try Git is a Codecademy-styled learning tool that takes you through some Git commands and processes that you may not be familiar with.

### [GitHub Training »](https://GitHub.com/training/ "Review Git/GitHub traing course from GitHub")
One of the reasons that GitHub has become popular is the same reason that [Chris Coyier](http://css-tricks.com/ "Visit Chris Coyier's CSS Tricks site") and [Paul Irish](http://paulirish.com/ "vist Paul Irish's site") have become popular: their desire to share as much knowledge as humanly possible. While some of the training things they offer cost money, they offer many things for free. Check out their [Free Resources](https://GitHub.com/training/free "Review free GitHub training courses") section as well as their [Online Training](https://GitHub.com/training/online "Review GitHub online training offerings") and [Events](https://GitHub.com/training/events "Review GirHub events") sections. For the last two, some things are free and some are not, but I think they're reasonably priced.

### [A Note About Git Commit Messages »](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html "Read Tim Pope's well-known article on proper Git commits")
Written five years from the time of this post, this Tim Pope article on how to create a proper Git commit has become an industry standard. Rarely will you find a software pro NOT follow these rules so it's best to include them in your workflow.

### [Git Essential Training Course on lynda.com (premium) »](http://www.lynda.com/Git-tutorials/Git-Essential-Training/100222-2.html?utm_medium=ldc-partner&utm_source=SSPRC&utm_content=524&utm_campaign=CD2146&bid=524&aid=CD2146' "Get thorough Git training on lynda.com: a kaidez.com affiliate")
It cost bucks but is worth it. Taught by [Kevin Skoglund](http://www.kevinskoglund.com/), it's a thorough, hands-on Git course offered by [lynda.com](http://www.lynda.com/promo/trial/Default.aspx?lpk35=1833&utm_medium=ldc-partner&utm_source=SSPRC&utm_content=655&utm_campaign=CD2146&bid=655&aid=CD2146) (a kaidez.com affiliate)...definitely worth checking out.

### [Common Git Commands »](https://gist.GitHub.com/2043530#file_gistfile1.sh "Get an excellent list of Git commands")
UK-based developer [Kerry Gallagher](http://www.kerrygallagher.co.uk/ "Visit Kerry Gallagher's website") put together a really useful list of Git commands. Print it out and tape it somewhere by your computer. 

### ["Git Is Simpler Than You Think" by Nick Farina »](http://nfarina.com/post/9868516270/git-is-simpler)
If you want to Git works under the hood, check out this excellent post. Nick Farina opened Git up and spent a lot of time looking at its internal structure. Lots of great info in this post.  

### ["What is Version Control: Centralized vs. DVCS" by Giancarlo Lionetti »](https://blogs.atlassian.com/2012/02/version-control-centralized-dvcs/ "Learn about centralized and distributed version control systems")
I *really* want you to understand that Git is a distributed version control system as well as understand what that means. It's the part that makes sharing code via GitHub a snap and, let's be honest, a major reason behind their success. Lionetti provides the most in-depth, easy-to-understand article on the subject that I could find. 

### [*Pro Git* by Scott Chacon »](http://git-scm.com/book, "Read the free Pro Git Book")
*The* Git Book, and it's free! It's a little dense and doesn't flow as easily as these other resources…I'll admit that I haven't read all of it. But I have read enough of it to know that it's an important Git resource.   
     
<a name="conclusion"></a>           
## Conclusion                             
I hope you understand all the various ways to remove files from GitHub and learned some new Git stuff in the process. At the same time, I hope you've come to realize that the title of Farina's post is correct: Git *is* simpler than you think. The only thing that will keep you from learning Git is any fears you have of the command line. Get rid of that and you'll discover how bloody useful Git can be, along with a ton of other things.