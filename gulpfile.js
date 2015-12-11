var gulp = require('gulp')
var jade = require('gulp-jade')
var jadeOptions = {
  pretty: true
}

gulp.task('default', function () {
  gulp.src('./views/index.jade').pipe(jade(jadeOptions)).pipe(gulp.dest('./'))
  gulp.src('./views/graphs/**/*.jade').pipe(jade(jadeOptions)).pipe(gulp.dest('./dataset'))
})
