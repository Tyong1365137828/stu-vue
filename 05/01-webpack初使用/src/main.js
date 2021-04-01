const {add, sub} = require("./mathUtils")

console.log(add(20, 30));
console.log(sub(50, 40));



import {name, age, height, wight} from "./info";

console.log(name);
console.log(age);
console.log(height);
console.log(wight);


/**使用webpack打包工具打包该主文件即可(会把所有引入的文件一次处理),在项目下执行命令 webpack ./src/main.js ./dist/bundle.js  ,之后在index.html文件引用即可 */