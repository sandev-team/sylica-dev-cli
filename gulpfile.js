const gulp = require('gulp');
const shell = require('gulp-shell');

// adjust to your path
gulp.task('copy-templates', shell.task('cp -R src/templates dist'));

gulp.task('default', gulp.series('copy-templates'));