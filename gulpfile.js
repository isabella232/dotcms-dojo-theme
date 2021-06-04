var argv = require('yargs').argv;
var connect = require('gulp-connect');
var cors = require('cors');
var dotcmsBaseUrl = require('./dotcmsConfig');
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var dotcms = {
    core: {
        base: dotcmsBaseUrl + 'core/',
        css: 'dotCMS/src/main/webapp/html/css/dijit-dotcms'
    },
    tomcat: {
        base: dotcmsBaseUrl + 'tomcat9/',
        css: 'webapps/ROOT/html/css/dijit-dotcms'
    }
};

var coreCssPath = dotcms.core.base + dotcms.core.css;
var tomcatCss = dotcms.tomcat.base + dotcms.tomcat.css;

gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        port: 7000,
        middleware: function() {
            return [cors()];
        }
    });
});

gulp.task('reload', function() {
    gulp.src('*.html').pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('*.html', ['reload']);
});

gulp.task('deploy', function() {
    gulp.src('scss/dotcms.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest(coreCssPath));
});

gulp.task('sass', function() {
    return gulp
        .src('scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload())
        .on('end', function() {
            if (argv.dotcms) {
                gulp.src('css/dotcms.css').pipe(gulp.dest(coreCssPath));
            }
        });
});

gulp.task('default', ['sass', 'webserver', 'watch']);
