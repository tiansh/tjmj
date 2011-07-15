// 手牌
var ba=function (pos, a) {
  var h = new Array(14);
  var i;
  for (i=0;i<13;i++)
    h[i]=a.getp();
  h[13]=new zhang(0,9);
  for (i in h)
    this[i]=h[i];
  // 谁的手牌
  this.pos=pos;
  // 碰杠了几对
  this.peng=0;
  // 是不是杠gang[3]表示最右面（最先）一副
  this.gang=[false, false, false, false];
  // 理牌
  this.sort();
}

ba.prototype.length=14;
ba.prototype.pz=function () {
  return 14-peng*3;
}

// 显示
ba.prototype.print=function () {
  var d=document.getElementById("sp"+this.pos);
  while (d.firstChild) d.removeChild(d.firstChild);
  var i;
  for (i=0;i<this.length;i++) {
    d.appendChild(this[i].divtag(!(i%3)&&i>2&&this.gang[(i-3)/3]));
  }
  d.className="p"+this.peng;
}

// 理牌
ba.prototype.sort=function () {
  // 比较牌张大小
  var zhangcmp=function (a,b) {
    var as=a.lb===0&&a.sz===9;
    var bs=b.lb===0&&b.sz===9;
    if (as&&!bs) return 1000;
    else if (!as&&bs) return -1000;
    var ah=a.samehuir(), bh=b.samehuir();
    if (ah!==bh) return ah?-100:100;
    return -10*(a.lb-b.lb)+(a.sz-b.sz);
  };
  // 只对没有碰的牌进行排序
  var t=14-this.peng*3;
  var i, j;
  for (i=0;i<t-1;i++) for (j=i+1;j<t;j++)
    if (zhangcmp(this[i],this[j])>0) {
      var temp=this[i]; this[i]=this[j]; this[j]=temp;
    }
}

// 判断和牌的返回值
var pdhp=function () {
  this.mh=false;
  this.hd=false;
  this.zw=false;
  this.l =false;
  this.lb=false;
  this.mc="";
  this.dx=0;
  this.jiang=new zhang(0,0);
  this.numwbt=[0,0,0,0];
  
}

ba.prototype.kyhu=function () {

  var r=new pdhp();

  // 这里tiao是从1~9的，0的位置保存sum(1~9)
  ba2tiao=function (a, b) {
    b=[
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0]
    ];
    var i;
    for (i=0;i<a.pz;i++)
      if (a[i].samehuir()) b[0][8]++;
    else {
      b[a[i].lb][a[i].sz]++;
      b[a[i].lb][0]++;
    }
  }
  
  hupai=function (a) {
    // 判断万、饼、条中的一种是否满足条件
    panduanl=function (a,huir) {
      var i, c;
      for (i=1;i<=9;i++) if (a[i]) break;
      if (i>9) return true;
      if (a[i]>=3) { // AAA
        c=a; c[i]-=3;
        if (panduanl(c,huir)) return true;
      } else if (a[i]===2 && huir>=1) { // AAH
        c=a; c[i]-=2;
        if (panduanl(c,huir-1)) return true;
      }
      if (i<8 && a[i]>=1 && a[i+1]>=1 && a[i+2]>=1) { // ABC
        c=a; c[i]--; c[i+1]--; c[i+2]--;
        if (panduanl(c,huir)) return true;
      } else {
        if (i<8 && a[i]>=1 && a[i+2]>=1 && huir>=1) { // AHC
           c=a; c[i]--; c[i+2]--;
           if (panduanl(c,huir-1)) return true;
        }
        if (i<9 && a[i]>=1 && a[i+1]>=1 && huir>=1) { // ABH
          c=a; c[i]--; c[i+1]--;
          if (panduanl(c,huir-1)) return true;
        }
      }
      if (huir>=2 && a[i]===1 && 
        (i===9 || a[i+1]===0) && 
        (i===8 || a[i+2]===0)
      ) { // AHH
        c=a; c[i]--;
        if (panduanl(c,huir-2)) return true;
      }
    }
    // 判断字牌需要多少张混
    panduanz=function (a) {
      var u=[0,2,1,0,2], i, t=0;
      for (i=1;i<7;i++)
        t+=u[a[i]];
      return t;
    }
    // 判断除了将以外的牌能否和牌
    panduanf=function(a) {
      var h=[panduanz(a[0]),0,0,0];
      for ( h[1]=(12-a[1])%3;h[0]+h[1]          <=a[0][8];h[1]+=3)
       for (h[2]=(12-a[2])%3;h[0]+h[1]+h[2]     <=a[0][8];h[2]+=3)
       for (h[2]=(12-a[3])%3;h[0]+h[1]+h[2]+h[3]<=a[0][8];h[3]+=3)
       if (panduanl(a[1],h[1])&&panduanl(a[2],h[2])&&panduanl(a[3],h[3])) {
         r.numwbt=h;
       }
    }
    xiaohu=function (a) {
      var i,j,c;
      for (i=0;i<4;i++)
       for (j=0;j<zhang.prototype.zzhang[i];j++)
       if (a[i][j]>=2) {
         c=a; c[i][j]-=2;
         r.jiang=new zhang(i,j);
         if (panduanf(c)) return true;
       } else if (a[i][j]===1) {
         c=a; c[i][j]--; c[0][8]--;
         r.jiang=new zhang(i,j);
         if (panduanf(c)) return true;
       }
    }
    // panduan=function (a,hd,zw,l,lb) {
      // if (zw) if (!a.last.samehuir() && !a.last.same(ww)) return false;
      // if (zw && hd) if (a[0,8]-a.last.samehuir?1:0<2) return false;
      
    // }
  }
}

