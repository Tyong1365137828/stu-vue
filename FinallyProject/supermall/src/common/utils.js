/**防抖函数的封装*/
export function debounce (fun, delay = 50) { //参数1、需要进行防抖操作的函数fun; 参数2、延时多久delay执行要防抖的函数<即每多少时间执行fun函数>,默认50ms
  let timer = null; //设置一个空的定时器
  return function (...args) { //返回一个函数,即调用了debounce防抖动函数,就会执行这个函数
    if (timer) clearTimeout(timer) //如果timer不为空,就清除timer
    timer = setTimeout(() => { //反之,在delay时间内执行fun函数
      fun.apply(this, args) //执行要防抖动处理的函数
    }, delay)
  }
}
/**debounce防抖函数的定义和调用,如这个项目的某个业务中为了能准确的计算滑块大小,每次img加载完毕都会调用刷新方法<集群方式>,但是
 * 这种集群方式应该适当的减少,以减少刷新的频率,缓解调用的压力;这时,防抖函数的作用就体现出来了*/




/***
 * 正则表达式： x+  ->  匹配1个或多个x
 *            x*  ->  匹配0个或多个x
 *            x?  ->  匹配0个或多个x
 *
 *    如输入 2019 ,  y:输出9;    yy:输出19;    yyy:输出019;    yyyy:输出2019
 */
/**格式化时间格式的函数*/
export function formatDate(date, fDate) {
  if (/(y+)/.test(fDate)) { // 进行匹配，因为年格式化的位数可能是1、2、3、4位,所以单独对年进行格式化
    fDate = fDate.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) //RegExp 表示全局对象,这里就相当于匹配对象
  }

  let other = { //对其他进行匹配
    'M+': date.getMonth() + 1, //对月进行匹配
    'd+': date.getDate(), //对天进行匹配
    'h+': date.getHours(), //对小时进行匹配
    'm+': date.getMinutes(), //对分钟进行匹配
    's+': date.getSeconds() //对秒匹配
  };
  for (let item in other) { //依次对other(其他)内的属性进行格式化
    if (new RegExp(`(${item})`).test(fDate)) {
      let strItem = other[item] + ''; //把other内的属性转变为字符串
      fDate = fDate.replace(RegExp.$1, (RegExp.$1.length === 1) ? strItem : fillZero(strItem))
    }
  }

  return fDate //返回格式化后的date
}
/**把时间格式化函数内的other中的属性,缺省的位数用0补充*/
function fillZero(str) {
  return ('00' + str).substr(str.length)
}
