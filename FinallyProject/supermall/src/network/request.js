/**
 * 封装axios,减少其对项目的依赖,可以使用多个export function 方法,解决资源不在同一服务器乃至端口的问题
 */
import axios from 'axios'

export function request(config) { // 第一个封装axios的函数; 参数config是传入对象,内含url, params 等参数

  axios.defaults.withCredentials = true //可以把cookie发送到服务器

  /**但是通过axios.creat()方法的源码可以看出,creat()方法就是返回了一个Promise,那么我们就可以直接把这个实例return,在调用处进行调用即可*/
  const instance = axios.create({ //创建axios实例
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 40000
  });

  /**本axios实例的request拦截器,use()方法,参数1:请求发送成功;参数2:请求发送失败<即未发送请求>*/
  instance.interceptors.request.use(
    config => { //请求发送成功到此
      console.log('request拦截器,请求发送成功:'+ typeof config);

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

      return result.data //把拦截的响应结果数据<data>放行
    },
    err => { //服务器响应失败的
      console.log('response拦截器,响应失败' + err);
      console.log(err);
    }
  )

  return instance(config) //返回instance方法,发送网络请求
}


/**第二个axios实例*/
export function request2(config) { // 第一个封装axios的函数; 参数config是传入对象,内含url, params 等参数

  axios.defaults.withCredentials = true //可以把cookie发送到服务器

  /**但是通过axios.creat()方法的源码可以看出,creat()方法就是返回了一个Promise,那么我们就可以直接把这个实例return,在调用处进行调用即可*/
  const instance = axios.create({ //创建axios实例
    baseURL: '/api',
    timeout: 40000
  })

  /**本axios实例的request拦截器,use()方法,参数1:请求发送成功;参数2:请求发送失败<即未发送请求>*/
  instance.interceptors.request.use(
    config => { //请求发送成功到此
      console.log('request拦截器,请求发送成功:'+ typeof config);

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

      return result.data //把拦截的响应结果数据<data>放行
    },
    err => { //服务器响应失败的
      console.log('response拦截器,响应失败' + err);
      console.log(err);
    }
  )

  return instance(config) //返回instance方法,发送网络请求
}
