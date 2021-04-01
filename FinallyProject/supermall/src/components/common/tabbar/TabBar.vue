<template>
  <div id="tab-bar">
    <slot></slot> <!--预留插槽,用来插入TabBarItem组件-->
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar {  /*tarbar的样式*/
    display: flex;
    background-color: #f6f6f6;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /*z-index: 9;*/

    box-shadow: 0 -3px 2px rgba(100, 100, 100, 0.2); /*设置阴影  参数依次为:x偏移量、y偏移量、模糊程度、颜色*/
  }

</style>
