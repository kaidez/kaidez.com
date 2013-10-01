# WHAT IS THIS?

This is the source code for [kaidez.com](http://kaidez/com). It is 100% open source.

## Dependencies

For developing the site on a local machine, there are some hard dependencies:

* [Ruby](https://www.ruby-lang.org/en/): needed download Ruby Gems, to interact with Jekyll and optionally to run the local version of the site on http://localhost/:4000 via WebBrick

* [Ruby Gems](http://rubygems.org/): to install Gems, i.e. Ruby-related packages like Jekyll

* [Jekyll](http://jekyllrb.com/): a blog-aware static enfine that manages HTML and Markdown files, and also builds out a production copy of the site.

There are also some loose dependencies...they don't REALLY need to be installed to make changes to the site or create a production build, but installing them makes changing and building out the site FUN!!!!!!!!

* [GruntJS](http://gruntjs.com/): a JavaScript-based task manager used to run site-related tasks such as Sass compiling tasks and building out a production-ready copy of the site.

* [Bower](http://bower.io/): a browser-centric package manager used to add, remove and update SOME of the site's production runtime dependencies.

While both GruntJS and Bower are not hard dependencies of kaidez.com, both use Node and its internal package manager, npm, as a hard dependency.  Node and npm can be downloaded and installed simultaneously at [http://nodejs.org/](http://nodejs.org/).

GruntJS itself has many hard dependencies.  The site's Grunt functionality is powered by the `Gruntfile.js` file and its dependencies are listed in the `package.json`...both files are at the site root. These plugins are essentially Node packages stored in the [npm Registry](https://npmjs.org/). Assuming that npm is installed on the local machine, these plugins can be installed all at once via the command line by first navigating to the site root folder, then running the following command:

    npm install

When this command is run, npm will look at the plugins defined in the `devDependencies` listed in `package.json` and install them in the `node_modules` folder at the site root, or create a `node_modules` folder at the site root first, **then** install the plugins.

Bower itself treat's Git as semi-hard dependency: Bower can operate if Git is not installed locally, but this is not recommened. The site's Bower functionality is powered by the `.bowerrc` file for Bower-specific configurations.  and its dependencies are listed in the `bower.json`...both files are at the site root. 