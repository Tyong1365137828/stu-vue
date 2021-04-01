<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button class="check-button" @click.native="allCheckClick" :is-check="isAllCheck"></check-button>
      <span>全选</span>
    </div>

    <div class="all-price">合计:￥{{totalPrice}}</div>

    <div class="calculate" @click="computedClick">去计算({{totalProduct}})个</div>
  </div>
</template>

<script>

  import CheckButton from "components/content/checkbutton/CheckButton";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton,

    },
    data () {
      return {
        product_buy: []
      }
    },
    computed: {
      ...mapGetters({
        length: 'getCartListLength',
        list: 'getCartList'
      }),
      totalPrice () { /**计算全部商品的总价*/
        return this.$store.getters.getCartList
        .filter(item => { //过滤check为true的值
          return item.check
        })
        .reduce((preValue, item) => { //计算过滤后的商品的总价
          return preValue + item.price * item.count
        }, 0)
      },
      totalProduct () { /**计算购物车全部的商品种类数*/
        return this.$store.getters.getCartList
          .filter(item => item.check).length //获取所有选中的商品的种类数
      },
      isAllCheck () { /**判断是否全部选中*/
        if (this.$store.getters.getCartListLength === 0) return false //如果购物车没有商品,返回false,即没有全选

        // for (let item of this.$store.getters.getCartList) { // 如果购物车存在商品
        //   if (!item.check) { // 如果发现有item不是check状态
        //     return false //返回false,终止循环,即不是全选
        //   }
        // }
        // return true //如果循环完成依然没有返回false,即表示所有的item都是check状态,即全选,返回true

        /**使用数组 find高级函数 实现*/
        return !this.$store.getters.getCartList.find(item => !item.check) /**如果某个项目找到没有check属性,就返回true;再进行取反,即返回false,表示没有全部选中*/

      },
      isNoCheck () { /**判断没有选中商品*/
        if (this.length === 0) return true /**如果长度为0,返回true,表示没有选中任何商品*/
        return !this.list.find(item => item.check) /**如果某个项目找到check属性,就返回true,再进行取反,即返回false,表示存在选中的商品*/
      }

    },
    methods: {
      allCheckClick () { /**点击全选按钮*/
        if (this.isAllCheck) { //如果是全部选中
          this.list.forEach(item => item.check = false) //把所有的item的check变成false
        } else { //如果都没选中或者部分选中
          this.list.forEach(item => item.check = true) //把所有的item的check变成true
        }
      },
      computedClick () { /**结算*/
        if (this.isNoCheck) { // 如果没有选中商品
          this.$toast.toShow('没有商品结账', 2000)
        } else {
          this.product_buy = this.$store.getters.getCartList
            .filter(item => item.check);

          this.product_buy.forEach(item => {
            console.log("商品" + item.title + '*' + item.count);
          })



          console.log('支付成功');
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 49px;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: #eee;
    display: flex;
    text-align: center;

  }
  .check-content {
    display: flex;
    align-items: center; /*内部的每个item都居中对齐*/
    margin-left: 10px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px; /*因为行高 line-height 会继承,所以这里要把前面的40行高覆盖为20行高*/
  }
  .all-price {
    flex: 1;
  }
  .calculate {
    width: 120px;
    background-color: red;
    color: #fff;
  }
</style>
