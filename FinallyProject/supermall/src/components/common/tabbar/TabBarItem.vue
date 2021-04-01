<template>
  <div class="tab-bar-item" @click="itemClick">
<!--    <img src="../../assets/img/tabbar/home.svg" alt="首页图片">-->
<!--    <div>首页</div>-->

  <!--    注意:因为插槽被使用时直接被替换的,所以我们不能动态的绑定class到插槽,而是在其外层包裹一个div,对这个div进行动态绑定-->
      <div v-if="!isActive"><slot name="item-icon"></slot></div><!--预留图标具名插槽,如果被点击展示-->
      <div v-else><slot name="item-icon-active"></slot></div><!--预留活跃图标具名插槽,未被点击展示-->
<!--      <div :class="{active: isActive}"><slot name="item-text"></slot></div>&lt;!&ndash;预留文本具名插槽&ndash;&gt;-->
      <div :style="activeStyle"><slot name="item-text"></slot></div><!--预留文本具名插槽-->
    </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      link:  String,  /**每个组件的path*/
      activeColor: {  /**获取选中的文本颜色*/
        type: String,
        default: 'red'  /**如果不传入颜色,选中的文本颜色将默认为红色*/
      }
    },
    data () {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive () { /**决定选中与否的计算属性*/
        /**indexOf()方法, 实例:A.indexOf(B) A不等于括号内的参数B,返回-1;反之,不返回-1*/
        return this.$route.path.indexOf(this.link) !== -1 //即,当当前活跃的路由(url对应的路由)的path等于当前的link时, -1===-1, 即return true;反之return false
      },
      activeStyle () {  /**决定选中时的文本颜色的计算属性*/
        return this.isActive ? {color: this.activeColor} : {} //isActive存在,就是用传入的activeColor<'blue颜色'>;反之,不进行颜色的改变,即原本的黑色
      }
    },
    methods: {
      itemClick () {  /**当TabBarItem被点击*/
        // console.log(this.link);
        this.$router.push(this.link) /**把其link放入前端路由url中*/
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item { /*tabbaritem的样式*/
    flex: 1;/*均等分*/
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img { /*tabbaritem的图片样式*/
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle/*一般图片的下方会默认多出三个像素,使用这个属性可以取出掉它*/
  }
</style>
