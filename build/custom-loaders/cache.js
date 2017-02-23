const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

/**
 * https://github.com/vuejs/vue-loader/blob/next/lib/gen-id.js
 */
let fileUid = 1
let fileRegistry = Object.create(null)

function genId (file) {
  return fileRegistry[file] || (fileRegistry[file] = fileUid++)
}
const cachePath = path.join(__dirname, './_cache')
const cache = {
  save (name, content) {
    const filename = name + '-' + genId(name)
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
