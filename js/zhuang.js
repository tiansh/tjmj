var tpzhuang=function () {
  this.nzhuang=0;
  this.dong=0;
};
tpzhuang.prototype.init=function () {
  this.nzhuang=1;
  this.dong=Math.floor(Math.random()*4)+1;
};
tpzhuang.prototype.print=function () {
  var i;
  for (i=1;i<=4;i++)
    document.getElementById("zc"+i).value
      =ZH_DNXB[(this.dong+4-i)%4];
  document.getElementById("qs").value
    =((this.nzhuang-1)-(this.nzhuang-1)%4)/4+1;
  document.getElementById("zf").value
    =ZH_DNXB[(this.nzhuang-1)%4];
};
var zhuang=new tpzhuang();
