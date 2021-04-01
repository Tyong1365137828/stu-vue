import Vue from 'vue'
import App from './App'

console.log(App); //可以发现App组件已经被转变为对象了,所以,App内的元素template到这里时已经解析为render()函数,就不需要再经过 template -> ast

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
