var tpzhuang=function () {
  this.nzhuang=0;
  this.dong=0;
};
tpzhuang.prototype.init=function () {
  this.nzhuang=0;
  this.dong=Math.floor(Math.random()*4)+1;
}
tpzhuang.prototype.print=function () {
  var i;
  for (i=1;i<=4;i++)
    document.getElementById("zc"+i).value
      =ZH_DNXB[(this.dong+17-this.nzhuang-i)%4];
}
var zhuang=new tpzhuang();


var tpfs=function () {
  this[1]=this[2]=this[3]=this[4]=0;
}
tpfs.prototype.init=function () {
  var i;
  for (i=1;i<=4;i++)
    this[i]=250;
}
tpfs.prototype.print=function () {
  var i;
  for (i=1;i<=4;i++)
    document.getElementById("scr"+i).value=this[i];
}

tpfs.prototype.df=function (n, p, g) {
  this[p]+=4*n;
  var i;
  for (i=1;i<=4;i++)
    this[i]-=n;
}
var fs=new tpfs();