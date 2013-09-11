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
      buildit: { // build the site using 'lsi' to create similar posts content
        src: ['.'],
        dest: '_site',
        lsi: true
      }
    },

    // minify all .html files in the '_site' directory. only runs when 'grunt push' is called
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        expand: true,
        cwd: '_site',
        src: ['**/*.html', '*.index.html'],
        dest: '_site'
      }
    },

    // convert main sass file to a development build of 'css/styles.css'
    sass: {
      dist: {
        files: {
          'grunt/cssSource/styles.css': 'grunt/cssSource/styles.scss'
        },
        options: {
          style: 'expanded'
        }
      }
    },

    // minify 'css/styles.css & move it to the '_site' folder
    cssmin: {
      my_target: {
        src: 'grunt/cssSource/styles.css',
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
      pageOnlyTask: { // run 'jekyll build' on .html, .md, .php & .xml file changes globally...EXCEPT the '_site' directory
        files: ['*.html','**/*.html','!_site/**/*.html','email.php', '_posts/*.md', 'feed.xml'],
        tasks: ['jekyll:dev']
      },
      jsOnlyTask: { // run 'jekyll build' on .js file changes
        files: ['jsBuildOut/*.js'],
        tasks: ['require', 'jekyll:dev']
      },
      cssOnlyTask: { // run 'jekyll build' on .scss/.css file changes
        files: ['grunt/cssSource/*.scss'],
        tasks: ['sassbuild', 'jekyll:dev']
      },
      imgOnlyTask: { // run 'jekyll build' when the 'img/' directory changes
        files: ['img/*.{png,jpg,jpeg,gif}'],
        tasks: ['imagemin', 'jekyll:dev']
      }
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
      "files" : ["css/styles.min.css","js/*.js","js/**/*.js"],

      // When parseFiles = true, matchCommunityTests = true will attempt to
      // match user-contributed tests.
      "matchCommunityTests" : false,

      // Have custom Modernizr tests? Add paths to their location here.
      "customTests" : [],

      // Files added here will be excluded when looking for Modernizr refs.
      "excludeFiles" : "Gruntfile.js"
    },
    
    // properties to be loaded into the application cache (manifest.appcache) file.  they load in via a template in the 'manifest task'
    site_files: [
      'js/*.js',
      'js/libs/*.js'
    ],

    // create application cache (manifest.appcache) file for the whole site
    manifest: {
      generate: {
        options: {
          basePath: '_site/',
          cache: [
            'index.html',
            'search.html',
            'search.json',
            'css/styles.min.css',
            'img/profilepic.jpg',
            'img/footer-bg.png',
            'img/kaidez-sprite.png',
            'img/kaidez-sprite@2x.png',
            'font/FontAwesome.otf',
            'font/fontawesome-webfont.eot',
            'font/fontawesome-webfont.svg',
            'font/fontawesome-webfont.ttf',
            'font/fontawesome-webfont.woff'
          ],
          network: ['*'],
          preferOnline: true,
          verbose: true,
          timestamp: true
        },
        src: '<%= site_files %>',
        dest: 'manifest.appcache'
      }
    },
    
    // automagically concate/minify site jS based on RequireJS settings
    requirejs: {
      compile: {
        options: {
          baseUrl: "jsBuildOut/",
          mainConfigFile: "jsBuildOut/config.js",
          name: 'config',
          out: "js/main.min.js",
           preserveLicenseComments: false,
             paths: {
              requireLib: 'require'
            },
            include: 'requireLib'
          }
        }
      },

    // 'jshint' task
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      all: ['Gruntfile.js', 'package.json']
    },
    
    // deploy to dev site
   'sftp-deploy': {
    build: {
      auth: {
        host: 's46798.gridserver.com',
        port: 22,
        authKey: 'key1'
      },
      src: '_site',
      dest: '/nfs/c02/h08/mnt/46798/domains/dev.kaidez.com/html'
      }
    }
  });
  
  // Use 'loadNpmTasks' to enable plugins
  grunt.loadNpmTasks('grunt-css');
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


  // Default task(s)
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('sassbuild', ['sass', 'cssmin']);
  grunt.registerTask('md', ['modernizr']);
  grunt.registerTask('require', ['requirejs']);
  grunt.registerTask('push', ['jekyll:buildit', 'htmlmin', 'manifest', 'sftp-deploy']);

};