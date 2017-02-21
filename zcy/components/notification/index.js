import './style/index.less'
import Notification from './notification'

let defaultDuration = 4.5
let defaultTop = 24
let defaultBottom = 24
let defaultPlacement = 'topRight'
let key = 1

let notificationInstance

function getNotificationInstance() {
  notificationInstance = notificationInstance || Notification.getInstance({
    top: defaultTop,
    bottom: defaultBottom,
    placement: defaultPlacement
  })

  return notificationInstance
}

function notice(title, message, duration = defaultDuration, onClose = $.noop, selfKey, type) {
  const instance = getNotificationInstance()
  instance.notice({
    title,
    message,
    duration,
    onClose,
    key: selfKey || `${key}`,
    type
  })

  return (function () {
    key += 1
    const target = key
    return function () {
      instance.removeNotice(target)
    }
  }())
}

export default {
  open(config) {
    return notice(config.title, config.message, config.duration, config.onClose, config.key)
  },
  info(config) {
    return notice(config.title, config.message, config.duration, config.onClose, config.key, 'info')
  },
  success(config) {
    return notice(config.title, config.message, config.duration, config.onClose, config.key, 'success')
  },
  warning(config) {
    return notice(config.title, config.message, config.duration, config.onClose, config.key, 'warning')
  },
  error(config) {
    return notice(config.title, config.message, config.duration, config.onClose, config.key, 'error')
  },
  close(selfKey) {
    const instance = getNotificationInstance()
    instance.removeNotice(selfKey)
  },
  config(options) {
    if (options.top) {
      defaultTop = options.top
    }
    if (options.bottom) {
      defaultBottom = options.bottom
    }
    if (options.duration) {
      defaultDuration = options.duration
    }
    if (options.placement) {
      defaultPlacement = options.placement
    }
    // delete notificationInstance
    if (options.placement !== undefined ||
        options.top !== undefined ||
        options.bottom !== undefined) {
      notificationInstance = null
    }
  },
  destroy() {
    if (notificationInstance) {
      notificationInstance.destroy()
      notificationInstance = null
    }
  }
}
