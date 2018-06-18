var gulp = require('gulp');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var cors = require('cors');
var argv = require('yargs').argv;
var dotcmsBaseUrl = require('./dotcmsConfig');

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

var coreCssPath = dotcms.core.base + dotcms.core.css;
var tomcatCss = dotcms.tomcat.base + dotcms.tomcat.css;

gulp.task('webserver', function () {
    connect.server({
        livereload: true,
        port: 7000,
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
            style: 'expanded',
            environment: argv.dotcms ? 'production' : 'development'
        }))
        .on('error', function (err) {})
        .on('end', function() {
            if (argv.dotcms) {
                gulp.src('css/dotcms.css')
                    .pipe(gulp.dest(coreCssPath));
            }
        })
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
            style: 'expanded'
        }))
        .pipe(gulp.dest(coreCssPath));
});

gulp.task('default', ['compass', 'webserver', 'watch']);
