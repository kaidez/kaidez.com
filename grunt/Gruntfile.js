module.exports = function(grunt) {

  'use strict';

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // 'sass' task
    sass: {
      dist: {
        files: {
          'cssSource/styles.css': 'cssSource/styles.scss'
        }
      }
    },

    // 'cssmin' task
    cssmin: {
      my_target: {
        src: 'cssSource/styles.css',
        dest: '../css/styles.min.css'
      }
    },

    // 'watch' task
    watch: {
      styles :{
        files: 'cssSource/*.scss',
        tasks: ['sassbuild']
      },
      scripts :{
        files: 'jsSrc/*.js',
        tasks: ['jshint','uglify']
      }
    },

    // 'modernizr' task 
    modernizr: {

      "devFile" : "modernizr/modernizr-dev.js", //modernizr full build

      // Path to save out the built file.
      "outputFile" : "../js/vendor/modernizr.min.js",

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
      "files" : ["../css/styles.min.css", "../wp-content/themes/kaidez-2012/scripts/scripts.js"],

      // When parseFiles = true, matchCommunityTests = true will attempt to
      // match user-contributed tests.
      "matchCommunityTests" : false,

      // Have custom Modernizr tests? Add paths to their location here.
      "customTests" : [],

      // Files added here will be excluded when looking for Modernizr refs.
      "excludeFiles" : "Gruntfile.js"
    },

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
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          '../js/vendor/tipuesearch.min.js': ['jsSrc/tipuesearch.js']
        }
      }
    }
  });
  
  // Use 'loadNpmTasks' to enable plugins
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s)
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('sassbuild', ['sass', 'cssmin']);
  grunt.registerTask('cssp', ['sassbuild', 'push']);
  grunt.registerTask('md', ['modernizr']);
  

};