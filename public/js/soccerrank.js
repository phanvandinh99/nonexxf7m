// JavaScript Document
var shooterFlag = false ;
function changeSoccerRank(index)
{
	if(index ==0)
	{
		$$("lisrank0").className = "on";
		$$("lisrank1").className = "";
		$$("divsrank0").style.display = "block";
		$$("divsrank1").style.display = "none";
		
	}
	else
	{
		$$("lisrank0").className = "";
		$$("lisrank1").className = "on";
		$$("divsrank0").style.display = "none";
		$$("divsrank1").style.display = "block";
		if(!shooterFlag)
		{
			IniShooter();
			shooterFlag = true;
		}
	}		
}

function LoadTeamRank(value)
{
	if(typeof(Content)!="undefined" && Content!=null  ) Content = null;
	$$("lnkTeamRank").href = "//" + DATAHOST + "/matches_data/" + value.replace(/[^0-9]+/g, '') +"/gb/index.shtml";
	$$("soccerRank1_c").innerHTML="<div style='text-align:center'><br/><b>Loading...</b></div>";
	LoadJS("//" + DATAHOST +"/jfb/js/gb/" + value +".js?f=" + new Date().valueOf(),ShowTeamRank);
}
function ShowTeamRank()
{
    var ulTeamRank = $$("soccerRank1_c");
    var strHTML="";
    if(typeof(Content)!="undefined" && Content !=null )
    {
        for(var i=0;i<Content.length;i++)
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
            strHTML+="<span class='team'><a href='//team.7m.com.cn/" + Content[i][0] +"/index_gb.shtml' target='_blank'>" + Content[i][1]  + "</a>" + ( Content[i][3]>0?"<span style='color:#b90200; font-size:10px;font-weight:normal'>(扣" +Content[i][3]  +"分)</span>":"") +"</span>";
            strHTML+="<span class='score'>" + (Content[i][2] - Content[i][3]) +"</span>";	
            strHTML+="</li>";
        }     
    }
	ulTeamRank.innerHTML=strHTML;
}

function IniShooter()
{
	var selShooterRank = $$("selShooterRank");
	for(var i=0;i<shooter_i.length;i++)
	{
		selShooterRank.options[selShooterRank.options.length] = new Option(shooter_i[i][1],shooter_i[i][0]);
	}
	setTimeout(function(){LoadShooterRank(selShooterRank.value)},500);
}

function LoadShooterRank(value)
{
	if(typeof(Content)!="undefined" && Content!=null  ) Content = null;
	$$("lnkShooter").href ="//"  +  DATAHOST  +"/matches_data/" + value +"/gb/shooter.shtml";
	$$("soccerRank2_c").innerHTML="<div style='text-align:center'><br/><b>Loading...</b></div>";
	LoadJS("//" +  DATAHOST +"/shooter/gb/" + value +".js?f=" + new Date().valueOf(),ShowShooterRank);
}

function ShowShooterRank()
{
    var ulShooterRank = $$("soccerRank2_c");
    var strHTML="";
    if(typeof(Shooters)!="undefined" && Shooters !=null )
    {
        for(var i=0;i<Shooters.length;i++)
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
            strHTML+="<span class='no'>" + Shooters[i][0] +"</span>";
            strHTML+="<span class='team'><a href='//player.7m.com.cn/" + Shooters[i][1]  +"/index_gb.shtml' target='_blank'>" + Shooters[i][2] +"</a></span>";
            strHTML+="<span class='score'>" + Shooters[i][3] +"</span>";
            strHTML +="</li>";
        }     
    }
    ulShooterRank.innerHTML=strHTML;
}