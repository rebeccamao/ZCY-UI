import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import 'highlight.js/styles/solarized-light.css'

// import $ from 'jquery'

import './style/index.less'

import routerMap from './routers'
import components from './components'

// 引入zcy的js和css
import '../zcy'
import '../zcy/style/index.less'

Vue.use(VueRouter)
Vue.use(components)

let router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: routerMap
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
