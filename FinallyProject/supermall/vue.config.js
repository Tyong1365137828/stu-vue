module.exports = {
  configureWebpack: {
    resolve: {
      alias: { /**配置别名,@在内部已经使用了别名,对应src/文件夹*/
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views'
      }
    }
  },

  devServer: {
    /**处理前后端分离跨域问题*/
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {//虚拟目录
        target: 'http://localhost:3000',//后台Node项目的请求网址
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/api': ''//由于上面的虚拟目录实际上是不存在的，不去掉的话访问的时候显示的url会变成'http://localhost:3000/api'，所以得去掉
        }
      }
    }
  }

}
