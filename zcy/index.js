// import './utils/polyfill'

import Lang from './lang'

import Menu from './components/menu/'
import Message from './components/message/'

let ZCY = require('./core')

export default window.ZCY = Object.assign({
  version: '0.0.1',
  Lang,
  Message
}, ZCY)
