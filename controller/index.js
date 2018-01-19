const path = require('path')
const fs = require('fs')
const WXBizDataCrypt = require('../lib/WXBizDataCrypt')

let index = async (ctx, next) => {
  //  console.log(ctx.req)
  var appId = 'wx4f4bc4dec97d474b'
  var sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
  var encryptedData =
    'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM' +
    'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS' +
    '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+' +
    '3hVbJSRgv+4lGOETKUQz6OYStslQ142d' +
    'NCuabNPGBzlooOmB231qMM85d2/fV6Ch' +
    'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6' +
    '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw' +
    'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn' +
    '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs' +
    '8LOddcQhULW4ucetDf96JcR3g0gfRK4P' +
    'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB' +
    '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns' +
    '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd' +
    'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV' +
    'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG' +
    '20f0a04COwfneQAGGwd5oa+T8yO5hzuy' +
    'Db/XcxxmK01EpqOyuxINew=='
  var iv = 'r7BXXKkLb8qrSNn05n0qiA=='

  var pc = new WXBizDataCrypt()
  pc.appId = appId
  var data = pc.decryptData(sessionKey, encryptedData, iv)

  console.log('解密后 data: ', data)
  ctx.render('hello.html', {'name': 'f1321'})
}

let signin = async (ctx, next) => {
  // let oldpath = ctx.request.files.file.path
  console.log(ctx.request.body)
  let pc = new WXBizDataCrypt()
  let session = await pc.getSession(ctx.request.body.code)
  console.log(session)
  let data = pc.decryptData(session.session_key, ctx.request.body.encryptedData, ctx.request.body.iv)
  console.log(data)
  //  ctx.response.type = 'json'
  ctx.response.body = data
  //  ctx.render('hello.html', {'name': 'da'})
}

module.exports = {
  'GET /': index,
  'POST /signin': signin
}
