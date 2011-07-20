// 玩家打牌——选择
// 对每张牌注册onclick事件
var dap_wj_ro=function () {
  var i, l=sp[3].pz(), p=$i("sp4").childNodes;
  for (i=0;i<l;i++) p[i].onclick=dap_wj_i;
}
// 取消onclick事件
var dap_wj_co=function () {
  var i, l=sp[3].pz(), p=$i("sp4").childNodes;
  for (i=0;i<l;i++) p[i].onclick=null;
}
// 初始化打出牌的界面
var dap_wj=function () {
  if (chty!==3) {
    // 判断是否能杠牌并在按钮的列表中加入杠牌的按钮
    var i,j,c,s=sp[3],l=Array(3),n=0,b=[];
    for (i=0;i<14;i++) {
      for (j=i,c=0;j<14;c+=(s[j++].same(s[i]))?1:0);
      if (c===4) l[n++]=new zhang(s[i].lb,s[i].sz);
    }
    // 如果只有一种牌能杠，则显示按钮为“杠牌”字样
    if (n===1) b[b.length]={n:"杠牌",f:xm_ag_wj_i,v:l[0].divtag().className};
    // 否则显示为“杠五万”，“杠东字”等字样
    else for (i=0;i<n;i++)
      b[b.length]={
        n:"杠"+(l[i].lb!==0?
          (ZH_SZ[l[i].sz]+ZH_LB[l[i].lb]):
          (ZH_FJ[l[i].sz])
        ),
        f:xm_ag_wj_i,
        v:l[i].divtag().className
      }
    // 判断是否能和牌  
    if (s.pdhp(chty===2).ky) b[b.length]={n:"和牌",f:hup_wj_i};
    if (b.length>0) setButtons(b);
  }
  dap_wj_ro();
}
// 接收用户小明杠的动作并继续
var xm_ag_wj_i=function () {
  clearButtons();
  dap_wj_co();
  dapc.dcdt(this.value);
  callfunc(xm_agang);
}
// 接收用户打牌的动作并继续
var dap_wj_i=function () {
  clearButtons();
  dap_wj_co();
  dapc.dcdt(this.className);
  callfunc(dac);
}
// 接收用户和牌的动作并继续
var hup_wj_i=function () {
  clearButtons();
  dap_wj_co();
  callfunc(hup);
}
// 接收用户碰牌的动作并继续
var peng_wj_i=function () {
  clearButtons();
  callfunc(peng);
}
// 接收用户大明杠的动作并继续
var dmgang_wj_i=function () {
  clearButtons();
  callfunc(dmgang);
}// 接收用户取消碰杠的动作并继续
var pgqx_wj_i=function () {
  clearButtons();
  callfunc(pgqx);
}

// 玩家选择碰杠
var pg_wj=function () {
  var i, c;
  for (c=0,i=0;i<sp[3].pz();i++)
    if (sp[3][i].same(dapc)) c++;
  if (c===3)
    setButtons([
      {n:"碰牌",f:peng_wj_i},
      {n:"杠牌",f:dmgang_wj_i},
      {n:"取消",f:pgqx}
    ]);
  else
    setButtons([
      {n:"碰牌",f:peng_wj_i},
      {n:"取消",f:pgqx_wj_i}
    ]);
}
