var gulp = require('gulp');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var cors = require('cors');

var dotcmsBaseUrl = '/Users/fmontes/dev/dotcms/';

var dotcms = {
    core : {
        base: dotcmsBaseUrl + 'core/',
        css: 'dotCMS/src/main/webapp/html/css/dijit-dotcms'
    },
    tomcat: {
        base: dotcmsBaseUrl + 'tomcat8/',
        css: 'webapps/ROOT/html/css/dijit-dotcms'
    }
};

gulp.task('webserver', function () {
    connect.server({
        livereload: true,
        port: 9000,
        middleware: function () {
            return [cors()];
        }
    });
});

gulp.task('compass', function () {
    gulp.src('scss/**/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'css',
            sass: 'scss',
            sourcemap: true,
            style: 'expanded'
        }))
        .on('error', function (err) {})
        .pipe(connect.reload());
});

gulp.task('reload', function () {
    gulp.src('*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('scss/**/*.scss', ['compass']);
    gulp.watch('*.html', ['reload']);
});

gulp.task('deploy', function () {
    gulp.src('scss/dotcms.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'css',
            sass: 'scss',
            sourcemap: false,
            style: 'compressed'
        }))
        .pipe(gulp.dest(dotcms.core.base + dotcms.core.css));
});

gulp.task('watch-dotcms', function () {
    gulp.watch('scss/**/*.scss', function () {
        gulp.start('compass', function () {
            gulp.src('css/dotcms.css')
                .pipe(gulp.dest(dotcms.tomcat.base + dotcms.tomcat.css));
        });
    });
});

gulp.task('dev', ['compass', 'webserver', 'watch-dotcms']);

gulp.task('default', ['compass', 'webserver', 'watch']);
