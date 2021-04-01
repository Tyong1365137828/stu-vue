<template>
    <nav-bar>
      <div slot="left">
        <img src="~assets/img/common/back.svg" alt="返回"
             class="back-img"
             @click="backClick">
      </div>
      <div slot="center" class="titles">
        <div v-for="(item, index) in titles" class="title"
             :class="{active: index === currentIndex}"
             @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar";


  export default {
    name: "DetailNavBar",
    data () {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      itemClick (index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick () {
        this.$router.back('/home')
      }
    }
  }
</script>

<style scoped>
  .titles {
    display: flex;
  }
  .title {
    flex: 1;
  }
  .active {
    color: var(--color-tint);
  }

  .back-img {
    margin-top: 10px;
  }

</style>
