
var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var webpack = require('webpack');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');

gulp.task('clean', function() {
 return gulp.src([ 'dist' ], { read: false })
   .pipe(rimraf({ force: true }));
});

gulp.task('html', function () {
  return gulp.src('src/server/templates/*.handlebars')
    .pipe(gulp.dest('dist/server/templates'));
});

gulp.task('scss', function () {
  return gulp.src('./src/browser/style/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets'))
    .pipe(livereload());
});

gulp.task('webpack', function (callback) {
  webpack(require('./webpack.config'), function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err);
    callback();
  });
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/browser/style/*.scss', ['scss']);
});

gulp.task('babel', function (options, a, b) {
  return gulp.src(['src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function() {
  runSequence('clean', [ 'html', 'scss', 'babel' ], 'webpack');
});
