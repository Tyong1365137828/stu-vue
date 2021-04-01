<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <middle-menu :titles="['推荐', '新品', '热卖']"
                 @activeMiddleMenuItem="mGetMiddleMenu"
                 class="middleMenu1"
                 ref="middleMenu1"
                 v-show="isFixedMiddleMenu">
    </middle-menu><!--不在滑动区域设置此,并把其布局设置为relative,即在nav-bar组件的下方,默认为隐藏,目的是待滑块内的middel-menu组件到达offsetTop,即将离开滑块时显示这个滑块-->
    <better-scroll class="content" ref="rScroll" :p-probe-type="3" @scrollWhere="mIsShowItemsForPosition"
                   :p-pull-up-load="true" @readyUp="mLoadMore">
      <home-swiper :banners="banners" @swiperImgLoadReady="mSwiperImgLoad"></home-swiper>

      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature></home-feature>
      <middle-menu :titles="['推荐', '新品', '热卖']"
                   @activeMiddleMenuItem="mGetMiddleMenu"
                    ref="middleMenu2">
      </middle-menu>
      <goods :goods-list="isShowMiddleMenuItem"></goods>
    </better-scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top> <!--组件不能被直接v-on监听原生事件,而是要使用native属性-->

  </div>
</template>

<script>
  import HomeSwiper from "./homechild/HomeSwiper";
  import HomeRecommend from "./homechild/HomeRecommend";
  import HomeFeature from "./homechild/HomeFeature";

  import NavBar from "components/common/navbar/NavBar";
  import MiddleMenu from "components/common/middlemenu/MiddleMenu";
  import Goods from "components/content/goods/GoodsList";
  import BetterScroll from "components/common/scroll/Scroll"

  import {debounce} from "common/utils"
  import {backTopMixin} from "common/mixin" //导入混入

  import {getHomeMultiData, getHomeGoods, test} from "network/home"

  export default {
    name: "Home",
    mixins: [backTopMixin], //使用混入
    data () {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentMiddleMenuItemType: 'pop', //默认的中间菜单属性
        isShowBackTop: false, //默认不显示回到最上按钮
        middleMenuOffsetTop: 582, //默认的中间菜单的offsetTop大小
        isFixedMiddleMenu: false, //是否固定middleMenu,实际上是是否显示
        saveY: 0, //用于保存Y轴的位置
      }
    },
    computed: {
      isShowMiddleMenuItem () { //展示特定的MiddleMenuItem中的商品
        return this.goods[this.currentMiddleMenuItemType].list
      }
    },
    components: {
      NavBar,
      MiddleMenu,
      BetterScroll,
      Goods,
      HomeSwiper,
      HomeRecommend,
      HomeFeature
    },
    created() { //当组件创建成功,发送网络请求,获取数据
      /**使用这种封装方法可以使层次更加清晰,created只有主要的逻辑,而methods处理这些逻辑的详细方法;同时,如果需要传递参数或需要多次使用
       * 某个方法时,代码的逻辑和可读性更优*/

      /**请求 轮播图、推荐商品等数据*/
      this.mGetHomeMultiData() //调用methods内的方法,其内部封装了数据处理的细节

      /**请求各种类型的商品数据 流行、新的、精选商品数据*/
      this.mGetHomeGoods('pop') //请求pop "流行"的数据
      this.mGetHomeGoods('new') //请求new "新"的数据
      this.mGetHomeGoods('sell') //请求sell "精选"的数据

      // this.mTest()

    },
    activated() { //该组件活跃时,即点击该组件
      const sc = this.$refs.rScroll //调用ref的name名为rScroll的组件对象;
      sc.mScrollTo(0, this.saveY, 0) //调用封装的scroll到何处的方法
      sc.mRefresh() //最好进行一次刷新,不然有时不会生效
    },
    deactivated() { //该组件不活跃时,即每点击该组件
      const sc = this.$refs.rScroll //调用ref的name名为rScroll的组件对象;
      this.saveY = sc.mGetY() //调用封装的获取scroll的Y轴方法,并把它存储到saveY属性,以供下次使用
    },
    mounted () {

      const sc = this.$refs.rScroll //调用ref的name名为rScroll的组件对象;
      const debounceRefresh = debounce(sc.mRefresh, 200) //对sc内封装的刷新BetterScroll函数mRefresh进行防抖动处理,得到一个新的防抖动处理后的函数debounceRefresh,但是注意不要传入括号
      /**监听通过事件总线发来的事件*/
      this.$bus.$on('itemImgLoad', () => {

        debounceRefresh(); //调用防抖动处理后的函数,以重新计算滑动的大小

        console.log('调用了mounted中的refresh');
      })
    },
    methods: {

      /**网络请求的方法*/
      mGetHomeMultiData () {
        // console.log('sdvsdadasvavavaavd')

        getHomeMultiData()
          .then(res => {
            console.log('sdvsdadasvavavaavd')

            this.banners = res.data.banner.list //保存请求到的数据res中的banner赋值至data中的banners
            this.recommends = res.data.recommend.list
            console.log()
            console.log()
            console.log(res.data.banner.list);
            console.log()
            console.log()
          })
      },
      mGetHomeGoods (type) {
        const page = this.goods[type].page + 1 //获取当前传入的type的page
        getHomeGoods (type, page)
          .then(res => {
            // this.goods[type].list = res.data.list //把获取到的数据的list持久化到goods中相应的type对象内的list内
            this.goods[type].list.push(...res.data.list) // ... 表示可变参数,即多个参数,这里指把这多个数据数组推入指定的数据中
            this.goods[type].page += 1 //把goods中相应的type对象内的page+1,增强代码的复用性,方便下次调用时的使用


            const sc = this.$refs.rScroll //调用ref的name名为rScroll的组件对象;
            sc.mFinshPullUp(); //调用封装的下拉事件完成方法
          })
      },
      // mTest () {
      //   test ()
      //     .then(res => {
      //       console.log('测试接口:'+ typeof res);
      //       console.log(res);
      //     })
      // },

      /**其他方法*/
      mGetMiddleMenu (index) {
        console.log(index);
        switch (index) {
          case 0:
            this.currentMiddleMenuItemType = 'pop'
            break
          case 1:
            this.currentMiddleMenuItemType = 'new'
            break
          case 2:
            this.currentMiddleMenuItemType = 'sell'
            break
        }
        /**把两个组件的当前索引都设置为index,即设置成相同的index,即可获取相同的商品信息*/
        this.$refs.middleMenu1.currentIndex = index
        this.$refs.middleMenu2.currentIndex = index
      },
      mIsShowItemsForPosition (position) { //根据滚动决定是否展示隐藏的元素

        this.mIsShowBackTop(position) //调用混入的决定是否显示隐藏的回顶按钮函数
        this.isFixedMiddleMenu = - position.y > this.middleMenuOffsetTop //决定是否展示隐藏的中间菜单
      },
      mLoadMore () { //上拉加载更多
        this.mGetHomeGoods(this.currentMiddleMenuItemType) //调用加载当前类型商品的方法
      },

      mSwiperImgLoad () { //当轮播图加载完毕
        // console.log(this.$refs.middleMenu.$el.offsetTop); // $el获取组件的元素, offsetTop获取组件的顶部距离0位置距离
        this.middleMenuOffsetTop = this.$refs.middleMenu2.$el.offsetTop
      }

    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    /*z-index: 9;*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
  }
  #home {
    /*padding-top: 44px;*/
    height: 100vh;/*100视口高度*/
    position: relative;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .middleMenu1 {
    position: relative;
    z-index: 9;
  }
  /*.middle-menu {*/

  /*  !**这两个配合表示,当该结点未到top=44px时position布局为44px;当到达44px时position布局为fixed*!*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  !***!*/

  /*  z-index: 9;*/
  /*}*/
</style>
