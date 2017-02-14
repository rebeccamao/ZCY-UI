
const MAX_SAFE_INTEGER = 9007199254740991
const numberTag = '[object Number]'

function baseSortBy (array, comparer) {
  let length = array.length

  array.sort(comparer)
  while (length--) {
    array[length] = array[length].value
  }
  return array
}

function isObject (value) {
  var type = typeof value
  return !!value && (type === 'object' || type === 'function')
}

function baseProperty (key) {
  return function (object) {
    return object == null ? undefined : object[key]
  }
}

function isObjectLike (value) {
  return !!value && typeof value === 'object'
}

function isNumber (value) {
  return typeof value === 'number' || (isObjectLike(value) && Object.prototype.toString.call(value) === numberTag)
}

let getLength = baseProperty('length')

export default {

  isObjectLike: (value) => {
    return !!value && typeof value === 'object'
  },

  isFunction: (value) => {
    return typeof value === 'function' || false
  },

  isNumber: (value) => {
    return typeof value === 'number' || (isObjectLike(value) && Object.prototype.toString.call(value) === numberTag)
  },

  isObject: (value) => {
    var type = typeof value
    return !!value && (type === 'object' || type === 'function')
  },

  isLength: (value) => {
    return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER
  },

  getLength: baseProperty('length'),

  isEqual: (value, other) => {
    if (value === other) {
      return true
    }
    if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
      return value !== value && other !== other  // eslint-disable-line
    }

    // 如果比较复杂对象，需要添加
    return false
  },

  difference: (array, values) => {
    let length = array ? array.length : 0
    let result = []
    if (!length) {
      return result
    }

    let index = -1
    while (++index < length) {
      let value = array[index]
      if (values.indexOf(values, 0) < 0) {
        result.push(value)
      }
    }
    return result
  },

  contains: (collection, target, fromIndex) => {
    let length = collection ? getLength(collection) : 0
    if (isNumber(fromIndex)) {
      fromIndex = fromIndex < 0 ? Math.max(length + fromIndex, 0) : (fromIndex || 0)
    } else {
      fromIndex = 0
    }
    return !!length && collection.indexOf(target, fromIndex) > -1
  },

  sortBy: (collection, iteratee) => {
    if (collection == null) {
      return []
    }
    let index = -1
    let result = collection.map((value) => {
      return { index: ++index, value: value }
    })
    return baseSortBy(result)
  }
}
