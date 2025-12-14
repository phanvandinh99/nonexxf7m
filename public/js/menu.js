var menuTimer ={"mnu1":1,"mnu2":1,"mnu3":1,"mnu4":0};
function showMenu(objID,menuID,left,flag)
{
	var pos = GetZB($$(objID));
	$$(menuID).style.display="block";
	$$(menuID).style.left = pos.left + left  + "px";
	if(flag)
	{
		$$(menuID).style.top = (pos.top + 20) + "px";
	}
	else
	{
		$$(menuID).style.top = (pos.top - 30) + "px";
	}
}

function closeMenu(menuID)
{
	clearTimeout(menuTimer[menuID]);
	menuTimer[menuID]=setTimeout(function(){ $$(menuID).style.display='none' },500 );
}

function focuMenu(menuID)
{
	clearTimeout(menuTimer[menuID]);
	$$(menuID).style.display="block";
}
