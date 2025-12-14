// JavaScript Document
if(typeof(a_d_l1)!="undefined") $$("l1").innerHTML = a_d_l1;
if(typeof(a_d_l2)!="undefined") $$("l2").innerHTML = a_d_l2;
if(typeof(a_d_r1)!="undefined") $$("r1").innerHTML = a_d_r1;
if(typeof(a_d_r2)!="undefined") $$("r2").innerHTML = a_d_r2;
if(typeof(a_d_m1)!="undefined") $$("m1").innerHTML =a_d_m1;
if(typeof(a_d_m2)!="undefined") $$("m2").innerHTML =a_d_m2;
if(typeof(linkStr)!="undefined") $$("linkStr").innerHTML =linkStr;
if(typeof(a_d_lf1)!="undefined" && a_d_lf1!="" && $$("lf1")!=null ){
	$$("lf1").innerHTML = a_d_lf1 + "<a href='javascript:$$(\"lf1\").style.display=\"none\";void(0)' class='gg_close'></a>";
	$$("lf1").style.display ="";
}
if(typeof(a_d_rf1)!="undefined" && a_d_rf1!="" && $$("rf1")!=null){
	$$("rf1").innerHTML = a_d_rf1 + "<a href='javascript:$$(\"rf1\").style.display=\"none\";void(0)' class='gg_close'></a>";
	$$("rf1").style.display ="";
}

if(typeof(bigScreen)!="undefined") $$("bigScreen").innerHTML =bigScreen;

if(typeof(linkStr)!="undefined" && linkStr=="") $$("linkDiv").style.display ="none";
