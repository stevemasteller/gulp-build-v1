'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
 cssnano = require('gulp-cssnano'),
	maps = require('gulp-sourcemaps');

gulp.task('concatScripts', function() {
	gulp.src([
		'js/jquery-3.1.1.js',
		'js/circle/autogrow.js',
		'js/circle/circle.js'])
	.pipe(concat('global.js'))
	.pipe(gulp.dest('js'));
});

gulp.task('scripts', function() {
	gulp.src(['js/global.js'])
	.pipe(uglify())
	.pipe(rename('all.min.js'))
	.pipe(gulp.dest('dist/scripts'));
});

gulp.task('compileSass', function() {
	gulp.src(['sass/global.scss'])
	.pipe(maps.init())
	.pipe(sass())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('css'));
});

gulp.task('styles', function() {
	gulp.src(['css/global.css'])
	.pipe(cssnano())
	.pipe(rename('all.min.css'))
	.pipe(gulp.dest('dist/styles'));
});

gulp.task('default', ['hello'], function() {
	console.log('This is the default task.');
});