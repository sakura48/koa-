const fs = require('fs')
const iconv = require('iconv-lite')
const path = require('path')
module.exports = {
  mkdir: async (filepath) => {
    let sep = path.sep
    let folders = path.dirname(filepath).split(sep)
    let p = ''
    while (folders.length) {
      p += folders.shift() + sep
      if (!fs.existsSync(p)) {
        fs.mkdirSync(p)
      }
    }
  },
  move: async (oldpath, newpath) => {
    return new Promise((resolve, reject) => {
      fs.rename(oldpath, newpath, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve('success')
        }
      })
    })
  },
  del: async (path) => {
    return new Promise((resolve, reject) => {
      fs.unlink(path, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve('success')
        }
      })
    })
  },
  hasfile: async (path) => {
    return new Promise((resolve, reject) => {
      fs.stat(path, (exists) => {
        if (exists) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  },
  write: async (path, str) => {
    let arr = iconv.encode(str, 'gbk')
    return new Promise((resolve, reject) => {
      fs.appendFile(path, arr, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve('success')
        }
      })
    })
  }
}
