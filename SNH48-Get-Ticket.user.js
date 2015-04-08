// ==UserScript==
// @name          SNH48 Get Ticket
// @namespace     http://weibo.com/1997375853
// @version       0.2.0
// @description   SNH48官方商城抢票脚本
// @include       http://shop.snh48.com/goods-*
// @include       http://admin.snh48.com/goods-*
// @include       http://admin.snh48.com/goods.php?id=*
// @run-at        document-end
// ==/UserScript==

/* 购买数量(可自行修改数量) */
document.getElementById('number').value = 1;
changePrice();

NewCode();

var captcha = ''; /* 验证码 */
var characters = [ /* 0-9 的数字库 */
    ['00011000001111000110011011000011110000111100001111000011011001100011110000011000', //0
    '00011000001110000111100000011000000110000001100000011000000110000001100001111110', //1
    '00111100011001101100001100000011000001100000110000011000001100000110000011111111', //2
    '01111100110001100000001100000110000111000000011000000011000000111100011001111100', //3
    '00000110000011100001111000110110011001101100011011111111000001100000011000000110', //4
    '11111110110000001100000011011100111001100000001100000011110000110110011000111100', //5
    '00111100011001101100001011000000110111001110011011000011110000110110011000111100', //6
    '11111111000000110000001100000110000011000001100000110000011000001100000011000000', //7
    '00111100011001101100001101100110001111000110011011000011110000110110011000111100', //8
    '00111100011001101100001111000011011001110011101100000011010000110110011000111100'], //9
    ['0','1','2','3','4','5','6','7','8','9']
];

/* 新建画布 */
var canvas = document.createElement('canvas');
canvas.width = '100';
canvas.height = '20';
canvas.style.display = 'none';
document.body.appendChild(canvas);
var context = canvas.getContext('2d');

/* 新建图像 */
var image = new Image();
image.src = document.getElementById('coderefresh').src;
image.onload = function() {
    context.drawImage(image, 0, 0);
    for (var i = 0; i < 5; i++) {
        var dbString = '';
        var canvasData = context.getImageData(27 + 9 * i, 5, 8, 10);
        for (var j = 0; j < canvasData.data.length; j += 4) {
            var r = canvasData.data[j + 0];
            var g = canvasData.data[j + 1];
            var b = canvasData.data[j + 2];

            /* 验证码字符只有黑白两种纯色, 背景色均为其它RGB值 */
            if (!((r == 0 && g == 0 && b == 0) || (r == 255 && g == 255 && b == 255)))
                dbString += '0';
            else
                dbString += '1';
        }
        for (var k = 0; k < 10; k++) {
            if (dbString == characters[0][k])
                break;
        }
        captcha += characters[1][k];
    }
    /* 加入购物车 */
    var reslut_list = new Array();
    var is_donation = $("#is_donation");
    var is_real = 1;
	var priceid = 0;
    reslut_list.push(window.location.pathname.match(/\d+/)[0]);
    reslut_list.push(captcha);
    reslut_list.push(is_donation.val());
	reslut_list.push(is_real);
	reslut_list.push(priceid);
    addToCart(reslut_list);
}