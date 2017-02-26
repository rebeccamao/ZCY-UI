// import './utils/polyfill'

import Lang from './utils/lang'

import Button from './components/button/'

import Menu from './components/menu/'
import Message from './components/message/'
import Modal from './components/modal/'
import Notification from './components/notification/'
import Progress from './components/progress/'
import './components/popover/'
import './components/tooltip/'

const ZCY = require('./core')

export default window.ZCY = Object.assign({
  version: '0.0.1',
  Lang,
  Button,
  Menu,
  Message,
  Modal,
  Notification,
  Progress
}, ZCY)
