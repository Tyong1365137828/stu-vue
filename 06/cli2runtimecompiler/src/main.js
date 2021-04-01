// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

console.log(App); //同样,可以发现App组件已经被转变为对象了,所以,App内的元素template到这里时已经解析为render()函数,就不需要再经过 template -> ast

Vue.config.productionTip = false

//组件
const cpn = {
  template: `<div>{{message}}</div>`,
  data () {
    return {
      message: '我是组件'
    }
  }
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  // components: { App },
  // template: '<App/>'

  render: function (createElement) {

    /**createElement函数的普通用法:参数1:创建一个标签;参数2:标签的属性;参数3:标签的内容,其中可以再加入createElement函数创建标签*/
    // return createElement('h1',
    //   {class: 'box'},
    //   ['hello VueCli', createElement('button', {class: 'btn'}, ['点我'])])
    /**如上述,创建1个h2标签并把 id为app的元素 替换掉*/


    /**createElement函数的另一用法:传入组件对象*/
    // return createElement(cpn) //传入自定义的组件

    return createElement(App) //传入引入的组件
  }

})
