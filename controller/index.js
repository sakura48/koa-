const path = require('path')
let index = async (ctx, next) => {
  ctx.render('hello.html', {'name': '123'})
}

let signin = async (ctx, next) => {
  // let oldpath = ctx.request.files.file.path
  console.log(path.basename('../lib/file.js'))
  ctx.render('hello.html', {'name': '123'})
}

module.exports = {
  'GET /': index,
  'POST /signin': signin
}
