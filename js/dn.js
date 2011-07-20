
// 电脑打牌——选择
var dap_dn=function () {
  var z=sp[zpos][Math.floor(Math.random()*14)];
  dapc.lb=z.lb; dapc.sz=z.sz;
  callfunc(dac);
}

// 电脑选择碰杠
var pg_dn=function () {
  callfunc(peng);
}
