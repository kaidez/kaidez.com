// Single var pattern of gulp (require) stuff in full effect!!!

var gulp = require("gulp"), // "require" gulp
    uncss = require('gulp-uncss'), // Remove unused css selectors
    minifyCSS = require("gulp-minify-css"), // Minify CSS
    csslint = require("gulp-csslint"), // Lint CSS,
    concatCss = require("gulp-concat-css"), // Concatenate CSS only
    watch = require("gulp-watch"), // Watch files changes
    imagemin = require('gulp-imagemin'), // Minifying images
    exec = require('child_process').exec, // Run CLI commands via node
    Q = require('q'), // Manage promises;
    cp = require( "cp" ); // Copy files over

// End single var pattern

// Needed to run grunt tasks through gulp
require("gulp-grunt")(gulp);

/*
 *  ===================================================================
 *  | STORE LESS PREPROCESSOR FILE REFERENCES IN VARIABLES |
 *  ===================================================================
 */
var lessFiles = ["css-build/*.less", "css-build/**/*.less"];

    /*
     * IGNORE ARRAY
     * ============
     * Selectors NOT to be removed when "gulp uncss" task runs.
     * Some are listed via a RegEx,
     *
     * Try to list them alphabetically.
     */
     ignoreArray = [
                      /aside/,
                      /aside-/,
                      ".aside-inner",
                      ".bio-class",
                      ".bio-copy",
                      ".bio-image",
                      /demo-link/,
                      ".entry-title-small",
                      '.fa-facebook',
                      '.fa-google-plus',
                      '.fa-github',
                      '.fa-twitter',
                      '.fa-youtube',
                      /guide-link/,
                      /hide-/,
                      /jump-to-top/,
                      /footer-/,
                      ".row .aside-inner",
                      ".row",
                      /show-/,
                      ".col-md-4",
                      ".col-md-6",
                      /search-/,
                      ".site-footer",
                      '.showMobileMenu',
                      '.hideMobileMenu',
                      '.showSearchbox',
                      /post-pic/,
                      '.hideSearchbox',
                      '.entry-header > span'
                    ];



/*
 *  ===================================================================
 *  | CSS BUILD TASK |
 *
 * Running "gulp buildcss" performs the following sequence of tasks...
 *
 * 1. Runs the "gulp less" task that"s passed as a "hint"(*)
 * 2. Concatenate selected .css files listed in "gulp.src"
 * 3. Remove unused CSS
 * 4. Minify CSS
 * 5. Lint CSS
 *
 * (*) gulp "hints" are cool...read more about them at:
 * https://github.com/gulpjs/gulp/blob/master/docs/API.md
 *  ===================================================================
 */


gulp.task('buildcss', ['less', 'concat', 'outputcss', 'uncss' ]);


// "gulp less" task
// ================
// Process .less files using node exec
// Returns a promise with q
gulp.task("less", function () {
  var deferred = Q.defer();
  setTimeout(function() {
    exec("lessc css-build/style.less > css-build/style.css");
    return deferred.promise;
  }, 1000);
});



// "gulp concat" task
// ==================
// Concatenate "css-build/styles.css" and "css-build/bootstrap.css"
// Takes "less" as a gulp hint
// Returns a promise with q
gulp.task('concat', ['less'], function() {
  var deferred = Q.defer();
  setTimeout(function() {
    return gulp.src(['css-build/wp-comment-block.css', 'css-build/font-awesome.css', 'css-build/bootstrap.css','css-build/style.css'])
    .pipe(concatCss('style.css'))
    .pipe(gulp.dest("css-build/"));
    return deferred.promise;
  }, 1000);
});



gulp.task("outputcss", ['concat'],function () {
  var deferred = Q.defer();
  setTimeout(function() {
    gulp.src(['css-build/style.css'])
    .pipe(csslint({
      "important": false,
      "duplicate-background-images": false,
      "ids": false,
      "text-indent": false
    }))
    .pipe(gulp.dest("css-build/"))
    return deferred.promise;
    }, 4000);
  })

gulp.task("uncss", ['outputcss'], function(){
  gulp.src("css-build/style.css")
    .pipe(uncss({
      html: [
        "http:\/\/localhost:8888\/", // home page
        "http:\/\/localhost:8888\/tutorial-filter-content-with-jquery-filter-jquery-selectors/", // A single post page
        "http://localhost:8888/html5-project-series-1-homepage-wireframe/", // May be removed
        "http:\/\/localhost:8888\/personal/", // A category page
        "http:\/\/localhost:8888\/blog/", // The blog page
        "http://localhost:8888/nyc-social-media-week-event-recap-social-listening/",
        "http:\/\/localhost:8888\/kdz-build-tool/",
        "http:\/\/localhost:8888\/affiliate-disclaimer/", // Affiliate
        "http:\/\/localhost:8888\/404.php", // 404 page
        "http:\/\/localhost:8888\/site-map/", // Site map
        "http:\/\/localhost:8888\/write-code-every-f-king-day/"
      ],
      ignore: ignoreArray
    }))
    .pipe(minifyCSS({
      keepBreaks: true
    }))
    .pipe(gulp.dest("wp-content/themes/kaidez-swiss/"));

  });

// Copy q.js from "node_modules" to the kaidez-swiss theme
gulp.task("cpq", function(){
  cp.sync( "node_modules/q/q.js", "wp-content/themes/kaidez-swiss/js/libs/q.js" );
  });
/*
*  ===================================================================
*  | IMAGE MINIFICATION TASK |
*
*  Take all images in "image-min/" & minify them out to the theme
*  ===================================================================
*/
gulp.task('images', function () {
  return gulp.src('image-min/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}]
  }))
  .pipe(gulp.dest('wp-content/themes/kaidez-swiss/img'));
});






/*
 *  ===================================================================
 *  | "gulp-grunt" TASKS...RUN GRUNT TASKS VIA GULP!!!! |
 *  ===================================================================
 */


// BOWERCOPY TASKS
// Copy over ALL the Bower Components!!!
gulp.task("bowercopy", function () {
  gulp.run("grunt-bowercopy");
});

// Copy over Bootstrap core .css only
gulp.task("bowerbscss", function () {
  gulp.run("grunt-bowercopy:bscss");
});

// Copy over Font Awesome's minified CSS file
gulp.task("bowerfa", function () {
  gulp.run("grunt-bowercopy:bsfa");
});

// Copy over Font Awesome's minified CSS file
gulp.task("bsfafont", function () {
  gulp.run("grunt-bowercopy:bsfafont");
});

// Copy over matchMedia files only
gulp.task("match", function () {
  gulp.run("grunt-bowercopy:matchmedia");
});

// Copy over prism.js only
gulp.task("prism", function () {
  gulp.run("grunt-bowercopy:prism");
});

// Copy over placeholders.js only
gulp.task("placeholder", function () {
  gulp.run("grunt-bowercopy:placeholder");
});


/*
 *  ===================================================================
 *  | START WATCH TASK |
 *
 *  Be careful of watching a lot of files because that may eat up
 *  computer memory...at least, it does in Grunt.
 *  ===================================================================
 */


gulp.task("default", function () {

  // Watch for CSS file changes

  gulp.watch(lessFiles, ["uncss"]);

});
