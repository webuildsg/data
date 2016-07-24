var gulp = require('gulp')
var pug = require('gulp-pug')
var pugOptions = {
  pretty: true
}

gulp.task('default', function () {
  gulp.src('./views/index.pug').pipe(pug(pugOptions)).pipe(gulp.dest('./'))
  gulp.src('./views/graphs/**/*.pug').pipe(pug(pugOptions)).pipe(gulp.dest('./dataset'))
})
