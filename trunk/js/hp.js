
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
