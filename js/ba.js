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

// 手牌
var ba=function () {
  var i;
  for (i=0;i<=13;i++) this[i]=new zhang(0,0);
  this.pos=0; this.peng=0;
  this.gang=[false, false, false, false];
}

// 初始化
ba.prototype.init=function (pos, a) {
  var i;
  for (i=0;i<13;i++)
    this[i]=a.getp();
  this[13]=new zhang(0,9);
  // 谁的手牌
  this.pos=pos;
  // 碰杠了几对
  this.peng=0;
  // 是不是杠gang[3]表示最右面（最先）一副
  this.gang=[false, false, false, false];
  // 理牌
  if (pos!==4||autosort) this.sort();
}
ba.prototype.length=14;
// 除去碰杠外剩余的张数
ba.prototype.pz=function () {
  return ba.prototype.length-this.peng*3;
}

// 显示
ba.prototype.print=function () {
  var d=$i(["su1","su2","su3","su4"][this.pos-1]);
  while (d.firstChild) d.removeChild(d.firstChild);
  var i;
  for (i=0;i<this.length;i++) {
    d.appendChild(this[i].divtag(!(i%3)&&i>2&&this.gang[(i-3)/3]));
  }
  d.className="p"+this.peng;
}

// 理牌
ba.prototype.sort=function () {
  // 比较牌张大小
  var zhangcmp
  zhangcmp=function (a,b) {
    var as=a.lb===0&&a.sz===9;
    var bs=b.lb===0&&b.sz===9;
    if (as&&!bs) return 1000;
    else if (!as&&bs) return -1000;
    var ah=a.samehuir(), bh=b.samehuir();
    if (ah!==bh) return ah?-100:100;
    return -10*(a.lb-b.lb)+(a.sz-b.sz);
  }
  // 只对没有碰的牌进行排序
  var t=this.pz();
  var i, j;
  for (i=0;i<t-2;i++) for (j=i+1;j<t;j++)
    if (zhangcmp(this[i],this[j])>0) {
      var temp=this[i]; this[i]=this[j]; this[j]=temp;
    }
}

var sp=[new ba(), new ba(), new ba(), new ba()];
