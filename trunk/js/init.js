// 程序初始化
var ainit=function () {
  callfunc(binit);
  callfunc(ginit)
  callfunc(minit);
}

// 锅的初始化
var minit=function () {
  zhuang.init();
  fs.init();
  cqinit();
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
  clearpc();
  clearButtons();
  zpos=zhuang.nzhuang+zhuang.dong-3;
  callfunc(zhuap);
}

// 作弊指令的初始化
var binit=function () {
  // 混儿牌显示的那里如果用户Shift-双击则亮出电脑的牌
  $i("hxsm").ondblclick=function (e) {
    if (!e.shiftKey) return;
    var s=$i("su");
    s.className=(s.className==="xs"?"":"xs");
  }
}