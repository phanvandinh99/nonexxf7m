function SearchTeam(key) 
{
	key = key.Trim();
	if(key=="")
	{
		closeSearch();
	}
	$$("ulGameLive").innerHTML = "<div style='text-align:center'><br><br><img src='//img.7m.com.cn/v2/mload.gif'/></div>";
	$$("divSTitle").innerHTML = "正在搜索。。。";
	var divGame =$$("divGame");
	if(divGame.style.display=="none")
	{
		var pos = GetZB($$("txtGame"));
		divGame.style.display ="block";
		divGame.style.left = pos.left - 148 + "px";
		divGame.style.top = pos.top + pos.height + "px";
	}
	var url ="https://search.7m.com.cn/liveq.aspx?k=" + encodeURIComponent(key)  +"&e=0&js=1";
	if(typeof(dt)!="undefined") dt = null;
	LoadJS(url,SearchTeamCallback);

}

function closeSearch()
{
	$$("divGame").style.display="none";
}

function SearchTeamCallback()
{
}

function loadgame(obj)
{
	var strHTML = "";
	for(var i=0;i<obj.length;i++)
	{
		strHTML += "<li><a onmouseover=\"this.className='hover'\" onmouseout=\"this.className='odd'\" href='javascript:ShowDetails(" +  obj[i][0] +")'>" + (obj[i][4] != "17" ? "<strong>" + ChangeState(parseInt(obj[i][4])) + "</strong>" : "") + obj[i][1] + (obj[i][3] == "" ? " VS " : " <strong>" + obj[i][3] + "</strong> ") + obj[i][2]  + "</a></li>";
	}
	$$("ulGameLive").innerHTML = strHTML;
	$$("divSTitle").innerHTML = "共<span class='red'>" +  obj.length  +"</span>条结果";
}

var STATE_ARR = ["", "上", "中", "下", "完", "断", "取", "加", "加", "加", "完", "点", "全", "延", "斩", "待", "金", ""];
function ChangeState(startIndex)
{
	if (startIndex < 0 || startIndex > 18)
		startIndex = 0;
	return STATE_ARR[startIndex];
}