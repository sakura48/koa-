'use strict'

const gulp = require('gulp')
const browserSync = require('browser-sync')
const nodemon = require('gulp-nodemon')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const minifyCss = require('gulp-minify-css')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const webpack = require('gulp-webpack')

gulp.task('default', ['browser-sync'], function () {
})

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
    proxy: 'http://localhost:3000', // 注意这里要换成你在koa中设定的 服务端口一般是3000
    files: ['static/**/*.*', 'controller/*.js', 'view/*.html'],
    logLevel: 'debug',
    logPrefix: 'mykoa',
    browser: ['chrome'],
    port: 7000,
  })
})
gulp.task('nodemon', ['watch'], function (cb) {
  let started = false
  return nodemon({
    script: 'app.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb()
      started = true
    }
  })
})
gulp.task('sass', function (cb) {
  gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
  cb()
})
gulp.task('mincss', function (cb) {
  gulp.src('./src/css/*.css')
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCss())
    .pipe(gulp.dest('./static/css'))
  cb()
})
gulp.task('toes5', function () {
  return gulp.src(!('./static/js/*.min.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./static/js'))
})
gulp.task('min', ['toes5'], function () {
  return gulp.src('./static/js/*.min.js')
    .pipe(webpack(require('./config/webpack.config')))
    .pipe(uglify())
    .pipe(gulp.dest('./static/js'))
})
gulp.task('watch', function (cb) {
  gulp.watch('./src/scss/*.scss', ['sass', 'mincss'])
  gulp.watch('./src/css/*.css', ['mincss'])
  gulp.watch('./src/js/*.js', ['minjs'])
  cb()
})