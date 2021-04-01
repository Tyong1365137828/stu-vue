<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link"><img :src="item.image" alt=""></a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props: {
      recommends: {
        type: Array,
        default () {
          return []
        }
      }
    },

  }
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    padding: 10px 0 30px;

    border-bottom: 10px solid #e7e7e7;
  }
  .recommend-item {
    flex: 1;
  }
  .recommend-item img {
    width: 65px;
    height: 65px;
    margin-bottom: 10px;
  }
</style>
