
import Lang from '../../utils/lang'
import progressLineHbs from '../../handlebars/partials/progress-line.hbs'
import progressCircleHbs from '../../handlebars/partials/progress-circle.hbs'


/**
 * @param type:String line circle
 * @param percent:number
 * @param format:function
 * @param status:String normal success exception active
 * @param showInfo:boolean
 * @param strokeWidth:number
 * @param width:number 132
 */
const DEFAULTS = {
  type: 'line',
  percent: 0,
  status: 'normal',
  showInfo: true,
  strokeWidth: 10,
  width: 132
}


function isCircle(type) {
  return type === 'circle'
}

/**
 *
 * 获取stroke的宽度，区分line和circle
 * @param {any} type
 * @param {any} strokeWidth
 * @returns
 */
function getStrokeWidth(type = 'line', strokeWidth) {
  return strokeWidth || (isCircle(type) ? 6 : 10)
}

/**
 * 从data属性内获取属性
 * @param {DOM | JQuery} element
 */
function getOptions($element) {
  const options = DEFAULTS
  const elemOptions = $element.data()
  $.each(DEFAULTS, (key) => {
    const value = elemOptions[key]
    if (!Lang.isUndefined(value)) {
      options[key] = value
    }
  })
  options.strokeWidth = getStrokeWidth(elemOptions.type, elemOptions.strokeWidth)
  return options
}

function getStyle(options) {
  return {
    width: `${options.percent}%`,
    height: `${options.strokeWidth}px`
  }
}

function getContent(options) {
  console.info(options, isCircle(options.type))
  const template = isCircle(options.type) ? progressCircleHbs : progressLineHbs
  const $content = $(template(options))
  $content.find('.zcy-progress-bg').css(getStyle(options))
  return $content
}

export default function (elem, config = {}) {
  const $element = $(elem)
  // 以js的属性优先
  const options = $.extend(getOptions($element), config)

  const $content = getContent(options)
  $element.replaceWith($content)
}
