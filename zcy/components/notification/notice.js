
function getIconClass(type) {
  switch (type) {
  case 'success':
    return 'icon-shuruzhengquetishi'
  case 'warning':
    return 'icon-shurujinggaotishi'
  case 'error':
    return 'icon-shurucuowutishi2'
  default:
    return ''
  }
}

function getTemplate(message, description, key, type) {
  const iconClass = getIconClass(type)
  return `<div class="zcy-notification-notice" data-key="${key}">
            <div class="zcy-notification-notice-content">
              <div class="${type ? 'zcy-notification-notice-with-icon' : ''}">
                <i class="icon-zcy ${iconClass} zcy-notification-notice-icon ${type ? `zcy-notification-notice-icon-${type}` : ''}"></i>
                ${message ? `<div class="zcy-notification-notice-message">${message}</div>` : ''}
                <div class="zcy-notification-notice-description">${description}</div>
              </div>
            </div>
            <a class="zcy-notification-notice-close">
              <span class="icon-zcy icon-guanbi"></span>
            </a>
          </div>`
}

export default {

  add(props, $container) {
    if ($.type(props.key) === 'undefined') {
      throw new Error('需要填写唯一标示key')
    }
    if (!props.title) {
      throw new Error('需要填写notification的标题title')
    }
    if (!props.message) {
      throw new Error('需要填写notification的内容message')
    }
    if (props.onClose && !$.isFunction(props.onClose)) {
      throw new Error(`请notification的onclose必须为function，${props.onClose}`)
    }

    const $notice = $(getTemplate(props.title, props.message, props.key, props.type))
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

    // 绑定关闭事件
    $notice.find('.zcy-notification-notice-close').on('click', () => {
      $notice.remove()
      if (props.onClose) {
        props.onClose()
      }
    })
  },

  remove(key) {
    $(`.zcy-notification-notice[data-key=${key}]`).remove()
  }

}
