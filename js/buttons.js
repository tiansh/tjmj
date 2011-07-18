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
    x.appendChild(d);
  }
  x.style.display="block";
}