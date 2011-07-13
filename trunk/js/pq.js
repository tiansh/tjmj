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
  this.huir=136;
}


// 打混儿
pq.prototype.dhuir=function () {
  
}

// 抓一张牌
// 荒牌时抛出异常
pq.prototype.getp=function () {
  
}

// 抓杠底牌
// 荒牌时抛出异常
pq.prototype.getlp=function () {
  
}

