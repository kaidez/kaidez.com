// Single var pattern of gulp (require) stuff in full effect!!!

var gulp = require("gulp"), // "require" gulp
    uncss = require("gulp-uncss"), // Remove unused css selectors
    minifyCSS = require("gulp-minify-css"), // Minify CSS
    concatCss = require("gulp-concat-css"), // Concatenate CSS only
    csslint = require("gulp-csslint"), // Lint CSS
    watch = require("gulp-watch"), // Watch files changes
    imagemin = require('gulp-imagemin'), // Minifying images
    autoprefixer = require('gulp-autoprefixer'),
    exec = require('child_process').exec, // Run CLI commands via node
    Q = require('q'); // Manage promises,;

// End single var pattern

// Needed to run grunt tasks through gulp
require("gulp-grunt")(gulp);

/*
 *  ===================================================================
 *  | STORE PREPROCESSOR FILE REFERENCES IN VARIABLES |
 *  ===================================================================
 */
var lessFiles = ["css-build/*.less", "css-build/**/*.less"], // LESS
    coffeeFiles = ["coffee/*.coffee"]; // Coffeescript

    /*
     * IGNORE ARRAY
     * ============
     * Selectors NOT to be removed when "gulp uncss" task runs.
     * Try to list them alphabetically and in the following order:
     *
     * 1. Page elements first (<nav>, <aside>, etc.)
     * 2. IDs second
     * 3. Classes third
     */
     ignoreArray = [];



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


gulp.task('buildcss', ['less', 'concat', 'outputcss']);


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
    .pipe(gulp.dest("wp-content/themes/kaidez-swiss/"));
    return deferred.promise;
  }, 1000);
});



gulp.task("outputcss", ['concat'],function () {
  var deferred = Q.defer();
  setTimeout(function() {
    gulp.src(['wp-content/themes/kaidez-swiss/style.css'])
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCSS({
      keepBreaks: true
    }))
    .pipe(gulp.dest("wp-content/themes/kaidez-swiss/"))
    .pipe(csslint({
      "important": false,
      "duplicate-background-images": false,
      "ids": false,
      "text-indent": false
    }))
    return deferred.promise;
    }, 4000);
  });


/*
*  ===================================================================
*  | IMAGE MINIFICATION TASK |
*
*  Take all images in "imagemin/" & minify them out to "build/img/"
*  ===================================================================
*/
gulp.task('images', function () {
  return gulp.src('image-min/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}]
  }))
  .pipe(gulp.dest('build/img'));
});






/*
 *  ===================================================================
 *  | "gulp-grunt" TASKS...RUN GRUNT TASKS VIA GULP!!!! |
 *  ===================================================================
 */

// Run the "grunt coffee" task
gulp.task("coffee", function () {
  gulp.run("grunt-coffee");
});

// BOWERCOPY TASKS
// Copy over ALL the Bower Components!!!
gulp.task("bowercopy", function () {
  gulp.run("grunt-bowercopy");
});

// Copy over Bootstrap core .css only
gulp.task("bowerbscss", function () {
  gulp.run("grunt-bowercopy:bscss");
});

// Copy over jQuery v.1.11.x only
gulp.task("bowerjq", function () {
  gulp.run("grunt-bowercopy:jq");
});

// Copy over Font Awesome's minified CSS file
gulp.task("bowerfa", function () {
  gulp.run("grunt-bowercopy:bsfa");
});

// Copy over Font Awesome's minified CSS file
gulp.task("bsfafont", function () {
  gulp.run("grunt-bowercopy:bsfafont");
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

  // Watch for CSS/JS file changes

  gulp.watch(lessFiles, ["buildcss"]);
  gulp.watch(coffeeFiles, ["coffee"]);
});

// uncss task
gulp.task('test', function() {
  gulp.src('wp-content/themes/kaidez-swiss/style.css')
    .pipe(uncss({
      html: [
        'http://localhost:8888/', // home page
        'http://localhost:8888/404.php' // 404 page
      ]
    }))
    .pipe(gulp.dest('lib/bootstrap/css/'));
});
