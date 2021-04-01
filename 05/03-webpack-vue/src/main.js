//使用COMMONJS的模块化规范
const {add, sub} = require("./js/mathUtils")

console.log(add(20, 30));
console.log(sub(50, 40));


//使用ES6的模块化规范
import {name, age, height, wight} from "./js/info";

console.log(name);
console.log(age);
console.log(height);
console.log(wight);


//引入依赖的css文件
require('./css/index.css');

//引入依赖的less文件
require('./css/index2.less');
document.writeln('<h2>你好,TYong</h2>');  //写入界面

//引入Vue,先安装vue2.5.x版本,  命令  npm install vue@2.5.2 --save
import Vue from 'vue';
/**注意:Vue的两种版本{runtime-only版本:该版本中不允许有任何的<template>;runtime-compiler版本:该版本允许有compiler,因为有compiler进行编译}*/
// import App from './vue/app'; //引入app.js,但是后续会淘汰这种方法,使用.vue文件代替.js文件
import App from './vue/App.vue';    //引入.vue文件
/**但是注意,引入.vue文件后,就表示webpack要打包.vue文件,此时就要安装和配置某些模组了,使用命令  npm install vue-loader@13.3.0 vue-template-compiler@2.5.2 --save-dev  安装*/


/*const App = {
  template: `
  <div>
      <h2>{{message}}</h2>
      <button @click="btnClick">按钮2000</button>
  </div>
  `,
  data () {
    return {
      message: '你好,webpack AND vue！！！'
    }
  },
  methods: {
    btnClick () {
    }
  }
}**/


//使用Vue开发
new Vue({
  el: '#demo',
  template: '<App/>',
  components: {
    App
  }
})

/**使用webpack打包工具打包该主文件即可(会把所有引入的文件一次处理),在项目下执行命令 webpack ./src/main.js ./dist/bundle.js  ,之后在index.html文件引用即可 */