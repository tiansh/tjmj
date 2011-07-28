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

// 规则设定的界面初始化
var ginit=function () {
  var i;
  // 规则设定按钮
  $i("gz").onclick=function () {
    if ($i("act").className.indexOf("sd")!==-1) return;
    $i("act").className+=" sd";
    // 混儿牌张数选择
    $i("hpzs").className="hz"+zhang.prototype.numhuir;
    $i("qihf").className="qf"+qihuf;
  }
  // 混儿牌张数的选择
  for (i=1;i<=3;i++)
   $i("hz"+i).onclick=function () {
    $i("hpzs").className=this.id;
  }
  // 起和番数选择按钮
  for (i=1;i<=3;i++)
   $i("qf"+i).onclick=function () {
    $i("qihf").className=this.id;
  }
  // 取消按钮
  $i("sdqx").onclick=function () {
    var actn=$i("act"), s=actn.className;
    actn.className=s.substring(0,s.length-3);
  }
  // 重开按钮
  $i("sdck").onclick=function () {
    zhang.prototype.numhuir=$i("hpzs").className[2];
    qihuf=($i("qihf").className[2])*1;
    callfunc(minit);
  }
}
