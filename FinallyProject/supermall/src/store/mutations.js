/**导入mutations常量*/
import {
  Add_Product_Count,
  Insert_Cart_Product
} from './mutation-types'

/**mutation设计原则,mutation唯一目的是修改state中的状态; 每个mutation方法尽可能完成的比较单一<即只改变1个state状态>*/
export default {

  /**商品数量+1*/
  [Add_Product_Count] (state, payload) { //商品数量+1
    payload.count++
  },

  /**插入新的商品至购物车*/
  [Insert_Cart_Product] (state, payload) { //增加商品对象至数组
    payload.check = true //为商品加入一个是否选中的属性 check
    state.cartList.push(payload)
  }
}
