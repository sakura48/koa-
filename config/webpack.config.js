const fs = require('fs')
const path = require('path')

function ent () {
  let ent = {}
  let file = fs.readdirSync(path.resolve(__dirname, '../static/js/'))
  if (file.length !== 0) {
    file.forEach(val => {
      if (val.endsWith('min.js')) {
        let filename = path.basename(val, '.min.js')
        ent[filename] = './static/js/' + val
      }
    })
  }
  return ent
}

module.exports = {
  entry: ent(),
  output: {
    filename: '[name].min.js'
  },
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     $: 'jquery'
  //   })
  // ],
  stats: {
    colors: true
  }
}
