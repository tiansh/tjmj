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

var hpxs=function (r,s) {
  var i, j, l, len=s.pz();
  var huirlist=new Array(14);
  var hulist=new Array(14), hp=s.pz();
  var ht=new Array(4);
  var last=new zhang(r.last.lb,r.last.sz);
  if (last.samehuir()) last=new zhang(0,8);
  for (i=0;i<4;i++) {
    ht[i]=new Array(10);
    for (j=0;j<10;j++)
     ht[i][j]=0;
  }
  for (i=0,j=0;i<len;i++)
    if (s[i].samehuir()) {
      ht[0][8]++;
      huirlist[j++]=new zhang(s[i].lb, s[i].sz);
    } else ht[s[i].lb][s[i].sz]++;
  
  // 将牌
  if (r.hd!==1) for (i=0;i<2;i++) {
    if (ht[r.j.lb][r.j.sz]!==0) {
      ht[r.j.lb][r.j.sz]--;
      hulist[--hp]=new zhang(r.j.lb,r.j.sz);
    } else {
      ht[0][8]--;
      hulist[--hp]=new zhang(0,8);
    }
  } else {
    hulist[--hp]=new zhang(last.lb,last.sz);
    hulist[--hp]=new zhang(0,8);
    ht[last.lb][last.sz]--;
    ht[0][8]--;
  }
  
  if (r.hd===2) {
    if (r.zw) {
      // 双混儿伍儿
      hulist[--hp]=new zhang(0,8);
      hulist[--hp]=new zhang(last.lb,last.sz);
    } else {
      // 双混儿吊
      hulist[--hp]=new zhang(last.lb,last.sz);
      hulist[--hp]=new zhang(0,8);
    }
    hulist[--hp]=new zhang(0,8);
    ht[last.lb][last.sz]--;
    ht[0][8]-=2;
  } else if (r.zw) {
    // 捉伍儿
    var rm;
    for (i=6;i>=4;i--) {
      if (i===5) rm=new zhang(last.lb,last.sz);
      else rm=new zhang(1,i);
      if (ht[rm.lb][rm.sz]!==0) {
        hulist[--hp]=new zhang(rm.lb,rm.sz);
        ht[rm.lb][rm.sz]--;
      } else {
        hulist[--hp]=new zhang(0,8);
        ht[0][8]--;
      }
    }
  }
  
  // 龙
  if (r.l!==0) for (i=9;i>=1;i--)
   if (!(r.zw && r.l===1 && (i in [4,5,6]) && r.hd!==2))
   if (ht[r.l][i]!==0) {
    hulist[--hp]=new zhang(r.l,i);
    ht[r.l][i]--;
  } else {
    hulist[--hp]=new zhang(0,8);
    ht[0][8]--;
  }
  
  // 字牌
  for (i=1;i<=7;i++) if (ht[0][i]!==0)
   for (j=0;j<3;j++) if (ht[0][i]!==0) {
    hulist[--hp]=new zhang(0,i);
    ht[0][i]--;
  } else {
    hulist[--hp]=new zhang(0,8);
    ht[0][8]--;
  }
  
  // 序数牌
  for (l=1;l<=3;l++) (function fxs() {
    var i,j,k,f=true;
    var htb=new Array(10), n=r.numwbt[l];
    for (i=0;i<=9;i++) htb[i]=ht[l][i];
    for (k=9;k>=1;k--) if (ht[l][i=k]!==0) {
      f=false;
      // 刻
      if (ht[l][i]+r.numwbt[l]>=3) {
        for (j=0;j<3;j++) if (ht[l][i]!==0) {
          hulist[--hp]=new zhang(l,i);
          ht[l][i]--;
        } else {
          hulist[--hp]=new zhang(0,8);
          r.numwbt[l]--;
        }
        if (fxs())
          return true;
        hp+=3; r.numwbt[l]=n;
        for (j=0;j<=9;j++) ht[l][j]=htb[j];
      }
      // 顺
      if (i===9) continue; if (i===8) i=7;
      if (
        ((ht[l][ i ]>0)?1:0)+
        ((ht[l][i+1]>0)?1:0)+
        ((ht[l][i+2]>0)?1:0)+
        (r.numwbt[l])
          >=3
      ) {
        for (j=i+2;j>=i;j--) if (ht[l][j]!==0) {
          hulist[--hp]=new zhang(l,j);
          ht[l][j]--;
        } else {
          hulist[--hp]=new zhang(0,8);
          r.numwbt[l]--;
        }
        if (fxs())
          return true;
        hp+=3; r.numwbt[l]=n;
        for (j=0;j<=9;j++) ht[l][j]=htb[j];
      }
    }
    return f;
  })();
  
  // 剩下的都是混儿
  while (hp>0) hulist[--hp]=new zhang(0,8);
  
  var d=$i("hup2").childNodes;
  for (j=0,i=0;i<len;i++)
    if (!hulist[i].same(new zhang(0,8)))
      d[i].className=hulist[i].divtag().className;
    else
      d[i].className=huirlist[j++].divtag().className;

}





















