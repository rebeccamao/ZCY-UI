// 返回当前页面相对于窗口显示区左上角的 X ，Y 的位置
export function getScroll (top) {
  var ret = window['page' + (top ? 'Y' : 'X') + 'Offset']
  var method = 'scroll' + (top ? 'Top' : 'Left')
  if (typeof ret !== 'number') {
    var d = window.document
    // ie6,7,8 standard mode
    ret = d.documentElement[method]
    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method]
    }
  }
  return ret
}

// 获取元素top,left,right,bottom的绝对位置
export function getOffset (element, container = document.body) {
  const elRect = element.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  const clientTop = element.clientTop || container.clientTop || 0
  const clientLeft = element.clientLeft || container.clientLeft || 0
  let top
  let left

  if (container === document.body) {
    top = getScroll(true)
    left = getScroll()
  } else {
    top = container.scrollTop - containerRect.top
    left = container.scrollLeft - containerRect.left
  }

  return {
    top: elRect.top + top - clientTop,
    left: elRect.left + left - clientLeft,
    right: elRect.right + left - clientLeft,
    bottom: elRect.bottom + top - clientTop
  }
}


let closest = function (elem, fn) {
  return elem && elem !== document && (fn(elem) ? true : closest(elem.parentNode, fn))
}
// 判断是否点击了目标元素elem 可以是一个元素数组
export function closeByElement (target, elem) {
  if (!(elem instanceof Array)) {
    elem = [elem]
  }
  return closest(target, el => {
    return elem.some(d => {
      return el === d
    })
  })
}
