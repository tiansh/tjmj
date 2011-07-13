// 牌张的代码
zhang=function (lb,sz) {
  // lb表示类别
  // 0=字 1=万 2=饼 3=条
  this.lb=lb;
  this.sz=sz;
}

// 混儿牌张数
zhang.prototype.numhuir = 2;
zhang.prototype.zzhang = [7, 9, 9, 9];
zhang.prototype.zdir = ["z", "w", "b", "t"];

// 设定混儿
zhang.prototype.sethuir=function () {
  zhang.prototype.huir = new Array(zhang.prototype.numhuir);
  // 第一张
  zhang.prototype.huir[0] = new zhang(this.lb, this.sz);
  for (var i=1;i<zhang.prototype.numhuir;i++) {
    // 序号自加一
    zhang.prototype.huir[i]= new zhang(
      zhang.prototype.huir[i-1].lb,
      zhang.prototype.huir[i-1].sz+1
    );
    // 最后一张则下一张为第一张
    if (zhang.prototype.huir[i].sz >
        zhang.prototype.zzhang[zhang.prototype.huir[i].lb])
      zhang.prototype.huir[i].sz = 1;
    if (zhang.prototype.huir[i].lb===0 &&
        zhang.prototype.huir[i].sz===5)
      zhang.prototype.huir[i].sz = 1;
  }
}

// 判断两张牌是否相同
zhang.prototype.same=function (b) {
  return this.lb===b.lb && this.sz===b.sz;
}

// 判断是否是混儿
zhang.prototype.samehuir=function () {
  for (var i=0;i<zhang.prototype.numhuir;i++)
    if (this.same(zhang.prototype.huir[i])) return true;
  return false;
}

// 转换成字符串类型
zhang.prototype.chr=function () {
  return zhang.prototype.zdir[this.lb]+this.sz;
}