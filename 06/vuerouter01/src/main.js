/**入口*/
import Vue from 'vue'
import App from './App'
import router from './router' //因为引用的是router文件夹下的index.js文件,可以省略直接写到文件即可

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, //把路由加入到Vue实例中
  render: h => h(App) //渲染App组件
})
