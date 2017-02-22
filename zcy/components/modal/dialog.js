
/**
 * 可以定制设置
 * footer | body
 *
 */
import dialogHbs from '../../handlebars/partials/dialog.hbs'

const defaultWidth = 520

function getProps(config) {
  /**
   * {
   *    title: '',
   *    template: '',
   *    closable: ''
   * }
   */
  return $.extend({
    closable: true,
    width: defaultWidth,
    dialogClass: '',
    maskClosable: true      // 点击蒙层是否允许关闭
  }, config, {

  })
}

function validate(props) {
  if (!props.template) {
    throw new Error('请填写Modal的template')
  }
  if (props.onCancel && !$.isFunction(props.onCancel)) {
    throw new Error('属性onCancel必须为function')
  }
  if (props.onOk && !$.isFunction(props.onOk)) {
    throw new Error('属性onOk必须为function')
  }
  return true
}

export default function (config = {}) {
  const $div = $('<div></div>')
  $('body').append($div)

  if (!validate(config)) {
    return false
  }

  const props = getProps(config)

  // 如果是handlebars的compile方法
  if ($.isFunction(config.template)) {
    props.template = config.template(props)
  }

  const $dialog = dialogHbs(props)
  $div.append($dialog)

  $div.find('.zcy-modal-close').off('click').on('click', () => {
    $div.hide()
  })

  $div.find('.zcy-btn-cancel').off('click').on('click', () => {
    // 返回false，则不关闭
    if ((props.onCancel && props.onCancel()) !== false) {
      $div.hide()
    }
  })

  $div.find('.zcy-btn-ok').off('click').on('click', () => {
    // 返回false，则不关闭
    if ((props.onOk && props.onOk()) !== false) {
      $div.hide()
    }
  })

  // 返回关闭函数
  return {
    close() {
      $div.hide()
    }
  }
}
