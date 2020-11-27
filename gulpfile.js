const { src, parallel, series, dest, watch } = require('gulp');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

function buildCss(cb) {
    return src(['./assets/css/bootstrap.min.css', './assets/css/style.css'])
            .pipe(cleanCss({ compatibility: 'ie8' }))
            .pipe(concat('all.min.css'))
            .pipe(dest('./dest/'));

    // cb();
}

function buildJs(cb) {
    return src(['./assets/js/bootstrap.min.js', './assets/js/popper.min.js', './assets/js/app.js'])
            .pipe(uglify())
            .pipe(concat('all.min.js'))
            .pipe(dest('./dest/'));
    // cb();
}

function buildScss(cb) {
    return src('./assets/scss/style.scss')
            .pipe(sass())
            .pipe(cleanCss({ compatibility: 'ie8' }))
            .pipe(dest('./assets/css/'))
}

function watchAll(cb) {
    watch('./assets/scss/**/*.scss', series(buildScss))
    watch('./assets/css/**/*.css', series(buildCss))
    watch('./assets/js/**/*.js', buildJs)
    // cb();
}

function buildAll(cb) {
    series(buildCss, buildJs);
    cb();
}

exports.css = buildCss;
exports.js = buildJs;
exports.scss = buildScss;
exports.watch = watchAll;
exports.build = buildAll;