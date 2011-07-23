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
    for (i=0;i<s.pz();i++) {
      h[s[i].lb][s[i].sz]++;
      a[s[i].lb][s[i].sz]--;
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
  }
  { // 估价函数们
    inusez(v[0],h[0],a[0]);
    inusel(v[1],h[1],a[1]);
    inusel(v[2],h[2],a[2]);
    inusel(v[3],h[3],a[3]);
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

// 一些估价中用到的常量
var
  FCOUNT=200, DCOUNT=100, GCOUNT=50;

// 我在接下来能够抓到某张牌的期望可以简单的认为是
//   这张牌还有多少张没露出来×还有多少牌可以抓/没露出来的牌的总数/4
// 然后根据是否可以碰，别人是否有可能有这张牌等因素所适当修正即可

var gp=function (a) {
  return 1-Math.pow(1-sx/st/4,a);
}
var gpp=function (a) {
  return 1-Math.pow(1-sx/st/4/1.2,a);
}

// 字牌
var inusez=function (v,s,a) {
  var i;
  for (i=0;i<7;i++) switch (s[i]) {
    case 1:
      v[i]=Math.max(
        FCOUNT*gp(a[i])*gpp(a[i]-1),
        DCOUNT*gp(a[i])*Math.pow(0.89,nz[2])
      );
      break;
    case 2:
      v[i]=Math.max(
        FCOUNT*gpp(a[i]),
        DCOUNT*Math.pow(0.89,nz[2])
      );
      break;
    case 3:
      v[i]=FCOUNT+gp(a[i])*GCOUNT;
      break;
    case 4:
      v[i]=FCOUNT+GCOUNT;
      break;
  }
}

// 序数牌
var inusel=function (v,s,a) {
  var acpy=function (a,b) { for (i=0;i<10;i++) a[i]=b[i]; }
  var l=new Array(10), r=new Array(10), m=Math.max(), i;
  for (i=1;i<10;i++) l[i]=Math.min();
  var iz=function (p) {
    var sc;
    sc=Math.max(
                   FCOUNT*gp(a[ p ])*gp(a[p]-1),
      (p<=7      )?FCOUNT*gp(a[p+1])*gp(a[p+2]):0,
      (p>=3      )?FCOUNT*gp(a[p-1])*gp(a[p-2]):0,
      (p<=8&&p>=2)?FCOUNT*gp(a[p-1])*gp(a[p+1]):0
    );
    return sc;
  }
  var sv=function (v, t) {
    if (t<m) return;
    m=t;
    acpy(r,v);
  }
  var inuselr=function (v,s,t) {
    var v_ =new Array(10), s_ =new Array(10);
    var v__=new Array(10), s__=new Array(10);
    var sc1, sc2;
    var i;
    for (i=1;i<10;i++) if (s[i]!==0) break;
    if (i===10) sv(v,t); else {
      // CASE 0
        acpy(v_,v); acpy(s_,s);
      // CASE 1
        // CASE 1-1 A
        acpy(v,v_); acpy(s,s_);
        if (s[i]===1) {
          sc1=iz(i);
          v[i]=Math.min(v[i],sc1);
          s[i]=0;
          inuselr(v,s,t+sc1);
        } else
        // CASE 1-2 AA
        if (s[i]===2) {
          sc1=FCOUNT*gpp(a[i]);
          v[i]=Math.min(v[i],sc1);
          s[i]=0;
          inuselr(v,s,t+sc1*2);
        } else
        // CASE 1-3 AAA
        if (s[i]===3) {
          sc1=FCOUNT+gp(a[i])*GCOUNT;
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
        // CASE 2-1 ABC
        acpy(v,v_); acpy(s,s_);
        if (i<=7) if (s[i+1]>0 && s[i+2]>0) {
          if (i===1) sc1=FCOUNT;
          v[ i ]=Math.min(v[ i ],sc1);
          v[i+1]=Math.min(v[i+1],sc1);
          v[i+2]=Math.min(v[i+2],sc1);
          s[i]--; s[i+1]--; s[i+2]--;
          inuselr(v,s,t+sc1*3);
        }
        // CASE 2-2 AB
        acpy(v,v_); acpy(s,s_);
        if (i<=8) if (s[i+1]>0) {
          if      (i===1) sc1=FCOUNT*gp(a[i+2]);
          else if (i===8) sc1=FCOUNT*gp(a[i-1]);
          else            sc1=FCOUNT*gp(a[i-1]+a[i+2]);
          v[ i ]=Math.min(v[ i ],sc1);
          v[i+1]=Math.min(v[i+1],sc1);
          s[i]--; s[i+1]--;
          inuselr(v,s,t+sc1*2);
        }
        // CASE 2-3 AC
        acpy(v,v_); acpy(s,s_);
        if (i<=7) if (s[i+2]>0) {
          sc1=FCOUNT*gp(a[i+1]);
          v[ i ]=Math.min(v[ i ],sc1);
          v[i+2]=Math.min(v[i+2],sc1);
          s[i]--; s[i+2]--;
          inuselr(v,s,t+sc1*2);
        }
      /*
      // CASE 1+2
      // CASE (1-2+2-1)
      acpy(v,v_); acpy(s,s_);
      if (i<=7) if (s[i+1]>0 && s[i+2]>0) {
        sc1=FCOUNT;
        v[ i ]=Math.min(v[ i ],sc1);
        v[i+1]=Math.min(v[i+1],sc1);
        v[i+2]=Math.min(v[i+2],sc1);
        s[i]--; s[i+1]--; s[i+2]--;
        acpy(v__,v); acpy(s__,s);
        // CASE (1-2+2-1)-1 AABC
        if (s[i]>0 && i<=6) {
          sc2=Math.max(
            iz(i),
            FCOUNT*gp(a[i])*gp(a[i+3])
          );
          v[ i ]=Math.min(v[ i ],sc2);
          inuselr(v,s,t+sc1*3+sc2);
        }
        // CASE (1-2+2-1)-2 ABBC
        acpy(v,v__); acpy(s,s__);
        if (s[i+1]>0 && i>=2 && i<=6) {
          sc2=Math.max(
            iz(i),
            FCOUNT*gp(a[i-1])*gp(a[i+3])
          );
          v[i+1]=Math.min(v[i+1],sc2);
          inuselr(v,s,t+sc1*3+sc2);
        }
        // CASE (1-2+2-1)-3 ABCC
        acpy(v,v__); acpy(s,s__);
        if (s[i+2]>0 && i>=2) {
          sc2=Math.max(
            iz(i),
            FCOUNT*gp(a[i-1])*gp(a[i+2])
          );
          v[i+2]=Math.min(v[i+2],sc2);
          inuselr(v,s,t+sc1*3+sc2);
        }
      }
      */
      // CASE (1-2)+(2-2)
        // AAB
        
    }
  }
  inuselr(l,s,0);
  acpy(v,r);
}