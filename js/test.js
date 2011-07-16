// 测试用牌墙
var pq=function () {
  this[ 0] =new zhang(2,1);
  this[ 1] =new zhang(2,8);
  this[ 2] =new zhang(0,6);
  this[ 3] =new zhang(3,2);
  this[ 4] =new zhang(2,5);
  this[ 5] =new zhang(2,6);
  this[ 6] =new zhang(2,7);
  this[ 7] =new zhang(0,6);
  this[ 8] =new zhang(2,5);
  this[ 9] =new zhang(0,6);
  this[10] =new zhang(2,2);
  this[11] =new zhang(2,2);
  this[12] =new zhang(2,2);
  this[13] =new zhang(3,1);
  this.huir=new zhang(2,9);
  this.length=14;
  this.pos=0;
  this.last=14;
}


// 抓一张牌
pq.prototype.getp=function () {
  return this[this.pos++];
}

var OT;

window.onload=function () {
  OT=document.getElementById("OT");
var a=new pq();
  var i;
  a.huir.sethuir();
var b=new ba(4,a);
  b[13]=a.getp();
  b.print();
  b.pdhp();
  //var t=new tiao(b[3]);
  //panduanf(t.t);
}