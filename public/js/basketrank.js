var hoopRankFlag = [false,false,false];
function changeHoopRank(index)
{
	if(index == 0)
	{
		$$("hrank_t0").className = "on";
		$$("hrank_t1").className=$$("hrank_t2").className = "none"; 
		$$("hrank_l").innerHTML = "<a href='//" + BDATAHOST +"/basketball_match_data/9/gb/standings.shtml' target='_blank'>2012赛季常规赛排行榜</a>";
		$$("hrank_t").innerHTML = "场差";
		if(!hoopRankFlag[index])
		{
			if(typeof(e_rank)!="undefined")
			{
				LoadHoopRank(index,e_rank);
				hoopRankFlag[index] = true;
			}
		}
		$$("hrank0").style.display = "block";
		$$("hrank1").style.display = $$("hrank2").style.display  = "none";
	}
	else if(index==1)
	{
		$$("hrank_t0").className = $$("hrank_t2").className  = "";
		$$("hrank_t1").className = "on"; 
		$$("hrank_l").innerHTML = "<a href='//" + BDATAHOST +"/basketball_match_data/9/gb/standings.shtml' target='_blank'>2012赛季常规赛排行榜</a>";
		$$("hrank_t").innerHTML = "场差";
		if(!hoopRankFlag[index])
		{
			if(typeof(w_rank)!="undefined")
			{
				LoadHoopRank(index,w_rank);
				hoopRankFlag[index] = true;
			}
		} 
		$$("hrank1").style.display = "block";
		$$("hrank0").style.display = $$("hrank2").style.display  = "none";
	}
	else
	{
		$$("hrank_t0").className = $$("hrank_t1").className = ""; 
		$$("hrank_t2").className = "on";
		$$("hrank_l").innerHTML = "<a href='//" + BDATAHOST +"/basketball_match_data/4/gb/standings.shtml' target='_blank'>2011-2012赛季常规赛排行榜</a>";
		$$("hrank_t").innerHTML = "积分";
		if(!hoopRankFlag[index])
		{
			if(typeof(rank)!="undefined")
			{
				LoadHoopRank(index,rank);
				hoopRankFlag[index] = true;
			}
		} 
		$$("hrank2").style.display = "block";
		$$("hrank1").style.display = $$("hrank0").style.display  = "none";
	}
}


function LoadHoopRank(index,rankObj)
{
	var strHTML ="";
	for(var i=0;i<rankObj.length;i++)
	{
		var cssName = (i%2==0?"bg":"");
		if(i<3)
		{
			if(i==0) cssName +=" top_red";
			else if(i==1) cssName ="top_blue";
			else cssName +=" top_gray";
		}
		if(cssName!="")
			strHTML += "<li class='"+cssName+"'>";
		else
			strHTML +="<li>";
		strHTML+="<span class='no'>" + (i+1) +"</span>";
		strHTML+="<span class='team2'><a href='//" +  BDATAHOST +"/basketball_team_data/" + rankObj[i][0]  +"/gb/' target='_blank'>" + rankObj[i][1] +"</a></span>";
		strHTML+="<span class='winning'>" + rankObj[i][2] +"</span>";
		strHTML+="<span class='score2'>" + rankObj[i][3] +"</span>";
		strHTML +="</li>";
	}     
	$$("hrank" + index +"_c").innerHTML = strHTML ;
}
