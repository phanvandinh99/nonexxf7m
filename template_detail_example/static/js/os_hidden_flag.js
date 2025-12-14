/**
 * @author: Jicc(103698177) on 2018/11/18
 * ==== 小黄鸭调试法，永无BUG ====
 *                            ||
 *      .-"O"-.               ||
 *   _/ a      -._._._.-';    ||
 *  '-.                ,/     ||
 *     )     \_////>  ';      ||
 *     \                |     ||
 *      '--------------'      ||
 *  ~~~~~~~~~~~~~~~~~~~~~~~~~ ||
 */
var os_hidden_flag = 'true';
if(GetQueryString2('test') != 'undefined'){
    os_hidden_flag = GetQueryString2('test');
}
function GetQueryString2(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return 'undefined';
}

var oddsHidde = true;