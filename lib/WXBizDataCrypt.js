const crypto = require('crypto')
const https = require('https')

class WXBizDataCrypt {
  constructor () {
    this.appId = 'wxaa5fb9ed6835f9aa'
  }

  decryptData (mysessionKey, myencryptedData, myiv) {
    // base64 decode
    let sessionKey = new Buffer(mysessionKey, 'base64')
    let encryptedData = new Buffer(myencryptedData, 'base64')
    let iv = new Buffer(myiv, 'base64')

    try {
      // 解密
      let decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true)
      var decoded = decipher.update(encryptedData, 'binary', 'utf8')
      decoded += decipher.final('utf8')

      decoded = JSON.parse(decoded)

    } catch (err) {
      throw new Error('Illegal Buffer')
    }

    if (decoded.watermark.appid !== this.appId) {
      throw new Error('Illegal Buffer')
    }

    return decoded
  }

  //   ca08e4b0c9d394e4f6ee11e3b339b081
  getSession (jsCode) {
    let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + this.appId + '&secret=ca08e4b0c9d394e4f6ee11e3b339b081&js_code=' + jsCode + '&grant_type=authorization_code'
    return new Promise((resolve, reject) => {
      https.get(url, function (res) {
        res.setEncoding('utf8')
        res.on('data', function (chunk) {
          resolve(JSON.parse(chunk))
        })
      })
    })
  }
}

module.exports = WXBizDataCrypt
