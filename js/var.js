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

// 根据id获取页面上的元素，为书写方便
var $i=function (id) {
  return document.getElementById(id);
};
// 利用setTimeout调用其他函数
// 时间为0，则本函数执行之后该函数立即执行
// 这样调用不会在堆栈区底部留下一大堆无用的函数
var callfunc=function (func) {
  setTimeout(func,0);
}

var zpos=0, ppos=0;
var dapc=new zhang(0,0);
// chty的取值
// 1时表示当前是正常的抓牌之后
// 2时表示是杠牌抓底牌之后
// 3时表示是碰牌之后
var chty;

