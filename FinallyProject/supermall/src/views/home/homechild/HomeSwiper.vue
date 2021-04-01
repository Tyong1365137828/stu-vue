<template>
    <swiper :slide="banners">
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperImgLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper"

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      swiperImgLoad () {
        this.$emit('swiperImgLoadReady') //只要有1张轮播图被加载好了,Dom就被撑开了,就可以不用考虑其他的轮播图是否加载完成,而是直接进行相应考虑位置的操作
      }
    }
  }
</script>

<style scoped>

</style>
