<template>
  <div>
    <h2 class="title">{{message}}</h2>
    <p>sdnisdhhds sddssdv</p>
    <button @click="btnClick">按钮2000-10-02</button>
    <cp1/> <!--使用组件-->
  </div>
</template>

<script>
  import Cp from './Cpn.vue'; //导入Cpn组件

  export default {
    name: "App",
    components: {
      'cp1': Cp //注册组件
    },
    data () {
      return {
        message: '你好,webpack AND vue！！！,我是Root组件'
      }
    },
    methods: {
      btnClick () {
        console.log('我被点击了,vue!!!!');
      }
    }
  }
</script>

<style scoped>
  .title {
    color: red;
    font-size: 30px;
  }
</style>