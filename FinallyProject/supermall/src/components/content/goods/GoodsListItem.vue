<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImg" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsListItem.title}}</p>
      <span class="price">{{goodsListItem.price}}</span><span class="collect">{{goodsListItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsItem",
    props: {
      goodsListItem: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {
      showImg () {
        return this.goodsListItem.image || this.goodsListItem.show.img //有goodsListItem.show.img就返回,没有就返回goodsListItem.img
      }
    },
    methods: {
      /**当这个img结点加载完<图片加载完>*/
      imgLoad () { /**因为图片是异步加载的,而BetterScroll在每次调用时只计算一次滑动的大小时,图片有可能没加载完就计算完了,此时,滑动的大小就计算的过小
       ,导致滑动到某些地方不能滑动,所以监听每个图片的加载,若加载成功,就调用这个方法,然后通过事件总线$bus发送一个事件,该事件会被$on进行监听接收,再其内部
       进行处理,调用重新刷新BetterScroll对象,以重新计算滑动的大小*/
      if (this.$route.path.indexOf('/home')) { //如果当前的路由是 /home
        this.$bus.$emit('homeItemImgLoad')
      } else if (this.$route.path.indexOf('/detail')) { //如果当前的路由是detail
        this.$bus.$emit('detailFeatureItemImgLoad')
      }
      /**事件总线可以用于没有父子关系的组件之间;注意:通过事件总线发射的事件,在全局任何地方使用$on('$emit发射的事件名')均可监听到*/

      },
      itemClick () {
        this.$router.push('/detail/' + this.goodsListItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
