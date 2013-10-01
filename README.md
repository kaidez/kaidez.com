## WHAT IS THIS?

This is the source code for [kaidez.com](http://kaidez/com). It is 100% open source.

For developing this on a local machine, there are some hard dependencies:

* [Ruby](https://www.ruby-lang.org/en/): needed allow Ruby Gems to run and optionally run Jekyll's internal WebBrick server on http://localhost/:4444
* [Ruby Gems](http://rubygems.org/): to install Gems, i.e. Ruby-related packages like Jekyll)
* [Jekyll](http://jekyllrb.com/): a blog-aware static site engine that can be installed via Ruby Gems

There are also some loose dependencies...they don't REALLY need to be installed to make changes to the site, but installing them makes changing the site FUN.

* [GruntJS](http://gruntjs.com/): a JavaScript-based task manager used to run site-related tasks such as Sass compiling tasks and site deployments.

* [Bower](http://bower.io/): a JavaScript-powered package manager used to add, remove and update SOME of the site's runtime dependencies.

Both Grunt and Bower require use Node and its internal package manager, npm, as a hard dependency.  Node and npm can be downloaded and installed simultaneously. Downloaded at [http://nodejs.org/](http://nodejs.org/).