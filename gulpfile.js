'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
 cssnano = require('gulp-cssnano'),
	maps = require('gulp-sourcemaps'),
imagemin = require('gulp-imagemin'),
	 del = require('del');

gulp.task('concatScripts', function() {
	return gulp.src([
		'js/jquery-3.1.1.js',
		'js/circle/autogrow.js',
		'js/circle/circle.js'])
	.pipe(maps.init())
	.pipe(concat('global.js'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest('js'));
});

gulp.task('scripts', ['concatScripts'], function() {
	gulp.src(['js/global.js'])
	.pipe(uglify())
	.pipe(rename('all.min.js'))
	.pipe(gulp.dest('dist/scripts'));
});

gulp.task('compileSass', function() {
	return gulp.src(['sass/global.scss'])
	.pipe(maps.init())
	.pipe(sass())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('css'));
});

gulp.task('styles', ['compileSass'], function() {
	return gulp.src(['css/global.css'])
	.pipe(cssnano())
	.pipe(rename('all.min.css'))
	.pipe(gulp.dest('dist/styles'));
});

gulp.task('images', function() {
	return gulp.src('images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/content'));
});

gulp.task('clean', function() {
	del([
		'dist',
		'css',
		'js/global.js*']);
});

gulp.task('build', ['scripts', 'styles', 'images'], function() {
	return gulp.src(['index.html'])
	.pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);