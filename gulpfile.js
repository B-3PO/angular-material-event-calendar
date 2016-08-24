var paths = require('./gulp/config').paths;

var gulp = require('gulp');
var serve = require('gulp-serve');
var gulpSequence = require('gulp-sequence');
var del = require('del');
var bump = require('gulp-bump');
var ngConstant = require('gulp-ng-constant');
var sass = require('gulp-sass');
var through2 = require('through2');
var rename = require('gulp-rename');
var wrap = require('gulp-wrap');
var templateCache = require('gulp-angular-templatecache');
var KarmaServer = require('karma').Server;


var jsBuild = require('./gulp/jsBuild');
var cssBuild = require('./gulp/cssBuild');
var indexBuild = require('./gulp/indexBuild');



gulp.task('jsSrcBuild', jsBuild.getDevSrc());
gulp.task('jsAppBuild', jsBuild.getDevApp());
gulp.task('jsReleaseBuild', jsBuild.release);
gulp.task('cssBuild', cssBuild.getDev());
gulp.task('cssReleaseBuild', cssBuild.release);
gulp.task('indexBuild', indexBuild.inject);



// -- main tasks. use these to watch and build and release

gulp.task('default', gulpSequence('buildLocal', ['serve', 'watch']));
gulp.task('buildLocal', gulpSequence(
  'clean',
  [
    'jsSrcBuild',
    'jsAppBuild',
    'cssBuild',
    'copyPartials',
    'copyIcons',
    'themeToConstant',
    'buildIconCacheDev'
  ],
  'indexBuild'
));

gulp.task('build', gulpSequence('buildIconCache', 'themeToConstantBuild', ['jsReleaseBuild', 'cssReleaseBuild'], 'cleanIconCache', 'cleanThemeConstant'));



gulp.task('themeToConstant', function () {
  return gulp.src(paths.src+'eventCalendar-theme.scss')
    .pipe(sass())
    .pipe(through2.obj(function (file, enc, cb) {
      var config = {
        name: 'material.components.eventCalendar',
        deps: false,
        constants: {
          EVENT_CALENDAR_THEME: file.contents.toString()
        }
      };
      file.contents = new Buffer(JSON.stringify(config), 'utf-8');
      this.push(file);
      cb();
    }))
    .pipe(ngConstant())
    .pipe(wrap('(function(){"use strict";<%= contents %>}());'))
    .pipe(rename('_theme.js'))
    .pipe(gulp.dest(paths.dest+'/js'))
});
gulp.task('themeToConstantBuild', function () {
  return gulp.src(paths.src+'eventCalendar-theme.scss')
    .pipe(sass())
    .pipe(through2.obj(function (file, enc, cb) {
      var config = {
        name: 'material.components.eventCalendar',
        deps: false,
        constants: {
          EVENT_CALENDAR_THEME: file.contents.toString()
        }
      };
      file.contents = new Buffer(JSON.stringify(config), 'utf-8');
      this.push(file);
      cb();
    }))
    .pipe(ngConstant())
    .pipe(rename('_theme.js'))
    .pipe(gulp.dest(paths.src+'/js'))
});
gulp.task('cleanThemeConstant', function () {
  return del(paths.src+'/js/_theme.js');
});



gulp.task('clean', function () {
  return del(paths.dest);
});


gulp.task('copyPartials', function () {
  return gulp.src(paths.partials, {base: paths.app})
    .pipe(gulp.dest(paths.dest));
});

gulp.task('copyIcons', function () {
  return gulp.src(paths.icons, {base: paths.src})
    .pipe(gulp.dest(paths.dest));
});

gulp.task('buildIconCacheDev', function () {
  return gulp.src(paths.icons)
    .pipe(templateCache({module: 'material.components.eventCalendar'}))
    .pipe(gulp.dest(paths.dest));
});
gulp.task('buildIconCache', function () {
  return gulp.src(paths.icons)
    .pipe(templateCache({module: 'material.components.eventCalendar'}))
    .pipe(gulp.dest(paths.src));
});

gulp.task('cleanIconCache', function () {
  return del('src/templates.js');
});

gulp.task('serve', serve({
  root: ['public', 'bower_components'],
  port: 8080
}));



gulp.task('test-karma', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function (errorCode) {
    if (errorCode !== 0) {
      console.log('Karma exited with error code ' + errorCode);
      done();
      return process.exit(errorCode);
    }
    done();
  }).start();
});

gulp.task('test', gulpSequence('build', 'test-karma'));




gulp.task('watch', function () {
  gulp.watch(paths.scripts, function (event) {
    jsBuild.getDevSrc(event.path)()
      .on('end', function () {
        if (event.type !== 'changed') { indexBuild.inject(); }
      });
  });

  gulp.watch(paths.appScripts, function (event) {
    jsBuild.getDevApp(event.path)()
      .on('end', function () {
        if (event.type !== 'changed') { indexBuild.inject(); }
      });
  });


  gulp.watch(paths.css.concat(paths.appCss), function (event) {
    cssBuild.getDev(event.path)()
      .on('end', function () {
        if (event.type !== 'changed') { indexBuild.inject(); }
      });
  });

  gulp.watch('src/eventCalendar-theme.scss', ['themeToConstant']);


  gulp.watch(paths.partials, function (event) {
    return gulp.src(event.path, {base: paths.app})
      .pipe(gulp.dest(paths.dest));
  });
});






gulp.task('major', function(){
  gulp.src(['./bower.json', './package.json'])
  .pipe(bump({type:'major'}))
  .pipe(gulp.dest('./'));
});

gulp.task('minor', function(){
  gulp.src(['./bower.json', './package.json'])
  .pipe(bump({type:'minor'}))
  .pipe(gulp.dest('./'));
});

gulp.task('patch', function(){
  gulp.src(['./bower.json', './package.json'])
  .pipe(bump({type:'patch'}))
  .pipe(gulp.dest('./'));
});

gulp.task('prerelease', function(){
  gulp.src(['./bower.json', './package.json'])
  .pipe(bump({type:'prerelease'}))
  .pipe(gulp.dest('./'));
});
