var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var bundler = watchify(
  browserify('./scripts/main.js', watchify.args)
  .transform(babel.configure({ stage: 0 }))
);

function bundle() {
  return bundler.bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({ stream: true, once: true }));
}

function watch() {
  bundle();
  bundler.on('update', bundle);
};

function compile() { bundle(); }

gulp.task('js:compile', compile);

gulp.task('js:watch', watch);

gulp.task('stylus', function() {
  gulp.src('./styles/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('watch', function() {
  gulp.watch('./styles/*', ['stylus']);
  gulp.watch('./index.html', function(e) {
    gulp.src(e.path)
      .pipe(browserSync.reload({ stream: true, once: true }));
  });
  gulp.watch('./scripts/*', function(e) {
    gulp.src(e.path)
      .pipe(browserSync.reload({ stream: true, once: true }));
  });
});

gulp.task('browserSync', function() {
  browserSync({
    server: '.',
    port: 5000
  })
})


gulp.task('default',  ['js:watch', 'watch', 'stylus', 'browserSync']);
