/*
    This file is part of Tianjin Mahjong.

    Tianjin Mahjong is free software: you can redistribute it and/or
    modify it under the terms of the GNU General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    Tianjin Mahjong is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Tianjin Mahjong. If not, see <http://www.gnu.org/licenses/>.
*/

// 和牌时调用的函数
var hup=function () {
  var s=sp[zpos], r=s.pdhp(chty===2);
  $i("su"+(zpos+1)).className+=" xs";
  $i("hupwz").value=ZH_DNXB[(zhuang.dong+3-zpos)%4];
  $i("hupms").value=r.mc+"("+r.dx+")";
  var hps=$i("hup1"), hps2=$i("hup2"), spn=$i("su"+(zpos+1));
  hps.innerHTML=spn.innerHTML;  hps.className=spn.className;
  hps2.innerHTML=spn.innerHTML; hps2.className=spn.className;
  hpxs(r,s);
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
