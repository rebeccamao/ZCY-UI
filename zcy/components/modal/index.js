import './style/index.less'
import Confirm from './confirm'
import Modal from './modal'

export default {

  confirm(props) {
    return Confirm($.extend({
      type: 'confirm',
      okCancel: true
    }, props))
  },

  info(props) {
    return Confirm($.extend({
      type: 'info',
      okCancel: false
    }, props))
  },

  success(props) {
    return Confirm($.extend({
      type: 'success',
      okCancel: false
    }, props))
  },

  warning(props) {
    return Confirm($.extend({
      type: 'warning',
      okCancel: false
    }, props))
  },

  error(props) {
    return Confirm($.extend({
      type: 'error',
      okCancel: false
    }, props))
  },

  open(props) {
    return Modal(props)
  }
}
