// JavaScript Document

String.prototype.Trim = function(){return   this.replace(/(^\s*)|(\s*$)/g,"");}   
String.prototype.Ltrim = function(){return   this.replace(/(^\s*)/g,   "");}   
String.prototype.Rtrim = function(){return   this.replace(/(\s*$)/g,   "");} 

function $$(objId)
{
	if(!objId){
	//alert($.caller);
	return null;}
	return document.getElementById(objId);	
}

//取元素相对于body的坐标
function ZB() 
{
 this.left=0,
 this.top=0,
 this.width=0,
 this.height=0
 };
 

 
function GetZB(obj)
{
	var o=obj;
	var oLTWH=new ZB();
	oLTWH.width=o.offsetWidth;
	oLTWH.height=o.offsetHeight;
	oLTWH.left=o.offsetLeft;
	oLTWH.top=o.offsetTop;
	while(true)
    {
       o=o.offsetParent;
       if(o==(document.body&&null))break;
       oLTWH.left+=o.offsetLeft;
       oLTWH.top+=o.offsetTop;
    }
    return oLTWH;
}


function urlEncode(str)
{
	return encodeURIComponent(str);
}



function LoadJS(fileUrl,callback,code) 
{ 
    var oHead = document.getElementsByTagName('HEAD').item(0); 
    var oScript= document.createElement("script"); 
    oScript.type = "text/javascript";
	if(code)
	{
		oScript.charset="gb2312";
	}
    oScript.src=fileUrl ;  
	oHead.appendChild(oScript); 
	if(document.addEventListener)
	{
		oScript.onload = callback;
		oScript.onerror = callback;
	}
	else
	{
		oScript.onreadystatechange =function(){ LoadJsReady(oScript,callback);}; 
	}

}


function LoadJsReady(obj,callBack)
{
	if(obj.readyState=="loaded")
	{
		callBack();
	}
	
}

function getCookie(c_name)
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
	}
	return "";
}


function setCookie(c_name,value,expiredays,domain)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays=="") ? "" : "; expires="+exdate.toGMTString())  + ((domain=="")?"":";domain=" + domain)  ;
}

function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)document.cookie= name + "="+cval+";expires="+exp.toGMTString() + ";path=/" + ";domain=.7m.com.cn";
}


function isIos()
{
	var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("ipad") > -1 || ua.indexOf("ipod") > -1 || ua.indexOf("iphone os") > -1;
}
function isAndroid(){
	var ua = navigator.userAgent.toLowerCase();
	return ua.indexOf("android") > -1;
}