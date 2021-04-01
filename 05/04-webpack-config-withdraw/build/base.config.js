/**
 * 放置一些公共的依赖配置,即开发时依赖和发布时依赖,即基本配置
 */

const path = require('path'); //引入path模块
const webpack = require('webpack'); //引入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin');  //引入html-webpack-plugin模块,使能够把index.html也打包入dist文件夹以进行发布;  npm install html-webpack-plugin@2.30.1 --save-dev  安装的命令

/**webpack的版本3.6.0,使用命令  npm install webpack@3.6.0 --save-dev  安装开发依赖webpack3.6.0版本*/
module.exports = {
  entry: './src/main.js',  //webpack打包入口
  output: {   //webpack打包出口
    path: path.resolve(__dirname, '../dist'), // _dirname表示当前文件所在的路径,使用resolve把 _dirname和 ../dist 进行拼接,组成一个路径,指定出口文件所在的路径
    filename: 'bundle.js', //指定出口文件名
    // publicPath: 'dist/' //以后请求的url前面都会拼接上  'dist/'; 后续使用index.html打包插件后会将此步淘汰
  },  //配置好这些后,就可以在项目位置的终端输入 webpack 命令即可把main.js及其层下的各个依赖打包到指定的出口文件
  module: { //处理文件配置
    rules: [
      {   /**配置处理css文件的loader,配置之前要注意安装 css-loader2.0.2 开发依赖包,使能够加载css样式,命令 npm install --save-dev css-loader@2.0.2
         安装 style-loader1.0.0 开发依赖包,使css样式能够添加到DOM演样式中,命令 npm install --save-dev style-loader@1.0.0
         安装完上述两者之后,基本就能够使用webpack打包和使用css文件了
         注意两者之间的版本问题,参考本例子中的版本,如果版本过高会出现打包失败的问题*/
        test: /\.css$/,   //语法:正则表达式
        use: [ 'style-loader', 'css-loader' ] //css-loader只负责将css文件进行加载; style-loader负责把style样式加载到DOM中生效;注意:webpack使用多个loader是从右到左的顺序,那么就要注意从右到左先使用css-loader,再使用style-loader
      },
      {
        /**配置处理less文件的loader,先安装 style-loader@1.0.0版本,命令:  npm install --save-dev style-loader@1.0.0 ,再使用命令安装  npm install less-loader@4.1.0 less@3.9.0 --save-dev 注意版本问题,以此项目为准 */
        test: /\.less$/,
        use: [{     /**注意loader的引入顺序*/
          loader: 'style-loader'    //把less文件转成的css文件加入到DOM样式上
        }, {
          loader: 'css-loader'      //把less文件转成的css文件进行加载
        }, {
          loader: 'less-loader'     //把less文件转成css
        }]
      },
      {
        /**配置能够打包图片的loader,先使用命令安装  npm install url-loader@1.1.2 --save-dev  注意版本问题,以此项目为准 */
        test: /\.(png|jpg|gif|)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 30000,  //当加载的图片小于limit的值时(单位:字节),会把图片编译成base64的字符串形式放入bundle.js文件;反之,就会使用  file-loader  模块进行打包,file-loader打包方式如下所示

              /**安装  file-loader  模块的命令   npm install file-loader@3.0.1 --save-dev   注意版本问题,以此为准*/
              name: 'img/[name].[hash:8].[ext]'   /**最终file-loader的打包名字格式为  img文件夹下的 原名字+.32位哈希码中的8位+.后缀名*/
            },
          }
        ]
      },
      {
        /**配置ES6转为ES5的loader,使大多数浏览器能够支持,使用命令: npm install --save-dev babel-loader@7.1.5 babel-core@6.26.3 babel-preset-es2015@6.24.1*/
        test: /\.js$/,    //匹配所有.js文件
        exclude: /(node_modules|bower_components)/,   //排除node_modules和bower_component文件夹,即只对src进行此操作
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'] //es2015就是ES6
          }
        }
      },
      {/**配置能够打包.vue的文件,使用命令先安装  npm install vue-loader@13.0.0 vue-template-compiler@2.5.21 --save-dev  */
        test: /\.vue$/,    //匹配所有的.vue文件
        use: ['vue-loader']
      }

    ]
  },
  resolve: {  //用于解决一些路径问题
    extensions: ['.js', '.css', '.vue'], //其中的文件支持简写,即不加后缀名
    alias: {//别名
      'vue$': 'vue/dist/vue.esm.js' //把引入VUE依赖处（import Vue from 'vue'）中的vue指向node_modules中的具体的文件,该文件就是vue的compiler版本,即支持内部含有<template>
    }
  },
  plugins: [ //插件配置
    new webpack.BannerPlugin('最终版权归汤勇所有'),  //打包后的js文件中增加版权信息;这个插件是webpack自带的,只需要引入webpack即可

    /**先使用命令安装此插件  npm install html-webpack-plugin@3.2.0 --save-dev  安装*/
    new HtmlWebpackPlugin({   //会把index.html文件打包的dist目录下,并且会自动引入bundle.js打包文件
      template: 'index.html'//参照index.html模板进行打包
    }),

  ]

}


/***
 ** 注意:在package.json文件中的script标签内配置的 "build": "webpack" 是为了与配置好的命令 webpack 对应起来,即使用 npm run build 就相当与使用命令 webpack ,这是一种映射关系
 ***/
