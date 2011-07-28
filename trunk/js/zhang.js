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

// 牌张的代码
var zhang=function (lb,sz) {
  // lb表示花色
  // 0=字 1=万 2=饼 3=条
  this.lb=lb;
  this.sz=sz;
}

// 混儿牌张数
zhang.prototype.numhuir = 2;
zhang.prototype.zzhang = [7, 9, 9, 9];
zhang.prototype.zdir = ["z", "w", "b", "t"];
var ww=new zhang(1,5);

// 设定混儿
zhang.prototype.sethuir=function () {
  zhang.prototype.huir = new Array(zhang.prototype.numhuir);
  // 第一张
  zhang.prototype.huir[0] = new zhang(this.lb, this.sz);
  for (var i=1;i<zhang.prototype.numhuir;i++) {
    // 序号自加一
    zhang.prototype.huir[i]= new zhang(
      zhang.prototype.huir[i-1].lb,
      zhang.prototype.huir[i-1].sz+1
    );
    // 最后一张则下一张为第一张
    if (zhang.prototype.huir[i].sz===10)
      zhang.prototype.huir[i].sz = 1;
    // 字牌的特殊判断
    if (zhang.prototype.huir[i].lb===0)
      // 北风后面是东风
      if (zhang.prototype.huir[i].sz===5)
        zhang.prototype.huir[i].sz = 1;
      // 白板后面是红中
      else if (zhang.prototype.huir[i].sz===8)
        zhang.prototype.huir[i].sz = 5;
  }
  
  // 显示
  var d=$i("hxsm"), h=$i("hxsp"), t;
  while (d.firstChild) d.removeChild(d.firstChild);
  for (var i=0;i<zhang.prototype.numhuir;i++) {
    t=zhang.prototype.huir[i].divtag();
    d.appendChild(t);
    h.className=(i>0?(h.className+" "):"")+t.className;
  }
}

// 判断两张牌是否相同
zhang.prototype.same=function (b) {
  return this.lb===b.lb && this.sz===b.sz;
}

// 判断是否是混儿
zhang.prototype.samehuir=function () {
  for (var i=0;i<zhang.prototype.numhuir;i++)
    if (this.same(zhang.prototype.huir[i])) return true;
  return false;
}

// 转换成字符串类型
zhang.prototype.chr=function () {
  return zhang.prototype.zdir[this.lb]+this.sz;
}

// 返回这张牌的divtag
zhang.prototype.divtag=function (o) {
  // 如果为o则返回一个包含着两张该牌的div
  // 用于显示/表示杠牌是四张挤在一起的样子的中间两张
  if (typeof(o)!=="undefined" && o) {
    var d=document.createElement("div");
    d.appendChild(this.divtag());
    d.appendChild(this.divtag());
    d.className="g2";
    return d;
  }
  // className的命名规则是
  // z,w,b,t表示花色后跟序数
  // 如w5表示五万，z6表示发财
  var d=document.createElement("div");
  d.className=zhang.prototype.zdir[this.lb]+this.sz;
  return d;
}

// 由className返回对应的张
zhang.prototype.dcdt=function (s) {
  var i, j;
  for (i=0;i<=3;i++)
    if (s.charAt(0)===zhang.prototype.zdir[i]) break;
  this.lb=i
  this.sz=s.charCodeAt(1)-48;
}