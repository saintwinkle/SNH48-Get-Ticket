// ==UserScript==
// @name          SNH48 Get Ticket
// @namespace     http://weibo.com/1997375853
// @version       0.1.1
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
var characters = [ /* 0-9 A-Z的库, 缺少0,1,I,O四个字符 */
    ['', //0
    '', //1
    '00111100011001101100001100000011000001100000110000011000001100000110000011111111', //2
    '01111100110001100000001100000110000111000000011000000011000000111100011001111100', //3
    '00000110000011100001111000110110011001101100011011111111000001100000011000000110', //4
    '11111110110000001100000011011100111001100000001100000011110000110110011000111100', //5
    '00111100011001101100001011000000110111001110011011000011110000110110011000111100', //6
    '11111111000000110000001100000110000011000001100000110000011000001100000011000000', //7
    '00111100011001101100001101100110001111000110011011000011110000110110011000111100', //8
    '00111100011001101100001111000011011001110011101100000011010000110110011000111100', //9
    '00011000001111000110011011000011110000111100001111111111110000111100001111000011', //A
    '11111100110001101100001111000110111111001100011011000011110000111100011011111100', //B
    '00111110011000111100000111000000110000001100000011000000110000010110001100111110', //C
    '11111100110001101100001111000011110000111100001111000011110000111100011011111100', //D
    '11111110110000001100000011000000111111001100000011000000110000001100000011111110', //E
    '11111111110000001100000011000000111111001100000011000000110000001100000011000000', //F
    '00111110011000111100000011000000110000001100011111000011110000110110001100111110', //G
    '11000011110000111100001111000011111111111100001111000011110000111100001111000011', //H
    '', //I
    '00011110000001100000011000000110000001100000011000000110010001100110110000111000', //J
    '11000011110001101100110011011000111100001111000011011000110011001100011011000011', //K
    '11000000110000001100000011000000110000001100000011000000110000001100000011111110', //L
    '11000011111001111111111111011011110110111101101111000011110000111100001111000011', //M
    '11000011111000111111001111110011110110111101101111001111110001111100011111000011', //N
    '', //O
    '11111110110000111100001111000011111111101100000011000000110000001100000011000000', //P
    '00111100011001101100001111000011110000111100001111011011110011110110011000111101', //Q
    '11111110110000111100001111000011111111101111100011001100110001101100001111000011', //R
    '01111110110000111100000011000000011111100000001100000011000000111100001101111110', //S
    '11111111000110000001100000011000000110000001100000011000000110000001100000011000', //T
    '11000011110000111100001111000011110000111100001111000011110000110110011000111100', //U
    '11000011110000111100001101100110011001100110011000111100001111000001100000011000', //V
    '11000011110000111100001111000011110110111101101111011011111111111110011111000011', //W
    '11000011110000110110011000111100000110000001100000111100011001101100001111000011', //X
    '11000011110000110110011000111100000110000001100000011000000110000001100000011000', //Y
    '11111110000001100000011000001100000110000011000001100000110000001100000011111110'], //Z
    ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
];
var captcha = ''; /* 验证码 */

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
    for (var i = 0; i < 4; i++) {
        var dbString = '';
        var canvasData = context.getImageData(32 + 9 * i, 5, 8, 10);
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
        for (var k = 0; k < 36; k++) {
            if (dbString == characters[0][k])
                break;
        }
        captcha += characters[1][k];
    }

    /* 加入购物车 */
    var reslut_list = new Array();
    reslut_list.push(window.location.pathname.match(/\d+/)[0]);
    reslut_list.push(captcha);
    addToCart(reslut_list);
}
