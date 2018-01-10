const fs = require('fs')
const path = require('path')
let addMapping = (router, mapping) => {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      let path = url.substring(4)
      router.get(path, mapping[url])
      console.log(`register URL mapping: GET ${path}`)
    } else if (url.startsWith('POST ')) {
      let path = url.substring(5)
      router.post(path, mapping[url])
      console.log(`register URL mapping: POST ${path}`)
    } else {
      console.log(`invalid URL: ${url}`)
    }
  }
}

let addControllers = (router) => {
  let files = fs.readdirSync(path.resolve(__dirname, '../controller'))
  let jsFiles = files.filter((f) => {
    return f.endsWith('.js')
  })

  for (let f of jsFiles) {
    console.log(`process controller: ${f}...`)
    let mapping = require(path.resolve(__dirname, '../controller/' + f))
    addMapping(router, mapping)
  }
}
// 路由

module.exports = (dir) => {
  let controllersDir = dir || 'controller' // 如果不传参数，扫描目录默认为'controller'
  let router = require('koa-router')()
  addControllers(router, controllersDir)
  return router.routes()
}
