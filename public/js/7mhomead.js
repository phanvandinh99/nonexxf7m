var a_d_l1 = '';

var a_d_l2 = '';

var a_d_r1 = '';

var a_d_r2 = '';

var a_d_m1 = '';

//对联位置左
var a_d_lf1 = '';

//对联位置右
var a_d_rf1 = '';


//转会信息上方
var a_d_m2 = '<!--div style="width:100%;height:60px;padding:10px 0;"><div style="float:left;"><img src="//xc.1357668.com/xc/hg/cn_home_hg_m1l.gif?i=20250704" width="458" height="60" border="0" alt="cn_home_hg_m1l" /></div><div style="float:right;"><img src="//xc.1357668.com/xc/hg/cn_home_hg_m1r.gif?i=20250704" width="458" height="60" border="0" alt="cn_home_hg_m1r" /></div></div-->';


//大屏
var bigScreen = '<!--div id="maskScreen" style="position:fixed;left:0;top:0;z-index:9998;height:100%;width:100%;background:black;opacity:0.4;filter:alpha(opacity=40);display:none;"></div><div id="conScreen" style="width:597px;height:649px;position:fixed;left:50%;top:50%;z-index:9999;margin-top:-325px;margin-left:-300px;display:none;" onmouseover="screenMouseOver()" onmouseout="screenMouseOut()"><img src="//7mad.7m.com.cn/screen.png" /><a id="btnScreen" href="javascript:" onclick="closeScreen();" style="display:block;width:32px;height:32px;position:absolute;top:0;right:0;opacity:0.4;filter:alpha(opacity=40);"><img src="//7mad.7m.com.cn/screen_close.png" /></a></div--><div id="maskScreen" style="position:fixed;left:0;top:0;z-index:9998;height:100%;width:100%;background:black;opacity:0.4;filter:alpha(opacity=40);display:none;"></div><div id="conScreen" style="width:597px;height:349px;position:fixed;left:50%;top:50%;z-index:9999;margin-top:-225px;margin-left:-300px;display:none;" onmouseover="screenMouseOver()" onmouseout="screenMouseOut()"><div style="background:#fff;padding:20px;margin-top:50px;"><h1 style="color:#b90200;font-size:18px;font-weight:bold;text-align:center;padding-bottom:10px;">【公告】关于网站被恶意篡改网站信息的公告</h1><p style="font-size:14px;text-indent: 2em;line-height: 20px;padding:5px 0;">本站（www.7m.com.cn)于2022年8月31日-2022年9月2日期间遭受恶意篡改网站信息，导致用户在访问期间可能存在跳转至其他网站的情况，影响用户的浏览体验。我司发现后立即联系服务商紧急处理，第一时间妥善解决该问题，本站已于2022年9月2日晚间恢复正常访问。</p><p style="font-size:14px;text-indent: 2em;line-height: 20px;padding:5px 0;">对此次事件给广大用户带来不便，我们深表歉意！对恶意篡改网站信息的行为，我们深表谴责！</p><p style="font-size:14px;text-indent: 2em;line-height: 20px;padding:5px 0;">同时，我司坚决抵制各类违法犯罪行为，并致力于与广大用户群众共同营造文明良好的网络环境！</p></div><a id="btnScreen" href="javascript:" onclick="closeScreen();" style="display:block;width:32px;height:32px;position:absolute;top:0;right:0;opacity:0.4;filter:alpha(opacity=40);"><img src="//7mad.7m.com.cn/screen_close.png" /></a></div>';

//友情链接
var linkStr = '';

//判断手机终端
function CheckIsPhone(posa, posi, posn, posw, urla, urli, urln, urlw) {

    //posa-安卓标识, posi-苹果标识, posn-其它标识, posw-微信标识, urla-安卓链接, urli-苹果链接, urln-其它链接, urlw-微信链接
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var isWeixin = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i);//微信
    var a = '';
    if (isAndroid && isWeixin != 'micromessenger') {
        a = urla;
    } else if (isiOS && isWeixin != 'micromessenger') {
        a = urli;
    } else if (isWeixin == 'micromessenger') {
        a = urlw;
    } else {
        a = urln;
    }
    window.open(a);
}


var hidestring;
//保存cookie
function set_cookie_home(name, value, seconds) {  
        seconds = seconds || 0;
	var expires = "";  
	if (seconds != 0 ) {
		var date = new Date();  
		date.setTime(date.getTime()+seconds);  
		expires = "; expires="+date.toGMTString();  
	}  
	document.cookie = name+"="+escape(value)+expires+";domain=" + document.domain + ";path=/";
}
//获取cookie
function getCookie_home(c_name)
{

         if (document.cookie.length>0)
	{ 
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1)
		{ 
			c_start=c_start + c_name.length+1 ;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}else{
        return "";
	}
}


//关闭大屏
function closeScreen()
{
	var myDate = new Date();
	var dateValue = myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate();
	
	//cookie保存一天
	set_cookie_home("pop_7m_home", dateValue, 24*3600*1000); 
		
	document.getElementById("maskScreen").style.display="none";
        document.getElementById("conScreen").style.display="none";
}

//显示大屏
function showScreen(e)
{
	var myDate = new Date();
	var dateValue = myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate();
	
	//获取是否提示过公告的cookie
	var notice_7m = "";
        if(!e){
           notice_7m = getCookie_home("pop_7m_home");
        }
	//如果一天内没显示过

	if(notice_7m == "" || notice_7m != dateValue)
	{       if(document.getElementById("maskScreen") != null){
		  document.getElementById("maskScreen").style.display="block";
                  document.getElementById("conScreen").style.display="block";
                  hidestring = setTimeout("closeScreen()", 10000);
                }
	}                    
}
//鼠标经过
function screenMouseOver(){
    document.getElementById("btnScreen").style.opacity = 1;
    document.getElementById("btnScreen").style.filter = 100;
    clearTimeout(hidestring);
}
//鼠标离开
function screenMouseOut(){
    document.getElementById("btnScreen").style.opacity = 0.4;
    document.getElementById("btnScreen").style.filter = 40;
    hidestring = setTimeout("closeScreen()", 10000);
}
//setTimeout("showScreen()", 1000);

