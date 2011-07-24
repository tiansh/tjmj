
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
  var z=pq.getlp(), f=true;
  // 如果无牌可抓则荒牌
  if (z===null) {
    callfunc(huangp);
    z=new zhang(0,9);
    f=false;
  }
  // 抓一张牌
  zpos=ppos;
  sp[zpos][sp[zpos].pz()-1]=z;
  sp[zpos].print();
  // 设置当前状态为杠底
  if (f) {
    chty=2;
    callfunc(dap);
  }
}

// 打牌
var dap=function () {
  // 设置显示样式
  $i("act").className="p"+(zpos+1);
  // 根据玩家和电脑分类
  if (zpos===3) callfunc(dap_wj);
  else callfunc(dap_dn);

  expp(dapc);

}

// 打牌打出
var dac=function () {
  // 从手牌中去掉这张牌
  var s, l, i, j, c, f;
  s=sp[zpos]; l=s.pz();
  for (i=0;i<l;i++) if (s[i].same(dapc)) break;
  if (i>=l||dapc.samehuir()) { callfunc(dap); return; }
  s[i]=new zhang(0,9);
  s.sort();
  s.print();
  // 在牌池中显示这张牌
  $i("pc"+(zpos+1)).appendChild(dapc.divtag());
  // 在屏幕中央显示某家打出了这张牌
  $i("dcp").value=ZH_DNXB[(zhuang.dong+3-zpos)%4];
  $i("dcz").className=dapc.divtag().className;
  // 询问碰杠
  if (!dapc.samehuir())
   for (i=0;i<4;i++) if (i!=zpos) {
    for (c=0,j=0,f=false;j<sp[i].pz()-1;j++)
      if (sp[i][j].same(dapc)) c++;
      else f=f||!sp[i][j].samehuir();
    if (c>=2&&f||c>=3) {
      ppos=i;
      if (i===3) callfunc(pg_wj);
      else callfunc(pg_dn);
      return;
    }
  }
  // 如果无人能碰杠则下一家抓牌
  callfunc(zhuap);
}

// 清空牌池
var clearpc=function () {
  var i;
  for (i=0;i<4;i++) {
    var p=$i("pc"+(i+1));
    while (p.firstChild)
      p.removeChild(p.firstChild);
  }
}
