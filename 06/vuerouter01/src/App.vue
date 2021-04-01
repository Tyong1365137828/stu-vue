<template>
  <div id="app">
    <h1>App页面</h1>
<!--    <router-view></router-view>&lt;!&ndash;占位作用,用于决定渲染在何处&ndash;&gt;-->

    <router-link to="/home">去首页</router-link><!--Vue的内置标签,默认最终会被处理为一个a标签;点击会将url变成home-->
    <router-link to="/about" tag="button">关于</router-link><!--把默认的a标签处理为button-->

    <!--router-link节点属性:replace属性;示例:replace;replace会使浏览器的向左向右按钮失效,即不能返回-->
    <!--router-link节点属性:tag属性;示例:tag="html页面DOM元素";会把router-link默认的a标签修改为对应的DOM元素-->
    <!--Vue有活跃提示功能,即当点击某个属性后,会为其添加两个class  router-link-exact-active 和 router-link-active
    其中router-link-exact-active用于路由嵌套处,router-link-active用于style渲染处-->
    <!--router-link节点属性:active-class属性,示例 active-class="active" 将该router-link节点的活跃状态的class默认的router-link-active 改成 active-->

<!--    <button @click="homeClick">去首页</button>-->
<!--    <button @click="aboutClick">关于</button>-->
    <router-link v-bind:to="'/user/'+userId">我的</router-link><!--params传递参数1-->
<!--    <router-link to="/profile">我的档案</router-link>-->
<!--    <router-link :to="{path: '/profile', query: {name: '汤勇', age: 20, height: 189}}">我的档案</router-link>&lt;!&ndash;query传递参数方式1&ndash;&gt;-->
    <button @click="profileClick">我的档案</button><!--query传递参数方式2-->

<!--    <router-view></router-view>&lt;!&ndash;占位作用,用于决定渲染在何处&ndash;&gt;-->
<!--    <keep-alive>&lt;!&ndash;使用 keep-alive标签 包住 router-view标签后, 大多数时候不会销毁, 这里即home、user、profile、等组件均不会被销毁&ndash;&gt;-->
<!--      <router-view></router-view>-->
<!--    </keep-alive>-->
    <keep-alive exclude="Profile,User"><!--即除了name="Profile"和name="User"的组件不会被频繁缓存,其余的组件均会被缓存;  注意:,不要加空格-->
      <!--include: 匹配的所有的name值的组件均会被缓存;其余未匹配的不会被缓存-->
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      userId: 'tyong'
    }
  },
  methods: {
    homeClick () {
      //通过代码修改路径
      // this.$router.push('/home');    //Vue-router给所有的DOM中都添加了router属性
      this.$router.replace('/home') //此时没有返回

      console.log('home被点击了');
    },
    aboutClick () {
      //通过代码修改路径
      // this.$router.push('/about')
      this.$router.replace('/about')  //此时没有返回
      console.log('about被点击了');
    },
    profileClick () {
      this.$router.push({
        path: '/profile',
        query: {
          name: '汤勇',
          age: 20,
          height: 189
        }
        })
    }

  }
}
</script>

<style>
  /*.router-link-active {
    color: red;
  }*/
  .active {
    color: #FF0000;
  }
</style>
