import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import router from './router'

import toast from "./components/common/toast"; //导入自定义的toast插件,省略会默认导入文件夹下的index.js文件

Vue.use(toast) // 安装toast插件,注意,这个插件是自定义的插件,所以在使用use()方法后,因为其会执行toast内的install方法,那么,我们就要自己实现install方法

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue() //添加事件总线原型

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
