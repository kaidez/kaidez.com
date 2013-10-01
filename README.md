# WHAT IS THIS?

This is the source code for [kaidez.com](http://kaidez/com). It is 100% open source.

## Hard Dependencies

For developing the site on a local machine, there are some hard dependencies:

* [Ruby](https://www.ruby-lang.org/en/): needed download Ruby Gems, to interact with Jekyll and optionally to run the local version of the site on http://localhost/:4000 via WebBrick.

* [Ruby Gems](http://rubygems.org/): to install Gems, i.e. Ruby-related packages such as Sass and Jekyll.

* [Jekyll](http://jekyllrb.com/): a blog-aware static enfine that manages HTML and Markdown files, and also builds out a production copy of the site.

* [RequireJS](http://requirejs.org/): a JavaScript-based script-loader.

## Loose Dependencies

There are also some loose dependencies...they don't REALLY need to be installed to make changes to the site or create a production build, but installing them makes changing and building out the site FUN!!!!!!!!

* [GruntJS](http://gruntjs.com/): a JavaScript-based task manager used to run site-related tasks such as Sass compiling and assisting in the building-out of a production-ready copy of the site.

* [Bower](http://bower.io/): a browser-centric package manager used to add, remove and update SOME of the site's production runtime dependencies.

* [Sass](http://sass-lang.com/): a CSS preprocessor.

## Understanding the Hard Dependencies

### Ruby/Ruby Gems & Jekyll

Jekyll is probably kaidez.com's hardest dependency as it manages much of the site's internal structure. If Jekyll isn't installed on a local machine, it needs to be done so via Ruby Gems, which can't run unless Ruby is installed.

If Ruby Gems is installed, Jekyll can be installed via the command line by first navigating to the site root folder, then running the following command:

    gem install jekyll
    
[Review the Jekyll docs](http://jekyllrb.com/docs/home/) to see the many things it can do, but its primary purpose is to build out a production-ready copy of the site.  This can be done via the command line by first navigating to the site root folder, then running the following command:

    jekyll build
  
When this command is run, Jekyll will output a production-ready copy of the site to the `_site` folder that can be uploaded to a web server. If the site's contact form should be utilized, PHP is a runtime dependency.
  
### RequireJS

RequireJS is script loader for JavaScript files. Specfically, RequireJS focuses on (almost) all the JavaScript files located in the `requireBuildOut` folder and treats then as dependency modules based on the [Asynchronous Module Definition spec](https://github.com/amdjs/amdjs-api/wiki/AMD). 

While both GruntJS and Bower are not hard dependencies of kaidez.com, both use Node and its internal package manager, npm, as a hard dependency.  Node and npm can be downloaded and installed simultaneously at [http://nodejs.org/](http://nodejs.org/).

Within kaidez.com on the development level, GruntJS itself has many hard dependencies.  The site's Grunt functionality is powered by the `Gruntfile.js` file and its dependencies are listed in the `package.json`...both files are at the site root. These dependencies are essentially plugins stored as Node packages on the [npm Registry](https://npmjs.org/). Assuming that npm is installed on the local machine, these plugins can be installed all at once via the command line by first navigating to the site root folder, then running the following command:

    npm install

When this command is run, npm will look at the plugins defined in the `devDependencies` object in `package.json` and either install them in the `node_modules` folder at the site root, or create a `node_modules` folder at the site root first, *then* install the plugins in the folder.

Bower itself treats Git as semi-hard dependency: Bower can operate if Git is not installed locally, but this is not recommened. kaidez.com's Bower functionality is powered by the `.bowerrc` file for Bower-specific configurations.  The `bower.json` at the site root lists site dependencies and *not* things that Bower depends on.

The above-mentioned `bower.json` file defines the site's packages in the `dependencies` object. These packages are core files such as [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/), [enquire.js](http://wicky.nillia.ms/enquire.js/), [jQuery](http://jquery.com/) and their respective dependencies. It's important to note that these files are "linked to" in the Bower registry and not actually "stored inside of it."

If the site is either download either as a .zip file or with `git clone`, all of the packages are installed at the site root in either in the `requireBuildOut` or `font` folder. Bower is not required in this case; however, if the packages need to be managed, Bower would need to be installed...it's best if it's installed *globally* using npm at the site root and at the command line level as follows:

    npm install -g bower

To check for both package and Bower updates, run the following command at the site root:

     bower list

To install the packages, run the following command at the site root:

     bower install

When this command is run, bower will look at the packages defined in the `dependencies` object listed in `bower.json` and either install them in the `bower_components` folder at the site root, or create a `bower_components` folder at the site root first, *then* install the packages in the folder. If GruntJS is properly configured within the kaidez.com package folder and is running its `watch` task, it will run tasks that copy files that Bower downloaded over into certain folders, then run certain concat/minify tasks against these files.

For more details on Grunt's `watch` task inside of kaidez.com, [review the site's Grunt file](https://github.com/kaidez/kaidez.com/blob/master/Gruntfile.js).

Sass is not a hard dependency of kaidez.com: an unminfied version of the main `style.css` file exists in the `grunt/cssSource` folder and can be copied over to the `css` folder first, then manually edited. However, it's suggested that the site's CSS be managed by either Sass or another CSS preprocessor because:

* The unminified version may be stop being built out and removed fom the repo someday.
* Sass is fun!

If both Ruby and Ruby Gems are installed locally, Sass can be installed via the command line by first navigating to the site root folder, then running the following command:

    gem install sass

Inside of kaidez.com, `Gruntfile.js` has a Sass-based `watch` task which watches changes to the `.scss` files inside of `grunt/cssSource`. If those files are changed, the `watch` task builds out the unminified `style.css` file to `grunt/cssSource` folder first, then builds out a production-ready `styles.min.css` file to the `css` folder.


For more details on Grunt's `watch` task inside of kaidez.com, [review the site's Grunt file](https://github.com/kaidez/kaidez.com/blob/master/Gruntfile.js).
