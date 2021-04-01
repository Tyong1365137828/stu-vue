<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data () {
      return {
        message: '',
        isShow: false,
      }
    },
    methods: {
      toShow (message='自定义toast插件', showTime=2000) {
        /**设置默认值*/
        // message = message || '自定义toast插件'
        // showTime = showTime || 2000


        this.isShow = true //更改isShow为true,让这个组件能够显示
        this.message = message //这个组件展示的信息

        setTimeout(() => {
          this.isShow = false //更改isShow为false,让这个组件不显示
          this.message = '' //要显示的信息置为空
        }, showTime)
      }
    }

  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
    padding: 8px 10px;

    z-index: 999;

    color: #fff;
    background-color: rgba(0, 0, 0, 0.65);
  }
</style>
