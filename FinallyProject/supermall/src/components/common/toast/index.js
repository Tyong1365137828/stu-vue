/**使用插件方式进行封装*/

import Toast from "./Toast"; //导入Vue组件

const toastObj = {} //toast对象

toastObj.install = function (Vue) { /**在使用安装插件的方法use(),本质就是来执行这个函数的;并且在使用use()方法后,会默认传来一个Vue参数*/
  console.log('toast install......');
  /**
   * 注意：因为此时Vue组件等一些前台代码已经变成了render函数了,所以直接通过$el获取Vue组件是错误的,
   * 可以使用如下的方法
   * */

  /**1、创建组件构造器*/
  const toastConstruct = Vue.extend(Toast)

  /**2、对组件构造器进行 new 处理,创建出来一个组件对象*/
  const toast = new toastConstruct()

  /**3、将组件对象手动挂载到某一个元素上<这个元素如果没有会自动被创建>*/
  toast.$mount(document.createElement('div')) //创建一个div,并把toast挂载上去,使toast能够进行$el

  /**4、toast就能$el了,toast.$el对应的就是div了*/
  document.body.appendChild(toast.$el) //把toast.$el添加到body中组件,即向body添加一个div元素

  /**5、插入toast插件原型,使在这个项目中的任何地方都能通过$toast使用*/
  Vue.prototype.$toast = toast // 把toast添加到插件原型

}

export default toastObj //导出
