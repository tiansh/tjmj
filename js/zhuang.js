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

// 计算庄的类
var tpzhuang=function () {
  this.nzhuang=0;
  this.dong=0;
};
// 庄计算的初始化
tpzhuang.prototype.init=function () {
  this.nzhuang=1;
  this.dong=Math.floor(Math.random()*4)+1;
};
// 庄计算的显示
tpzhuang.prototype.print=function () {
  var i;
  for (i=1;i<=4;i++)
    $i(["zc1","zc2","zc3","zc4"][i-1]).value
      =ZH_DNXB[(this.dong+4-i)%4];
  $i("qs").value
    =((this.nzhuang-1)-(this.nzhuang-1)%4)/4+1;
  $i("zf").value
    =ZH_DNXB[(this.nzhuang-1)%4];
};
var zhuang=new tpzhuang();
