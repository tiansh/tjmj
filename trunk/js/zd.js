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

// 抓牌
var zhuap=function () {
  var z=pq.getp();
  // 如果无牌可抓则荒牌
  if (z===null) {
    callfunc(huangp);
    return;
  }
  // 抓一张牌
  zpos=(zpos+3)%4;
  sp[zpos][sp[zpos].pz()-1]=z;
  sp[zpos].print();
  // 设置当前状态为正常
  chty=1;
  callfunc(dap)
}

// 抓杠底
var zhuagd=function () {
  var z=pq.getlp(), f=true;
  // 如果无牌可抓则荒牌
  if (z===null) {
    callfunc(huangp);
    z=new zhang(0,9);
    f=false;
  }
  // 抓一张牌
  zpos=ppos;
  sp[zpos][sp[zpos].pz()-1]=z;
  sp[zpos].print();
  // 设置当前状态为杠底
  if (f) {
    chty=2;
    callfunc(dap);
  }
}

// 打牌
var dap=function () {
  // 设置显示样式
  $i("act").className=["p1","p2","p3","p4"][zpos];
  // 根据玩家和电脑分类
  if (zpos===3) callfunc(dap_wj);
  else callfunc(dap_dn);
}

// 打牌打出
var dac=function () {
  // 从手牌中去掉这张牌
  var s, l, i, j, c, f;
  s=sp[zpos]; l=s.pz();
  for (i=0;i<l;i++) if (s[i].same(dapc)) break;
  if (i>=l||dapc.samehuir()) { callfunc(dap); return; }
  for (;i<l-1;i++) s[i]=s[i+1]; s[l-1]=new zhang(0,9);
  if (zpos!==3||autosort) s.sort();
  s.print();
  // 在牌池中显示这张牌
  $i(["pc1","pc2","pc3","pc4"][zpos]).appendChild(dapc.divtag());
  // 告诉电脑有这么一张牌打出去了
  expp(dapc);
  // 在屏幕中央显示某家打出了这张牌
  $i("dcp").value=ZH_DNXB[(zhuang.dong+3-zpos)%4];
  $i("dcz").className=dapc.divtag().className;
  // 询问碰杠
  if (!dapc.samehuir())
   for (i=0;i<4;i++) if (i!=zpos) {
    for (c=0,j=0,f=false;j<sp[i].pz()-1;j++)
      if (sp[i][j].same(dapc)) c++;
      else f=f||!sp[i][j].samehuir();
    if (c>=2&&f||c>=3) {
      ppos=i;
      if (i===3) callfunc(pg_wj);
      else callfunc(pg_dn);
      return;
    }
  }
  // 如果无人能碰杠则下一家抓牌
  callfunc(zhuap);
}

// 清空牌池
var clearpc=function () {
  var i;
  for (i=0;i<4;i++) {
    var p=$i(["pc1","pc2","pc3","pc4"][i]);
    while (p.firstChild)
      p.removeChild(p.firstChild);
  }
}
