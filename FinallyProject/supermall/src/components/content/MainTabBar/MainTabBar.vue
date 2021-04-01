<!--TabBar的入口-->
<template>
  <TabBar><!--使用组件-->
    <TabBarItem link="/home" active-color="blue"><!--使用TabBar的插槽;link是用来给子组件props的path;active-color是用来给选中子组件的颜色-->
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="家图片"><!--使用TabBarItem中的具名插槽-->
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="选中家的图片">
      <div slot="item-text">首页</div>
    </TabBarItem>
    <TabBarItem link="/category" active-color="blue"><!--使用TabBar的插槽-->
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="分类图片">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="选中分类的图片">
      <div slot="item-text">分类</div>
    </TabBarItem>
    <TabBarItem link="/cart" active-color="gold"><!--使用TabBar的插槽-->
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="购物车图片">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="选中购物车的图片">
      <div slot="item-text">购物车</div>
    </TabBarItem>
    <TabBarItem link="/profile"  active-color="orange"><!--使用TabBar的插槽-->
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="我的档案图片">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="选中我的档案的图片">
      <div slot="item-text">我的</div>
    </TabBarItem>
  </TabBar>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar" //引入TabBar组件
  import TabBarItem from "components/common/tabbar/TabBarItem" //引入TabBarItem组件

  export default {
    name: "MainTabBar",
    components: {
      TabBar,  //注册组件
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
