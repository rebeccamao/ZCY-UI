
import Notice from './notice'

function getPlacementStyle(placement, top, bottom) {
  switch (placement) {
  case 'topLeft':
    return {
      left: 0,
      top: `${top}px`,
      bottom: 'auto'
    }
  case 'bottomLeft':
    return {
      left: 0,
      top: 'auto',
      bottom: `${bottom}px`
    }
  case 'bottomRight':
    return {
      right: 0,
      top: 'auto',
      bottom: `${bottom}px`
    }
  default:
    return {
      right: 0,
      top: `${top}px`,
      bottom: 'auto'
    }
  }
}

export default {

  getInstance(data) {
    if (!data.placement) {
      throw new Error('请选择notification的显示位置,topLeft|bottomLeft|bottomRight|topRight')
    }
    const placementStyle = getPlacementStyle(data.placement, data.top, data.bottom)
    const $div = $('<div class="zcy-notification"><span class="zcy-notification-container"></span></div>')
    $('body').append($div)
    $div.css(placementStyle)

    return {
      notice(props) {
        return Notice.add(props, $div.find('.zcy-notification-container'))
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
