var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('sass', function(){
   return gulp.src('Style/**/*.css')
	.pipe(sass())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/css'))
});

gulp.task('js',function(){
	return gulp.src(['js/*.js']) 
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch task: watch SCSS and JS files for changes
gulp.task('watch', function(){
    gulp.watch('Style/*.css', gulp.series('sass'));
    gulp.watch('js/*.js', gulp.series('js'));    
});

// Default task
gulp.task('default', gulp.series('sass', 'js', 'watch'));