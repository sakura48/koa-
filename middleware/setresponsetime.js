module.exports = () => {
  return async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    let start = new Date().getTime()
    await next()
    let execTime = new Date().getTime() - start
    ctx.response.set('X-Response-Time', `${execTime}ms`)
  }
}
