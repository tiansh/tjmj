// 碰杠时把手牌中对应的牌张移动到末尾
// 这里n表示需要移动多少张
var pg_m=function (n) {
  var pos=ppos, z=new zhang(dapc.lb, dapc.sz);
  var i,j,s=sp[pos],l=s.pz();
  for (i=0;i<n;i++) {
    for (j=0;j<l;j++) if (s[j].same(z)) break;
    for (;j<l-1;j++) s[j]=new zhang(s[j+1].lb,s[j+1].sz);
    s[j]=new zhang(z.lb,z.sz);
  }
}

// 处理碰牌
var peng=function () {
  var s=sp[ppos];
  s[s.pz()-1]=new zhang(dapc.lb, dapc.sz);
  rmpc();
  pg_m(2);
  s.peng++;
  s.print();
  zpos=ppos;
  chty=3;
  callfunc(dap);
}

// 处理大明杠
// （手中暗刻杠）
var dmgang=function () {
  var s=sp[ppos];
  rmpc();
  pg_m(3);
  s.peng++;
  s.gang[4-s.peng]=true;
  zpos=ppos;
  callfunc(zhuagd);
}

// 处理小明杠&暗杠
var xm_agang=function () {
  var i,s=sp[zpos],l=s.pz(),c=0;
  for (i=0;i<l;i++) if (s[i].same(dapc)) c++;
  if (c===4) callfunc(angang);
  else callfunc(xmgang);
}

// 处理小明杠
// （手中明刻杠）
var xmgang=function () {
  var i,s=sp[ppos=zpos];
  for (i=4-s.peng;i<4;i++) if (s[i*3+3].same(dapc)) s.gang[i]=true;
  pg_m(1);
  callfunc(zhuagd);
}
// 处理暗杠
var angang=function () {
  var i,s=sp[ppos=zpos];
  pg_m(4);
  i=++s.peng;
  s.gang[4-i]=true;
  s[14-i*3]=new zhang(0,0);
  callfunc(zhuagd);
}

// 从牌池中移除碰杠的牌
var rmpc=function () {
  var d=$i("pc"+(zpos+1));
  var a=d.childNodes, l=a.length;
  d.removeChild(a[l-1]);
}

// 玩家或电脑选择不碰杠后继续抓牌
var pgqx=function () {
  callfunc(zhuap);
}
