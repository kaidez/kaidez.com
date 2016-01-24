module.exports = function( grunt ) {

  // Project config
  grunt.initConfig({
    pkg: grunt.file.readJSON( "package.json" ),

    // start "bowercopy" task
    bowercopy: {

      /*
       * Don't send messages to saying that Bower components aren't
       * configured...ignore them instead. Also, don't run any bower
       * tasks when grunt runs this task.
       */
      options: {
        ignore: [ "gulp", "jquery" ],
        runBower: false
      },

      // Copy Bootstrap CSS over
      bscss: {

        // copy to the "css-build" directory
        options: {
          destPrefix: "css-build/"
        },
        files: {
          "css-build/bootstrap.css": "bootstrap/dist/css/bootstrap.css"
        }
      }, // end "bowercopy:bscss" task

      matchmedia : {

        // copy to the themes "js/libs/" directory
        options: {
          destPrefix: "wp-content/themes/kaidez-swiss/js/libs/"
        },

        files: {
          "wp-content/themes/kaidez-swiss/js/libs/matchMedia.js": "matchMedia/matchMedia.js",
          "wp-content/themes/kaidez-swiss/js/libs/matchMedia.addListener.js": "matchMedia/matchMedia.addListener.js"
        }
      },

      // Copy PrismJS over
      prism: {

        // copy to the theme's "js/libs" directory
        options: {
          destPrefix: "webpack/config/"
        },
        files: {
          "prism.js": "prism/prism.js"
        }
      }, // end "bowercopy:bscss" task

      // Copy Font Awesome CSS
      bsfa: {

        // copy to the "css-build" directory
        options: {
          destPrefix: "css-build/"
        },
        files: {
          "font-awesome.css": "font-awesome/css/font-awesome.css"
        }
      }, // end "bowercopy:bsfa" task

      // Copy Font Awesome CSS
      bsfafont: {

        // copy to "wp-content/themes/fonts/"
        options: {
          destPrefix: "wp-content/themes/fonts/"
        },
        files: {
          "fontawesome-webfont.eot": "fontawesome/fonts/fontawesome-webfont.eot",

          "fontawesome-webfont.svg": "fontawesome/fonts/fontawesome-webfont.svg",

          "fontawesome-webfont.ttf": "fontawesome/fonts/fontawesome-webfont.ttf",

          "fontawesome-webfont.woff": "fontawesome/fonts/fontawesome-webfont.woff",

          "fontawesome-webfont.woff2": "fontawesome/fonts/fontawesome-webfont.woff2",

           "fontawesome-webfont.otf": "fontawesome/fonts/fontawesome-webfont.otf"
        }
      }, // end "bowercopy:bsfafont" task

      placeholder : {

        // copy to the themes "js/vendor/" directory
        options: {
          destPrefix: "wp-content/themes/kaidez-swiss/js/vendor/"
        },

        files: {
          "placeholders.min.js": "placeholders/dist/placeholders.min.js"
        }

      } // end "bowercopy:placeholder" task

    } // end "bowercopy" task

  });

  grunt.loadNpmTasks( "grunt-bowercopy" );

};