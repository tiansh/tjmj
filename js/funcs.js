// 利用setTimeout调用其他函数
// 时间为0，则本函数执行之后该函数立即执行
// 这样调用不会在堆栈区底部留下一大堆无用的函数
var callfunc=function (func) {
  setTimeout(func,0);
}

var zpos=0;
var dapc=new zhang(0,0);
var gs=false;

var $i=function (id) {
  return document.getElementById(id);
};

var ainit=function () {
  // document.getElementById("peng"  ).onclick=  peng_wj;
  // document.getElementById("gang"  ).onclick=  gang_wj;
  document.getElementById("hu"    ).onclick=    hup;
  // document.getElementById("quxiao").onclick=quxiao_wj;
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
  // zpos=zhuang.dong+zhuang.
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
  // 设置显示样式
  document.getElementById("act").className="p"+(zpos+1);
  // 设置当前状态为不是杠底
  gs=false;
  callfunc(dap)
}

// 打牌
var dap=function () {
  if (zpos+1===4) callfunc(dap_wj);
  else callfunc(dap_dn);
}

// 玩家打牌——选择
var dap_wj=function () {
  $i("peng")  .disabled="disabled";
  $i("gang")  .disabled="disabled";
  $i("quxiao").disabled="disabled";
  if (sp[3].pdhp(gs).ky)
    $i("hu").disabled="";
  else
    $i("hu").disabled="disabled";
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

// 打牌打出
var dac=function () {
  // 从手牌中去掉这张牌
  var l=sp[zpos].pz(), i;
  for (i=0;i<=l;i++) if (sp[zpos][i].same(dapc)) break;
  if (i>l) { call(dap); return; }
  sp[zpos][i]=new zhang(0,9);
  sp[zpos].sort();
  sp[zpos].print();
  // 在牌池中显示这张牌
  $i("pc"+(zpos+1)).appendChild(dapc.divtag());
  // 询问碰杠
  // 如果无人能碰杠则下一家抓牌
  callfunc(zhuap);
}

var hup=function () {
  $i("act").className="hup";
}

var huangp=function () {
  $i("act").className="huangp";
}



