import './style/index.less'
import Popover from '../popover/'
import Core from '../../core'

import tooltipHbs from '../../handlebars/partials/tooltip.hbs'

const Tooltip = function (element, options) {
  return new Popover(element, $.extend({
    name: 'tooltip',
    trigger: 'hover',
    template: tooltipHbs
  }, options))
}

Core.plugin('tooltip', Tooltip)

export default Tooltip
