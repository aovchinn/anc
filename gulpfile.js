var gulp       = require('gulp');
var browserify = require('browserify');
var riotify    = require('riotify');
var source     = require('vinyl-source-stream');

gulp.task('riot', function() {
    browserify('src/js/login.js')
        .transform(riotify)
        .bundle()
        .pipe(source('login.js'))
        .pipe(gulp.dest('public/js/riot/'));
});
