// ==UserScript==
// @name            SNH48 Get Ticket
// @namespace       http://weibo.com/1997375853
// @version         0.1
// @description     SNH48官方商城(伪)抢票脚本
// @include         http://shop.snh48.com/goods-*
// ==/UserScript==

/* 购买数量（默认1） */
document.getElementById('number').value = 1;
changePrice();

/* 加入购物车 */
addToCart(window.location.pathname.match(/\d+/)[0]);
