import 'console-polyfill'
// import 'es5-shim'

import './utils/polyfill'

import Lang from './utils/lang'

import Button from './components/button/'

import Menu from './components/menu/'
import Message from './components/message/'
import Modal from './components/modal/'
import Notification from './components/notification/'
import Progress from './components/progress/'
import Upload from './components/upload/'
import './components/popover/'
import './components/tooltip/'

const ZCY = require('./core')

window.ZCY = $.extend({
  version: '0.0.1',
  Lang,
  Button,
  Menu,
  Message,
  Modal,
  Notification,
  Progress,
  Upload
}, ZCY)
