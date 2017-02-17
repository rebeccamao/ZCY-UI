
const MAX_SAFE_INTEGER = 9007199254740991
const numberTag = '[object Number]'

function baseSortBy(array, comparer) {
  const arrayToSort = array
  let length = arrayToSort.length

  arrayToSort.sort(comparer)
  while (length) {
    arrayToSort[length] = arrayToSort[length].value
    length -= 1
  }
  return arrayToSort
}

function isObject(value) {
  const type = typeof value
  return !!value && (type === 'object' || type === 'function')
}

function baseProperty(key) {
  return function (object) {
    return object == null ? undefined : object[key]
  }
}

function isObjectLike(value) {
  return !!value && typeof value === 'object'
}

function isNumber(value) {
  return typeof value === 'number' || (isObjectLike(value) && Object.prototype.toString.call(value) === numberTag)
}

const getLength = baseProperty('length')

export default {

  isObjectLike: value => value && (typeof value === 'object'),

  isFunction: value => typeof value === 'function',

  isNumber: (value) => {
    if (typeof value === 'number') {
      return true
    }
    return isObjectLike(value) && Object.prototype.toString.call(value) === numberTag
  },

  isObject: (value) => {
    const type = typeof value
    return !!value && (type === 'object' || type === 'function')
  },

  isLength: value => (typeof value === 'number') && (value > -1) && (value % 1 === 0) && (value <= MAX_SAFE_INTEGER),

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
    const length = array ? array.length : 0
    if (!length) {
      return []
    }

    let index = -1
    const result = []
    while (index < length) {
      const value = array[index]
      if (values.indexOf(values, 0) < 0) {
        result.push(value)
      }
      index += 1
    }
    return result
  },

  contains: (collection, target, index) => {
    let fromIndex = index
    const length = collection ? getLength(collection) : 0
    if (isNumber(fromIndex)) {
      fromIndex = fromIndex < 0 ? Math.max(length + fromIndex, 0) : (fromIndex || 0)
    } else {
      fromIndex = 0
    }
    return !!length && collection.indexOf(target, fromIndex) > -1
  },

  sortBy: (collection) => {
    if (collection == null) {
      return []
    }
    let index = -1
    const result = collection.map((value) => {
      index += 1
      return { index: index, value: value }
    })
    return baseSortBy(result)
  }
}
