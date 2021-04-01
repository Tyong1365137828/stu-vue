<template>
  <div id="app">
    <h1>App</h1>
    <h3>{{$store.state.counter}}</h3><!--获取仓库的state中的属性-->
    <button @click="add">+</button>
    <button @click="sub">-</button>
    <button @click="addCount(5)">+5</button>
    <button @click="addCount(-10)">-10</button>
    <button @click="addCountSpecial(10)">+10《特殊风格提交》</button>

    <h4>{{$store.getters.powerCounter}}</h4><!--使用仓库的getters中的powerCounter-->
    <p>大于20岁学生的人数：{{$store.getters.moreTowentyStuLength}}</p>
    <p>大于24岁的学生：{{$store.getters.moreWhyStu(24)}}</p>

    <button @click="addStu">添加一个测试学生</button>

    <br><br>
    <p>
      {{$store.state.info}}
    </p>
    <button @click="addProp">添加sex属性</button>
    <button @click="deleteProp">删除age属性</button>
    <button @click="updName">异步方式修改name属性</button>

    <br><br>
    <p>获取modules内的state的数据:{{$store.state.a}}</p>
    <p>获取modules内的getters的数据:{{$store.getters.maMskName}}</p>
    <p>获取modules内的getters+getters的数据:{{$store.getters.maMMskName}}</p>
    <p>获取modules内的getters+rootState的数据:{{$store.getters.maMskNameByRoot}}</p>
    <button @click="updMAName">修改moduleA内的数据</button>
    <button @click="aUpdMAName">异步修改moduleA内的数据</button>

    <my-vuex/>
  </div>
</template>

<script>
  import MyVuex from "./components/MyVuex";
export default {
  name: 'App',
  components: {
    MyVuex
  },
  methods: {
    add () {
      this.$store.commit('addCounter')//通过提交,至store的mutations内的addCounter方法
    },
    sub () {
      this.$store.commit('subCounter')//通过提交,至store的mutations内的addCounter方法
    },
    addCount (count) { //mutations方法传递1个参数<专业词:payload>
      this.$store.commit('addCou', count)
    },
    addStu () {
      const stu = {id: '000', name: 'test000', age: 36} //当payload为对象时
      this.$store.commit('pushStu', stu)
    },
    addCountSpecial (count) {
      this.$store.commit({
        type: 'addCouSpecial',
        // count: count
        count
      })
    },
    addProp () {
      this.$store.commit('addProperty')
    },
    deleteProp () {
      this.$store.commit('deleteProperty')
    },
    updName () {
      this.$store
        .dispatch('aUpdateName', {message: 'My name is payload', act: '请使用异步方式修改name'}) //提交到action内的aUpdateName方法
        .then(res => {
          console.log('如果看到此,表示内部修改成功！！！');

          console.log(res); //打印resolve的参数
        })
    },
    updMAName () {
      this.$store.commit('updateMAName', '测试修改name成功')  //会优先去store内的mutation中寻找对应的方法,如果没有找到就取注册的modules中的mutations中去找
    },
    aUpdMAName () {
      this.$store.dispatch('aUpdateMAName')
    }
  }
}
</script>

<style>
</style>
