<template>
  <div>
    <h1>我是主页</h1>
    <p>我是主页内容</p>

    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">消息</router-link>

    <router-view></router-view> <!--Home子路由的占位-->
  </div>
</template>

<script>
  export default {
    name: "Home",
    data () {
      return {
        path: '/home/news'
      }
    },
    created() { //组件创建时回调生命周期函数
      console.log('home created');
    },
    mounted() { //当template被挂载到DOM结点时回调生命周期函数
      console.log('home mounted');
    },
    updated() { //当页面发生改变时回调生命周期函数
      console.log('home updated');
    },

    /**下面这些函数只有在 keep-alive 存在使用包裹住该组件时,才是有效的*/
    destroyed() { //当页面销毁时
      console.log('home destroyed');
    },

    /**这两个函数与这个组件的父组件中的 keep-alive标签 配合实现记住当前url下的浏览组件,即上次浏览路由的子路由url*/
    activated() { //活跃时
      console.log('activePath:'+this.path);
      this.$router.push(this.path)  //活跃时把path属性加入到url框
    },
    beforeRouteLeave (to, from, next) {  //组件内的导航守卫,当离开此路由之前
      console.log(this.$route.path);
      this.path = this.$route.path  //把当前活跃的路由的path加入到当前path,用于记录当前浏览记录信息,在之后回到此页面时在当前的信息
      next()  //放行
    }

  }
</script>

<style scoped>

</style>
