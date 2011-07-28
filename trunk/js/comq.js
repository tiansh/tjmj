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

// 保存各种牌现在还剩下多少
var al;

// 每一局相关变量初始化
var cqinit=function () {
  al=[
    [28,4,4,4,4,4,4,4,0,0],
    [36,4,4,4,4,4,4,4,4,4],
    [36,4,4,4,4,4,4,4,4,4],
    [36,4,4,4,4,4,4,4,4,4]
  ];
}
// 统计剩余牌张数
var expp=function (z) {
  al[z.lb][z.sz]--;
  al[z.lb][0]--;
}

// 选择时相关变量
var
  sx, // 剩余可用张数
  st, // 剩余总张数
  nz; // 手牌中n个相同的牌的数量

// 一些估价中用到的常量
var
  FCOUNT=200, DCOUNT, GCOUNT=50, W46COUNT;

// 电脑选择打牌
var comchose=function (s) {
  var i,j;
  var v=new Array(4); // 估价数值
  var h=new Array(4); // 手里有多少张
  var a=new Array(4); // 还剩下多少张
  { // 初始化以上变量
    for (i=0;i<4;i++) {
      v[i]=new Array(10);
      h[i]=new Array(10);
      a[i]=new Array(10);
      for (j=0;j<10;j++) {
        h[i][j]=0;
        a[i][j]=al[i][j];
        v[i][j]=0;
      }
    }
    for (i=0;i<s.pz();i++)
     if (!s[i].samehuir()){
      h[s[i].lb][s[i].sz]++;
      a[s[i].lb][s[i].sz]--;
    } else {
      h[0][8]++;
      a[0][8]--;
    }
    for (i=0;i<zhang.prototype.numhuir;i++)
      a[zhang.prototype.huir[i].lb]
       [zhang.prototype.huir[i].sz]=0;
    sx=pq.num();
    for (st=0,i=0;i<4;i++)
      st+=a[i][0];
    nz=[0,0,0,0,0];
    for (i=0;i<4;i++)
     for (j=1;j<=(i===0?7:9);j++)
      nz[h[i][j]]++;
    DCOUNT=10/Math.pow(2,nz[2]);
    W46COUNT=(h[0][8]===0)?16:10-(h[0][8]>4)?4:0;
  }
  { // 估价函数们
    inusez(v[0],h[0],a[0]);
    inusel(v[1],h[1],a[1],true );
    inusel(v[2],h[2],a[2],false);
    inusel(v[3],h[3],a[3],false);
    for (i=0;i<zhang.prototype.numhuir;i++)
      v[zhang.prototype.huir[i].lb]
       [zhang.prototype.huir[i].sz]=Math.min();
  }
  { // 比较并找到结果
    var m=Math.min(),p=new zhang(0,0);
    for (i=0;i<s.pz();i++)
     if (v[s[i].lb][s[i].sz]<m) {
      m=v[s[i].lb][s[i].sz];
      p.lb=s[i].lb; p.sz=s[i].sz;
    }
  }
  return p;
}

// 电脑选择暗杠/小明杠
var dnag=function (s,z) {
  var i,j;
  var v=new Array(4); // 估价数值
  var h=new Array(4); // 手里有多少张
  var a=new Array(4); // 还剩下多少张
  {
    for (i=0;i<4;i++) {
      v[i]=new Array(10);
      h[i]=new Array(10);
      a[i]=new Array(10);
      for (j=0;j<10;j++) {
        h[i][j]=0;
        a[i][j]=al[i][j];
        v[i][j]=0;
      }
    }
    for (i=0;i<s.pz();i++)
     if (!s[i].samehuir()){
      h[s[i].lb][s[i].sz]++;
      a[s[i].lb][s[i].sz]--;
    } else {
      h[0][8]++;
      a[0][8]--;
    }
    for (i=0;i<zhang.prototype.numhuir;i++)
      a[zhang.prototype.huir[i].lb]
       [zhang.prototype.huir[i].sz]=0;
    sx=pq.num();
    for (st=0,i=0;i<4;i++)
      st+=a[i][0];
    nz=[0,0,0,0,0];
    for (i=0;i<4;i++)
     for (j=1;j<=(i===0?7:9);j++)
      nz[h[i][j]]++;
    DCOUNT=10/Math.pow(2,nz[2]);
    W46COUNT=(h[0][8]===0)?16:10-(h[0][8]>4)?4:0;
  }
  var sc1, sc2, ag;
  ag=h[z.lb][z.sz]===4;
  if (z.lb===0)
    sc1=inusez(v[0],h[0],a[0]);
  else
    sc1=inusel(v[z.lb],h[z.lb],a[z.lb],z.lb===1);
  h[z.lb][z.sz]=0;
  if (z.lb===0)
    sc2=inusez(v[0],h[0],a[0]);
  else
    sc2=inusel(v[z.lb],h[z.lb],a[z.lb],z.lb===1);
  if (ag) { if (sc2>sc1-4*FCOUNT-5*GCOUNT) return true; }
  else { if (sc2>sc1-FCOUNT-GCOUNT) return true; }
  return false;
}

// 电脑选择碰/大明杠
var dnpg=function (s,z) {
  var i,j;
  var v=new Array(4); // 估价数值
  var h=new Array(4); // 手里有多少张
  var a=new Array(4); // 还剩下多少张
  {
    for (i=0;i<4;i++) {
      v[i]=new Array(10);
      h[i]=new Array(10);
      a[i]=new Array(10);
      for (j=0;j<10;j++) {
        h[i][j]=0;
        a[i][j]=al[i][j];
        v[i][j]=0;
      }
    }
    for (i=0;i<s.pz();i++)
     if (!s[i].samehuir()){
      h[s[i].lb][s[i].sz]++;
      a[s[i].lb][s[i].sz]--;
    } else {
      h[0][8]++;
      a[0][8]--;
    }
    for (i=0;i<zhang.prototype.numhuir;i++)
      a[zhang.prototype.huir[i].lb]
       [zhang.prototype.huir[i].sz]=0;
    sx=pq.num();
    for (st=0,i=0;i<4;i++)
      st+=a[i][0];
    nz=[0,0,0,0,0];
    for (i=0;i<4;i++)
     for (j=1;j<=(i===0?7:9);j++)
      nz[h[i][j]]++;
    DCOUNT=10/Math.pow(2,nz[2]);
    W46COUNT=(h[0][8]===0)?16:10-(h[0][8]>4)?4:0;
  }
  var sc1, sc2, sc3, g;
  if (z.lb===0)
    sc1=inusez(v[0],h[0],a[0]);
  else
    sc1=inusel(v[z.lb],h[z.lb],a[z.lb],z.lb===1);
  h[z.lb][z.sz]-=2;
  if (z.lb===0)
    sc2=inusez(v[0],h[0],a[0]);
  else
    sc2=inusel(v[z.lb],h[z.lb],a[z.lb],z.lb===1);
  if (h[z.lb][z.sz]===1) {
      h[z.lb][z.sz]--;
    if (z.lb===0)
      sc3=inusez(v[0],h[0],a[0]);
    else
      sc3=inusel(v[z.lb],h[z.lb],a[z.lb],z.lb===1);
      if (sc3>sc1-3*FCOUNT-4*GCOUNT) return "g";
  }
  if (sc2>sc1-2*FCOUNT) return "p";
  return false;
}

// 我在接下来能够抓到某张牌的期望可以简单的认为是
//   这张牌还有多少张没露出来×还有多少牌可以抓/没露出来的牌的总数/4
// 然后根据是否可以碰，别人是否有可能有这张牌等因素所适当修正即可

var kz=function (s) {
  return s/4;
}
var gp=function (a) {
  return 1-Math.pow(1-kz(sx)/st/4,a);
}
var gpp=function (a) {
  return 1-Math.pow(1-kz(sx)/st/4*1.2,a);
}
var uj=function () {
  var i, r=1, l=arguments.length;
  for (i=0;i<l;i++) r*=(1-arguments[i]);
  return 1-r;
}

// 字牌
var inusez=function (v,s,a) {
  var i, u, m=0;
  for (i=0;i<7;i++) switch (s[i]) {
    case 1:
      u=gp(a[i])*gpp(a[i]-1);
      v[i]=FCOUNT*u+DCOUNT*(1-u)*gp(a[i]);
      m+=v[i]*1;
      break;
    case 2:
      u=gpp(a[i]);
      v[i]=FCOUNT*u+DCOUNT;
      m+=v[i]*2;
      break;
    case 3:
      v[i]=FCOUNT+gp(a[i])*GCOUNT;
      m+=v[i]*3;
      break;
    case 4:
      v[i]=FCOUNT+GCOUNT;
      m+=v[i]*4;
      break;
  }
  return m;
};

// 序数牌
var inusel=function (v,s,a,w) {
  var acpy=function (a,b) { for (i=0;i<10;i++) a[i]=b[i]; }
  var l=new Array(10), r=new Array(10), m=Math.max(), i;
  for (i=1;i<10;i++) l[i]=Math.min();
  var sv=function (v, t) {
    if (t<m) return;
    m=t;
    acpy(r,v);
  }
  var inuselr=function (v,s,t) {
    var v_ =new Array(10), s_ =new Array(10);
    var v__=new Array(10), s__=new Array(10);
    var sc1, sc2;
    var i, u;
    for (i=1;i<10;i++) if (s[i]!==0) break;
    // 这里对不同的牌型分类给每张牌估价
    // 每张牌估价的结果取决于最低分数的一张
    // 下面分类中，相邻的字母表示相邻序数的牌
    if (i===10) sv(v,t); else {
      // CASE BEGIN
        acpy(v_,v); acpy(s_,s);
      // CASE 1
      // 单张重复牌的情况
        // CASE 1-1 A
        acpy(v,v_); acpy(s,s_);
        if (s[i]===1) {
          // 计算能凑成副的概率为u
          // 则该张牌的股价分数为对副的分数乘上u
          u=uj(
                         gp(a[ i ])*gp(a[i]-1),
            (i<=7      )?gp(a[i+1])*gp(a[i+2]):0,
            (i>=3      )?gp(a[i-1])*gp(a[i-2]):0,
            (i<=8&&i>=2)?gp(a[i-1])*gp(a[i+1]):0
          );
          sc1=FCOUNT*u+DCOUNT*(1-u)*gp(a[i]);
          if (w && i===4 || i===6) sc1+=W46COUNT/2;
          v[i]=Math.min(v[i],sc1);
          s[i]=0;
          inuselr(v,s,t+sc1);
        } else
        // CASE 1-2 AA
        if (s[i]===2) {
          u=uj(
            (i<=7      )?gp(a[i+1])*gp(a[i+2]):0,
            (i>=3      )?gp(a[i-1])*gp(a[i-2]):0,
            (i<=8&&i>=2)?gp(a[i-1])*gp(a[i+1]):0
          );
          sc1=FCOUNT*(gpp(a[i])+(1-gpp(a[i]))*u)+DCOUNT;
          v[i]=Math.min(v[i],sc1);
          s[i]=0;
          inuselr(v,s,t+sc1*2);
        } else
        // CASE 1-3 AAA
        if (s[i]===3) {
          sc1=FCOUNT+gp(a[i])*GCOUNT+DCOUNT/2;
          v[i]=Math.min(v[i],sc1);
          s[i]=0;
          inuselr(v,s,t+sc1*3);
        } else
        // CASE 1-4 AAAA
        if (s[i]===4) {
          sc1=FCOUNT+GCOUNT;
          v[i]=Math.min(v[i],sc1);
          s[i]=0;
          inuselr(v,s,t+sc1*4);
        }
      // CASE 2
      // 三张成顺的情况
        // CASE 2-1 ABC
        acpy(v,v_); acpy(s,s_);
        if (i<=7) if (s[i+1]>0 && s[i+2]>0) {
          sc1=FCOUNT;
          v[ i ]=Math.min(v[ i ],sc1);
          v[i+1]=Math.min(v[i+1],sc1);
          v[i+2]=Math.min(v[i+2],sc1);
          s[i]--; s[i+1]--; s[i+2]--;
          inuselr(v,s,t+sc1*3);
        }
        // CASE 2-2 AB
        acpy(v,v_); acpy(s,s_);
        if (i<=8) if (s[i+1]>0) {
          if      (i===1) u=gp(a[i+2]);
          else if (i===8) u=gp(a[i-1]);
          else            u=gp(a[i-1]+a[i+2]);
          sc1=(1-u)*gp(a[ i ])*gpp(a[ i ]-1)*FCOUNT+u*FCOUNT;
          sc2=(1-u)*gp(a[i+1])*gpp(a[i+1]-1)*FCOUNT+u*FCOUNT;
          v[ i ]=Math.min(v[ i ],sc1);
          v[i+1]=Math.min(v[i+1],sc2);
          s[i]--; s[i+1]--;
          inuselr(v,s,t+sc1+sc2);
        }
        // CASE 2-3 A0C
        acpy(v,v_); acpy(s,s_);
        if (i<=7) if (s[i+1]===0 && s[i+2]>0) {
          var u1, u2;
          u=gp(a[i+1]);
          u1=uj(
            u,
            (i>=3)?gp(a[i-1])*gp(a[i-2]):0
          );
          u2=uj(
            u,
            (i<=5)?gp(a[i+3])*gp(a[i+4]):0
          );
          sc1=(1-u1)*gp(a[ i ])*   gpp(a[ i ]-1) *FCOUNT+
              (1-u1)*gp(a[ i ])*(1-gpp(a[ i ]-1))*DCOUNT+
              u1*FCOUNT;
          sc2=(1-u2)*gp(a[i+2])*   gpp(a[i+2]-1) *FCOUNT+
              (1-u2)*gp(a[i+2])*(1-gpp(a[i+2]-1))*DCOUNT+
              u2*FCOUNT;
          v[ i ]=Math.min(v[ i ],sc1);
          v[i+2]=Math.min(v[i+2],sc2);
          s[i]--; s[i+2]--;
          inuselr(v,s,t+sc1+sc2);
        }

      // CASE 3=1+2
      // 上面两种情况的组合
      // CASE (3-1)=(1-2+2-1)
      acpy(v,v_); acpy(s,s_);
      if (i<=7) if (s[i+1]>0 && s[i+2]>0) {
        sc1=FCOUNT;
        v[ i ]=Math.min(v[ i ],sc1);
        v[i+1]=Math.min(v[i+1],sc1);
        v[i+2]=Math.min(v[i+2],sc1);
        s[i]--; s[i+1]--; s[i+2]--;
        acpy(v__,v); acpy(s__,s);
        // CASE 3-1-1 AABC
        if (s[i]>0 && i<=6) {
          u=uj(
            gp(a[ i ])*gp(a[i]-1),
            gp(a[i+1])*gp(a[i+2]),
            gp(a[i-1])*gp(a[i-2]),
            gp(a[i-1])*gp(a[i+1]),
            gp(a[ i ])*gp(a[i+3])
          );
          sc2=FCOUNT*u+DCOUNT*(1-u)*gp(a[i]);
          v[ i ]=Math.min(v[ i ],sc2);
          s[i]--;
          inuselr(v,s,t+sc1*3+sc2);
        }
        // CASE 3-1-2 ABBC
        acpy(v,v__); acpy(s,s__);
        if (s[i+1]>0 && i>=2 && i<=6) {
          u=uj(
            gp(a[ i ])*gp(a[i]-1),
            gp(a[i+1])*gp(a[i+2]),
            gp(a[i-1])*gp(a[i-2]),
            gp(a[i-1])*gp(a[i+1]),
            gp(a[i-1])*gp(a[i+3])
          );
          sc2=FCOUNT*u+DCOUNT*(1-u)*gp(a[i+1]);
          v[i+1]=Math.min(v[i+1],sc2);
          s[i+1]--;
          inuselr(v,s,t+sc1*3+sc2);
        }
        // CASE 3-1-3 ABCC
        acpy(v,v__); acpy(s,s__);
        if (s[i+2]>0 && i>=2) {
          u=uj(
            gp(a[ i ])*gp(a[i]-1),
            gp(a[i+1])*gp(a[i+2]),
            gp(a[i-1])*gp(a[i-2]),
            gp(a[i-1])*gp(a[i+1]),
            gp(a[i-1])*gp(a[i+2])
          );
          sc2=FCOUNT*u+DCOUNT*(1-u)*gp(a[i+2]);
          v[i+2]=Math.min(v[i+2],sc2);
          s[i+2]--;
          inuselr(v,s,t+sc1*3+sc2);
        }
      }
      // CASE (3-2)=(1-2)+(2-2)
        // CASE 3-2-1 AAB
        acpy(v,v_); acpy(s,s_);
        if (i<=8) if (s[i]>=2 && s[i+1]>=1 && (i===8 || s[i+2]===0)) {
          sc1=FCOUNT*gpp(a[ i ])+DCOUNT;
          if      (i===1) u=gp(a[i+2]);
          else if (i===8) u=gp(a[i-1]);
          else            u=gp(a[i-1]+a[i+2]);
          sc2=(1-u)*gp(a[i+1])*   gpp(a[i+1]-1) *FCOUNT+
              (1-u)*gp(a[i+1])*(1-gpp(a[i+1]-1))*DCOUNT+
              u*FCOUNT;
          v[ i ]=Math.min(v[ i ],sc1);
          v[i+1]=Math.min(v[i+1],sc2);
          s[i]-=2; s[i+1]--;
          inuselr(v,s,t+sc1+sc2+Math.max(sc1,sc2));
        }
        // CASE 3-2-2 ABB
        acpy(v,v_); acpy(s,s_);
        if (i<=8) if (s[i+1]>=2 && (i===8 || s[i+2]===0)) {
          if      (i===1) u=gp(a[i+2]);
          else if (i===8) u=gp(a[i-1]);
          else            u=gp(a[i-1]+a[i+2]);
          sc1=(1-u)*gp(a[ i ])*   gpp(a[ i ]-1) *FCOUNT+
              (1-u)*gp(a[ i ])*(1-gpp(a[ i ]-1))*DCOUNT+
              u*FCOUNT;
          sc2=FCOUNT*gpp(a[i+1])+DCOUNT;
          v[ i ]=Math.min(v[ i ],sc1);
          v[i+1]=Math.min(v[i+1],sc2);
          s[i]--; s[i+1]-=2;
          inuselr(v,s,t+sc1+sc2+Math.max(sc1,sc2));
        }
        // CASE 3-2-3 AAC
        acpy(v,v_); acpy(s,s_);
        if (i<=7) if (s[i]>=2 && s[i+2]>=1 && s[i+1]===0) {
          sc1=FCOUNT*gpp(a[ i ])+DCOUNT;
          u=gp(a[i+1]);
          sc2=(1-u)*gp(a[i+2])*   gpp(a[i+2]-1) *FCOUNT+
              (1-u)*gp(a[i+2])*(1-gpp(a[i+2]-1))*DCOUNT+
              u*FCOUNT;
          v[ i ]=Math.min(v[ i ],sc1);
          v[i+2]=Math.min(v[i+2],sc2);
          s[i]-=2; s[i+2]--;
          inuselr(v,s,t+sc1+sc2+Math.max(sc1,sc2));
        }
        // CASE 3-2-4 ACC
        acpy(v,v_); acpy(s,s_);
        if (i<=7) if (s[i+2]>=2 && s[i+1]===0) {
          u=gp(a[i+1]);
          sc1=(1-u)*gp(a[ i ])*   gpp(a[ i ]-1) *FCOUNT+
              (1-u)*gp(a[ i ])*(1-gpp(a[ i ]-1))*DCOUNT+
              u*FCOUNT;
          sc2=FCOUNT*gpp(a[i+2])+DCOUNT;
          v[ i ]=Math.min(v[ i ],sc1);
          v[i+2]=Math.min(v[i+2],sc2);
          s[i]--; s[i+2]-=2;
          inuselr(v,s,t+sc1+sc2+Math.max(sc1,sc2));
        }
      // CASE 4 ABCD
      // 四张相邻序数的牌
        acpy(v,v_); acpy(s,s_);
        if (i<=6) if (s[i+1]>0&&s[i+2]>0&&s[i+3]>0) {
          var sc;
          u=uj(
            (i>=3)?gp(a[i-1])*gp(a[i-2]):0,
            (i>=2)?gp(a[i-1])*gp(a[i+1]):0,
                   gp(a[i+1])*gp(a[i+2])  ,
            (i<=5)?gp(a[i+2])*gp(a[i+4]):0,
            (i<=4)?gp(a[i+4])*gp(a[i+5]):0
          );
          sc1=(1-u)*gp(a[ i ])*   gpp(a[ i ]-1) *FCOUNT+
              (1-u)*gp(a[ i ])*(1-gpp(a[ i ]-1))*DCOUNT+
              u*FCOUNT;
          sc2=(1-u)*gp(a[i+3])*   gpp(a[i+3]-1) *FCOUNT+
              (1-u)*gp(a[i+3])*(1-gpp(a[i+3]-1))*DCOUNT+
              u*FCOUNT;
          sc =FCOUNT;
          v[ i ]=Math.min(v[ i ],sc1);
          v[i+1]=Math.min(v[i+1],sc );
          v[i+2]=Math.min(v[i+2],sc );
          v[i+3]=Math.min(v[i+3],sc2);
          s[i]--; s[i+1]--; s[i+2]--; s[i+3]--;
          inuselr(v,s,t+sc*3+Math.max(sc1,sc2));
        }
      // CASE 5 ABCDE
      // 五张相邻序数的牌
        acpy(v,v_); acpy(s,s_);
        if (i<=5) if (s[i+1]>0&&s[i+2]>0&&s[i+3]>0&&s[i+4]>0) {
          var sc3, sc4, sc;
          u=uj(
            (i>=2)?gp(a[i-1]):0,
                   gp(a[i+2])  ,
            (i<=4)?gp(a[i+5]):0
          );
          sc1=(1-u)*gp(a[ i ])*   gpp(a[ i ]-1) *FCOUNT+
              (1-u)*gp(a[ i ])*(1-gpp(a[ i ]-1))*DCOUNT+
              u*FCOUNT;
          sc2=(1-u)*gp(a[i+1])*   gpp(a[i+1]-1) *FCOUNT+
              (1-u)*gp(a[i+1])*(1-gpp(a[i+1]-1))*DCOUNT+
              u*FCOUNT;
          sc3=(1-u)*gp(a[i+2])*   gpp(a[i+2]-1) *FCOUNT+
              (1-u)*gp(a[i+2])*(1-gpp(a[i+2]-1))*DCOUNT+
              u*FCOUNT;
          sc4=(1-u)*gp(a[i+3])*   gpp(a[i+3]-1) *FCOUNT+
              (1-u)*gp(a[i+3])*(1-gpp(a[i+3]-1))*DCOUNT+
              u*FCOUNT;
          sc=FCOUNT;
          v[ i ]=Math.min(v[ i ],sc1);
          v[i+1]=Math.min(v[i+1],sc2);
          v[i+2]=Math.min(v[i+2],sc );
          v[i+3]=Math.min(v[i+3],sc3);
          v[i+4]=Math.min(v[i+4],sc4);
          s[i]--; s[i+1]--; s[i+2]--; s[i+3]--; s[i+4]--;
          
          inuselr(v,s,t+sc*3
            +Math.max(sc1+sc2,sc1+sc3,sc1+sc4,sc2+sc3,sc2+sc4,sc3+sc4)
          );
        }
      // CASE 6 ACE
        acpy(v,v_); acpy(s,s_);
        if (i<=5) if (s[i+2]>0&&s[i+4]>0&&s[i+1]===0&&s[i+3]===0) {
          var u1, u2, u3, sc3;
          u1=gp(a[i+1]); u3=gp(a[i+3]); u2=uj(u1,u3);
          sc1=(1-u1)*gp(a[ i ])*   gpp(a[ i ]-1) *FCOUNT+
              (1-u1)*gp(a[ i ])*(1-gpp(a[ i ]-1))*DCOUNT+
              u1*FCOUNT;
          sc2=(1-u2)*gp(a[i+2])*   gpp(a[i+2]-1) *FCOUNT+
              (1-u2)*gp(a[i+2])*(1-gpp(a[i+2]-1))*DCOUNT+
              u2*FCOUNT;
          sc3=(1-u3)*gp(a[i+4])*   gpp(a[i+4]-1) *FCOUNT+
              (1-u3)*gp(a[i+4])*(1-gpp(a[i+4]-1))*DCOUNT+
              u3*FCOUNT;
          v[ i ]=Math.min(v[ i ],sc1);
          v[i+2]=Math.min(v[i+2],sc2);
          v[i+4]=Math.min(v[i+4],sc3);
          s[i]--; s[i+2]--; s[i+4]--;
          inuselr(v,s,t+sc1+sc2+sc3);
        }
      // CASE 7 124, 689
      // 边张的情况
        // CASE 7-1 124
        acpy(v,v_); acpy(s,s_);
        if (i===1) if (s[1]>0&&s[2]>0&&s[4]>0&&s[3]===0) {
          var sc3, u1, u2, u3;
          u2=gp(a[3]);
          sc2=(1-u2)*gp(a[2])*   gpp(a[2]-1) *FCOUNT+
              (1-u2)*gp(a[2])*(1-gpp(a[2]-1))*DCOUNT+
              u2*FCOUNT;
          u1=gp(a[1])*gp(a[1]-1);
          sc1=FCOUNT*u1+DCOUNT*(1-u1)*gp(a[1]);
          u3=uj(
            gp(a[4])*gp(a[4]-1),
            gp(a[5])*gp(a[6])
          );
          sc3=FCOUNT*u3+DCOUNT*(1-u3)*gp(a[4]);
          v[1]=Math.min(v[1],sc1);
          v[2]=Math.min(v[2],sc2);
          v[4]=Math.min(v[4],sc3);
          s[1]--; s[2]--; s[4]--;
          inuselr(v,s,t+sc1+sc2+sc3);
        }
        // CASE 7-1 689
        acpy(v,v_); acpy(s,s_);
        if (i===6) if (s[6]>0&&s[8]>0&&s[9]>0&&s[7]===0) {
          var sc3, u1, u2, u3;
          u2=gp(a[7]);
          sc2=(1-u2)*gp(a[8])*   gpp(a[8]-1) *FCOUNT+
              (1-u2)*gp(a[8])*(1-gpp(a[8]-1))*DCOUNT+
              u2*FCOUNT;
          u1=gp(a[9])*gp(a[9]-1);
          sc1=FCOUNT*u1+DCOUNT*(1-u1)*gp(a[9]);
          u3=uj(
            gp(a[6])*gp(a[6]-1),
            gp(a[5])*gp(a[4])
          );
          sc3=FCOUNT*u3+DCOUNT*(1-u3)*gp(a[6]);
          v[9]=Math.min(v[9],sc3);
          v[8]=Math.min(v[8],sc2);
          v[6]=Math.min(v[6],sc1);
          s[9]--; s[8]--; s[6]--;
          inuselr(v,s,t+sc1+sc2+sc3);
        }
      // CASE 8 w4, w6
      // 边张的情况
        // CASE 8-1 46
        acpy(v,v_); acpy(s,s_);
        if (w && i===4 && s[6]>0 && s[5]===0) {
          var u1, u2;
          u=gp(a[i+1]);
          u1=uj(
            u,
            gp(a[2])*gp(a[3]),
            gp(a[4])*gpp(a[4]-1)
          );
          u2=uj(
            u,
            gp(a[7])*gp(a[8]),
            gp(a[6])*gpp(a[6]-1)
          );
          sc1=u1*FCOUNT;
          sc2=u2*FCOUNT;
          v[4]=Math.min(v[4],sc1+W46COUNT);
          v[6]=Math.min(v[6],sc2+W46COUNT);
          s[4]--; s[6]--;
          inuselr(v,s,t+2*W46COUNT+sc1+sc2);
        }
      // CASE END
      acpy(v,v_); acpy(s,s_);
   }
  }
  inuselr(l,s,0);
  acpy(v,r);
  return m;
}