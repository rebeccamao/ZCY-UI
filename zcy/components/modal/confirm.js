
/**
 * 不显示foot和title
 */
import Dialog from './dialog'
import locale from './locale'
import confirmHbs from '../../handlebars/partials/confirm.hbs'

function getIconClass(type) {
  switch (type) {
  case 'info':
    return 'icon-notify-info'
  case 'success':
    return 'icon-notify-success'
  case 'warning':
    return 'icon-notify-warning'
  case 'error':
    return 'icon-notify-danger'
  default:
    return 'icon-notify-warning'
  }
}

function getDialogClass(type) {
  return `zcy-confirm zcy-confirm-${type}`
}

function getProps(config) {
  const props = $.extend(locale, {
    width: 416,
    okCancel: true,
    hasFooter: false    // 不显示footer
  }, config)

  // 修改模版，
  props.iconClass = getIconClass(props.type)
  props.dialogClass = getDialogClass(props.type)
  props.template = confirmHbs(props)
  props.title = ''
  return props
}


export default function (config) {
  const props = getProps(config)
  return Dialog(props)
}
