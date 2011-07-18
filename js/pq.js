// 牌墙的代码
var tppq=function () {
  var a = new Array(136);
  var i, j, k, l = 0;
  for (i=0;i<=3;i++)
   for (j=1;j<=zhang.prototype.zzhang[i];j++)
   for (k=0;k<4;k++)
    a[l++] = new zhang(i, j);
  for (i in a)
    this[i]=a[i];
  this.length=136;
  this.pos=0;
  this.last=136;
  this.huir=136;
}
tppq.prototype=Array.prototype;

// 洗牌
tppq.prototype.rp=function () {
  var i;
  for (i=0;i<10;i++)
    this.sort(function(){return Math.random()-0.5;});
}

// 初始化
tppq.prototype.init=function () {
  this.rp();
  this.pos=0;
  this.last=136;
  this.huir=136;
}

// 打混儿
tppq.prototype.dhuir=function () {
  this.huir=136-2*(
    Math.floor(Math.random()*6+1)+
    Math.floor(Math.random()*6+1)
  );
  this.printnum();
  return this[this.huir];
}

// 剩余张数
tppq.prototype.num=function () {
  // 到杠底就算荒牌
  return Math.min(this.last, this.huir) - this.pos;
}

// 抓一张牌
tppq.prototype.getp=function () {
  var pz;
  if (this.num()) pz = this[this.pos++];
  else pz = null;
  // 重新显示剩余张数
  this.printnum();
  return pz;
}

// 抓杠底牌
tppq.prototype.getlp=function () {
  --this.last;
  // 如果混儿后面的都抓到了则跳过以继续
  if (this.last==this.huir) --this.last;
  if (this.last>this.huir) pz = this[this.last];
  else if (this.num()) pz = this[this.last];
  else pz = null;
  // 重新显示剩余张数
  this.printnum();
  return pz;
}

// 显示剩余张数
tppq.prototype.printnum=function () {
  $i("sy").value=this.num();
}

var pq=new tppq;