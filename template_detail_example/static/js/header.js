
function ChangeUrl(source,dest)
{
	var url1,url2,pos1;
	pos1=location.href.indexOf('?');
	if(pos1>-1)
	{
		url1=location.href.substring(0,pos1);
		url2=location.href.substring(pos1);
	}
	else
	{
		url1=location.href;
		url2='';
	}
	url1=url1.toLowerCase();
	var arrSource=source.split('|');
	for(var i=0;i<arrSource.length;i++)
	{
		var curSource=arrSource[i].toLowerCase();
		//alert(curSource);
		if(url1.indexOf(curSource)>-1)
		{
			url1=url1.replace(curSource,dest);
			break;
		}
	}
	location.href=url1+url2;
}
var timer1,timer2;
var menuArray = new Array();
var PageArray = new Array();
var y,x,divMenu1,divMenu2;
function showheader()
{
if(window.navigator.userAgent.indexOf("MSIE")==-1){ //firefox innerText define
HTMLElement.prototype.__defineGetter__(    "innerText",
	function(){
		return this.textContent;
	}
);
HTMLElement.prototype.__defineSetter__(    "innerText",
	function(sText){
		this.textContent=sText;
	}
);
}

 y = document.getElementById("divMenu").offsetTop;
 x = document.getElementById("divMenu").offsetLeft;
 divMenu1 = document.getElementById("divMenu1");
 divMenu2 = document.getElementById("divMenu2");




menuArray["足球比分"] ={
						"分栏完全版":"//bf.7m.com.cn/default_split_gb.aspx?view=all",
						"分栏精简版":"//bf.7m.com.cn/default_split_gb.aspx?view=simplify",
						"单栏完全版":"//bf.7m.com.cn/default_gb.aspx?view=all",
						"单栏精简版":"//bf.7m.com.cn/default_gb.aspx?view=simplify"
					  };


PageArray[0] ="//bf.7m.com.cn/pk_live_gb.aspx";
PageArray[1] ="//bf.7m.com.cn/lbpk_live_gb.aspx";
PageArray[2] ="//bf.7m.com.cn/cpk_live_gb.aspx";

menuArray["比分指数2合1"] ={
						"<a onclick=OpenWin(0)>澳门指数2合1</a>":{
									"完全版":"//bf.7m.com.cn/pk_live_gb.aspx?view=all",
									"精简版":"//bf.7m.com.cn/pk_live_gb.aspx?view=simplify"
								},
						/*"<a onclick=OpenWin(1)>立博指数2合1</a>":{
									"完全版":"//bf.7m.com.cn/lbpk_live_gb.aspx?view=all",
									"精简版":"//bf.7m.com.cn/lbpk_live_gb.aspx?view=simplify"
								},*/
						"<a onclick=OpenWin(2)>S2指数2合1</a>":{
									"完全版":"//bf.7m.com.cn/cpk_live_gb.aspx?view=all",
									"精简版":"//bf.7m.com.cn/cpk_live_gb.aspx?view=simplify"
								}
					  };
}

function OpenWin(id)
{
	window.open(PageArray[id]);
}

function ShowMenu(obj)
{	
	
	clearTimeout(timer1);
	divMenu1.style.display = "none";
	divMenu2.style.display = "none";
	var menu = menuArray[obj.innerText];
	if(menu==null) return;
	var strsHtml = "";
	for(var item in menu)
	{
		if(typeof(menu[item])=="string")
		{
			strsHtml+= "<div class='div_out' onmouseover='clearTimeout(timer1);divMenu2.style.display=\"none\";this.style.display=\"\";this.className=\"div_over\"' onmouseout='this.className=\"div_out\";CloseMenu();' onclick='window.open(\"" +  menu[item]  + "\")'>" + item + "</div>"; 
		}
		else if(typeof(menu[item])=="object")
		{
			strsHtml+= "<div class='div_out' onmouseover='clearTimeout(timer1);divMenu2.style.display=\"none\";this.style.display=\"\";clearTimeout(timer1);clearTimeout(timer2);this.className=\"div_over\"; ShowSubMenu(\"" + obj.innerText + "\",\""  +  item + "\",this);' onmouseout='this.className=\"div_out\";CloseSubMenu();CloseMenu();'>" + item + "<span class=\"more1\">&nbsp;&raquo;</span>" + "</div>"
		}	
	
	}
	divMenu1.innerHTML = strsHtml;
	divMenu1.style.display = "";
	divMenu1.style.top = obj.offsetTop + obj.offsetHeight + y -0  + "px";
	divMenu1.style.left = obj.offsetLeft  + x + "px" ;
}

function ShowSubMenu(key1,key2,obj)
{
	var menu = menuArray[key1][key2];
	if(menu==null) return;
	var strsHtml = "";
	for(var item in menu)
	{
		if(typeof(menu[item])=="string")
		{
			strsHtml+= "<div class='div_out' onmouseover='clearTimeout(timer1);clearTimeout(timer2);divMenu1.style.display=\"\";this.style.display=\"\";this.className=\"div_over\"'  onmouseout='this.className=\"div_out\";CloseSubMenu();CloseMenu();' onclick='window.open(\"" +  menu[item]  + "\")'>" + item + "</div>"; 
		}
	
	}
	divMenu2.innerHTML = strsHtml;
	divMenu2.style.display = "";
	divMenu2.style.top =  divMenu1.offsetTop + obj.offsetTop  + "px";
	divMenu2.style.left = divMenu1.offsetLeft + obj.offsetLeft + obj.offsetWidth + "px";
}

function CloseSubMenu()
{
	timer2 = setTimeout("divMenu2.style.display='none'",500);
}

function CloseMenu()
{
	timer1 = setTimeout("divMenu1.style.display='none'",500);
}
