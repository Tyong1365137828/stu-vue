export default {
  template: `
  <div>
      <h2>{{message}}</h2>
      <button @click="btnClick">按钮20066550</button>
  </div>
  `,
  data () {
    return {
      message: '你好,webpack AND vue！！！'
    }
  },
  methods: {
    btnClick () {
    }
  }
}