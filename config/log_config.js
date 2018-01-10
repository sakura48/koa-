const path = require('path')
// 错误日志输出完整路径
const errorLogPath = path.resolve(__dirname, '../logs/error/error')
// 响应日志输出完整路径
const responseLogPath = path.resolve(__dirname, '../logs/info/info')
module.exports = {
  'appenders': {
    stdout: {
      // 控制台输出
      type: 'stdout'
    },
    error: {
      // 日志类型
      'type': 'dateFile',
      // 日志输出位置
      'filename': errorLogPath,
      // 是否总是有后缀名
      'alwaysIncludePattern': true,
      // 后缀，每小时创建一个新的日志文件
      'pattern': '-yyyy-MM-dd-hh.log'
    },
    info: {
      'type': 'dateFile',
      'filename': responseLogPath,
      'alwaysIncludePattern': true,
      'pattern': '-yyyy-MM-dd-hh.log'
    }
  },
  'categories': {
    error: {appenders: ['error', 'stdout'], level: 'error'},
    default: {appenders: ['info'], level: 'info'}
  }
}
