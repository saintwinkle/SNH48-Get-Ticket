// ==UserScript==
// @name          SNH48 Get Ticket
// @namespace     https://github.com/saintwinkle/SNH48-Get-Ticket
// @version       0.3.0
// @author        Twinkle
// @description   SNH48官方商城抢票脚本
// @match         http://shop.snh48.com/goods-*
// @match         http://shop.snh48.com/goods.php?id=*
// @match         http://admin.snh48.com/goods-*
// @match         http://admin.snh48.com/goods.php?id=*
// @run-at        document-end
// ==/UserScript==

// 设置购买数量, 默认为1, 上限为3
var number = 1;

var goods = {
  quick: 1,
  spec: [],
  goods_id: goods_id,
  captcha: '0',
  is_donation: $('#is_donation').val(),
  number: number,
  donation_number: $('#donation_number').val(),
  parent: 0
}

var fn = function() {
  $.post('/test.php', {
    goods_id: goods_id,
    goods: JSON.stringify(goods),
    step: 'default'
  }, function() {
    location.href = '/checkout.php?step=checkout';
  });
};

// 我也不知道为什么连续请求两次就可以了 >.>
fn();
setTimeout(fn, 100);
