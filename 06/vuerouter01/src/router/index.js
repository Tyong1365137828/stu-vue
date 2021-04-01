/**配置路由相关的信息*/
import Vue from 'vue' //导入vue
import VueRouter from 'vue-router' //导入路由

/**这种方式业务代码会打包成一个app文件，那么服务器在请求时会一次把这个文件加载过来，当代码量大的时候就会出现意想不到的问题*/
// import Home from '../components/Home'
// import About from '../components/About'
// import User from '../components/User'

  /**这种方式加载的组件，打包时业务代码会成为多个js文件，此时页面需要时才继续向服务器请求，每次请求资源量变少，实现了路由的懒加载*/
const Home = () => import('../components/Home');
const HomeNews = () => import('../components/HomeNews');
const HomeMessage = () => import('../components/HomeMessage');

const About = () => import('../components/About');
const User = () => import('../components/User');

const Profile = () => import('../components/Profile')

//通过vue.use传入插件 vue-router 的实例,进行插件安装
Vue.use(VueRouter)

//抽离出的路由映射关系
const routes = [
  {//配置默认页面为home首页
    // path: '/', //或使用
    path: '',
    redirect: '/home' //重定向至 /home
  },
  {//配置home(/home)
    path: '/home',
    component: Home,
    meta: { //元数据，即描述数据的数据
      title: '首页'
    },
    children: [ //路由嵌套,配置子路由
      // {//配置默认为 /home/news
      //   path: '',
      //   redirect: 'news'
      // },
      {//(/home/news)
        path: 'news', //对应url路径：/home/news
        component: HomeNews
      },
      {//(/home/message)
        path: 'message',  //对应url路径：/home/message
        component: HomeMessage
      }
    ]
  },
  {//配置关于(/about)
    path: '/about',
    component: About,
    meta: { //元数据，即描述数据的数据
      title: '关于'
    },
    beforeEnter: (to, from, next) => {  /**路由独享守卫,进入此路由之前的钩子函数*/
      console.log('about beforeEach');
      next();
    }
  },
  {//配置用户,动态路由(/user/<uid>)
    path: '/user/:uid',
    component: User,
    meta: { //元数据，即描述数据的数据
      title: '用户'
    },
  },
  {//配置档案(/profile)
    path: '/profile',
    component: Profile,
    meta: { //元数据，即描述数据的数据
      title: '档案'
    },
  }
]

//创建路由对象
const router = new VueRouter({
  routes,  //把路由映射关系通过ES6的对象字面量增强写法加入到路由对象
  mode: 'history', //把url默认的hash模式改为H5的history模式(即去除url的 # )
  linkActiveClass: 'active' //将所有处于活跃的router-link节点的class从默认的 router-link-active 修改为 active

})



/**全局导航守护,路由变化就做出相应的操作*/
/**vue-router全局导航守护;前置守卫(guard)*/
router.beforeEach(function (to, from ,next) {
  //从from跳转到to
  // document.title = to.meta.title  //从路由的原数据中取出title属性
  document.title = to.matched[0].meta.title //为了解决如home路由中含有嵌套路由的问题处理   matched:某个路由的内部数组,即取出第一个路由,即home
  /**路由跳转时改变html页面的title属性*/

  console.log('beforeEach');

  next(); //使能够执行下一步,即放行
})
/**全局导航守护；后置钩子(hook)*/
router.afterEach((to, from) => {  //使用箭头函数的写法
  console.log('afterEach');
})

//导出路由对象
export default router
