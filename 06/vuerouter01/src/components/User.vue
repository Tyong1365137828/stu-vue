<template>
  <div>
    <h2>我是用户界面</h2>
    <p>你好，{{userId}}</p>
<!--    <p>{{$route.params.uid}}</p>--><!--另一种方法-->
  </div>
</template>

<script>
  export default {
    name: "User",
    computed: {
      userId () {
        return this.$route.params.uid  //这个route就是当前活跃的路由;params表示当前路由下的参数(即 /路径/:参数);uid就是在路由中的index.js的 /user/:uid 的uid参数
      }
    },
    created() {
      console.log('user create');
    },
    destroyed() {
      console.log('user destroyed');
    },

    activated() {
      console.log('user active');
    },
    deactivated() {
      console.log('user deactive');
    }
  }
</script>

<style scoped>

</style>
