var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');

gulp.task('stylus', function() {
  gulp.src('./styles/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('scripts', function() {
  gulp.src('./scripts/main.js')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('watch', function() {
  gulp.watch('./styles/*', ['stylus']);
  gulp.watch('./index.html', function(e) {
    gulp.src(e.path)
      .pipe(browserSync.reload({ stream: true, once: true }));
  });
  gulp.watch('./scripts/*', ['scripts']);
});

gulp.task('browserSync', function() {
  browserSync({
    server: '.',
    port: 5000
  })
})


gulp.task('default',  ['watch', 'stylus', 'scripts', 'browserSync']);