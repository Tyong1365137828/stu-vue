/**
 * 开发时使用的配置
 */
const baseConfig = require('./base.config') //获取基本的配置文件
const webpackMerge = require('webpack-merge');  //先使用命令  npm install webpack-merge@4.1.5 --save-dev  安装,这个模块用于使文件合并


/**webpack的版本3.6.0,使用命令  npm install webpack@3.6.0 --save-dev  安装开发依赖webpack3.6.0版本*/
module.exports = webpackMerge(baseConfig, {

  devServer: {  //配置本地服务器,搭建webpack本地服务器,更方便的进行测试,先进行安装,使用命令  npm install webpack-dev-server@2.9.3 --save-dev
    contentBase: '../dist/',  //服务于基于当前文件的 ../dist文件夹
    inline: true,   //是否进行实时监听
    port: 3001,   //端口,在3001,默认在8080端口
    /**配置完成之后可以使用命令  webpack-dev-server  运行应用<此方式会使用全局的webpack-dev-server>,不需要进行webpack打包编译(即 'webpack 命令' 或 'npm run build 命令' )
     这里的package.json文件内的script中配置了 "dev": "webpack-dev-server" ,那么使用 npm run dev 命令即可运行本地的 webpack-dev-server */
    //此时,文件代码修改,这个服务器的内容也会随之修改,无需重启服务器或者webpack打包build
    //注意:davServer在开发阶段使用方便,但是在发布时其可以不用使用
  }

});