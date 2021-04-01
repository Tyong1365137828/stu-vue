<template>
  <div class="goods">
    <goods-list-item v-for="itme in goodsList" :goods-list-item="itme"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "Goods",
    props: {
      goodsList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;/*默认为nowrap,不包裹;设置为wrap<包裹>,会根据展示大小自动决定一行显示多少个元素*/
    justify-content: space-around;/*设置每行均等分*/
  }

</style>
