const path = require('path')
let index = async (ctx, next) => {
  ctx.render('hello.html', {'name': 'f1321'})
}

let signin = async (ctx, next) => {
  // let oldpath = ctx.request.files.file.path
  console.log(path.basename('../lib/file.js'))
  ctx.render('hello.html', {'name': 'da'})
}

module.exports = {
  'GET /': index,
  'POST /signin': signin
}
