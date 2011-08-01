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

// 玩家打牌——选择
// 对每张牌注册onclick事件
var dap_wj_ro=function () {
  var i, l=sp[3].pz(), p=$i("su4").childNodes;
  for (i=0;i<l;i++) p[i].onclick=dap_wj_i;
}
// 取消onclick事件
var dap_wj_co=function () {
  var i, l=sp[3].pz(), p=$i("su4").childNodes;
  for (i=0;i<l;i++) p[i].onclick=null;
}
// 初始化打出牌的界面
var dap_wj=function () {
  movelast=true;
  if (chty!==3) {
    // 判断是否能杠牌并在按钮的列表中加入杠牌的按钮
    var i,j,c,s=sp[3],l=Array(3),n=0,b=[];
    for (i=0;i<14;i++) if(!s[i].samehuir()) {
      for (j=i,c=0;j<14;c+=(s[j++].same(s[i]))?1:0);
      if (c===4) l[n++]=new zhang(s[i].lb,s[i].sz);
    }
    // 如果只有一种牌能杠，则显示按钮为“杠牌”字样
    if (n===1) b[b.length]={
      n:ZH_G+ZH_P,
      f:xm_ag_wj_i,v:
      l[0].divtag().className
    };
    // 否则显示为“杠五万”，“杠东字”等字样
    else for (i=0;i<n;i++)
      b[b.length]={
        n:ZH_G+(
        l[i].lb!==0?
          (ZH_SZ[l[i].sz]+ZH_LB[l[i].lb]):
          (ZH_FJ[l[i].sz])
        ),
        f:xm_ag_wj_i,
        v:l[i].divtag().className
      }
    // 判断是否能和牌  
    if (s.pdhp(chty===2).ky) {
      b[b.length]={n:ZH_U+ZH_P,f:hup_wj_i};
      movelast=false;
    }
    if (b.length>0) setButtons(b);
  }
  comchose(sp[3]);
  dap_wj_ro();
  pmove_ro();
}
// 接收用户暗杠和小明杠的动作并继续
var xm_ag_wj_i=function () {
  clearButtons();
  dap_wj_co();
  pmove_co();
  dapc.dcdt(this.value);
  callfunc(xm_agang);
}
// 接收用户打牌的动作并继续
var dap_wj_i=function () {
  clearButtons();
  dap_wj_co();
  pmove_co();
  dapc.dcdt(this.className);
  callfunc(dac);
}
// 接收用户和牌的动作并继续
var hup_wj_i=function () {
  clearButtons();
  dap_wj_co();
  pmove_co();
  callfunc(hup);
}
// 接收用户碰牌的动作并继续
var peng_wj_i=function () {
  clearButtons();
  callfunc(peng);
}
// 接收用户大明杠的动作并继续
var dmgang_wj_i=function () {
  clearButtons();
  callfunc(dmgang);
}
// 接收用户取消碰杠的动作并继续
var pgqx_wj_i=function () {
  clearButtons();
  callfunc(pgqx);
}

// 玩家选择碰杠
var pg_wj=function () {
  var i, c;
  for (c=0,i=0;i<sp[3].pz();i++)
    if (sp[3][i].same(dapc)) c++;
  if (c===3)
    setButtons([
      {n:ZH_N+ZH_P,f:peng_wj_i},
      {n:ZH_G+ZH_P,f:dmgang_wj_i},
      {n:ZH_QX,f:pgqx}
    ]);
  else
    setButtons([
      {n:ZH_N+ZH_P,f:peng_wj_i},
      {n:ZH_QX,f:pgqx_wj_i}
    ]);
}
