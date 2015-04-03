module.exports = function(grunt) {

  // Project config
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // start "bowercopy" task
    bowercopy: {

      /*
       * don"t send messages to saying that Bower components aren"t
       * configured...ignore them instead. Also, don"t run any bower
       * tasks when grunt runs this task.
       */
      options: {
        ignore: ["gulp", "jquery"],
        runBower: false
      },

      // Copy Bootstrap CCS over
      bscss: {

        // copy to the "css-build" directory
        options: {
          destPrefix: "css-build/"
        },
        files: {
          "bootstrap.css": "bootstrap/dist/css/bootstrap.css"
        }
      }, // end "bowercopy:bscss" task

      // Copy jQuery over
      jq: {

        // copy to the "css-build" directory
        options: {
          destPrefix: "build/js/libs/"
        },
        files: {
          "jquery.min.js": "jquery/dist/jquery.min.js"
        }
      } // end "bowercopy:jq" task
    }, // end "bowercopy" task

    // start "coffee" task
    coffee: {
      compile: {
        options: {
          bare: true
        },
        files: {
          // compile & concat .coffee files to a single file called
          // "build/js/main.js"
          "build/js/main.js": ["coffee/main.coffee"]
        }
      }
    } // end "coffee" task
  });

  grunt.loadNpmTasks("grunt-bowercopy");
  grunt.loadNpmTasks("grunt-contrib-coffee");

};
