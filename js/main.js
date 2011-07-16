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
}

// 锅的初始化
var minit=function () {
  zhuang.init();
  fs.init();
  jinit();
}

window.onload=function () {
  minit();
}