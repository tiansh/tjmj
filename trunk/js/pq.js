/*
    This file is part of Tianjin Mahjong.

    Tianjin Mahjong is free software: you can redistribute it and/or
    modify it under the terms of the GNU General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    Tianjin Mahjong is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Tianjin Mahjong. If not, see <http://www.gnu.org/licenses/>.
*/

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
  var i, j;
  var swap=function (a, b) {
    var lb=a.lb, sz=a.sz;
    a.lb=b.lb; b.lb=lb;
    a.sz=b.sz; b.sz=sz;
  }
  for (i=0;i<10;i++)
   for (j=0;j<136;j++)
   swap(this[j],this[Math.floor(Math.random()*(136-j))+j]);
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
  if (this.num()>0) pz = this[this.pos++];
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
  else if (this.num()>0) pz = this[this.last];
  else pz = null;
  // 重新显示剩余张数
  this.printnum();
  return pz;
}

// 显示剩余张数
tppq.prototype.printnum=function () {
  var d=$i("sy"), n=this.num();
  d.value=n;
  d.className=n<20?"l20":"";
}

var pq=new tppq;