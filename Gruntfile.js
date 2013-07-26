module.exports = function(grunt) {

  'use strict';

  // Project config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Jekyll builds the site
    jekyll: {
      dev: {
        src: ['.'],
        dest: '_site'
      },
      buildit: {
        src: ['.'],
        dest: '_site',
        lsi: true
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        expand: true,
        cwd: '_site',
        src: ['**/*.html', '*.index.html'],
        dest: '_site/'
      }
    },

    // convert main sass file to a development build of 'styles.css'
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

    // 'cssmin' task
    cssmin: {
      my_target: {
        src: 'grunt/cssSource/styles.css',
        dest: 'css/styles.min.css'
      }
    },

    // 'watch' task
    watch: {
      src: {
        files: ['*.html','**/*.html','!_site/**/*.html','_posts/*.md','grunt/cssSource/*.scss', 'img/*.{png,jpg,jpeg,gif}', 'js/**/*.js'],
        tasks: ['sassbuild','jekyll:dev']
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

    // create a custom 'modernizr' file 
    modernizr: {

      "devFile" : "grunt/modernizr/modernizr-dev.js", //modernizr full build

      // Path to save out the built file.
      "outputFile" : "js/vendor/modernizr.min.js",

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
        "addtest" : false,
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
      "files" : ["../css/styles.min.css"],

      // When parseFiles = true, matchCommunityTests = true will attempt to
      // match user-contributed tests.
      "matchCommunityTests" : false,

      // Have custom Modernizr tests? Add paths to their location here.
      "customTests" : [],

      // Files added here will be excluded when looking for Modernizr refs.
      "excludeFiles" : "Gruntfile.js"
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
  

  // Default task(s)
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('sassbuild', ['sass', 'cssmin']);
  grunt.registerTask('md', ['modernizr']);
  grunt.registerTask('push', ['imagemin','jekyll:buildit', 'htmlmin', 'sftp-deploy']);
};