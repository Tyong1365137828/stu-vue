<template>
  <div class="wrap" ref="bScroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BetterScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      pProbeType: {
        type: Number,
        default: 0 //默认不监听
      },
      pPullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        scroll: null //定义一个用于存储new BetterScroll的对象
      }
    },
    mounted() {

      /**把当前的BetterScroll new的对象赋值给scroll属性,以供保存*/
      this.scroll = new BetterScroll(this.$refs.bScroll, {
        probeType: this.pProbeType, //等于props内的pProbeType的值,由父组件传入值决定进行何种监听
        click: true, //内部的div等元素可以点击
        mouseWheel: true, //鼠标可滚动
        pullUpLoad: this.pPullUpLoad, //决定是否下拉事件,根据父组件传入的值决定
      })

      /**实时监听滚动的信息*/
      this.scroll.on('scroll', position => { //参数1、类型为滚动;参数2、一个回调函数,该函数的参数position,当前滚动的位置,内有X,Y轴的值,注意正负之分
        this.$emit('scrollWhere', position)
      })

      /**监听上拉事件*/
      this.scroll.on('pullingUp', () => {
        this.$emit('readyUp')
      })
    },
    methods: {

      /**封装定义Scroll回滚到何处*/
      mScrollTo (x, y, time = 400) { /**对BetterScroll原生的scrollTo()方法进行封装;默认在400ms内完成回滚*/
        this.scroll.scrollTo(x, y, time) //调用原生的scrollTo()方法
      },

      /**封装定义上拉事件完成方法*/
      mFinshPullUp () {
        setTimeout(() => {
          this.scroll.finishPullUp() //调用原生的finishPullUp()方法,上拉事件完成
        }, 3000)
      },

      /**封装BetterScroll刷新方法*/
      mRefresh () {
        this.scroll.refresh() //调用原生的刷新方法
        console.log('调用了mRefresh');
      },

      /**封装获取Y轴的方法*/
      mGetY () {
        return this.scroll ? this.scroll.y : 0 //如果scroll存在,就获取当前scroll的y;反之,就返回0
      }
    }
  }
</script>

<style scoped>

</style>
