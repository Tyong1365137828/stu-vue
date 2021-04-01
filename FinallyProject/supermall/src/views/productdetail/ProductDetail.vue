<template>
 <div id="detail" v-cloak>
   <detail-nav-bar class="detail-nav-bar" @titleClick="mTitleClick" ref="navTitle"></detail-nav-bar>
   <scroll class="detail-scroll" ref="rScroll" :p-probe-type="3" @scrollWhere="mScrollWhere">
     <ul>
       <li v-for="item in this.$store.state.cartList">{{item}}</li>
     </ul>

     <detail-swiper :p-top-imgs="topImgs" @detailSwiperImgLoadReady="mDetailSwiperImgLoadReady"></detail-swiper>
     <detail-base-info :goods="goods"/>
     <detail-shop-info :shop="shop"/>
     <detail-goods-info :detail-info="detailInfo" @imgAllLoad="mGoodImageAllLoad"/>
     <detail-param-info :param-info="paramInfo" ref="params"/>
     <detail-comment-info :comment-info="commentInfo" ref="comments"></detail-comment-info>
     <goods-list :goodsList="recommends" ref="recommends"></goods-list>

   </scroll>

   <detail-bottom-bar @addCart="mAddCart"></detail-bottom-bar>

   <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>

 </div>
</template>

<script>

  import {mapGetters, mapActions} from 'vuex' //mapActions使用参考mapGetters

  import DetailNavBar from "./child/DetailNavBar";
  import DetailSwiper from "./child/DetailSwiper";
  import DetailBaseInfo from './child/DetailBaseInfo'
  import DetailShopInfo from './child/DetailShopInfo'
  import DetailGoodsInfo from './child/DetailGoodsInfo'
  import DetailParamInfo from "./child/DetailParamInfo";
  import DetailCommentInfo from "./child/DetailCommentInfo";
  import DetailBottomBar from "./child/DetailBottomBar"

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {debounce} from "common/utils"
  import {backTopMixin} from "common/mixin"

  import {getProductDetail, Goods, Shop, GoodsParam, getRecommend} from "network/productDetail"
  import BackTop from "../../components/content/backtop/BackTop";

  export default {
    name: "ProductDetail",
    mixins:[backTopMixin],
    data () {
      return {
        id: null, //商品id
        topImgs: [], //商品的轮播图
        goods: {}, //商品信息对象
        shop: {}, //店铺信息对象
        detailInfo: {}, //商品详细的展示,如试穿图片等
        paramInfo: {}, //商品参数的信息
        commentInfo: {}, //评论信息
        recommends: [], //推荐商品的信息

        titlesCurrentIndex: 0, //存储当前数组titlesOffsetTopYs要展示的索引
        titleOffsetTopYs: [], // 存储各个title的offsetTop值
        debounceGetTitleOffsetTopFun: null, // 存储防抖后的获取title的offectTop值的函数变量

      }
    },
    components: {
      BackTop,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
    },
    created () {
      this.id = this.$route.params.iid //获取当前商品的iid

      this.mGetProductDetail(this.id) //发送请求商品详情的网络请求

      this.mGetRecommend() //发送请求推荐商品

      /**$nextTick函数,在该组件的Dom元素加载完毕之后会调用一次其参数<回调函数>*/
      // this.$nextTick(() => {
      //   this.titleOffsetTopYs = [] //防止多次执行这个函数为titleOffsetTopYs赋值时赋值多次,所以每次执行这个函数先将titleOffsetTopYs数组清空
      //
      //   this.titleOffsetTopYs.push(0) //商品title的offsetTop值
      //   this.titleOffsetTopYs.push(this.$refs.params.$el.offsetTop) //参数title的offsetTop值
      //   this.titleOffsetTopYs.push(this.$refs.comments.$el.offsetTop) //评论title的offsetTop值
      //   this.titleOffsetTopYs.push(this.$refs.recommends.$el.offsetTop) //推荐title的offsetTop值
      //
      //   console.log(this.titleOffsetTopYs);
      // })

      //对获取title的offsetTop的函数进行防抖处理
      // this.debounceGetTitleOffectTopFun = debounce (this.getTitleOffectTop, 200)

    },
    destroyed () { //因为这个组件 keep-alive 被排除在外,所以这里不能使用deactived,而是使用destroyed
    },
    updated () { //这个组件发送改变时执行这个函数
      console.log('update');
    },
    mounted () {

      const sc = this.$refs.rScroll //调用ref的name名为rScroll的组件对象;
      const debounceRefresh = debounce(sc.mRefresh, 200) //对sc内封装的刷新BetterScroll函数mRefresh进行防抖动处理,得到一个新的防抖动处理后的函数debounceRefresh,但是注意不要传入括号
      /**监听通过事件总线发来的事件:推荐商品图片加载完毕*/
      this.$bus.$on('detailFeatureItemImgLoad', () => {

        debounceRefresh(); //调用防抖动处理后的函数,以重新计算滑动的大小

        console.log('调用了mounted中的refresh');
      })
    },
    methods: {

      /**同样有两种方式*/
      ...mapActions(['addToCart']), //把store的actions方法映射到局部组件的methods中

      /**商品的详情*/
      mGetProductDetail (id) {
        getProductDetail (id)
          .then(res => {
            // 1.获取请求的data数据
            const data = res.result
            console.log(data);

            this.topImgs = data.itemInfo.topImages //持久化轮播图的数据

            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            // 3.创建店铺信息的对象
            this.shop = new Shop(data.shopInfo)

            // 4.保存商品的详情数据
            this.detailInfo = data.detailInfo;

            // 5.获取商品的参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

            // 6.获取评论信息
            if (data.rate.cRate !== 0) { //如果有评论信息
              this.commentInfo = data.rate.list[0] //取出第一条信息记录
            }
          })
      },

      /**推荐商品*/
      mGetRecommend () {
        getRecommend ()
          .then(res => {
            this.recommends = res.data.list //持久化推荐商品数据信息
          })
      },

      mGoodImageAllLoad() { //商品详细信息的图片全部加载完成
        this.$refs.rScroll.mRefresh() //对scroll进行刷新,以重新计算待滑动区域的大小

        this.mGetTitleOffectTop() //执行获取各个offsetTop的值,因为所有的商品信息图片的数据量必定比一张轮播图的数据量大,所以在这个函数时轮播图的图片已经被加载上了,之后可以进行获取各个title的offsetTop值
      },
      mDetailSwiperImgLoadReady () { //1张轮播图图片已经加载完毕,DOM已经被撑开
        this.$refs.rScroll.mRefresh() //对scroll进行刷新,以重新计算待滑动区域的大小
      },

      mGetTitleOffectTop () { //获取各个title的offsetTop值
        this.titleOffsetTopYs = [] //防止多次执行这个函数为titleOffsetTopYs赋值时赋值多次,所以每次执行这个函数先将titleOffsetTopYs数组清空

        this.titleOffsetTopYs.push(0) // 商品title的offsetTop值必定为0
        this.titleOffsetTopYs.push(this.$refs.params.$el.offsetTop) // 参数title的offsetTop值
        this.titleOffsetTopYs.push(this.$refs.comments.$el.offsetTop) // 评论title的offsetTop值
        this.titleOffsetTopYs.push(this.$refs.recommends.$el.offsetTop) // 推荐title的offsetTop值

        this.titleOffsetTopYs.push(Number.MAX_VALUE) // 加入一个特别大的值

        console.log(this.titleOffsetTopYs);

      },

      mTitleClick (index) { //title被点击
        this.$refs.rScroll.mScrollTo(0, -this.titleOffsetTopYs[index], 200)
      },

      mScrollWhere (position) { //监听scroll滚动到何处,决定哪个title的选中
        // console.log(position);
        /***
         * 思路: 使用当前scroll的y值与存储titles的y值进行对比,决定展示哪个title
         * positionY在 =0 到 ... 之间,展示第一个 商品 title, index = 0
         * positionY在 =... 到 ... 之间,展示第一个 参数 title, index = 1
         * positionY在 =... 到 ... 之间,展示第一个 评论 title, index = 2
         * positionY超过 =.. ,展示最后一个 推荐 title, index = 3
         *
         * 但是注意数组是从0开始遍历的,与数组的长度相差1,且最后一个titles数组元素不能与前面的titles数组元素在一起判断,因为数组会有可能越界,导致最后一位无法正常判断
         */
        let positionY = -position.y //获取当前滚动的scroll的y,注意取反
        let length = this.titleOffsetTopYs.length //获取所有titles的offsetTop数组的长度

        for (let i = 0; i < length; i++) { //循环得出每个titleOffsetTopYs的索引
          if ( this.titlesCurrentIndex !== i &&    //判断当前要展示的数组索引titlesCurrentIndex 是否等于当前遍历的索引 i,不等于时不进行下面的判断操作,以减少执行判断的频率,防止赋值过于频繁
            ( (i < length - 1 && positionY >= this.titleOffsetTopYs[i] && positionY < this.titleOffsetTopYs[i+1] ) //判断除了数组titleOffsetTopYs最后一位元素
              ||
             ( i === length - 1 && positionY >= this.titleOffsetTopYs[i] ) )) { //判断数组titleOffsetTopYs最后一位元素

            this.titlesCurrentIndex = i //让要展示的数组索引 titlesCurrentIndex 等于当前正在遍历的索引 i ,达到下次在相同索引时滚动不再执行if内的代码
            console.log(this.titlesCurrentIndex);

            this.$refs.navTitle.currentIndex = this.titlesCurrentIndex //把当前要展示titles的索引传递给navBar组件内,进行相应的展示
          }
        }

        this.mIsShowBackTop(position) //调用混入的决定是否显示隐藏的回顶按钮函数

        /***
         * 思路二: 可以在数组的最后一位元素加上一个特别大的数,但是遍历时只遍历 前最后一位-1 个元素即可
         * [0, 2556, 2256, ..., Number.MAX_VALUE]
         */
        // let positionY2 = -position.y //获取当前滚动的scroll的y,注意取反
        // let length2 = this.titleOffsetTopYs.length-1 //获取所有titles的offsetTop数组的长度
        //
        // for (let i = 0; i < length; i++) { //循环得出每个titleOffsetTopYs的索引
        //   if ( this.titlesCurrentIndex !== i &&    //判断当前要展示的数组索引titlesCurrentIndex 是否等于当前遍历的索引 i,不等于时不进行下面的判断操作,以减少执行判断的频率,防止赋值过于频繁
        //     ( (i < length2 - 1 && positionY2 >= this.titleOffsetTopYs[i] && positionY2 < this.titleOffsetTopYs[i+1] ) //判断除了数组titleOffsetTopYs最后一位元素
        //    )) { //判断数组titleOffsetTopYs最后一位元素
        //
        //     this.titlesCurrentIndex = i //让要展示的数组索引 titlesCurrentIndex 等于当前正在遍历的索引 i ,达到下次在相同索引时滚动不再执行if内的代码
        //     console.log(this.titlesCurrentIndex);
        //
        //     this.$refs.navTitle.currentIndex = this.titlesCurrentIndex //把当前要展示titles的索引传递给navBar组件内,进行相应的展示
        //   }
        // }

      },

      mAddCart () {
        const product = {} // 添加到购物车的商品对象
        product.image = this.topImgs[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.id = this.id

        // this.$store.dispatch('addToCart', product)        // 提交到store的action中的addToCart方法进行公共仓库存储
        //   .then(res => {
        //     console.log(res);
        //     this.$toast.toShow(res, 2000)
        //   })

        //或者使用mapActions方式
        this.addToCart(product)
          .then(res => {
            console.log(res);
            this.$toast.toShow(res, 2000)
          })

      }

    }
  }
</script>

<style scoped>
  [v-cloak] { /*存在v-cloak ,就不展示内容*/
    display: none;
  }
  #detail {
    /*覆盖掉tabber*/
    position: relative;
    z-index: 9;
    background-color: #fff;
    /*覆盖掉tabber*/

    height: 100vh; /*高度为100%视图*/
  }
  .detail-nav-bar { /*顶部菜单*/
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .detail-scroll {
    /*height: calc(100% - 44px - 59px); !*Scroll的高度,即可滑动的区域高度,相对于父组件#detail的100% - 顶部是bar*!*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
