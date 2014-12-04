'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

gulp.task('build', function () {
  return gulp.src('./src/_wrapper.js')
    .pipe($.preprocess())
    .pipe($.rename('cash.js'))
    .pipe($.size())
    .pipe($.beautify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify', ['build'], function () {
  return gulp.src(['./dist/cash.js'])
    .pipe($.uglify())
    .pipe($.size())
    .pipe($.rename("cash.min.js"))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('lint', ['build'], function() {
  return gulp.src('./dist/cash.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('default', ['build','minify','lint']);

gulp.task('watch', function () {
    gulp.watch(['src/*.js','test/src/*.js'], ['build','minify','lint']);
});