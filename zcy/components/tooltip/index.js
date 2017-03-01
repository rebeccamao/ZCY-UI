import './style/index.less'
import Popover from '../popover/'
import { plugin } from '../../core'

import tooltipHbs from '../../handlebars/partials/tooltip.hbs'

const Tooltip = function (element, options) {
  return new Popover(element, $.extend({
    name: 'tooltip',
    trigger: 'hover',
    template: tooltipHbs
  }, options))
}

plugin('tooltip', Tooltip)

export default Tooltip
