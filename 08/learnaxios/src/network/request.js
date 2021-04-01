/**
 * 封装axios,减少其对项目的依赖,可以使用多个export function 方法,解决资源不在同一服务器乃至端口的问题
 */
import axios from 'axios'

export function request(config) { // 第一个封装axios的函数; 参数config是传入对象,内含url, params 等参数


  // return new Promise((resolve, reject) => {
    /**创建axios实例*/
    // const instance = axios.create({
    //   baseURL: 'http://123.207.32.32:8000',
    //   timeout: 5000
    // })
    //
       /**发送网络请求*/
    // instance(config)
    //   .then (res => {
    //     // 成功
    //     resolve(res)
    //   })
    //   .catch (err => {
    //     // 失败
    //     reject(err)
    //   })
    /**之后可以在调用这个方法的地方定义 .then() 和 .catch() 方法进行接收*/
  // })


  /**但是通过axios.creat()方法的源码可以看出,creat()方法就是返回了一个Promise,那么我们就可以直接把这个实例return,在调用处进行调用即可*/
  const instance = axios.create({ //创建axios实例
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  /**本axios实例的request拦截器,use()方法,参数1:请求发送成功;参数2:请求发送失败<即未发送请求>*/
  instance.interceptors.request.use(
    config => { //请求发送成功到此
      console.log('request拦截器,请求发送成功:'+ typeof config);
      console.log(config);

      // 可能操作1、对config中的一些信息不符合服务器的要求,进行信息转换

      //可能操作2、请求时的展示页面,如加载页面等

      //可能操作3、某些请求<如登录>,必须携带一些特殊信息,如token等,实现登录判断

      return config //把拦截的config放行
    },
    err => { //请求发送失败到此
      console.log('request拦截器,请求发送失败:' + err);
    }
  )

  /**本axios实例的response拦截器,*/
  instance.interceptors.response.use(
    result => { //服务器响应的结果
      console.log('response拦截器,响应成功:' + typeof result);
      console.log(result);

      return result.data //把拦截的响应结果数据<data>放行
    },
    err => { //服务器响应失败的
      console.log('response拦截器,响应失败' + err);
      console.log(err);
    }
  )

  return instance(config) //返回instance方法,发送网络请求
}
