// 牌墙的代码
var pq=function () {
  var a = new Array(136);
  var i, j, k, l = 0;
  for (i=0;i<=3;i++)
   for (j=1;j<=zhang.prototype.zzhang[i];j++)
   for (k=0;k<4;k++)
    a[l++] = new zhang(i, j);
  for (i=0;i<10;i++)
    a.sort(function(){return Math.random()-0.5;});
  for (i in a)
    this[i]=a[i];
  this.length=136;
  this.pos=0;
  this.last=136;
  this.huir=136;
}

// 打混儿
pq.prototype.dhuir=function () {
  this.huir=136-2*(
    Math.floor(Math.random()*6+1)+
    Math.floor(Math.random()*6+1)
  );
  this.printnum();
  return this[this.huir];
}

// 剩余张数
pq.prototype.num=function () {
  // 到杠底就算荒牌
  return Math.min(this.last, this.huir) - this.pos;
}

// 抓一张牌
pq.prototype.getp=function () {
  var pz;
  if (this.num()) pz = this[this.pos++];
  else pz = null;
  // 重新显示剩余张数
  this.printnum();
  return pz;
}

// 抓杠底牌
pq.prototype.getlp=function () {
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
pq.prototype.printnum=function () {
  document.getElementById("sy").value=this.num();
}
