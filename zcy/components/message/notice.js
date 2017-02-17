
function getIconClass(type) {
  switch (type) {
  case 'success':
    return 'icon-shuruzhengquetishi'
  case 'waring':
    return 'icon-shurujinggaotishi'
  case 'error':
    return 'icon-shurucuowutishi2'
  default:
    return 'icon-shuruzhengquetishi'
  }
}

function getTemplate(key, type, content) {
  const iconClass = getIconClass(type)
  return `<div class="zcy-message-notice" data-key="${key}">
            <div class="zcy-message-notice-content">
              <div class="zcy-message-custom-content zcy-message-${type}">
                <i class="icon-zcy ${iconClass}"></i>
                <span>${content}</span>
              </div>
            </div>
          </div>`
}

export default {

  add(props, $container) {
    if ($.type(props.key) === 'undefined') {
      throw new Error('需要填写唯一标示key')
    }
    if (!props.type) {
      throw new Error('请正确选择message的type')
    }
    if (props.onClose && !$.isFunction(props.onClose)) {
      throw new Error(`请message的onclose必须为function，${props.onClose}`)
    }

    const $notice = $(getTemplate(props.key, props.type, props.content))
    $container.append($notice)

    if (props.duration) {
      let closeTimer = setTimeout(() => {
        // 时间到了，停止计时器
        if (closeTimer) {
          $notice.remove()
          clearTimeout(closeTimer)
          closeTimer = null
        }
        if (props.onClose) {
          props.onClose()
        }
      }, props.duration * 1000)
    }
  },

  remove(key) {
    $(`.zcy-message-notice[data-key=${key}]`).remove()
  }

}
