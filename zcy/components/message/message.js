
import Notice from './notice'

export default {

  getInstance(data) {
    const $div = $('<div class="zcy-message"><span class="zcy-message-container"></span></div>')
    $('body').append($div)
    if (data.top) {
      $div.css('top', data.top)
    }

    return {
      notice(props) {
        return Notice.add(props, $div.find('.zcy-message-container'))
      },

      removeNotice(key) {
        return Notice.remove(key)
      },

      destroy() {
        $div.remove()
      }
    }
  }

}
