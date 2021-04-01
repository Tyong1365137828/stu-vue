import Vue from 'vue'
import App from './App'

import router from './router' //引入router文件夹下的index.js文件

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, //把路由加入到Vue实例
  render: h => h(App)
})

// require('./assets/css/base.css')
