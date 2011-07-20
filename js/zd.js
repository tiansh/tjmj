
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
  document.getElementById("act").className="p"+(zpos+1);
  // 根据玩家和电脑分类
  if (zpos===3) callfunc(dap_wj);
  else callfunc(dap_dn);
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
