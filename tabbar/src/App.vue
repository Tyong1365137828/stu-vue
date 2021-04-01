<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from "./components/MainTabBar/MainTabBar"

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "./assets/css/base.css";  /*引入基本的css文件*/

</style>
