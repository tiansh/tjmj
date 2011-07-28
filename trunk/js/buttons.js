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

// 清除所有按钮
var clearButtons=function () {
  var x=$i("xzm");
  x.style.display="none";
  while (x.firstChild)
    x.removeChild(x.firstChild);
}

// 在选项框添加按钮
// 该数组中每一项包含
// n:按钮上面显示的字
// f:按钮被按下后的回调函数
var setButtons=function (arr) {
  clearButtons();
  var i, l=arr.length, d, x=$i("xzm");
  x.style.display="none";
  for (i=0;i<l;i++) {
    d=document.createElement("button");
    d.innerHTML=arr[i].n;
    d.onclick=arr[i].f;
    if (typeof(arr[i].v)!=="undefined")
     d.value=arr[i].v;
    x.appendChild(d);
  }
  x.style.display="block";
}