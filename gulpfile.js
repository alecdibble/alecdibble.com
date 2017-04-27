var gulp = require('gulp'),
  util = require('gulp-util'),
  gConcat = require('gulp-concat'),
  gJade = require('gulp-jade'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  revAll = require('gulp-rev-all');

var browser_synced = false;

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

gulp.task('compile-sass', function(cb){

  var compile = gulp.src('dev/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gConcat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css/'));

  if(browser_synced){
    compile.pipe(browserSync.reload({stream:true}));
  }
  else {
    return compile
  }
});


gulp.task('copy-js', ['compile-sass'], function(cb){
  return gulp.src(['dev/js/deps/*.js', 'dev/js/*.js'])
  .pipe(gConcat('site.js'))
  .pipe(gulp.dest('dist/js/'));
});

gulp.task('copy-fonts', function(){
  return gulp.src('dev/webfonts/**/*').pipe(gulp.dest('dist/webfonts/'));
});


gulp.task('copy-img', ['copy-js'], function(cb){
  return gulp.src('dev/img/**/*').pipe(gulp.dest('dist/img/'));
});

gulp.task('compile-jade', ['copy-img'], function(cb){
  return gulp.src(['dev/jade/**/*.jade'])
    .pipe(gJade({
      pretty: true,
      basedir: 'dev/jade/'
    }).on('error', util.log))
    .pipe(gulp.dest('dist/'));
});

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: "./dist/"
    }
  });
  browser_synced = true;
});

gulp.task('bs-reload', function(){
  browserSync.reload();
});

gulp.task('revision', ['compile-jade'], function() {
  gulp.src('dist/**')
    .pipe(revAll.revision({ dontRenameFile: [/^\/favicon.ico$/g, '.html'] }))
    .pipe(gulp.dest('dist/'));
});


gulp.task('watch-sass', function(){ gulp.watch('dev/sass/**/*.scss', ['compile-sass'])});
gulp.task('watch-js', function(){ gulp.watch('dev/js/**/*.js', ['copy-js']) });
gulp.task('watch-img', function(){ gulp.watch('dev/img/**/*', ['copy-img']) });
gulp.task('watch-jade', function(){ gulp.watch('dev/jade/**/*.jade', ['compile-jade']) });
gulp.task('watch-dist', function(){ gulp.watch('dist/**/!(*.css)', ['bs-reload']) });




gulp.task('watch', ['browser-sync', 'watch-sass', 'watch-js', 'watch-img', 'watch-jade', 'watch-dist']);
gulp.task('default', ['compile-jade','compile-sass', 'copy-js', 'copy-img', 'copy-fonts', 'revision']);