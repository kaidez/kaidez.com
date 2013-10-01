# WHAT IS THIS?

This is the source code for [kaidez.com](http://kaidez/com). It is 100% open source.

## Dependencies

For developing the site on a local machine, there are some hard dependencies:

* [Ruby](https://www.ruby-lang.org/en/): needed download Ruby Gems, to interact with Jekyll and optionally to run the local version of the site on http://localhost/:4000 via WebBrick

* [Ruby Gems](http://rubygems.org/): to install Gems, i.e. Ruby-related packages like Jekyll

* [Jekyll](http://jekyllrb.com/): a blog-aware static enfine that manages HTML and Markdown files, and also builds out a production copy of the site.

* [RequireJS](http://requirejs.org/): a JavaScript-based script-loader.

There are also some loose dependencies...they don't REALLY need to be installed to make changes to the site or create a production build, but installing them makes changing and building out the site FUN!!!!!!!!

* [GruntJS](http://gruntjs.com/): a JavaScript-based task manager used to run site-related tasks such as Sass compiling and assiting in the building-out of a production-ready copy of the site.

* [Bower](http://bower.io/): a browser-centric package manager used to add, remove and update SOME of the site's production runtime dependencies.

While both GruntJS and Bower are not hard dependencies of kaidez.com, both use Node and its internal package manager, npm, as a hard dependency.  Node and npm can be downloaded and installed simultaneously at [http://nodejs.org/](http://nodejs.org/).

GruntJS itself has many hard dependencies.  The site's Grunt functionality is powered by the `Gruntfile.js` file and its dependencies are listed in the `package.json`...both files are at the site root. These plugins are essentially Node packages stored in the [npm Registry](https://npmjs.org/). Assuming that npm is installed on the local machine, these plugins can be installed all at once via the command line by first navigating to the site root folder, then running the following command:

    npm install

When this command is run, npm will look at the plugins defined in the `devDependencies` listed in `package.json` and install them in the `node_modules` folder at the site root, or create a `node_modules` folder at the site root first, *then* install the plugins.

Bower itself treats Git as semi-hard dependency: Bower can operate if Git is not installed locally, but this is not recommened. kaidez.com's Bower functionality is powered by the `.bowerrc` file for Bower-specific configurations.  The `bower.json` at the site root lists site dependencies and *not* things that Bower depends on.

The above-mentioned `bower.json` file defines the site's packages in the `dependencies`. These packages are core files such as [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/), [enquire.js](http://wicky.nillia.ms/enquire.js/), [jQuery](http://jquery.com/) and their respective dependencies. It's important to note that these files are "linked to" in the Bower registry and not actually "stored inside of it."

If the site is either download either as a .zip file or with `git clone`, all of the packages are installed at the site root in either in the `requireBuildOut` or `font` folder. Bower is not required in this case; however, if the packages need to be managed, Bower would need to be installed...it's best if it's installed globally using npm at the site root and at the command line level as follows:

    npm install -g bower

To check for both package and Bower updates, run the following command at the site root:

     bower list

When this command is run, npm will look at the plugins defined in the `dependencies` listed in `bower.json` and install them in the `bower_components` folder at the site root, or create a `bower_components` folder at the site root first, *then* install the packages. If GruntJS is properly configured, it will run tasks that copy certain file into certain folders, then run certain cancat/minify tasks against CSS and JavScript files.  For more details, [review the site's Grunt file](https://github.com/kaidez/kaidez.com/blob/master/Gruntfile.js), specifcally the `watch` task. 