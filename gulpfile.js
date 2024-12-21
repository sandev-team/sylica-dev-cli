import gulp from 'gulp';
import shell from 'gulp-shell';

// adjust to your path
gulp.task('copy-templates', shell.task('cp -R src/templates dist'));

gulp.task('default', gulp.series('copy-templates'));