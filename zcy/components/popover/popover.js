
import popoverHbs from '../../handlebars/partials/popover.hbs'
import Core from '../../core'

const Popover = function (element, options) {
  this.options = $.extend({}, Popover.DEFAULTS, options)
  this.$element = $(element)
  this.active = null
  this.$popover = (this.options.target && $(this.options.target)) || null

  this.init()
  this.bindEvents()
}

Popover.DEFAULTS = {
  trigger: 'click',
  content: '',
  open: false,
  target: null
}

Popover.prototype.init = function () {
  this.options.template = popoverHbs(this.options)
  if (!this.options.target) {
    this.$popover = this.getPopover()
  }

  this.$popover.appendTo($('body'))
  this.sizePopover()

  if (this.options.open) {
    this.open()
  }
}

Popover.prototype.getRelativeOffset = function () {
  let placement = this.options.placement
  const $element = this.$element
  const $popover = this.$popover

  const popWidth = $popover.outerWidth()
  const popHeight = $popover.outerHeight()

  const triggerWidth = $element.outerWidth()
  const triggerHeight = $element.outerHeight()
  // 相对于浏览器的顶部偏移，包含滚动距离
  const triggerOffset = $element.offset()
  // 相对于浏览器的顶部偏移，忽略滚动距离
  const triggerRect = $element[0].getBoundingClientRect()

  const $window = $(window)
  const winHeight = $window.height()
  const spacing = 2

  // 相对于左侧中间位置
  const middleLeft = ((triggerWidth / 2) + triggerOffset.left) - (popWidth / 2)
  const middleTop = ((triggerHeight / 2) + triggerOffset.top) - (popHeight / 2)

  /**
   * 如果没有palcement，需要自动计算，那种最合理
   * 自动计算考虑top，bottom，left，right四个方位
   */
  if (!placement) {
    // 元素上面是否能放下
    if (popHeight + spacing < triggerRect.top) {
      placement = 'top'
    } else if (popHeight + spacing < winHeight - triggerRect.top - triggerRect.height){
      placement = 'bottom'
    } else if (popWidth + spacing < triggerRect.left) {
      placement = 'left'
    } else if (popWidth + spacing < triggerRect.right) {
      placement = 'right'
    } else {
      // 所有的都不符合，设置为top
      placement = 'top'
    }
    // 默认没有的情况下，需要添加class
    $popover.addClass(`zcy-popover-placement-${placement}`)
  }

  const offset = { top: '', left: '' }
  if (placement.indexOf('top') > -1) {
    offset.top = triggerOffset.top - popHeight - spacing
    offset.left = middleLeft
  } else if (placement.indexOf('bottom') > -1) {
    offset.top = triggerOffset.top + triggerHeight + spacing
    offset.left = middleLeft
  } else if (placement.indexOf('left') > -1) {
    offset.top = middleTop
    offset.left = triggerOffset.left - popWidth - spacing
  } else if (placement.indexOf('right') > -1){
    offset.top = middleTop
    offset.left = triggerOffset.left + triggerWidth + spacing
  }

  if (placement.indexOf('Bottom') > -1) {
    offset.top = (triggerOffset.top + triggerHeight) - popHeight
  } else if (placement.indexOf('Top') > -1) {
    offset.top = triggerOffset.top
  } else if (placement.indexOf('Left') > -1) {
    offset.left = triggerOffset.left
  } else if (placement.indexOf('Right') > -1) {
    offset.left = (triggerOffset.left + triggerWidth) - popWidth
  }
  return offset
}

Popover.prototype.sizePopover = function () {
  const $popover = this.$popover

  if (!$popover || !$popover.length) {
    return
  }

  const offset = this.getRelativeOffset()
  $popover.css({ top: `${offset.top}px`, left: `${offset.left}px` })
}

Popover.prototype.toggle = function () {
  return this[this.active ? 'close' : 'open']()
}

Popover.prototype.open = function () {
  this.sizePopover()
  this.$popover.show().addClass('zcy-active')
  this.active = true
}

Popover.prototype.close = function () {
  this.$popover
    .removeClass('zcy-active')
    .trigger('closed.popover.zcy')
    .hide()

  this.active = false
}

Popover.prototype.getPopover = function () {
  const uid = Core.generateGUID('zcy-popover')
  return $(this.options.template).attr('id', uid)
}

Popover.prototype.setContent = function (content) {
  if (this.$popover) {
    this.$popover.find('.zcy-popover-inner').empty().html(content)
  }
}

Popover.prototype.bindEvents = function () {
  const eventNS = 'popover.zcy'
  const triggers = this.options.trigger.split(' ')

  $.each(triggers, (i, trigger) => {
    if (trigger === 'click') {
      this.$element.on(`click.${eventNS}`, $.proxy(this.toggle, this))
    } else {
      const isHover = trigger === 'hover'
      // hover or focus
      const eventIn = isHover ? 'mouseenter' : 'focusin'
      const eventOut = isHover ? 'mouseleave' : 'focusout'

      this.$element.on(`${eventIn}.${eventNS}`, $.proxy(this.open, this))
      this.$element.on(`${eventOut}.${eventNS}`, $.proxy(this.close, this))
    }
  })
}

Popover.prototype.destroy = function () {
  this.$element.off('.popover.zcy').removeData('popover')
  this.$popover.remove()
}

Core.plugin('popover', Popover)

export default Popover
