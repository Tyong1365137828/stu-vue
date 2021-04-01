import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations"; //导入mutations
import actions from "./actions"; //导入actions
import getters from "./getters"; // 导入getters

Vue.use(Vuex) //安装Vuex插件

/**存储仓库state的状态*/
const state = {
  cartList: [], //购物车里的商品数组

}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters

})


export default store //导出store公共仓库
