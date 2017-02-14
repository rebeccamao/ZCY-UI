import './utils/polyfill'
// import hbs from 'handlebars'

import Lang from './lang'
import Message from './components/message/'
let ZCY = require('./core')

export default window.ZCY = Object.assign({
  version: '0.0.1',
  Lang,
  Message
}, ZCY)
