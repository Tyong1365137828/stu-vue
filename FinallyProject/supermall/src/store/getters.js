/***
 * 获取store的state内的状态
 */
export default {

  /**获取购物车内的商品种类个数*/
  getCartListLength (state) {
    return state.cartList.length
  },

  /**获取购物车内的商品列表*/
  getCartList (state) {
    return state.cartList
  }

}
