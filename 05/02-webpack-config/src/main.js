//使用COMMONJS的模块化规范
const {add, sub} = require("./js/mathUtils")

console.log(add(20, 30));
console.log(sub(50, 40));


//使用ES6的模块化规范
import {name, age, height, wight} from "./js/info";

console.log(name);
console.log(age);
console.log(height);
console.log(wight);


//引入依赖的css文件
require('./css/index.css');

//引入依赖的less文件
require('./css/index2.less');
document.writeln('<h2>你好,TYong</h2>');  //写入界面


/**使用webpack打包工具打包该主文件即可(会把所有引入的文件一次处理),在项目下执行命令 webpack ./src/main.js ./dist/bundle.js  ,之后在index.html文件引用即可 */