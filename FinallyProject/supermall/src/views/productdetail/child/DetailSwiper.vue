<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in pTopImgs" :key="item">
      <img :src="item" alt="" @load="detailSwiperImgLoad">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'


  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem

    },
    props: {
      pTopImgs: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
      detailSwiperImgLoad () {
        this.$emit('detailSwiperImgLoadReady')
      }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
  }

</style>
