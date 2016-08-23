var paths = require('./config').paths;

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var wrap = require("gulp-wrap");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var rename = require("gulp-rename");
var filter = require('gulp-filter');
var gutil = require('gulp-util');
var ngAnnotate = require('gulp-ng-annotate');



exports.getDevSrc = function (srcs) {
  srcs = srcs || paths.scripts;

  return function dev() {
    return gulp.src(srcs, {base: paths.src})
      .pipe(wrap('(function(){"use strict";<%= contents %>}());'))
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(gulp.dest(paths.dest))
      .on('end', function() {
        gutil.log(gutil.colors.green('✔ JS Dev'), 'Finished');
      });
  };
}


exports.getDevApp = function (srcs) {
  srcs = srcs || paths.appScripts;

  return function dev() {
    return gulp.src(srcs, {base: paths.app})
      .pipe(wrap('(function(){"use strict";<%= contents %>}());'))
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(gulp.dest(paths.dest))
      .on('end', function() {
        gutil.log(gutil.colors.green('✔ JS Dev'), 'Finished');
      });
  };
}


exports.release = function () {
  return gulp.src(paths.scripts)
    .pipe(wrap('(function(){"use strict";<%= contents %>}());'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('angular-material-event-calendar.js'))
    .pipe(stripDebug())
    .pipe(ngAnnotate())
    .pipe(gulp.dest(paths.build))
    .pipe(uglify())
    .pipe(rename('angular-material-event-calendar.min.js'))
    .pipe(gulp.dest(paths.build))
    .on('end', function() {
      gutil.log(gutil.colors.green('✔ JS build'), 'Finished');
    });
}
