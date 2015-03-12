---
title: "kdz - My Personal Scaffolding Tool"
comments: true
author: Kai Gittens
layout: post
meta-excerpt: kaidez used Node to create a tool for scaffolding out web development projects. Includes a link to thoroughly commented code on GitHub.
permalink: /kdz-build-tool/
category: coding-best-practices
cat-name: "Code Tips"
has-home-img: kdz-header.jpg
tags: [javascript, node, kaidez]
---
I discovered some cool techniques after working on a bunch of web development projects, techniques based mostly around tooling.  I knew I would use the techniques and tools for future projects, and also knew that I had to find a way to easily set them up at the start of each project.

I solved the problem by creating a [Node](https://nodejs.org/ "Go to the Node site") scaffolding CLI tool. I'm also being cute about it and naming it based on my hacker alias, calling it "kdz".

<h2 style="clear:both;">Table of Contents</h2>
1. [This Is Not a Tutorial](#not-a-tutorial)
2. [How This Started](#how-this-started)
3. [The Problem](#the-problem)
4. [More Problems](#more-problems)
5. [The Tool-Building Process](#tool-building-process)
6. [The Final Command](#final-command)
7. [Behind The Scenes](#behind-the-scenes)
8. [What's Left To Do](#todo)
9. [Further Reading](#further-reading)
10. [Conclusion](#conclusion)

<a name="not-a-tutorial"></a>
## This Is Not a Tutorial

To be clear, this is not a tutorial. I may do tutorials on certain parts of the code in the future but for now, I'm just documenting the approach I used to solve a specific problem.

[The kdz code is thoroughly commented on GitHub](https://github.com/kaidez/kdz "See the kdz code on GitHub") for your review: feel free to look at it and ask questions/make comments about it as a post comment. When reviewing the code, you want to look at the modules in the [`config` folder](https://github.com/kaidez/kdz/tree/master/config "review the npm code modules for kdz") as well as [the core `kdz.js` file](https://github.com/kaidez/kdz/blob/master/kdz.js "Review the core "kdz.js" file").

<a name="how-this-started"></a>
## How This Started

I had a project at work where I had to create a single page website using a standard HTML5/CSS/JavaScript web stack. The tools in my development environment were configured like this:

* [Jade](http://jade-lang.com/ "Review the Jade HTML template engine") was used for HTML5 pre-processing.
* [LESS](http://lesscss.org/ "Review the LESS pre-processor") was used for CSS pre-processing.
* [CoffeeScript](http://coffeescript.org/ "Review the CoffeeScript JS pre-processor") was used for JavaScript pre-processing.
* I used the core CSS file that comes with [Twitter Bootstrap](http://getbootstrap.com/ "Review Twitter Bootstrap") because it makes me very productive while building a responsive web design.
* [Bower](http://bower.io/ "Review the Bower web package manager") was used to manage browser-level dependencies via a `bower.json` file.
* [npm](https://www.npmjs.com/ "Review the npm package manager for Node") was used to manage development-level dependencies via a `package.json` file.
* [Grunt](http://gruntjs.com/ "Review the Grunt task runner") and [Gulp](http://gulpjs.com/ "Review the Gulp build system") were used to automate tasks related to the things above, including building out the final page.

I was REALLY comfortable with these tools when I started this project. I had used them a lot previously and knew how to get them to work as a team inside my dev environment.

This was especially true of the CSS processing which was (mostly) powered by Gulp. Gulp let me create an efficient process for generating a single, production-ready CSS file...linting it, minifying it, etc.

I actually hit a point where I felt compelled to tweet this...

<blockquote class="twitter-tweet" lang="en" style="margin: 0 auto;"><p>Got my Gulp CSS build-out process working EXACTLY the way I want it to…only took 3 weeks.</p>&mdash; kai gittens (@kaidez) <a href="https://twitter.com/kaidez/status/529054310379053056">November 2, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

There was a rush to launch this project and as a result, things were launched when the code was "good enough," but "not as good as it could've been." It was obvious that some things needed refactoring.

There was no time to refactor it during work hours due to other projects on my team's plate, so I decided to refactor the bad code parts on my own time. And since I had already used these tools to create a productive dev environment for the actual project, I decide to reuse the same tooling/environment setup for the refactor.

<a name="the-problem"></a>
## The Problem
Recreating this setup was a pain in the a**. Since I was only refactoring parts of the site code and not the whole site itself, the tooling need to be adjusted in some spots.

For example: I didn't need all the dependencies listed in the `package.json` and `bower.json` files. I just needed the ones related to the code pieces I was refactoring, so I had to spend some time removing unneeded dependencies.

OK...that was more of an inconvenience than a pain in the a**. But setting up the CSS build process again? That sucked.

Again, I'm a fan of how well Bootstrap does responsive web design and based my LESS setup around that. My `.less` files were named based on Bootstraps's pre-defined set of media queries.

So since Bootstrap has a media query called `@media (min-width: 1200px)`, I have a file called `min-width-1200.less` that contains the following code:

{% prism css %}
@media (min-width: 1200px) {

}
{% endprism %}

And since it also has a media query called `@media screen and (min-width: 768px)`, I have a file called `screen-and-min-width-768.less` that contains the following code:

{% prism css %}
@media screen and (min-width: 768px) {

}
{% endprism %}

You get the idea...

Like the `package.json` and `bower.json` files, the LESS files needed to be setup differently for the refactor. I adjusted the `.less` files and where adjusting the `.json` dependencies was a manageable inconvenience, redoing the style setup was a mind-numbing sh*t-show.

I knew I would use these tools and techniques again and again, so containing them in a reusable template I could use to start projects seemed to make sense. I took notes on this while doing the refactor and when it was finished, I started creating the template.

<a name="more-problems"></a>
## More Problems
The template started off as a bunch of files in a GitHub repo. It contained the `.less` and `.json` files and other things, like the Grunt &amp; Gulp files and a `.gitignore` file.

Another set of problems soon appeared:

* scaffolding this project from the repo wasn't convenient. I could `git clone` it to my machine, but that would download a folder with the files...I just needed the files. So if I was starting a project from scratch, I would have to rename the downloaded folder to match the project. Or, if I already started a project in another folder, I would have to copy the downloaded repo files to that other folder.  All of this is doable...it's just not convenient.

* the template contained LESS files but I knew there would be instances where I would need to use another pre-processor. For example, [Jekyll has built-in Sass integration](http://jekyllrb.com/docs/assets/) so using [Sass](http://sass-lang.com/ "Review the Sass pre-processor") in that situation may make more sense.  Plus, I want to use [Rework](https://github.com/reworkcss/rework) at some point because it lets you build a customizable pre-processor. So there may be times in the future when I don't need LESS, Sass or another CSS pre-processor.

* the template contained a `.gitignore` that listed some common files that should be ignored from Git commits. But my day job requires my working in a .NET environment built around best practices codified for almost a decade. One of the chief requirements is that we use  [TFS](https://www.visualstudio.com/en-us/products/tfs-overview-vs.aspx "Review Microsoft's Team Foundation Server") for version control with instead of Git.

* the template was configured really well for single page applications (SPAs), but I do a fair amount of WordPress work as well.  The template wasn't really set up for that: some Gulp/Grunt plugins wouldn't work the way I needed them to, the CSS needed a slightly difference build-out process in some spots and the `.gitignore` needed a few more files added to it.

So a downloadable template wouldn't work because it would be too opinionated. It would assume that every project required the same tooling/dev environment setup...which isn't true.

It was clear that I had to programmatically scaffold each project so I could configure it based on a set of passed (or not-passed) options. [Yeoman](http://yeoman.io/) is the current popular scaffolding app and I could have spent some time searching through [Yeoman's generators](http://yeoman.io/generators/ "Review Yeoman's generators") to find what I needed.

But what I wanted was too specific so I doubted the generators would help. Plus, I wanted to see if I could use Node to build a tool for this  myself.

<a name="tool-building-process"></a>
## The Tool-Building Process
I asked around and did some Google searches to figure out the best way to do this.  It took me about two days of working at night after the day job to get the files and folders to be either created or downloaded.

From there, I became ridiculously anal-retentive and spent four weeks (FOUR WEEKS) getting things to look and act how I wanted them to.  This was mostly centered around the logging: what messages were sent to the terminal console as the app progressed, what color were they, etc.

<a name="final-command"></a>
## The Final Command
The end result of all this was `kdz`: a Node command that downloads files from a GitHub repo and also creates folders.  All in a programmatic way.

After you install it, typing `kdz` from anywhere in the terminal displays the help, which looks like this:

{% prism markup %}
  Usage: kdz [options] [command]


  Commands:

    app   scaffold a basic web application
    dt    delete "test-build" folder

  Options:

    -h, --help       output usage information
    -V, --version    output the version number
    -w, --wordpress  create a WordPress project
    -g, --gitignore  download ".gitignore" file
    -l, --less       download LESS files in "css-build"
    -s, --scss       download Sass files in "css-build"
    -t, --test       do a test scaffold in "test-build"
{% endprism %}

Just two commands for now...`app` and `dt`:

* Running `kdz app` scaffolds out a SPA-like by performing the following steps:

  * a `build` folder is created with `css` and `js` subdirectories.
  * a `coffee` folder is created and includes a `main.coffee` file.
  * a `css-build` folder is created with an `imports` subdirectory. and empty `image-min` folder is created (images that need to be minified go here)
  * `bower.json`, `.bowerrc` and `STYLEGUIDE.md` files are downloaded from the `source-shared-files` directory in the `kdz` repo.
  * SPA-like `Gruntfile.js`, `gulpfile.js` and `package.json` files are downloaded from the `source-spa` directory in the `kdz` repo.
	* The final build looks like this:

{% prism markup %}
├── build
|   ├── css
|   └── js
        └── libs
├── coffee
|   └── main.coffee
├── image-min
├── css-build
|   └── imports
├── .bowerrc
├── bower.json
├── Gruntfile.js
├── gulpfile.js
├── package.json
└── STYLEGUIDE.md
{% endprism %}

* If the `--test flag` is passed to `kdz app`, a `test-build` folder is created, then a test scaffold is created in that folder. `kdz dt` is a quick way of deleting `test-build`. This was used more for development than anything else.

Along with `--test` and the standard `--help` and `--version` options, there are set of options:

*  the `--wordpress` option scaffolds out a WordPress-like project. It performs almost the same tasks as `kdz app` with the following differences:

  * the `build` folder and its subdirectories are not created.
  * the `Gruntfile.js`, `gulpfile.js` and `package.json` files that are downloaded are more geared toward WordPress development and downloaded from `source-wordpress`.
  * a `functions.php` file is downloaded.
	*  The final build looks like this:

{% prism markup %}

├── coffee
|   └── main.coffee
├── image-min
├── css-build
|   └── imports
├── .bowerrc
├── bower.json
├── functions.php
├── Gruntfile.js
├── gulpfile.js
├── package.json
└── STYLEGUIDE.md
{% endprism %}

* the `--gitignore` option downloads a `.gitignore` file from `source-spa` to the root folder by default. But if the `--wordpress` option is passed, `.gitignore` will be WordPress-specific and downloaded from the `source-wordpress` folder in the `kdz` repo.

* the `--less` option downloads LESS files from `source-spa` to `css-build` and `css-build/imports` by default. But if the `--wordpress` option is passed, the LESS files will be WordPress-specific and downloaded from the `source-wordpress` folder. As mentioned, the `.less` files are named based on Bootstrap-defined media queries so the final build would look like this:

{% prism markup %}
css-build
 ├── style.less
 └── imports
     ├── all-transform-3d-webkit-transform-3d.less
     ├── bootstrap-override.less
     ├── for.less
     ├── globals.less
     ├── max-device-width-480-orientation-landscape.less
     ├── max-width-767.less
     ├── min-width-1200.less
     ├── min-width-768-max-width-991.less
     ├── min-width-768.less
     ├── min-width-992-max-width-1199.less
     ├── min-width-992.less
     ├── mixins.less
     ├── mobile_first.less
     ├── retina-media-queries.less
     ├── screen-and-max-width-767.less
     ├── screen-and-min-width-768.less
     ├── screen-webkit-min-device-pixel-ratio-0.less
     ├── screen-webkit-min-device-pixel-ratio-0
     └── variables.less
{% endprism %}

* the `--scss` option does pretty much what `--less` does, except it downloads Sass files from `source-spa` to `css-build` and `css-build/imports` by default. But if the `--wordpress` option is passed, the LESS files will be WordPress-specific and downloaded from the `source-wordpress` folder.  

There are slight variations among the LESS and Sass builds and I've also created files like this so the CSS build out based on my self-imposed rules. For example: `globals.less` exists for a reason and while there's a `for.less`, there's no `for.scss`.

Learn about these variations and rules over on [the "Understand the Basic structure" section in repo's style guide](https://github.com/kaidez/kdz/blob/master/source-shared-files/STYLEGUIDE.md#understand-the-basic-structure).

<a name="behind-the-scenes"></a>
## Behind The Scenes

Some interesting points about how `kdz` works behind the scenes:

* Obviously, `kdz` was built with Node.
* [commander](https://www.npmjs.com/package/commander "Read about the npm commander module") was the key package used to build the tool. It's what I used to configure the commands and options.
* [q](https://www.npmjs.com/package/q "Read about the npm q module") was used to manage [JS Promises](https://promisesaplus.com/ "Read the Promises/A+ specification"). Node runs things asynchronously and I need to make sure that a certain step didn't run until some other steps ran before it. q properly managed that process.
* The [download](https://www.npmjs.com/package/download "Read about the npm download module") and [download-status](https://www.npmjs.com/package/download-status "Read about the npm download-status module") modules work together to download files from the repo and display how the download is progressing.
* [chalk](https://www.npmjs.com/package/chalk "Read about the npm chalk module") adds some pretty sweet coloring to outputted console statements.

<a name="todo"></a>
## What's Left To Do
A lot. The repo's README has a [TODO list](https://github.com/kaidez/kdz#todowish-list "Read the TODO list on the kdz repo") of things I need/want to do, but here are the main things:

* __get `kdz` working on Windows:__ in this day and age, there's no good reason for a Node app to work on Unix-like systems only.  Microsoft's done far too much good work in getting Node to work on their operating systems and Azure: I think `kdz` should respect that.

* __make the Promises neater:__ I've played with Promises before but this was the first project that I REALLY used them. I used them primarily to make sure the app logging happens in the proper sequence and while I'm (pretty) sure that I implemented them properly based on the q documentation, the code is spaghetti-like. I'd like to focus on cleaning it up is possible.

* __make a small library:__ I spent a day looking at spots where the code was repetitive, then placing that code in a reusable function that all the spots could use. There are other spots that can use this: lots of spots use [Node's fs.open() method](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback "Read about Node fs.open") to check for the existence of a given file or folder. Making that code chunk reusable makes sense.

* __make the options run on their own:__ Right now, the `--gitignore`, `--less`, `--sass` and `--wordpress` won't run unless they're passed as options to commands. In other words, running `kdz app` will scaffold a basic project but if I want to download Sass files sometime after that, I would have to run `kdz app -s`. Sass files should be able to be download without the `app` command so I'm working on that.


<a name="further-reading"></a>
## Further Reading

A main reason that I didn't write a tutorial was because there are so many good ones already out there. I found the [*Command-line utilities with Node.js* article by Glynn Phillips ](http://cruft.io/posts/node-command-line-utilities/) to be the best one...I'd start there.

The [Node API docs](https://nodejs.org/api/ "Read the Node API") are also a read. It's verbose in some spots but after reading various parts through it a few times, I was able to write my own Node code without the use of plugins...GOOD FOR ME!!!


<a name="conclusion"></a>
## Conclusion

I was glad creating this solve my problem but the BEST thing about doing all this was I gained a lot of Node experience. I had played around with Node quite a bit before all this and, for some reason, using Gulp made me understand it even better.

But this project exposed me to ton of Node stuff. I gained a really good understanding of how Node interacts with a file system and all the quirks that come with exporting and requiring modules.

I also learned about Promises and much they go hand-in-hand with Node. For all the Promise spaghetti code I wrote, I get them and see how they make parts of Node development easier.

 I still have more work to do: I really want to add more "Node stuff" to `kdz` and less "Node modules". By that, I mean that I want to add things like `.pipe()` and `process.nextTick()` to the tool and see if they let me do things without requiring a bunch of npm modules.

But overall, creating `kdz` was one of the best web development experiences I've had in a while and can't wait to continue work on it. If not to solve a problem, then to get Node to bend to my will more and more.
