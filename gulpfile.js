var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('scss', function() {
  gulp.src('scss/**/*.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./css/'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss',['scss']);
});

gulp.task('default', ['scss', 'webserver', 'watch']);