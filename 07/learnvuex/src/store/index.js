import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) //安装Vuex

const moduleA = { /**moduleA模组*/
  state: {
    name: 'test111'
  },
  mutations: {
    updateMAName (state, payload) {
      state.name = payload
    }
  },
  getters: {
    maMskName (state) {
      return 'mskMskMskMsk' + state.name + 'mskMskMskMsk'
    },
    maMMskName (state, getters) {
      return '---' + getters.maMskName + '---'
    },
    maMskNameByRoot (state, getters, rootState) { //rootState表示store的state
      return getters.maMMskName + rootState.counter
    }
  },
  actions: {
    aUpdateMAName (context) {
      setTimeout(() => {
        console.log(context);
        context.commit('updateMAName', '异步修改的name')
      }, 1500)
    }
  }

}

const store = new Vuex.Store({/**创建一个公共的仓库*/
  state: {  /**用于定义和存放共享的状态;  state单一状态树概念: single source of truth 即单一数据源 */
    counter: 1000,
    students: [
      {id: '01', name: 'tyong', age: 21},
      {id: '02', name: 'TY', age: 24},
      {id: '03', name: '汤勇', age: 20},
      {id: '04', name: 'OKKK', age: 25},
      {id: '05', name: 'Test', age: 29}
    ],
    info: {
      name: 'tyong',
      age: 20,
      height: 1.92,
      wight: 53
    }
  },
  mutations: {  /**定义方法,对于标准写法,所有的state改变操作都至少要经过此;mutation的方法都是同步的;如果是异步的,devtools就不能进行正确的跟踪;  mutation可以分为2部分,事件类型type<方法名>和回调函数<方法名后面的部分,包括:()">*/
    //默认会有一个state对象的参数 ,第一个参数就是state
    addCounter (state) {
      state.counter++
    },
    subCounter (state) {
      state.counter--
    },
    addCou (state, ccount) {  //参数二是接收传来的参数
      state.counter = state.counter + ccount
    },
    pushStu (state, student) { //参数二也可以是一个对象
      state.students.push(student)  //把传来的对象爱加入到students中
    },
    addCouSpecial (state, payload) {  /**处理特殊风格提交的参数;这时提交的参数是一个payload对象,提交的参数是其内部的属性*/
      state.counter += payload.count
    },
    addProperty (state) {
      // state.info['sex'] = '男' //给state内的info对象添加一个sex属性
      /**但是,会发现虽然state内的info对象已经发生了改变,但是页面没有变,这时因为Vuex响应的前提是数据要提前在state中声明*/

      //针对上述的问题,可以使用响应式的添加属性到对象的方法使其成为响应式的
      Vue.set(state.info, 'sex', '男') //给对象info添加属性sex,值为‘男’
    },
    deleteProperty (state) {
      // delete state.info.age //删除info对象的age属性
      /**同样,发现虽然info对象已经被修改,但是页面没有改变,原因是因为该方法不是响应式的,可以使用响应式的删除对象属性的方法*/

      // 针对上述问题
      Vue.delete(state.info, 'age') //即删除info对象的age属性
    },
    updateName (state) {  /**修改姓名*/
      state.info.name = '汤勇'
    }

  },
  actions: {  /**异步请求经过此步;为了能使devtools正常的跟踪*/
    aUpdateName (context, payload) { //参数1是一个上下文参数;参数2是payload,可以是字符串,对象,等等;
      return new Promise((resolve, reject) => { //这里的actions函数直接调用了的return Promise方法,那么调用者就相当于一个Promise,可以使用其内的.then()和.catch()方法
        setTimeout(() => {
          console.log(payload.message);
          console.log(payload.act);
          context.commit('updateName')  //提交到mutations的同步方法内

          resolve('resolve success')  //成功状态,调用.then()方法
        }, 2000)
      })
    }
  },
  getters: {/**类似于组件内的计算属性*/
    powerCounter (state) { //默认会有一个state对象的参数
      return state.counter * state.counter
    },
    moreTowentyStu (state) { //获取大于20岁的学生信息
      return state.students.filter(s => s.age > 20)
    },
    moreTowentyStuLength (state, getters) { //参数1是state对象;参数2是getters对象
      return getters.moreTowentyStu.length
    },
    moreWhyStu (state) {
      return function (wage) {  //因为getters内的方法的两个参数均为state对象和getters对象,如果要接受发来的参数,可以return一个函数进行接收
        return state.students.filter(s => s.age >wage)
      }
    }
  },
  modules: {/**为了保证单一语法树<即只有一个store>,但又会造成state内的代码臃肿的问题,*/
    /**a: {
      state: {},
      getters: {},
      mutations: {},
      actions: {},
      modules: {
        f: {
          state: {}, // ...........
        },
          // g: {},.......
        }
      }
    },
    b: {state: {}, getters: {}, mutations: {}, actions: {}}*/

    a: moduleA  //引入moduleA模块,此时moduleA被命名为a放入到state中

  }

  /**vuex实现响应式的过程: Vue component ————>  Action ————> Mutations ————> State ————> Vue component
   * 其中,Action是针对异步请求设计的,对应着后端的接口,可以在非异步请求中进行跳过;
   * Mutations对应着浏览器的插件devtools*/

})

//导出仓库
export default store
