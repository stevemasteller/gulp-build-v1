/**********************************************************
*
*  gulpfile.js
*
* Implements a gulp build for development and deployment. 
* The process does the following:
*	- Concatenates and minifies the JavaScript files.
*	- Compiles SCSS into CSS, concatenates and minifies.
*	- Generates JavaScript and CSS source maps.
*	- Compresses JPEG and PNG files.
* Output for development is in the home directory structure 
* gulp-build-v1. Output for deployment or distribution is 
* in the dist folder at gulp-buil-v1/dist.
*
* Author: Steve Masteller
*
************************************************************/
'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),		// concatenate files
  uglify = require('gulp-uglify'),		// minify JavaScript
  rename = require('gulp-rename'),		// rename a file
    sass = require('gulp-sass'),		// compile SAss
 cssnano = require('gulp-cssnano'),		// minify CSS
	maps = require('gulp-sourcemaps'),	// create source maps
imagemin = require('gulp-imagemin'),	// minify images
	 del = require('del'),				// delete directories and files
  useref = require('gulp-useref'),		// replace css and js references in html
  eslint = require('gulp-eslint');		// lint

// Concatenate the .js sources into a single file
// map it, and put it in js/global.js. js/global.js 
// is used for development.
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

// Lint global.js, minify it and store the result
// in dist/scripts/all.min.js.  all.min.js is used
// for deployment.
gulp.task('scripts', ['concatScripts'], function() {
	return gulp.src(['js/global.js'])
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError())
	.pipe(uglify())
	.pipe(rename('all.min.js'))
	.pipe(gulp.dest('dist/scripts'));
});

// Compile sass/global.scss, map it, and write the
// result to css/global.css.  global.css is used for
// development. 
gulp.task('compileSass', function() {
	return gulp.src(['sass/global.scss'])
	.pipe(maps.init())
	.pipe(sass())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('css'));
});

// Minify css/global.css, and write the result to
// dist/styles/all.min.css.  all.min.css is used for
// deployment.
gulp.task('styles', ['compileSass'], function() {
	return gulp.src(['css/global.css'])
	.pipe(cssnano())
	.pipe(rename('all.min.css'))
	.pipe(gulp.dest('dist/styles'));
});

// Minify the images in images/* and write the 
// results to dist/images/*.  These minified images
// are used for deployment.
gulp.task('images', function() {
	return gulp.src('images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/images'));
});

// Take the index.html file used for development and
// replace the .css and .js file calls with the versions 
// used for deployment. Store the resulting index.html file
// in the dist folder.
gulp.task('html', ['scripts', 'styles'], function() {
	return gulp.src('index.html')
	.pipe(useref())
	.pipe(gulp.dest('dist'));
});

// Remove all generated files and folders.
gulp.task('clean', function() {
	return del([
		'dist',
		'css',
		'js/global.js*']);
});

// Recompiles sass and js files when they change.
gulp.task('watchFiles', function() {
  gulp.watch(['sass/*.scss', 'sass/**/*.sass'], ['styles']);	
  gulp.watch(['js/circle/*.js'], ['scripts']);
});

// full build for development and deployment
gulp.task('build', ['clean'], function() {
	return gulp.start(['html', 'images']);
});

// serves watchFiles when a local server is
// running like:
// 		http-server -p 3000
gulp.task('serve', ['watchFiles'])

// defualts 'gulp build' to just 'gulp'
gulp.task('default', ['build']);