<template>
  <div class="middle-menu">
    <div class="middle-menu-item" v-for="(item, index) in titles"
         :class="{active: index === currentIndex}"
          @click="itemActive(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MiddleMenu",
    props: {
      titles: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        currentIndex: 0 //middlemenu的当前索引,默认为0
      }
    },
    methods: {
      itemActive (index) {
        this.currentIndex = index
        this.$emit('activeMiddleMenuItem', index)
      }
    }
  }
</script>

<style scoped>
  .middle-menu {
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .middle-menu-item {
    flex: 1;
    text-align: center;
  }
  .active {
    color: var(--color-tint);
    border-bottom: var(--color-tint) solid 3px;
  }
</style>
