/**导入mutations常量*/
import {
  Add_Product_Count,
  Insert_Cart_Product
} from './mutation-types'

/**actions用于展示和调用复杂的修改store中的state状态的逻辑*/
export default {

  /**
   * 添加商品至购物车方法
   * */
  addToCart (context, payload) {
    return new Promise ((resolve, reject) => { /**为了让外界知道这个函数执行是否成功,可以使用Promise,借助resolve,reject; .then() .catch() 方法*/
      let existenceProduct = null //是否存在 某个商品 ,默认为空
      /**遍历购物车中的商品列表*/
      for (let item of context.state.cartList) {
        if (item.id === payload.id) { //如果购物车中存在此要添加的商品
          existenceProduct = item //把是否存在该商品赋值,即表示购物车中存在此商品
        }
      }

      /**判断购物车中是否存在某个商品*/
      if (existenceProduct) { //如果存在
        // existenceProduct.count += 1 // 给该存在的商品数量加1
        context.commit(Add_Product_Count, existenceProduct) // 调用给该存在的商品数量加1的mutations方法
        resolve('商品数+1')
      } else { //反之,即不存在
        payload.count = 1 //设置添加的新商品数量为1
        // context.state.cartList.push(payload) // 再把此商品加入到购物车
        context.commit(Insert_Cart_Product, payload) //调用把此商品加入到购物车的mutations方法
        resolve('商品添加购物车成功')
      }
    })

  }
}
