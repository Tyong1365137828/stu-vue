<template>
  <div>
    <h2>{{mes}}</h2>
    <p>我是Cpn组件{{content}}</p>

  </div>
</template>

<script>
  export default {
    name: "Cpn",
    data () {
      return {
        mes: '我是Cpn组件',
        content: 'Cpn组件内容'
      }
    }
  }
</script>

<style scoped>

</style>