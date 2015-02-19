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

If you've every tried to remove files from a [GitHub](http://github.com/ "Go to GitHub") repository by putting them in the Trash/Recycle Bin and then doing a `git push`, you know that this doesn't work.

After making this mistake too many times, I read up on [Git](http://git-scm.com/ "Read about the Git source code management system"), the distributed version control system that GitHub's built on top of. In the process, I gained a clear understanding how the two interact with each other: this is key in understand how to properly delete files as well as walking the path towards "GitHub guru-ness".

Let's get started on all this guru stuff by walk through the proper methods for deleting files.

## Table of Contents
1. [If you deleted an already-committed file outside of the command line](#files-already-deleted "If you deleted an already-committed file outside of the command line")
2. [How you should *always* delete files from Git](#how-to-delete-files "How you should always delete files from Git")
3. [How to delete files that are NOT checked into Git](#delete-uncommitted-files "How to delete files that are NOT checked into Git")
4. [How to delete folders](#delete-folders "How to delete folders in Git")
5. [A simple explanation of how Git & GitHub work](#simple-git-explanation "A simple explanation of how Git & GitHub work")
6. [Further Git &amp; GitHub Reading](#further-git-github-reading "Further Git and GitHub Reading")
7. [Conslusion](#conclusion "Conslusion")

<a name="files-already-deleted"></a>
## If you deleted an already-committed file outside of the command line
A file that's already been committed to Git can only be deleted from a repo via the command line. Trying to delete repo files by dragging them to the Trash/Recycle Bin (or something similar) is one of the most common Git newbie mistakes.

If you moved a committed file named `oldFileAlreadyDeleted.html` to the Trash, your terminal would return this message when you type `git status`:
{% prism markup %}
# Changes not staged for commit:
#   (use "git add/rm <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#   deleted:    oldFileAlreadyDeleted.html
{% endprism %}

You now have to delete it with Git via the command line like this:

{% prism markup %}
$ git rm oldFileAlreadyDeleted.html
{% endprism %}

Then commit the delete with a proper `git commit` message:
{% prism markup %}
$ git commit -m 'remove oldFileAlreadyDeleted.html'
{% endprism %}

If `oldFileAlreadyDeleted.html` is viewable on GitHub, doing a subsequent `git push` will remove it:  
{% prism markup %}
$ git push all
{% endprism %}

<a name="how-to-delete-files"></a>
## How you should *always* delete files from Git
Moving forward, any already-committed files  you want to remove from Git and GitHub should be done so using the above command sequence.  For example, if you want to delete a file called `someCommitedFile.html`, you would do so like this:

{% prism markup %}
$ git rm someCommittedFile.html
{% endprism %}

Then write a `git commit` message:

{% prism markup %}
$ git commit -m 'remove someCommittedFile.html'
{% endprism %}

And if `someCommittedFile.html` is viewable on GitHub, doing a `git push` will remove it:  
{% prism markup %}
$ git push all
{% endprism %}

<a name="delete-uncommitted-files"></a>
## How to delete files that are NOT checked into Git
Say you want to delete `oldFile.html` and you get this message when you typed `git status`:
{% prism markup %}
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
#   oldFile.html
{% endprism %}

This means that `oldFile.html` hasn't been checked into Git yet, so just use `rm` to delete it and you're done:

{% prism markup %}
$ rm oldFile.html
{% endprism %}

<a name="delete-folders"></a>
## How to delete folders
__Scenario 1:__ An empty folder (let's call it `someFolder`) cannot be tracked by Git, so it can't be checked into Git as well. It also can't be pushed up to GitHub.

__Scenario 2:__ Git can track the folder once it has content. But if `someFolder` hasn't been committed to the repo yet, you get this message after typing `git status`:
{% prism markup %}
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
#   someFolder/
{% endprism %}

In either of these two scenarios, `someFolder` can be deleted using the generic `rm` command though, which looks like this:
{% prism markup %}
$ rm -rf someFolder
{% endprism %}

After a folder has been committed to your repo, *that's* when you can use Git to delete it, and at any time. You use the same remove/commit/push sequence previously discussed:

{% prism markup %}
$ git rm someFolder
{% endprism %}

{% prism markup %}
$ git commit -m 'remove someFolder'
{% endprism %}

{% prism markup %}
$ git push
{% endprism %}

Why do things need to be done this way? First, we need to be clear about the difference between Git and GitHub, as well as how they work together.

<a name="simple-git-explanation"></a>
## A simple explanation of how Git & GitHub work

*Git* is version control software that tracks changes to your code repository on your local machine. It also retains the entire change history that's also on your local machine.

You upload your code repo's changes and change history to *GitHub*, the online web service that provides a feature-rich graphical user interface to manage the repo. Most of these features are centered around project managment.

If your only Git education up to this point is doing what GitHub tells you to do when you creating a repo, you should be familiar with `git add`. You use it as part of a command sequence in Terminal when you either add new files to GitHub or update existing ones.

So to recap the previously-discussed command sequence, if you have a file called "myFile.html" that you've just created or changed and you want to upload it to GitHub, you would type these three commands in the following order:

{% prism markup %}
$ git add 'myFile.html'
{% endprism %}

{% prism markup %}
$ git commit -m 'add myFile.html'
{% endprism %}

{% prism markup %}
$ git push
{% endprism %}

The sequence for *deleting* files is the same, except for one change: you replace `add` with `rm`, which is the UNIX command for removing things.

So if you wanted to remove "myFile.html" from your repo, your typed-in command sequence would look something like this:

{% prism markup %}
$ git rm 'myFile.html'
{% endprism %}
{% prism markup %}
$ git commit -m 'remove myFile.html'
{% endprism %}
{% prism markup %}
$ git push
{% endprism %}

Why is all this necessary? Because Git views any type of update to your repo as a "change." Git can detect these changes but has absolutely no idea what to do with them: it's *your* job to tell Git what to do with them.

We just deleted a file from our project folder in the last command sequence with `git rm`, meaning we made a change to our repo. Then, by "committing" this change with `git commit`, we told our repo "this file really MUST go". Lastly, we uploaded these changes to our remote repo on GitHub with `git push`. After the push was completed, GitHub saw that a delete was performed against on our local machine's repo; therefore, GitHub deleted `myFile.html` from the its brower-based view.

The "changes" concept is a central characteristic of Git and is key to understanding the Git/GitHub relationship. Git's job is to "track," or "watch," every single, solitary change that occurs inside your local repo...adds, deletes, updates...whatever. GitHub can only "change" itself based on what your local Git repo actually tells it to "change". So in the case of deletions, if you don't use `git rm` to tell Git to remove a file, Git can't tell GitHub to remove it after you do a `git push`.

<a name="further-git-github-reading"></a>
## Further Git &amp; GitHub Reading
This post focused on how Git and GitHub handle file and folder deletions but there's more to them than that. From a beginner's level, here are some great learning resources:

### [The Git Site »](http://git-scm.com/ "Read about the Git source code management system")
Obviously your first stop. The site went through a major redesign a while back, greatly improving the UI. Documentation and downloads are much easier to find and read.

### [Try Git »](http://try.GitHub.com/ "A hands-on Git tutorial from Code School")
If you need your hand held a bit when first learning Git (which is not a sin), you can check this site out. Sponsored by [Code School](http://codeschool.com/ "Visit Code School"), Try Git is a Codecademy-styled learning tool that takes you through some Git commands and processes that you may not be familiar with.

### [GitHub Training »](https://GitHub.com/training/ "Review Git/GitHub traing course from GitHub")
One of the reasons that GitHub has become popular is the same reason that [Chris Coyier](http://css-tricks.com/ "Visit Chris Coyier's CSS Tricks site") and [Paul Irish](http://paulirish.com/ "vist Paul Irish's site") have become popular: their desire to share as much knowledge as humanly possible. While some of the training things they offer cost money, they offer many things for free. Check out their [Free Resources](https://GitHub.com/training/free "Review free GitHub training courses") section as well as their [Online Training](https://GitHub.com/training/online "Review GitHub online training offerings") and [Events](https://GitHub.com/training/events "Review GitHub events") sections. For the last two, some things are free and some are not, but I think they're reasonably priced.

### [A Note About Git Commit Messages »](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html "Read Tim Pope's well-known article on proper Git commits")
Written five years from the time of this post, this Tim Pope article on how to create a proper Git commit has become required reading for developers. Rarely will you find a software pro NOT follow these rules so it's best to include them in your workflow.

### [Git Essential Training Course on lynda.com (premium) »](http://www.lynda.com/Git-tutorials/Git-Essential-Training/100222-2.html?utm_medium=ldc-partner&utm_source=SSPRC&utm_content=524&utm_campaign=CD2146&bid=524&aid=CD2146' "Get thorough Git training on lynda.com: a kaidez.com affiliate")
It costs money but is worth it. Taught by [Kevin Skoglund](http://www.kevinskoglund.com/), it's a thorough, hands-on Git course offered by [lynda.com](http://www.lynda.com/promo/trial/Default.aspx?lpk35=1833&utm_medium=ldc-partner&utm_source=SSPRC&utm_content=655&utm_campaign=CD2146&bid=655&aid=CD2146) (a kaidez.com affiliate)...definitely worth checking out.

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
