[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
# WHAT IS THIS?

This is the repo that contains the source code for the [kaidez.com](http://kaidez/com) website. It is 100% open source.

## Hard Development-Level Dependencies

For developing the site on a local machine, there are some hard development-level dependencies:

* [Ruby](https://www.ruby-lang.org/en/): needed to download Ruby Gems, interact with Jekyll and optionally use WebBrick to run the local version of the site on http://localhost:4000.

* [Ruby Gems](http://rubygems.org/): to install Gems, i.e. Ruby-related packages like Sass and Jekyll.

* [Jekyll](http://jekyllrb.com/): a blog-aware static site generator that manages HTML & Markdown files, and also builds out a production copy of the site.

* [RequireJS](http://requirejs.org/): a JavaScript-based script-loader used to manage JavaScript files as modular dependencies.

## Loose Development-Level Dependencies

There are also some loose development-level dependencies...they don't REALLY need to be installed to make changes to the site or create a production build, but installing them makes changing and building out the site FUN!!!!!!!!

* [GruntJS](http://gruntjs.com/): a JavaScript-based task runner used to run site-related tasks such as Sass compiling and assisting in the building-out of a production-ready copy of the site.

* [Bower](http://bower.io/): a low-level browser-centric package manager used to add, remove and update SOME of the site's production runtime dependencies.

* [Sass](http://sass-lang.com/): a CSS preprocessor.

## Understanding the Hard Development-Level Dependencies

### Ruby/Ruby Gems & Jekyll

Jekyll is probably kaidez.com's hardest dependency as it manages much of the site's internal structure. If Jekyll isn't installed on a local machine, it needs to be done so via Ruby Gems, which can't run unless Ruby is installed.

If Ruby Gems is installed, Jekyll can be installed via the command line by first navigating to the site root folder, then running the following command:

    gem install jekyll
    
[Review the Jekyll docs](http://jekyllrb.com/docs/home/) to see the many things it can do, but its primary purpose is to build out a production-ready copy of the site. This can be done via the command line by first navigating to the site root folder, then running the following command:

    jekyll build
  
When this command is run, Jekyll will output a production-ready copy of the site to the `_site` folder that can be uploaded to a web server. If the site's contact form should be utilized, PHP is a runtime dependency. Note that the `_site` folder is purposely not checked into this repo.
  
### RequireJS

RequireJS is script loader for JavaScript files. Specifically, RequireJS focuses on (almost) all the JavaScript files located in the `requireBuildOut` folder and treats then as dependency modules based on the [Asynchronous Module Definition specification](https://github.com/amdjs/amdjs-api/wiki/AMD).

It is possible to rearrange kaidez.com's JS file structure and not use RequireJS, but it's recommended that RequireJS be treated as a hard dependency as it does an excellent job of treating all the JS files as single modules...this is great for development. It also preps all the files for usage on production.

Within kaidez.com's site structure, RequireJS depends on two files: 1) `requireBuildOut/require.js` to manage and treat all the JS files as modules, and 2) `r.js` in the root folder to concatenate and minify (almost) all the files in `requireBuildOut`.

Within kaidez.com on the development level, the RequireJS functionality is managed by GruntJS. GruntJS concats/minifies all the JS files into a single `scripts.min.js` file and load it into the `js` folder. This can be done via the command line by first navigating to the site root folder, then running the following command:

    grunt requirejs
    
## Understanding the Loose Development-Level Dependencies

While both GruntJS and Bower are not hard dependencies of kaidez.com, both use Node and its internal package manager, npm, as a hard dependency.  Node and npm can be downloaded and installed simultaneously at [http://nodejs.org/](http://nodejs.org/).

### Grunt

Within kaidez.com on the development level, Grunt itself has many hard dependencies.  The site's Grunt functionality is powered by the `Gruntfile.js` file and its dependencies are listed in the `package.json`...both files are at the site root. These dependencies are essentially plugins stored as Node packages on the [npm Registry](https://npmjs.org/). Assuming that npm is installed on the local machine, these plugins can be installed all at once via the command line by first navigating to the site root folder, then running the following command:

    npm install

When this command is run, npm will look at the plugins defined in the `devDependencies` object in `package.json` and either install them in the `node_modules` folder at the site root, or create a `node_modules` folder at the site root first, *then* install the plugins in the folder.

### Bower

Bower itself treats Git as semi-hard dependency.  Technically, speaking Bower can operate if Git is not installed locally, but this is not recommend. kaidez.com's Bower configurations are managed by the `.bowerrc` file stored in the site root.  The `bower.json` at the site root lists site dependencies, *not* things that Bower depends on.

The above-mentioned `bower.json` file defines the site's packages in the `dependencies` object. These packages are core files such as [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/), [enquire.js](http://wicky.nillia.ms/enquire.js/), [jQuery](http://jquery.com/) and their respective dependencies. It's important to note that these files are "linked to" in the Bower registry and not actually "stored inside of it."

If the site is either download either as a .zip file or with `git clone`, all of the packages are installed at the site root in either in the `requireBuildOut` or `font` folder. Bower is not required in this case; however, if the packages need to be managed, Bower would need to be installed...it's best if it's installed *globally* using npm at the site root, and at the command line level as follows:

    npm install -g bower

To check for both package and Bower updates, run the following command at the site root:

     bower list

To install the packages, run the following command at the site root:

     bower install

When this command is run, bower will look at the packages defined in the `dependencies` object listed in `bower.json` and either install them in the `bower_components` folder at the site root, or create a `bower_components` folder at the site root first, *then* install the packages in the folder. If GruntJS is properly configured within the kaidez.com project folder and is running its `watch` task, it will run tasks that copy files that Bower downloaded over into certain folders, then run certain concat/minify tasks against these files.

For more details on Grunt's `watch` task inside of kaidez.com, [review the site's Grunt file](https://github.com/kaidez/kaidez.com/blob/master/Gruntfile.js).

### Sass

Sass is not a hard dependency of kaidez.com: an unminfied version of the main `style.css` file exists in the `grunt/cssSource` folder and can be copied over to the `css` folder, referenced in a `<link>` tag, then manually edited. However, it's suggested that the site's CSS be managed by either Sass or another CSS preprocessor because:

* The unminified version may stop being built out and removed from the repo someday.
* Sass is fun!

If both Ruby and Ruby Gems are installed locally, Sass can be installed via the command line by first navigating to the site root folder, then running the following command:

    gem install sass

Inside of kaidez.com, `Gruntfile.js` has a Sass-based `watch` task which watches changes to the `.scss` files inside of `grunt/cssSource`. If those files are changed, the `watch` task builds out the unminified `style.css` file to `grunt/cssSource` folder first, then builds out a production-ready `styles.min.css` file to the `css` folder.


For more details on Grunt's `watch` task inside of kaidez.com, [review the site's Grunt file](https://github.com/kaidez/kaidez.com/blob/master/Gruntfile.js).

## Hard Runtime Dependencies

kaidez.com really only has one hard runtime dependency: PHP. This is because the contact form at the bottom of all the site pages sends runs a POST action to the server that 1) process the form content for server-side validation, and 2) sends the form content out in an email to a pre-defined email address.

If the form is removed, kaidez.com can run on any web server setup that can proper serve out .html, .css, .js and image files.  Apache, IIS, nginx, etc.
