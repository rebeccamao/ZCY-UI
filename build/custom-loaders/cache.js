var fs = require('fs')
var path = require('path')
var rimraf = require('rimraf')

/**
 * https://github.com/vuejs/vue-loader/blob/next/lib/gen-id.js
 */
var fileUid = 1
var fileRegistry = Object.create(null)

function genId (file) {
  return fileRegistry[file] || (fileRegistry[file] = fileUid++)
}
var cachePath = path.join(__dirname, './_cache')
var cache = {
  save (filePath, content) {
    var filename = path.basename(filePath, '.md') + '-' + genId(filePath)
    filePath = path.join(cachePath, filename + '.vue')


    try {
      fs.writeFileSync(filePath, content, 'utf8')
    } catch (err) {
      console.error(err)
    }

    return filePath
  },

  clean () {
    rimraf.sync(cachePath)
  }
}

cache.clean()
if (!fs.existsSync(cachePath)) {
  fs.mkdirSync(cachePath)
}

module.exports = cache
