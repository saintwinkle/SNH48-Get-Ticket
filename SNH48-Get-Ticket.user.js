// ==UserScript==
// @name          SNH48 Get Ticket
// @namespace     https://github.com/saintwinkle/SNH48-Get-Ticket
// @version       1.0.1
// @author        Twinkle
// @description   SNH48官方商城抢票脚本
// @include       http://shop.48.cn/tickets/item/*
// @run-at        document-end
// ==/UserScript==

$(document).ready(function () {
  // 初始化参数
  var ticketNumber = 1; // 购票数量, 默认为1张.
  var ticketType = 3; // 购票类型, 默认为普座. 2: VIP 3: 普座 4: 站票

  // 添加购票按钮
  $('#buy').after('<a href="javascript:;" id="super_buy">一键抢票</a>');

  // 按钮点击事件
  $('#super_buy').css({
    'display': 'block',
    'float': 'left',
    'padding': '5px 10px',
    'background': '#9999ff',
    'border-radius': '5px',
    'border': '1px solid #9999ff',
    'color': '#fff'
  }).click(function () {
    $.ajax({
      url: '/TOrder/add',
      type: 'post',
      dataType: 'json',
      data: {
        id: tickets_id,
        num: ticketNumber,
        seattype: ticketType,
        brand_id: '1',
        r: Math.random()
      },
      success: function (result) {
        if (result.HasError) {
          layer.msg(result.Message);
        } else {
          if (result.Message === 'success') {
            window.location.href = result.ReturnObject;
          } else {
            tickets();
          }
        }
      },
      error: function (e) {
        layer.msg('下单异常, 请刷新重试');
      }
    });
  });

  function tickets () {
    $.ajax({
      url: '/TOrder/tickCheck',
      type: 'post',
      dataType: 'json',
      data: {
        id: tickets_id,
        r: Math.random()
      },
      success: function (result) {
        if (result.HasError) {
          layer.closeAll();
          layer.msg(result.Message);
        } else {
          switch (result.ErrorCode) {
            case 'wait':
              tickets();
              break;
            case 'fail':
              layer.closeAll();
              layer.msg(result.Message);
              break;
            case 'success':
              window.location.href = result.ReturnObject;
              break;
          }
        }
      },
      error: function (e) {
        layer.closeAll();
        layer.msg('下单异常, 请刷新重试');
      }
    });
  }
});
