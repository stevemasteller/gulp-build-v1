'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat');

gulp.task("concatScripts", function() {
	gulp.src([
		'js/circle/autogrow.js',
		'js/circle/circle.js'])
	.pipe(concat('global.js'))
	.pipe(gulp.dest('js'));
});

gulp.task('default', ['hello'], function() {
	console.log('This is the default task.');
});