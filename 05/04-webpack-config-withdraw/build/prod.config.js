/**
 * 生产发布时使用的配置
 */

const UglifyWebpackJs = require('uglifyjs-webpack-plugin'); //引入uglifyjs-webpack-plugin模块,进行js代码的压缩;  先使用命令 npm install uglifyjs-webpack-plugin@1.1.1 --save-dev
const baseConfig = require('./base.config') //获取基本的配置文件
const webpackMerge = require('webpack-merge');  //先使用命令  npm install webpack-merge@4.1.5 --save-dev  安装,这个模块用于使文件合并

/**webpack的版本3.6.0,使用命令  npm install webpack@3.6.0 --save-dev  安装开发依赖webpack3.6.0版本*/
module.exports = webpackMerge(baseConfig, { //把baseConfig进行合并

  plugins: [ //插件配置

    /**压缩js文件(丑化js),先使用命令  npm install uglifyjs-webpack-plugin@1.1.1 --save-dev  安装uglifyjs-webpack-plugin插件*/
    new UglifyWebpackJs(), //配置压缩丑化js代码;开发阶段不建议使用(这样在浏览器进行调试时十分不方便),发布时使用可以加快浏览器运行
  ]

});