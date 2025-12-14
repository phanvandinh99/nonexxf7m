// JavaScript Document
var DATAHOST = "data.7m.com.cn";
var BDATAHOST = "bdata.7m.com.cn";
function setHome(obj)
{
	obj.style.behavior='url(#default#homepage)';
	obj.setHomePage('//www.7m.com.cn/');
	
}

function addFavor()
{
	try 
	{ 
			window.external.addfavorite('//www.7m.com.cn','7M体育-即时比分'); 
	} 
	catch(e) 
	{ 
		try 
		{ 
				window.sidebar.addPanel('//www.7m.com.cn','7M体育-即时比分', ""); 
		} 
		catch (e) 
		{ 
				alert("加入收藏失败，请使用ctrl+d进行添加"); 
		} 
	} 
	
}

function Team(id)
{
	window.open("//data.7m.com.cn/Team_Data/default_gb.shtml?id=" + id);
}

function Player(id)
{
	window.open("//data.7m.com.cn/Player_Data/" + id + "/gb/index.shtml");
}

function ShowDetails(id)
{
	window.open("//data.7m.com.cn/goaldata/jt/" + id + ".shtml","","width=480,height=440,scrollbars=yes"); 

}


function ShowAnalyse(id)
{
	window.open("//data.7m.com.cn/Analyse/default_gb.shtml?id=" + id);
}

function zlk(id)
{
	window.open("//data.7m.com.cn/matches_data/" + id + "/gb/index.shtml");
}
