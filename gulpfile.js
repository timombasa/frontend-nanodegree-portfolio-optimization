// Include gulp
var gulp = require('gulp');
// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var jshint = require('gulp-jshint');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');

// Concatenate and Minify JS 
gulp.task('scripts', function() {
    return gulp.src(['views/js/main.js', 'js/*.js'])
      .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// Minify CSS
gulp.task('styles', function() {
	gulp.src('css/*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest('minCSS'));
});

// Minify HTML
gulp.task('content', function() {
	return gulp.src('index.html')
		.pipe(minifyHTML({
			empty: true,
			quotes: true
		}))
		.pipe(gulp.dest('./build'))
});

// Minify Images
gulp.task('images', function() {
  return gulp.src(['img/*', 'views/images/*'])
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/img'));
});

// Waiting for the world to change #john mayer
gulp.task('watch', function() {
   // Watch .js files
  gulp.watch('js/*.js' + 'views/js/*.js', ['scripts']);
   // Watch .css files
  gulp.watch('css/*.css', ['styles']);
   // Watch image files
  gulp.watch('img/*', ['images']);
 });

 // Default Task
gulp.task('default', ['scripts', 'styles', 'content', 'images', 'watch']);