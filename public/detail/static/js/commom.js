//设置Cookie   
function setCookie(name,value)   
{   
	var exp = new Date();   
	exp.setTime(exp.getTime()+24*60*60*1000);//cookie保存一天(每天有12个小时，一小时60分钟，每分钟有60秒，每秒1000毫秒) 
	document.cookie = name + "=" + escape (value) + (exp?(";path=/;expires=" + exp.toGMTString()):"");   
}   

//读取cookies的值   
function getCookie1(name)   
{   
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");   
	if(arr=document.cookie.match(reg)) return arr[2];   
	else return null;   
}   

function getCookie(c_name)
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1)
		{ 
			c_start=c_start + c_name.length+1 
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
			return unescape(document.cookie.substring(c_start,c_end))
		} 
	}
	return null;
}

//删除cookies   
function delCookie(name)   
{   
	var exp = new Date();   
	exp.setTime(exp.getTime() - 1000);   
	var cval=getCookie(name);   
	if(cval!=null) document.cookie= name + "="+cval+";path=/;expires="+exp.toGMTString();       
}

function loadJs(fileUrl,callback,jsID)
{ 
	var oHead = document.getElementsByTagName('HEAD').item(0); 
	if(jsID)try{oHead.removeChild(document.getElementById(jsID));}catch(e){} 
	var oScript= document.createElement("script"); 
	if(jsID) oScript.id = jsID;
	if(document.addEventListener) {
		oScript.onload = callback;
		oScript.onerror = callback;
	}
	else {
		oScript.onreadystatechange =function(){ loadJsReady(oScript,callback);}; 
	}
	oScript.charset = "utf-8";
	oScript.type = "text/javascript";
	oScript.src=fileUrl;  
	oHead.appendChild(oScript); 
}

function loadJsReady(obj,callBack){
	if(obj.readyState=="loaded") {
		callBack();
	}
}
