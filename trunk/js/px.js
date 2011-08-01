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

var dp=null;
var autosort=true;
var pos0x, pos0y, pos0n, len;
var movelast=true;

// 鼠标移动时触发的事件
var move_over=function (e) {
  if (dp===null) return;
  var a=$i("act");
  if (a.className.indexOf("mv")===-1)
    a.className+=" mv";
  var
    pos1x=e.screenX, pos1y=e.screenY,
    pos1n=Math.round((pos1x-pos0x)/36+pos0n),
    d=dp.parentNode, d0=dp.cloneNode(true);
  d.removeChild(dp);
  if (pos1n<0) pos1n=0; if (pos1n>=len) pos1n=len-1;
  if (pos1n===d.childNodes.length) d.appendChild(d0);
  else d.insertBefore(d0,d.childNodes[pos1n]);
  d0.onmouseup=move_up;
  dp=d0;
}

// 鼠标松开触发事件
var move_up=function (e) {
  if (dp===null) return;
  var c=$i("act").className;
  $i("act").className=c.substring(0,c.length-3);
  var i, l=sp[3].pz(), a=dp.parentNode.childNodes;
  for (i=0;i<l;i++) sp[3][i].dcdt(a[i].className);
  if ($i("act").className.indexOf("p4")!==-1) {
    dap_wj_ro();
    pmove_ro();
  }
  dp=null;
}

// 自动理牌开关
var lp_switch=function () {
  this.className=this.className==="d"?"":"d";
  autosort=this.className!=="d";
  if (autosort) {
    sp[3].sort(); sp[3].print();
    if ($i("act").className==="p4") {
      dap_wj_ro();
      pmove_ro();
    }
  }
}

// 初始化，给各部分的函数链接
var pxinit=function () {
  $i("lp").onclick=lp_switch;
  $i("main_body").onmouseover=move_over;
  $i("main_body").onmouseup=move_up;
  var b=document.getElementsByTagName("body")[0];
  b.setAttribute("unselectable","on");
  b.onselectstart=function () { return false; };
}

// 点击某张牌时开始移动
var pmove_d=function (event) {
  if (dp!==null) return;
  dp=this;
  pos0x=event.screenX;
  pos0y=event.screenY;
  var i, l=sp[3].pz(), p=$i("su4").childNodes;
  for (i=0;i<l;i++) if (p[i]===this) pos0n=i;
  len=sp[3].pz();
  if (i===len-1) pos0x-=24;
}

// 对每张牌注册拖动的事件
var pmove_ro=function () {
  var i, l=sp[3].pz(), p=$i("su4").childNodes;
  if (!movelast) l--;
  for (i=0;i<l;i++) p[i].onmousedown=pmove_d;
}

// 对每张牌取消拖动的事件
var pmove_co=function () {
  var i, l=sp[3].pz(), p=$i("su4").childNodes;
  for (i=0;i<l;i++) p[i].onmousedown=null;
}