import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

//axios的全局配置
// axios.defaults.baseURL = 'http://123.207.32.32:8000' //基本url
// axios.defaults.timeout = 5000 //设置多长时间超时,毫秒计
/**但是开发中可能出现资源不在同一个端口,甚至是服务器,那么使用这种方式必然是不行的;对此,使用axios实例,请求哪个端口或服务器,就是用对应的axios实例即可*/
const axiosConfig1 = axios.create({ //设置第一个axios实例
  baseURL: 'http://123.207.32.32:8000',
  timeout: 5000
})

const axiosConfig2 = axios.create({ //设置第二个axios实例
  baseURL: 'http://132.231.22.13:22',
  timeout: 10000,
  headers: {}
})

/*axios({ //默认为get请求
  // url: 'http://123.207.32.32:8000/home/multidata?callback=json123',  //jsonP的方式
  url: 'http://123.207.32.32:8000/home/multidata',
  // methods: 'get'
}).then(res => {
  console.log(res);
})*/

axiosConfig1({
  url: '/home/data',
  params: {
    type: 'pop',
    page: 2
  }
}).then(res => {
  console.log('请求的数据');
  console.log(res);
})

/**axios发送并发请求,即发送多个请求*/
// axios.all([axios(), axios(), axios() ,......])
/***
 * axios的all()方法参数是一个可以放置多个并发请求的数组;
 * 返回结果<.then()方法获取>也是一个result数组,可以使用spread(res1, res2, ...)方法把并发请求的结果分割展开为res1, re2, ....
 */
//例如
axios.all ([
  axiosConfig1({ //并发请求1
    url: '/category'
  }),
  axiosConfig1 ({ //并发请求2
    // url: '/home/multidata?callback=json123'
    url: '/home/multidata',
    params: {
      callback: 'json123',
      // 参数key2: '参数2值'
      // ...
    }
  }),
  axiosConfig1 ({
    url: '/home/data',
    params: {
      type: 'pop',
      page: 2
    }
  })
])
// .then(result => {
  // console.log(result);  //把上面的两个并发请求的集合result数组输出
  /**分开输出上述的三个并发请求的result集合*/
  // console.log(result[0]);
  // console.log(result[1]);
  // console.log(result[2]);
// })
  /**或者使用spread()方法把并发请求的res分开输出*/
  .then(axios.spread((res1, res2, res3) => {
    console.log('axios的all()方法得到的并发请求结果');
    console.log(res1);
    console.log(res2);
    console.log(res3);
  }))


//封装的axios
import {request} from './network/request'

/**调用封装的axios方法*/
request({
  url: '/home/multidata'
}).then(res => {
  console.log('封装的axios请求的数据成功');
  console.log(res);
}).catch(err => {
  console.log('封装的axios请求的数据失败');
  console.log(err);
})
