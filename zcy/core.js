
export default {
  /**
   * Debounce function
   *
   * @param {function} func  Function to be debounced
   * @param {number} wait Function execution threshold in milliseconds
   * @param {bool} immediate  Whether the function should be called at
   *                          the beginning of the delay instead of the
   *                          end. Default is false.
   * @description Executes a function when it stops being invoked for n seconds
   * @see  _.debounce() http://underscorejs.org
   */
  debounce(func, wait, immediate) {
    let timeout
    return function (...args) {
      const context = this
      const later = function () {
        timeout = null
        if (!immediate) {
          func.apply(context, args)
        }
      }
      const callNow = immediate && !timeout

      clearTimeout(timeout)
      timeout = setTimeout(later, wait)

      if (callNow) {
        func.apply(context, args)
      }
    }
  },

  // 生成uid
  generateGUID(namespace) {
    let uid = namespace ? `${namespace}-` : 'zcy-'

    do {
      uid += Math.random().toString(36).substring(2, 7)
    } while (document.getElementById(uid))

    return uid
  },

  // @see https://davidwalsh.name/get-absolute-url
  getAbsoluteUrl(url) {
    const a = document.createElement('a')
    a.href = url
    return a.href
  },

  plugin(name, Component) {
    $.fn[name] = function (options) {
      return this.each(function () {
        const $this = $(this)
        const instance = $this.data(name)
        if (!instance) {
          $this.data(name, new Component(this, options))
        }
      })
    }
  }
}
