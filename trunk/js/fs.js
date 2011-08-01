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

// 分数管理类
var tpfs=function () {
  this[0]=this[1]=this[2]=this[3]=0;
};
// 初始化
tpfs.prototype.init=function () {
  var i;
  for (i=0;i<4;i++)
    this[i]=250;
};
// 显示分数
tpfs.prototype.print=function () {
  var i;
  for (i=0;i<4;i++)
    $i(["scr1","scr2","scr3","scr4"][i]).value=this[i];
};
// 和牌或杠牌后重新计算分数
// n为和牌或杠牌的大小
// p为哪一家和牌或杠牌
// g标记是否为杠
tpfs.prototype.df=function (n, p, g) {
  this[p]+=4*n;
  var i;
  for (i=0;i<4;i++)
    this[i]-=n;
  this.print();
};
var fs=new tpfs();