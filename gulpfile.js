'use strict';

const gulp = require('gulp')
const browserSync = require('browser-sync')
const nodemon = require('gulp-nodemon')


gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000", // 注意这里要换成你在koa中设定的 服务端口一般是3000
    files: ["static/**/*.*","controller/*.js","view/*.html"],
    logLevel: "debug",
    logPrefix:"mykoa",
    browser:['chrome'],
    port: 7000,
  });
});
gulp.task('nodemon', function (cb) {
  let started = false;
  return nodemon({
    script: 'app.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});