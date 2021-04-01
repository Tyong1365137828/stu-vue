<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 0 2px rgba(100, 100, 100, 0.2);
  }
  .left, .right { /*left和right使用60px宽*/
    width: 60px;
  }
  .center {
    flex: 1;  /*让center使用剩余的部分*/
  }
</style>
