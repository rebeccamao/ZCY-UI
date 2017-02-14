import './style/index.less'
import Message from './message.js'

let defaultDuration = 3
let defaultTop = 24
let key = 1

let messageInstance


function getMessageInstance () {
  messageInstance = messageInstance || Message.getInstance({
    top: defaultTop
  })

  return messageInstance
}

function notice (content, duration = defaultDuration, onClose = $.noop, type = 'success') {
  let instance = getMessageInstance()
  instance.notice({
    key,
    duration,
    content,
    type,
    onClose
  })

  return (function () {
    let target = key++
    return function () {
      instance.removeNotice(target)
    }
  })()
}

export default {
  info (content, duration, onClose) {
    return notice(content, duration, onClose, 'info')
  },
  success (content, duration, onClose) {
    return notice(content, duration, onClose, 'success')
  },
  warning (content, duration, onClose) {
    return notice(content, duration, onClose, 'waring')
  },
  error (content, duration, onClose) {
    return notice(content, duration, onClose, 'error')
  },
  loading (content, duration, onClose) {
    return notice(content, duration, onClose, 'loading')
  },
  config (options) {
    if (options.top) {
      defaultTop = options.top
      // delete messageInstance for new defaultTop
      messageInstance = null
    }
    if (options.duration) {
      defaultDuration = options.duration
    }
  },
  destroy () {
    if (messageInstance) {
      messageInstance.destroy()
      messageInstance = null
    }
  }
}
