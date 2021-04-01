import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/home/Home'
import Cart from '../views/cart/Cart'
import Category from '../views/category/Category'
import Profile from '../views/profile/Profile'
import Detail from '../views/productdetail/ProductDetail'
import Demo from "../views/betterscrollDemo/Demo";

Vue.use(VueRouter)  //安装路由插件

const routes = [  //路由与路径的处理,路由表
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]
const router = new VueRouter({  //创建路由实例
  routes,  //在路由实例中注册路由表
  mode: 'history' /**URL框为history格式*/
})

export default router //导出路由
