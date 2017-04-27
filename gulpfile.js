var gulp = require('gulp'),
  util = require('gulp-util'),
  gConcat = require('gulp-concat'),
  gJade = require('gulp-jade'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps');

var browser_synced = false;

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%']
};

gulp.task('compile-sass', function(){

  var compile = gulp.src('dev/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gConcat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css/'));

  if(browser_synced){
    compile.pipe(browserSync.reload({stream:true}));
  }

});


gulp.task('copy-js', function(){
  gulp.src('dev/js/**/*.js').pipe(gulp.dest('dist/js/'));
});

gulp.task('copy-fonts', function(){
  gulp.src('dev/webfonts/**/*').pipe(gulp.dest('dist/webfonts/'));
});


gulp.task('copy-img', function(){
  gulp.src('dev/img/**/*').pipe(gulp.dest('dist/img/'));
});

gulp.task('compile-jade', function(){
  gulp.src(['dev/jade/*.jade'])
    .pipe(gJade({
      pretty: true
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


gulp.task('watch-sass', function(){ gulp.watch('dev/sass/**/*.scss', ['compile-sass'])});
gulp.task('watch-js', function(){ gulp.watch('dev/js/**/*.js', ['copy-js']) });
gulp.task('watch-img', function(){ gulp.watch('dev/img/**/*', ['copy-img']) });
gulp.task('watch-jade', function(){ gulp.watch('dev/jade/**/*.jade', ['compile-jade']) });
gulp.task('watch-dist', function(){ gulp.watch('dist/**/!(*.css)', ['bs-reload']) });




gulp.task('watch', ['browser-sync', 'watch-sass', 'watch-js', 'watch-img', 'watch-jade', 'watch-dist']);
gulp.task('default', ['compile-jade','compile-sass', 'copy-js', 'copy-img', 'copy-fonts']);