<template>
  <div>
    <h3>Profile组件</h3>
    <h6>姓名：{{$route.query.name}}</h6>
    <h6>年龄：{{$route.query.age}}</h6>
    <h6>身高：{{$route.query.height}}</h6>
  </div>
</template>

<script>
  export default {
    name: "Profile",
    created() {
      console.log('profile create');
    },
    destroyed() {
      console.log('profile destroyed');
    },
    activated() {
      console.log('profile active');
    },
    deactivated() {
      console.log('profile deactive');
    }
  }
</script>

<style scoped>

</style>
