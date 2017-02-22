
/**
 * 可以传入template，自定义body部分
 */
import locale from './locale'
import Dialog from './dialog'

function getFooter(okText, cancelText) {
  return `<button type="button" class="zcy-btn zcy-btn-lg zcy-btn-cancel"><span>${cancelText}</span></button><button type="button" class="zcy-btn zcy-btn-primary zcy-btn-lg zcy-btn-ok"><span>${okText}</span></button></div>`
}

function getProps(config) {
  return $.extend(locale, {
  }, config)
}

export default function (config) {
  const props = getProps(config)
  const footer = getFooter(props.okText, props.cancelText)
  return Dialog($.extend({
    hasFooter: true,
    footer: footer
  }, props))
}
