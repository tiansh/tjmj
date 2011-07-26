/*
    This file is part of Tianjin Mahjong.

    Tianjin Mahjong is free software: you can redistribute it and/or
    modify it under the terms of the GNU General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    Foobar is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
*/

// 电脑打牌——选择
var dap_dn=function () {
  var s=sp[zpos];
  if (s.pdhp(chty===2).ky) {
    callfunc(hup);
  } else {
    // 判断暗杠和小明杠
    var i,j,c;
    for (i=0;i<14;i++) if(!s[i].samehuir()) {
      for (j=i,c=0;j<14;c+=(s[j++].same(s[i]))?1:0);
      if (c===4) if (dnag(s,s[i])) {
        dapc=new zhang(s[i].lb,s[i].sz);
        callfunc(xm_agang);
        return;
      }
    }
    var d=comchose(s);
    dapc=new zhang(d.lb,d.sz);
    callfunc(dac); 
  }
}

// 电脑选择碰杠
var pg_dn=function () {
  var s=sp[ppos];
  var h=dnpg(s,dapc);
  var i, c;
  for (c=0,i=0;i<s.pz();i++)
    if (s[i].same(dapc)) c++;
  if (c===3 && h==="g") callfunc(dmgang);
  else if (h==="p") callfunc(peng);
  else callfunc(pgqx);
}