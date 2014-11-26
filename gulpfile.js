var gulp = require('gulp');
var uncss = require('gulp-uncss');
var cssshrink = require('gulp-cssshrink');
var glob = require("glob")

gulp.task('default', function() {
    return gulp.src('_site/css/styles.css')
        .pipe(uncss({
            html: glob.sync('_site/**/*.html')
        }))
        .pipe(gulp.dest('_site/css/kai/'));
});


gulp.task('min', function() {
    gulp.src('_site/css/kai/*.css')
        .pipe(cssshrink())
        .pipe(gulp.dest('_site/css/st.css'));
});
