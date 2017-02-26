export default {

  isUndefined(value) {
    return typeof value === 'undefined'
  },

  isJQuery(element) {
    return element instanceof jQuery
  }
}
