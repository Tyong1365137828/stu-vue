/**home页面的网络请求*/
import {request, request2} from "./request";

export function getHomeMultiData() {
  return request({
    url: '/home/multidata',
    method: 'get'
  })
}

export function getHomeGoods(type, page) { //请求的参数,参数1是类型,参数2是第几页
  return request({
    url: '/home/data',
    params: {
      type,
      page
    },
    method: 'get'
  })
}

export function test() {
 return request2({
   url: '/index/test'
 })
}
