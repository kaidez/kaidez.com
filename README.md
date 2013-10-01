# WHAT IS THIS?

This is the source code for [kaidez.com](http://kaidez/com). It is 100% open source.

## Dependencies

For developing the site on a local machine, there are some hard dependencies:

* [Ruby](https://www.ruby-lang.org/en/): needed allow Ruby Gems to run and optionally run the Ruby-based WebBrick server on http://localhost/:4000

* [Ruby Gems](http://rubygems.org/): to install Gems, i.e. Ruby-related packages like Jekyll)

* [Jekyll](http://jekyllrb.com/): a blog-aware static site engine that can be installed via Ruby Gems

There are also some loose dependencies...they don't REALLY need to be installed to make changes to the site or create a production build, but installing them makes changing and building out the site FUN!!!!!!!!

* [GruntJS](http://gruntjs.com/): a JavaScript-based task manager used to run site-related tasks such as Sass compiling tasks and building out a production-ready copy of the site.

* [Bower](http://bower.io/): a browser-centric package manager used to add, remove and update SOME of the site's production untime dependencies.

While both GruntJS and Bower are not hard dependencies of kaidez.com, both use Node and its internal package manager, npm, as a hard dependency.  Node and npm can be downloaded and installed simultaneously at [http://nodejs.org/](http://nodejs.org/).

While GruntJS isn't a hard dependency of kaidez.com and not, GruntJS itself has many hard dependencies.  The site's Grunt functionality is powered by the `Gruntfile.js` file and it's dependencies are listed in the `package.json` file. These plugins are essentially Node packages stored in the [npm Registry](https://npmjs.org/). Assuming that npm is installed on the local machine, these plugins can be installed all at once via the command line by navigating to the site root folder and running the following command:

    npm install

When this command is run, npm will look at the plugins defined in the `devDependencies` listed in `package.json` and install them in the `node_modules` folder at the root fo the folder. or create a `node_modules` folder first and then install the plugins.