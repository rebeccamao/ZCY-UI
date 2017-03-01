
const ACTION_URL = '/api/zoss/upload'

let frameIndex = 0
/**
 * 当前浏览器是否是IE9
 *
 * @returns
 */
function isIE9() {
  const engineVersion = window.ScriptEngineMinorVersion
  return engineVersion && (engineVersion() === 0)
}

/**
 * 使用Frame上传
 *
 * @param {HTMLInputElement} input 文件选择表单元素,目前不支持多文件元素,只能是HTMLElement不能是jQuery对象
 * @param {Object} options 配置参数
 * @returns
 */
function uploadWithFrame(input, options = {}) {
  let defer = $.Deferred()
  setTimeout(() => {
    frameIndex++
    let valid = !options.beforeSend || options.beforeSend(input.value) !== false
    if (!valid) {
      return defer.reject()
    }

    const $input = $(input)
    const frameName = `upload_frame_${frameIndex}`
    const uploadFrame = $(`<iframe style="position:absolute;top:-9999px" name="${frameName}"><script type="text/javascript"></script></iframe>`)

    const form = $('<form method="post" style="display:none;" enctype="multipart/form-data" />')
    form.attr('target', frameName).attr('action', ACTION_URL)
    const $cloneInput = $input.clone(true)
    $cloneInput.insertAfter($input)
    form.append($input)

    uploadFrame.appendTo('body')
    form.appendTo('body')
    // 禁用
    $($cloneInput).attr('disabled', 'disabled').attr('name', 'zossfile')
    // 加载事件
    uploadFrame.bind('load', function (evt) {
      let data
      try {
        let contents = $(this).contents().get(0)
        let text = $(contents).find('body').text()
        if (text) {
          // 413为http status, 表示文件太大，
          if (text.indexOf('413') > -1) {
            console.log('文件太大，最大为2M')
            return defer.reject(evt, null, '文件太大，最大为2M')
          }
          data = text && window.eval('(' + text + ')')
        }
      } catch (ex) {
        console.log('返回的json数据错误', ex)
        return defer.reject(evt, ex)
      }

      if (!data || !data.success) {
        return defer.reject(data.error)
      }
      form.remove()
      form = null
      uploadFrame = null
      $cloneInput.removeAttr('disabled')

      const file = formatFileInfo(data)
      return defer.resolve(file)
    })
    form.submit()
  }, 100)
  return defer.promise()
}

export default {

  upload() {

  },

  download() {

  }

}
