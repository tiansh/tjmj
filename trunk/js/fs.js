// 分数管理类
var tpfs=function () {
  this[0]=this[1]=this[2]=this[3]=0;
};
// 初始化
tpfs.prototype.init=function () {
  var i;
  for (i=0;i<4;i++)
    this[i]=250;
};
// 显示分数
tpfs.prototype.print=function () {
  var i;
  for (i=0;i<4;i++)
    $i("scr"+(i+1)).value=this[i];
};
// 和牌或杠牌后重新计算分数
// n为和牌或杠牌的大小
// p为哪一家和牌或杠牌
// g标记是否为杠
tpfs.prototype.df=function (n, p, g) {
  this[p]+=4*n;
  var i;
  for (i=0;i<4;i++)
    this[i]-=n;
  this.print();
};
var fs=new tpfs();