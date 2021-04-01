import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false    //产品提示信息(一般在产品构建时设置为true)

new Vue({
  render: h => h(App),
}).$mount('#app')   //相当于Vue源码内的写法,即在外部定义el,源码内部就会转换为.$mount('#id')挂载
