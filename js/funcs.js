// 利用setTimeout调用其他函数
// 时间为0，则本函数执行之后该函数立即执行
// 这样调用不会在堆栈区底部留下一大堆无用的函数
var callfunc=function (func) {
  setTimeout(func,0);
}

var zpos=0, ppos=0;
var dapc=new zhang(0,0);
// chty的取值
// 1时表示当前是正常的抓牌之后
// 2时表示是杠牌抓底牌之后
// 3时表示是碰牌之后
var chty;


var ainit=function () {
  callfunc(minit);
}

// 锅的初始化
var minit=function () {
  zhuang.init();
  fs.init();
  setTimeout(jinit,0);
}

// 一局牌的初始化
var jinit=function () {
  zhuang.print();
  fs.print();
  pq.init();
  pq.dhuir().sethuir();
  var i;
  for (i=0;i<4;i++) {
    sp[i].init(i+1,pq);
    sp[i].print();
  }
  zpos=zhuang.nzhuang+zhuang.dong-3;
  callfunc(zhuap);
}

// 抓牌
var zhuap=function () {
  var z=pq.getp();
  // 如果无牌可抓则荒牌
  if (z===null) {
    callfunc(huangp);
    return;
  }
  // 抓一张牌
  zpos=++zpos%4;
  sp[zpos][sp[zpos].pz()-1]=z;
  sp[zpos].print();
  // 设置当前状态为正常
  chty=1;
  callfunc(dap)
}

// 抓杠底
var zhuagd=function () {
  var z=pq.getlp();
  // 如果无牌可抓则荒牌
  if (z===null) {
    callfunc(huangp);
    return;
  }
  // 抓一张牌
  zpos=++zpos%4;
  sp[zpos][sp[zpos].pz()-1]=z;
  sp[zpos].print();
  // 设置当前状态为杠底
  chty=2;
  callfunc(dap)
}

// 打牌
var dap=function () {
  clearButtons();
  // 设置显示样式
  document.getElementById("act").className="p"+(zpos+1);
  // 根据玩家和电脑分类
  if (zpos===3) callfunc(dap_wj);
  else callfunc(dap_dn);
}

var a=function () { alert("!"); }

// 玩家打牌——选择
var dap_wj=function () {
  if (chty!==3) if (sp[3].pdhp(chty===2).ky) setButtons([{n:"和牌",f:hup}]);
  var i, l=sp[3].pz(), p=$i("sp4").childNodes;
  for (i=0;i<l;i++) p[i].onclick=dap_wj_i;
}
var dap_wj_i=function () {
  dapc.dcdt(this.className);
  callfunc(dac);
}

// 电脑打牌——选择
var dap_dn=function () {
  var z=sp[zpos][Math.floor(Math.random()*14)];
  dapc.lb=z.lb; dapc.sz=z.sz;
  callfunc(dac);
}

// 电脑选择碰杠
var pg_dn=function () {
  peng();
}

// 玩家选择碰杠
var pg_wj=function () {
  var i, c;
  for (c=0,i=0;i<sp[3].pz();i++)
    if (sp[3][i].same(dapc)) c++;
  if (c===3)
    setButtons([{n:"碰牌",f:peng},{n:"杠牌",f:dmgang}]);
  else
    setButtons([{n:"碰牌",f:peng}]);
}

// 碰杠时把手牌中对应的牌张移动到末尾
// 这里n表示需要移动多少张
// 对于碰牌n=3，对于杠牌n=4
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
  var i, c, j, s=sp[ppos];
  s[s.pz()-1]=new zhang(dapc.lb, dapc.sz);
  rmpc();
  pg_m(3);
  s.peng++;
  s.print();
  zpos=ppos;
  callfunc(dap);
}

// 处理大明杠
var dmgang=function () {
  var i, c, j, s=sp[ppos];
  rmpc();
  pg_m(4);
  s.peng++;
  s.gang[4-s.peng]=true;
  zpos=ppos;
  callfunc(zhuagd);
}

// 从牌池中移除碰杠的牌
var rmpc=function () {
  var d=$i("pc"+(zpos+1));
  var a=d.childNodes, l=a.length;
  d.removeChild(a[l-1]);
}

// 打牌打出
var dac=function () {
  // 从手牌中去掉这张牌
  var l=sp[zpos].pz(), i, j, c;
  for (i=0;i<=l;i++) if (sp[zpos][i].same(dapc)) break;
  if (i>=l) { callfunc(dap); return; }
  sp[zpos][i]=new zhang(0,9);
  sp[zpos].sort();
  sp[zpos].print();
  // 在牌池中显示这张牌
  $i("pc"+(zpos+1)).appendChild(dapc.divtag());
  // 在屏幕中央显示某家打出了这张牌
  $i("dcp").value=ZH_DNXB[(zhuang.dong+3-zpos)%4];
  $i("dcz").className=dapc.divtag().className;
  // 询问碰杠
  for (i=0;i<4;i++) if (i!=zpos) {
    for (c=0,j=0;j<sp[i].pz();j++)
      if (sp[i][j].same(dapc)) c++;
    if (c>=2) {
      ppos=i;
      if (i===3) callfunc(pg_wj);
      else callfunc(pg_dn);
      return;
    }
  }
  // 如果无人能碰杠则下一家抓牌
  callfunc(zhuap);
}

// 和牌时调用的函数
var hup=function () {
  var r=sp[zpos].pdhp(chty===2);
  $i("hupwz").value=ZH_DNXB[(zhuang.dong+3-zpos)%4];
  $i("hupms").value=r.mc+"("+r.dx+")";
  var hup1=$i("hup1"), spn=$i("sp"+(zpos+1));
  hup1.innerHTML=spn.innerHTML;
  hup1.className=spn.className;
  $i("act").className="hup";
  fs.df(r.dx,zpos+1,false);
}

// 荒牌时调用的函数
var huangp=function () {
  $i("act").className="huangp";
}



