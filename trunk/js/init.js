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

// 程序初始化
var ainit=function () {
  callfunc(binit);
  callfunc(ginit)
  callfunc(minit);
  callfunc(pxinit);
}

// 锅的初始化
var minit=function () {
  zhuang.init();
  fs.init();
  setTimeout(jinit,0);
}

// 一局牌的初始化
var jinit=function () {
  zhuang.print();
  fs.print();
  cqinit();
  pq.init();
  pq.dhuir().sethuir();
  var i;
  for (i=0;i<4;i++) {
    sp[i].init(i+1,pq);
    sp[i].print();
  }
  clearpc();
  clearButtons();
  zpos=zhuang.nzhuang+zhuang.dong-3;
  callfunc(zhuap);
}

// 作弊指令的初始化
var binit=function () {
  // 混儿牌显示的那里如果用户Shift-双击则亮出电脑的牌
  $i("hxsm").ondblclick=function (e) {
    if (!e.shiftKey) return;
    var s=$i("su");
    s.className=(s.className==="xs"?"":"xs");
  }
}