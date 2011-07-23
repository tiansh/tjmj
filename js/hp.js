
// 和牌时调用的函数
var hup=function () {
  var r=sp[zpos].pdhp(chty===2);
  $i("su"+(zpos+1)).className+=" xs";
  $i("hupwz").value=ZH_DNXB[(zhuang.dong+3-zpos)%4];
  $i("hupms").value=r.mc+"("+r.dx+")";
  var hps=$i("hup1"), spn=$i("su"+(zpos+1));
  hps.innerHTML=spn.innerHTML;
  hps.className=spn.className;
  $i("act").className="h2";
  fs.df(r.dx,zpos,false);
  if ((zhuang.dong+3-zpos)%4!==(zhuang.nzhuang-1)%4)
    zhuang.nzhuang++;
  callfunc(ctnj);
}

// 荒牌时调用的函数
var huangp=function () {
  $i("act").className="h1";
  callfunc(ctnj);
}

// 确认开始新的一局
var ctnj=function () {
  if (zhuang.nzhuang>16)
    setButtons([{n:"重开",f:minit}]);
  else
    setButtons([{n:"继续",f:jinit}]);
}
