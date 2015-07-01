var gulp = require('gulp');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var cors = require('cors');

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    port: 3000,
    middleware: function() {
      return [cors()];
    }
  });
});

gulp.task('compass', function() {
  gulp.src('scss/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'css',
      sass: 'scss'
    }))
    .on('error', function(err) {})
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