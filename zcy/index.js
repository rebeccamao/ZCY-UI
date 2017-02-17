// import './utils/polyfill'

import Lang from './lang'

import Menu from './components/menu/'
import Message from './components/message/'

const ZCY = require('./core')

export default window.ZCY = Object.assign({
  version: '0.0.1',
  Lang,
  Menu,
  Message
}, ZCY)
