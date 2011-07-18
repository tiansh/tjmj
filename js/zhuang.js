// 计算庄的类
var tpzhuang=function () {
  this.nzhuang=0;
  this.dong=0;
};
// 庄计算的初始化
tpzhuang.prototype.init=function () {
  this.nzhuang=1;
  this.dong=Math.floor(Math.random()*4)+1;
};
// 庄计算的显示
tpzhuang.prototype.print=function () {
  var i;
  for (i=1;i<=4;i++)
    $i("zc"+i).value
      =ZH_DNXB[(this.dong+4-i)%4];
  $i("qs").value
    =((this.nzhuang-1)-(this.nzhuang-1)%4)/4+1;
  $i("zf").value
    =ZH_DNXB[(this.nzhuang-1)%4];
};
var zhuang=new tpzhuang();
