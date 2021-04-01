<template>
  <div id="app">
    <keep-alive exclude="ProductDetail"><!--离开该组件(Home)时保持该组件(Home)的状态,除了name为ProductDetail的组件-->
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/MainTabBar/MainTabBar'

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "./assets/css/base.css";
</style>
