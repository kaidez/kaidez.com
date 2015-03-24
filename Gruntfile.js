module.exports = function(grunt) {

  'use strict';

  require('time-grunt')(grunt);  // log individual task runtime

  // Project config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Jekyll builds the site
    jekyll: {
      dev: { // build the site without using 'lsi' to create similar posts content
        src: ['.'],
        dest: '_site'
      },
      prod: { // build the site using 'lsi' to create similar posts content
        src: ['.'],
        dest: '_site'
      }
    },

    // minify all .html files in the '_site' directory. only runs when 'grunt ppush' is called
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        expand: true,
        cwd: '_site',
        src: ['**/*.html', '*.index.html', '!samples/**/*.html'],
        dest: '_site'
      }
    },

    // convert main sass file to a development build of 'css/styles.css'
    sass: {
      dist: {
        files: {
          'css/styles.css': 'grunt/cssSource/styles.scss'
        },
        options: {
          style: 'expanded'
        }
      }
    },

    // minify 'css/styles.css & move it to the '_site' folder
    cssmin: {
      buildProductionCSS: {
        src: 'css/styles.css',
        dest: 'css/styles.min.css'
      }
    },

    // minify all images
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'img',
          src: '*.{png,jpg,jpeg,gif}',
          dest: 'img'
        }]
      }
    },

    // all the 'watch' tasks
    watch: {
      // pageOnlyTask: { // run 'jekyll build' on .html, .md, .php & .xml file changes globally...EXCEPT the '_site' directory
      //   files: ['*.html', '**/*.html','!_site/**/*.html', '!_site/*.html', 'email.php', '_posts/*.md', '!jekyllOutput.html', 'search.html'],
      //   tasks: ['jekyll:dev']
      // },
      layoutOnlyTask: { // run 'jekyll build' on .html, .md, .php & .xml file changes globally...EXCEPT the '_site' directory
        files: ['_templates/*.html'],
        tasks: ['targethtml:dev', 'jekyll:dev']
      },

      draft: { // run 'jekyll build' on .html, .md, .php & .xml file changes globally...EXCEPT the '_site' directory
      files: ['_drafts/*.md'],
      tasks: ['shell:jbd']
    },

      jsOnlyTask: { // run 'jekyll build' on .js file changes
        files: ['requireBuildOut/*.js'],
        tasks: ['requirejs', 'jekyll:dev']
      },

      cssOnlyTask: { // run 'jekyll build' on .scss/.css file changes
        files: ['grunt/cssSource/*.scss'],
        tasks: ['sassbuild', 'jekyll:dev']
      }

      // imgOnlyTask: { // run 'jekyll build' when the 'img/' directory changes
      //   files: ['img/*.{png,jpg,jpeg,gif}'],
      //   tasks: ['imagemin', 'jekyll:dev']
      // }
     },

    // create a custom 'modernizr' file
    modernizr: {

      "devFile" : "grunt/modernizr/modernizr-dev.js", //modernizr full build

      // Path to save out the built file.
      "outputFile" : "js/libs/modernizr.min.js",

      // Based on default settings on http://modernizr.com/download/
      "extra" : {
        "shiv" : true,
        "printshiv" : false,
        "load" : true,
        "mq" : false,
        "cssclasses" : true
      },

      // Based on default settings on http://modernizr.com/download/
      "extensibility" : {
        "addtest" : true,
        "prefixed" : false,
        "teststyles" : false,
        "testprops" : false,
        "testallprops" : false,
        "hasevents" : false,
        "prefixes" : false,
        "domprefixes" : false
      },

      // By default, source is uglified before saving
      "uglify" : true,

      // Define any tests you want to impliticly include.
      "tests" : [],

      // By default, this task will crawl your project for references to Modernizr tests.
      // Set to false to disable.
      "parseFiles" : true,

      // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files.
      // You can override this by defining a "files" array below.
      "files" : ["css/styles.min.css","requireBuildOut/*.js","requireBuildOut/**/*.js"],

      // When parseFiles = true, matchCommunityTests = true will attempt to
      // match user-contributed tests.
      "matchCommunityTests" : false,

      // Have custom Modernizr tests? Add paths to their location here.
      "customTests" : [],

      // Files added here will be excluded when looking for Modernizr refs.
      "excludeFiles" : "Gruntfile.js"
    },

    // CDN task
    cdn: {
      options: {
          /** @required - root URL of your CDN (may contains sub-paths as shown below) */
          cdn: 'http://cdn.kaidez.com',
          /** @optional  - if provided both absolute and relative paths will be converted */
          flatten: false,
          /** @optional  - if provided will be added to the default supporting types */
          supportedTypes: { 'phtml': 'html' }
      },
      dist: {
          cwd: './_site/',
          /** @required  - string (or array of) including grunt glob variables */
          dest: './_site/',
          src: ['index.html', '{,**/}*.html', 'css/styles.min.css']
            }
        },

    // properties to be loaded into the application cache (manifest.appcache) file.  they load in via a template in the 'manifest task'
    site_files: [
      'js/libs/*.js'
    ],

    // create application cache (manifest.appcache) file for the whole site
    manifest: {
      generate: {
        options: {
          basePath: '_site/',
          cache: [
            'affiliate-disclaimer.html',
            'colophon.html',
            'index.html',
            'search.html',
            'search.json',
            'sitemap.html',
            'css/styles.min.css',
            'img/profilepic.jpg',
            'img/footer-bg.png',
            'img/homePageDefault.jpg',
            'img/kaidez-sprite.png',
            'img/kaidez-sprite@2x.png',
            'js/scripts.min.js'
          ],
          network: ['*'],
          preferOnline: true,
          verbose: true,
          timestamp: true,
        },
        src: '<%= site_files %>',
        dest: '_site/manifest.appcache'
      }
    },

    // automagically concat/minify site jS based on RequireJS settings
    requirejs: {
      compile: {
        options: {
          baseUrl: "requireBuildOut/",
          mainConfigFile: "requireBuildOut/config.js",
          name: 'config',
          out: "js/scripts.min.js",
           preserveLicenseComments: false,
             paths: {
              requireLib: 'require'
            },
            include: 'requireLib'
          }
        }
      },

      // copy task...used for updating Bower stuff
      copy: {
        backbone: {
          files: [
            {expand: true,
            cwd: 'bower_components/backbone/',
            src: ['backbone-min.js'],
            dest: 'requireBuildOut/libs/', filter: 'isFile'}
          ]
        },
        enquire: {
          files: [
            {expand: true,
            cwd: 'bower_components/enquire/dist/',
            src: ['enquire.min.js'],
            dest: 'requireBuildOut/libs/', filter: 'isFile'}
          ]
        },
        jquery: {
          files: [
            {expand: true,
            cwd: 'bower_components/jquery/dist/',
            src: ['jquery.min.js'],
            dest: 'requireBuildOut/libs/', filter: 'isFile'}
          ]
        },
        fontAwesome: {
          files: [
            {expand: true,
            cwd: 'bower_components/font-awesome/css/',
            src: ['font-awesome.css'],
            dest: 'grunt/cssSource/',
            rename: function(dest, src) {
              return dest + '_' + src.substring(12, src.indexOf('/')) + '.scss';
            },
            filter: 'isFile'}
          ]
        },
        matchMedia: {
          files: [
            {expand: true,
            cwd: 'bower_components/matchMedia/',
            src: ['*.js'],
            dest: 'js/libs/',
            filter: 'isFile'}
          ]
        },
        require: {
          files: [
            {expand: true,
            cwd: 'bower_components/requirejs/',
            src: ['require.js'],
            dest: 'requireBuildOut/', filter: 'isFile'}
          ]
        },
        spin: {
          files: [
            {expand: true,
            cwd: 'bower_components/spinjs/',
            src: ['spin.js'],
            dest: 'requireBuildOut/libs', filter: 'isFile'}
          ]
        },
        underscore: {
          files: [
            {expand: true,
            cwd: 'bower_components/underscore/',
            src: ['underscore-min.js'],
            dest: 'requireBuildOut/libs/', filter: 'isFile'}
          ]
        }
      },

      targethtml: {
        dev: {
          files: {
            '_layouts/homePage.html': '_templates/homePage.html',
            '_layouts/categories.html': '_templates/categories.html',
            '_layouts/post.html': '_templates/post.html',
            '_layouts/default.html': '_templates/default.html',
          }
        },
        prod: {
          files: {
            '_layouts/homePage.html': '_templates/homePage.html',
            '_layouts/categories.html': '_templates/categories.html',
            '_layouts/post.html': '_templates/post.html',
            '_layouts/default.html': '_templates/default.html',
          }
        }
      },

      // Shell commands for creating and removing '_site' folder
      shell: {
        makeDeploy: {
          command: 'mkdir _site'
        },
        removeDeploy: {
          command: 'rm -rf _site'
        },
        jbd: {
          command: 'jekyll build --drafts'
        }
      },

      // deployments
     'sftp-deploy': {
      // deploy to the development site
      staging: {
        auth: {
          host: 's46798.gridserver.com',
          port: 22,
          authKey: 'key1'
        },
        src: '_site',
        dest: '/nfs/c02/h08/mnt/46798/domains/dev.kaidez.com/html'
    },

    // deploy to the live site
    production: {
      auth: {
        host: 's46798.gridserver.com',
        port: 22,
        authKey: 'key1'
      },
      src: '_site',
      dest: '/nfs/c02/h08/mnt/46798/domains/kaidez.com/html'
      }
    }
  });

  // Use 'loadNpmTasks' to enable plugins
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-sftp-deploy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-cdn');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s)
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('sassbuild', ['sass', 'cssmin']);
  grunt.registerTask('md', ['modernizr']);
  grunt.registerTask('rq', ['requirejs']);
  grunt.registerTask('dpush', ['jekyll:dev','sftp-deploy:staging']);
  grunt.registerTask('ppush', ['targethtml:prod', 'jekyll:prod', 'cdn', 'manifest', 'sftp-deploy:production', 'targethtml:dev', 'jekyll:dev']);
};
