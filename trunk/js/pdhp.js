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

// 起和设定
var qihuf=2;
// 小和起和为1
// 2番起和为2
// 2番起和无混儿吊为3


// 判断和牌的返回值
var pdhpl=function () {
  this.ky=false;
  this.mh=false;
  this.hd=0;
  this.zw=false;
  this.l =0;
  this.g =false;
  this.mc="";
  this.dx=0;
  this.j =new zhang(0,0);
  this.numwbt=[0,0,0,0];
  this.last=new zhang(0,0);
}

// 判断和牌
// 杠一个参数判断是否是杠牌之后
ba.prototype.pdhp=function (g) {

  var numwbt=[0,0,0,0], jiang=new zhang(0,0);
  // 定义计算张数的类型，继承自Array
  var tiao=function () {
    var i, j;
    for (i=0;i<4;i++) {
      this[i]=new Array(10);
      for (j=0;j<=9;j++)
        this[i][j]=0;
    }
    this.length=4;
  }
  tiao.prototype=Array.prototype;
  // 赋值
  tiao.prototype.copy=function (t) {
    var i, j;
    for (i=0;i<4;i++)
      for (j=0;j<=9;j++)
        this[i][j]=t[i][j];
    this.length=4;
  }
  // 这里tiao是从1~9的，0的位置保存sum(1~9)
  var ba2tiao=function (a) {
    var b=new tiao();
    var i;
    for (i=0;i<a.pz();i++)
      if (a[i].samehuir()) b[0][8]++;
    else {
      b[a[i].lb][a[i].sz]++;
      b[a[i].lb][0]++;
    }
    return b;
  }
  // t为传入的数据化为该类型后的变量
  var t=ba2tiao(this);
  // last为最后一张牌
  var last=this[this.pz()-1];
  // 判断万、饼、条中的一种是否满足条件
  // 下列分类中，字母对应牌面叙述
  // H表示混儿
  var panduanl=function (a,huir) {
    var i, f;
    for (i=1;i<=9;i++) if (a[i]) break;
    if (i>9) return true;
    if (a[i]>=3) { // AAA
      a[i]-=3;
      f=(panduanl(a,huir));
      a[i]+=3;
      if (f) return true;
    } else if (a[i]===2 && huir>=1) { // AAH
      a[i]-=2;
      f=(panduanl(a,huir-1));
      a[i]+=2;
      if (f) return true;
    }
    if (i<8 && a[i]>=1 && a[i+1]>=1 && a[i+2]>=1) { // ABC
      a[i]--; a[i+1]--; a[i+2]--;
      f=(panduanl(a,huir));
      a[i]++; a[i+1]++; a[i+2]++;
      if (f) return true;
    } else {
      if (i<8 && a[i]>=1 && a[i+2]>=1 && huir>=1) { // AHC
        a[i]--; a[i+2]--;
        f=(panduanl(a,huir-1));
        a[i]++; a[i+2]++;
        if (f) return true;
      }
      if (i<9 && a[i]>=1 && a[i+1]>=1 && huir>=1) { // ABH
        a[i]--; a[i+1]--;
        f=(panduanl(a,huir-1));
        a[i]++; a[i+1]++;
        if (f) return true;
      }
    }
    if (huir>=2 && a[i]===1 && 
      (i===9 || a[i+1]===0) && 
      (i===8 || a[i+2]===0)
    ) { // AHH
      a[i]--;
      f=(panduanl(a,huir-2));
      a[i]++;
      if (f) return true;
    }
    return false;
  }
  // 判断字牌需要多少张混
  var panduanz=function (a) {
    var u=[0,2,1,0,2], i, t=0;
    for (i=1;i<=7;i++)
      t+=u[a[i]];
    return t;
  }
  // 判断除了将以外的牌能否和牌
  var panduanf=function(a) {
    // h表示混儿的分配情况
    // 要求保证分配等于总数
    // 每种花色的牌张数最后正好是三的倍数
    var h=[panduanz(a[0]),0,0,0];
    for ( h[1]=(12-a[1][0])%3;h[0]+h[1]     <=a[0][8];h[1]+=3)
     for (h[2]=(12-a[2][0])%3;h[0]+h[1]+h[2]<=a[0][8];h[2]+=3) {
       h[3]=a[0][8]-(h[0]+h[1]+h[2]);
       if (panduanl(a[1],h[1])&&panduanl(a[2],h[2])&&panduanl(a[3],h[3])) {
         numwbt=h; return true;
       }
    }
    return false;
  }
  // 判断是否能小和
  var xiaohu=function (t) {
    var a=new tiao; a.copy(t);
    var i,j,f;
    // 枚举做将的牌
    for (i=0;i<4;i++)
     for (j=1;j<=zhang.prototype.zzhang[i];j++)
     if (a[i][j]>=2) {
       // 用两张这个的牌
       a[i][j]-=2; a[i][0]-=2;
       jiang=new zhang(i,j);
       f=panduanf(a);
       a[i][j]+=2; a[i][0]+=2;
       if (f) return true;
     } else if (a[i][j]===1) {
       // 用一张这个牌和一张混儿
       a[i][j]--; a[i][0]--; a[0][8]--;
       jiang=new zhang(i,j);
       f=panduanf(a);
       a[i][j]++; a[i][0]++; a[0][8]++;
       if (f) return true;
     }
     return false;
  }
  // 判断是否能和指定的番种
  var panduan=function (t,hd,zw,l,last) {
    // 返回类型包括：结果以及双混儿、本混儿
    // 其中双混儿处单混儿吊返回1，双混儿吊返回2
    // 本混儿处返回龙的类型
    var pdr=function(ky,sh,ll) {
      this.ky=ky; this.sh=sh; this.ll=ll;
      this.lb=ll===zhang.prototype.huir[0].lb;
    }

    // 定义两个常量
    // hp为混儿用z8表示、ww为五万
    var hp=new zhang(0,8), ww=new zhang(1,5);

    var sh=false, ll=0;
    // 如果最后一张是混儿则这里为1
    var lah=last.samehuir()?1:0;
    if (lah) last=new zhang(0,8);
    
    // 返回假时用的变量
    var rf=new pdr(false, 0, 0);
    
    // 如果问捉伍儿，最后一张连五万都不是直接返回假
    if (zw) if (!last.same(ww) && !last.same(hp)) return rf;

    var a=new tiao(), c=new tiao(), b=new tiao();
    a.copy(t); c.copy(a);
    
    // sh_l, sh_r用来描述混儿吊的情形，
    // 0=没有 1=单混儿吊 2=双混儿吊
    // 如果要求捉伍儿则一定是双混儿吊
    // 混儿吊用到的混儿的数量不多于混儿的总数量
    var sh_i, sh_l, sh_r;
    sh_l=hd?(zw?2:1):0;
    sh_r=hd?(Math.min(2,a[0][8]-lah)):0;
    // 循环判断双混儿吊/单混儿吊
    for (sh_i=sh_r;sh_i>=sh_l;sh_i--) {
      sh=sh_i===2;
      a.copy(c);
      // 如果要求混儿吊且非捉伍儿
      if (hd && !zw) {
        // 去掉单放的牌以及混儿牌sh_i张
        a[last.lb][last.sz]--;
        if (!last.same(hp)) a[last.lb][0]--;
        var i; for (i=0;i<sh_i;i++) a[0][8]--;
      }
      // 如果要求双混儿伍儿
      if (hd && zw) {
        // 去掉单放的牌以及混儿牌两张
        a[last.lb][last.sz]--;
        if (!last.same(hp)) a[last.lb][0]--;
        a[0][8]-=2;
      }
      // 如果没要求混儿吊也没要捉伍儿
      if (!hd && zw) {
        // 去掉最后一张以及四六万各一个（没有用混儿补）
        a[last.lb][last.sz]--;
        if (!last.same(hp)) a[last.lb][0]--;
        if (a[1][4]>0) {a[1][4]--; a[1][0]--;} else a[0][8]--;
        if (a[1][6]>0) {a[1][6]--; a[1][0]--;} else a[0][8]--;
      }
      if (!l) {
        // 如果不要求龙的话可以直接判断了
        if (sh_i===1) { if (panduanf(a)) return new pdr(true,sh_i,0); }
        else { if (xiaohu(a)) return new pdr(true,sh_i,0); }
      } else {
        b.copy(a);
        // 如果要求龙，则根据龙的花色进行枚举
        // 如果混儿不是字，那么先判断本混儿龙
        if (zhang.prototype.huir[0].lb!==0) {
          ll=zhang.prototype.huir[0].lb;
          for (i=1;i<=9;i++)
           // 如果不是非混儿吊的捉伍儿龙且万子龙且四伍六万
           if (!(!hd&&zw&&ll===1&&i>=4&&i<=6))
            // 则需要去掉一张
            if (a[ll][i]>0) { a[ll][i]--; a[ll][0]--; }
            else a[0][8]--;
          // 如果剩余混儿牌张数不为负数（仍然合法）
          if (a[0][8]>=0) 
            if (sh_i===1) {if (panduanf(a)) return new pdr(true,sh_i,ll);}
            else {if (xiaohu(a)) return new pdr(true,sh_i,ll);}
        }
        // 如果没法和本混儿龙
        // 枚举所有剩余花色
        for (ll=1;ll<=3;ll++) if (ll!==zhang.prototype.huir[0].lb) {
          a.copy(b);
          for (i=1;i<=9;i++)
           if (!(!hd&&zw&&ll===1&&i>=4&&i<=6))
            if (a[ll][i]>0) { a[ll][i]--; a[ll][0]--; }
            else a[0][8]--;
          if (a[0][8]>=0)
            if (sh_i===1) {if (panduanf(a)) return new pdr(true,sh_i,ll);}
            else {if (xiaohu(a)) return new pdr(true,sh_i,ll);}
        }
      }
    }
    
    // 解释不通则返回假
    return rf;
  }
  // 计算和牌的番种大小
  var daxiao=function (mh,hd,zw,l,lb,g) {
    return (
      (((zw?3:0)+(l?4:0)+(!zw&&!l?1:0))*
      (mh?2:1)*(hd?2:1)*(l&&lb?2:1))*(g?2:1)
    );
  }
  // 对给定牌型命名
  var mingming=function (mh,hd,zw,l,lb,g) {
    var s="";
    if (g) s+=ZH_G+ZH_K;
    if (mh) s+=ZH_M+ZH_H+ZH_E;            
    if (hd===2) s+=ZH_S;            
    if (hd>0) s+=ZH_H+ZH_E;            
    if (hd>0 && !zw) s+=ZH_I;
    if (zw&&(s===""||l)) s+=ZH_Z;
    if (zw) s+=ZH_W+ZH_E;
    if (l&&lb) s+=ZH_3+ZH_H+ZH_E;
    if (l) s+=ZH_L;
    if (s==="") s=ZH_X+ZH_U;
    return s;
  }
  // 判断给定的番种是否够起和番
  var qihu=function (r) {
    r.ky=(r.dx>=qihuf)||((qihuf===3)&&(r.g||r.mh));
  }
  // 选择最大的番种
  var xuanze=function (t,last) {
    var a=new tiao(); a.copy(t);
    var i; var r=new pdhpl();
    var mh=a[0][8]===0, hd, zw, l;
    for (i=7;i>=0;i--) {
      hd=!!(i&1); zw=!!(i&2); l=!!(i&4);
      if (daxiao(mh,hd,zw,l,true)<=r.dx) continue;
      var e=panduan(a,hd,zw,l,last,g);
      if (e.ky) {
        var n=daxiao(mh,hd,zw,l,e.lb,g);
        if (n>r.dx) {
          r.dx=n; r.last=last;
          r.mh=mh; r.hd=e.sh; r.zw=zw; r.l=e.ll; r.g=g;
          r.mc=mingming(mh,e.sh,zw,l,e.lb,g);
          qihu(r);
          if (r.hd===1) r.j=new zhang(last.lb, last.sz);
          else r.j=new zhang(jiang.lb, jiang.sz);
          r.numwbt=[numwbt[0], numwbt[1], numwbt[2], numwbt[3]];
        }
      }
    }
    return r;
  }
  return xuanze(t,last);
  
}
