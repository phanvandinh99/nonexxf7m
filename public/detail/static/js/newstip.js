var news_host = "//data.7m.com.cn";
function qyzl(id)
{
	window.open(news_host + "/Player_Data/"+id+"/big/index.shtml");
}

function qyzl_jt(id)
{
	window.open(news_host + "/Player_Data/"+id+"/gb/index.shtml");
}

function qyzl_en(id)
{
	window.open(news_host + "/Player_Data/"+id+"/en/index.shtml");
}

function qdzl(id)
{
	window.open(news_host + "/Team_Data/"+id+"/big/index.shtml");
}

function qdzl_jt(id)
{
	window.open(news_host + "/Team_Data/"+id+"/gb/index.shtml");
}

function qdzl_en(id)
{
	window.open(news_host + "/Team_Data/"+id+"/en/index.shtml");
}

function imghref(imgurl)
{
	window.open(imgurl);
}
function nqdzl(id)
{
	window.open(news_host + "/Euro2004/teamData/"+id+"/big/index.shtml");
}
function nqdzl_jt(id)
{
	window.open(news_host + "/Euro2004/teamData/"+id+"/gb/index.shtml");
}
function nqdzl_en(id)
{
	window.open(news_host + "/Euro2004/teamData/"+id+"/en/index.shtml");
}
function bswj(id)
{
	window.open(news_host + "/Analyse/big/"+id+".shtml");
}
function bswj_jt(id)
{
	window.open(news_host + "/Analyse/gb/"+id+".shtml");
}
function zlk_ft(id)
{
	window.open(news_host + "/matches_data/"+id+"/big/index.shtml");
}
function zlk_jt(id)
{
	window.open(news_host + "/matches_data/"+id+"/gb/index.shtml");
}
function zlk_en(id)
{
	window.open(news_host + "/matches_data/"+id+"/en/index.shtml");
}

function bf_ft(id)
{
	window.open(news_host + "/GoalData/ft/" + id + ".shtml","","width=460,height=420,scrollbars=yes");
}

function bf_jt(id)
{
	window.open(news_host + "/GoalData/jt/" + id + ".shtml","","width=460,height=420,scrollbars=yes");
}

function bf_en(id)
{
	window.open(news_host + "/GoalData/en/" + id + ".shtml","","width=460,height=420,scrollbars=yes");
}

function gj_ft(id)
{
	window.open(news_host + "/Country_Data/" + id + "/big/index.shtml");
}

function gj_jt(id)
{
	window.open(news_host + "/Country_Data/" + id + "/gb/index.shtml");
}

function gj_en(id)
{
	window.open(news_host + "/Country_Data/" + id + "/en/index.shtml");
}

function sjb_ft(year)
{
	window.open(news_host + "/database/fifa" + year + "/fifa_big.htm");
}

function sjb_jt(year)
{
	window.open(news_host + "/database/fifa" + year + "/fifa_gb.htm");
}

function sjb_en(year)
{
	window.open(news_host + "/database/fifa" + year + "/fifa_en.htm");
}

var tips= document.getElementById("divTip");
var f1 = document.getElementById("f1");
var f2 = document.getElementById("f2");
var f3 = document.getElementById("f3");
var a1 = document.getElementById("a1");
var a2 = document.getElementById("a2");
var a3 = document.getElementById("a3"); 
var timer;
var X,Y;
var objlen;

function showTip(obj)
{
	clearTimeout(timer); 
	f1.innerHTML=f2.innerHTML=f3.innerHTML=obj.innerText;
	reg=eval("/[\S\s]*?img[\S\s]*?/ig");
	if(reg.test(obj.innerHTML)){  
		return;
	}
	a1.href=obj.href;
	if(obj.href=='javascript:')
	{
		a1.href='/search.aspx?key='+encodeURIComponent(obj.innerHTML)+'&news=on&team=on&player=on';
		obj.href=a1.href;
	}
	a2.href="//news.baidu.com/ns?ie=utf-8&word=" + encodeURIComponent(obj.innerHTML);
	//a2.href="/OtherSearch.aspx?key="+encodeURIComponent(obj.innerHTML);
	a3.href="//news.google.com/news?hl=zh-CN&ned=cn&q=" + encodeURI(obj.innerHTML);
	objlen=obj.innerHTML.replace(/[^\x00-\xff]/g,'**').length;
	tips.style.top = Y-3 + "px";
	var wd= parseInt(tips.style.width);
	if(wd + X < document.body.clientWidth)
		tips.style.left = X + document.body.scrollLeft + "px";	
	else
	{
		if(X < wd)
			tips.style.left= document.body.scrollLeft + "px";
		else 
			tips.style.left =X- wd + document.body.scrollLeft + "px";	
	}
	Y+=10;
	//alert((Y+75)+ " " + document.body.clientTop)
	if(Y+75 < document.body.clientHeight)
		tips.style.top=Y + document.documentElement.scrollTop+document.body.scrollTop + "px";
	else
		tips.style.top=Y + document.documentElement.scrollTop+document.body.scrollTop-80+ "px";
	tips.style.display="";
	tips.style.width=objlen*7+190+"px";
}
function hideTip()
{
	tips.style.display='none';
}
function mouseMove(ev)
{
	ev = ev || window.event;
	X= ev.clientX;
	Y=ev.clientY;
}
document.onmousemove = mouseMove;

function BigFont()
{
	document.getElementById('NewsContent').style.fontSize='16px';
}

function MiddlingFont()
{document.getElementById('NewsContent').style.fontSize='14px';
}

function SmallFont()
{document.getElementById('NewsContent').style.fontSize='12px';
}
function ShowHits(hits)
{
}
$(document).ready(function (){
	$('div.zw').each(function(){
		if($('img',$('a',this))){
			reg=eval("/[\S\s]*?img[\S\s]*?/ig");
			regLive=eval("/[0-9]-[0-9]/ig");
			if( reg.test( $('a',this).html() ) || regLive.test( $('a',this).html() ) ){  

			}else{
				// $('a',this).mouseover(function(){
				// 	if( reg.test(this.innerHTML) || regLive.test(this.innerHTML) || $(this).attr("notips")=="1" ){
				// 		return false;
				// 	}
				// 	showTip(this);
				// });
				// $('a',this).mouseout(function(){
				// 	if( reg.test(this.innerHTML) || regLive.test(this.innerHTML) || $(this).attr("notips")=="1" ){
				// 		return false;
				// 	}
				// 	timer=setTimeout('hideTip()',1000);
				// });
			}
		}
	});
	$('p.bc').each(function(){
		$('a',this).unbind("mouseover");
		$('a',this).unbind("mouseover"); 
	}); 
	$('div.manu').each(function(){
		$('a',this).unbind("mouseover");
		$('a',this).unbind("mouseover"); 
	}); 
	$('p.WJFX').each(function(){
		$('a',this).unbind("mouseover");
		$('a',this).unbind("mouseover"); 
	});
	$('div.zw').each(function(){
		if($('img',this)){
			image=new Image();   
			image.src=$('img',this).attr('src');
			if(image.width>648){
				ratiow = parseFloat(image.width)/parseFloat(648);
				$('img',this).height(image.height / ratiow);
				$('img',this).width(648);
				$('img',this).attr('style','648');
			}
		}
	});
	
});