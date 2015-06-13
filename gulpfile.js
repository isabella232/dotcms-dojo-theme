var gulp = require('gulp');
var compass = require('gulp-compass');
var connect = require('gulp-connect');

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('compass', function() {
  gulp.src('scss/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'css',
      sass: 'scss'
    }))
    .pipe(connect.reload());
});

gulp.task('reload', function() {
  gulp.src('*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss',['compass']);
  gulp.watch('*.html',['reload']);
});

gulp.task('default', ['compass', 'webserver', 'watch']);