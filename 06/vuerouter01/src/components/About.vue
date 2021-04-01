<template>
  <div>
    <h2>我是关于页面</h2>
    <p>关于页面的内容</p>
  </div>
</template>

<script>
  export default {
    name: "About",
    created() {
      console.log('about create');
    },
    destroyed() {
      console.log('about destroyed');
    },
  }
</script>

<style scoped>

</style>
