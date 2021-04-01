//使用COMMONJS的模块化规范
function add(num1, num2) {
  return num1 + num2;
}

function sub(num1, num2) {
  return num1 - num2;
}

//导出add和sub函数
module.exports = {
  add,
  sub
}