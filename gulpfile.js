var gulp = require('gulp');
var useref = require('gulp-useref');
var browserSync = require('browser-sync');

gulp.task('useref', function(){
    var assets = useref.assets();

    return gulp.src('*.html')
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
});
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: ''
        }
    });
});
gulp.task('watch', ['browserSync'], function (){
    gulp.watch('css/*.css', browserSync.reload);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/*.js', browserSync.reload);
});