const formidable = require('formidable')

module.exports = (opt) => {
  return async (ctx, next) => {
    let form = new formidable.IncomingForm()
    Object.assign(form, opt)
    await new Promise((resolve, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        if (err) {
          reject(err)
        } else {
          ctx.request.body = fields
          ctx.request.files = files
          resolve()
        }
      })
    })
    await next()
  }
}
