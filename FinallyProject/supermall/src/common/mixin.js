/***
 * 混入可以把这里定义的Vue各个属性进行导入到使用这个混入的局部组件相应的属性中,然后这些局部组件就可以直接使用 this. 直接使用了
 *
 * 抽取注意,如果使生命周期函数,即可以在局部组件内写,又可以在该混入里写,因为其会进行合并,
 *   但是,其他的<如methods>内的某些函数内的语句是不能抽取的,因为会把methods所有定义的函数进行合并,而函数内部的语句是不会进行合并的
 */
import BackTop from "components/content/backtop/BackTop";


/**回顶按钮相关的代码*/
export const backTopMixin = {
  components: {
    BackTop,

  },
  data () {
    return {
      isShowBackTop: false, //默认不显示回到最上按钮

    }
  },
  methods: {
    /**点击回顶按钮*/
    backTopClick () {
      const sc = this.$refs.rScroll //调用ref的name名为rScroll的组件对象;
      sc.mScrollTo(0, 0, 400) //调用组件内部封装的方法mScrollTo(),跳到0, 0位置,400ms之内
    },

    /**展示显示与否回顶按钮*/
    mIsShowBackTop (position) {
      this.isShowBackTop = - position.y >= 1000 //决定是否显示隐藏的回顶按钮
    },
  }
}
