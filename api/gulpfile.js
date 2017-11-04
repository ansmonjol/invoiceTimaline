var gulp = require('gulp');
var notify = require('gulp-notify');
var eslint = require('gulp-eslint');

var scripts = ['src/**/*.js'];

gulp.task('lint', function() {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    gulp.src(scripts)
      // eslint() attaches the lint output to the "eslint" property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format('stylish'))
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe(eslint.failAfterError())

      // .pipe(gulp.dest('built'))
      .on("error", notify.onError("<%= error.message %>"));
});

gulp.task('default', []);
