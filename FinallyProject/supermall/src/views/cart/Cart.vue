<template>
  <div class="cart">

    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <scroll class="content" ref="scroll">
      <!--商品列表-->
      <cart-list></cart-list>

    </scroll>

    <!--底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex' //这个是vuex的内部函数,用于把store内的getters与局部组件的计算属性映射

  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      Scroll,
      CartBottomBar,

    },
    computed: {
      // getLength () {
      //   return this.$store.getters.getCartListLength
      // },

      /**mapGetters的两种用法*/
      // ...mapGetters([
      //   'getCartListLength',
      //   'getCartList'
      // ]) //用法1,数组写法
      ...mapGetters ({
        length: 'getCartListLength',
        // list: 'getCartList'
      }) //用法2,对象用法,这种做法可以起别名

    },

    /**当该组件活跃时*/
    activated() {
      this.$refs.scroll.mRefresh() //刷新scroll,以重新计算scroll高度
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
