import './style/index.less'
import Progress from './progress'

const prefix = '.zcy-progress'

export default {

  /**
   * 初始化页面的progress
   */
  run(elem, options) {
    const $elements = elem ? $(elem) : $(prefix)
    $elements.each((i, item) => {
      Progress(item, options)
    })
  }
}
