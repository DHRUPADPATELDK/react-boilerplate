/* eslint-disable */
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const strip = require('gulp-strip-comments');
const uglify = require('gulp-uglify-es').default;
const gzip = require('gulp-gzip');
// const clean = require('gulp-clean');

const src = './dist';

gulp.task('cleanCss', () => {
  return gulp
    .src([`${src}/**/*.css`, `${src}/*.css`])
    .pipe(
      cleanCSS({
        level: {
          1: {
            specialComments: 'none',
          },
        },
      }),
    )
    .pipe(gzip())
    // .pipe(clean())
    .pipe(gulp.dest(src));
})

gulp.task('cleanJs', () => {
  return gulp
    .src([`${src}/**/*.js`, `${src}/*.js`])
    .pipe(uglify())
    .pipe(gzip())
    // .pipe(clean())
    .pipe(gulp.dest(src));
})

gulp.task('stripComments', () => {
  return gulp
    .src([`${src}/**/*.js`, `${src}/*.js`])
    .pipe(strip())
    .pipe(gulp.dest(src));
})

gulp.task('copyFiles', () => {
  return gulp
    .src(['./src/App/Public/images/favicon.ico', './robots.dev.txt', './robots.prod.txt'])
    .pipe(gulp.dest(src));
})

// gulp.task('gzip', () => {
//   return gulp
//     .src([`${src}/**/*.js`, `${src}/**/*.css`])
//     .pipe(gzip())
//     .pipe(gulp.dest(src));
// })


gulp.task('default', gulp.parallel('cleanCss', 'cleanJs', 'copyFiles'));
/* eslint-enable */
