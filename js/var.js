// 根据id获取页面上的元素，为书写方便
var $i=function (id) {
  return document.getElementById(id);
};
// 利用setTimeout调用其他函数
// 时间为0，则本函数执行之后该函数立即执行
// 这样调用不会在堆栈区底部留下一大堆无用的函数
var callfunc=function (func) {
  setTimeout(func,0);
}

var zpos=0, ppos=0;
var dapc=new zhang(0,0);
// chty的取值
// 1时表示当前是正常的抓牌之后
// 2时表示是杠牌抓底牌之后
// 3时表示是碰牌之后
var chty;

