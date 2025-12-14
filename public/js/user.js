function showLogin(){
	var  pos = GetZB($$("lnkLogin"));
	$$("divLogin").style.display="block";
	$$("userpwd").value="";
	$$("divLogin").style.left = pos.left -225 + "px";
	$$("divLogin").style.top = (pos.top +20) + "px";
}
function checkLoginForm(){
	
	if($$("userid").value.Trim()==""){
		alert("请输入账号");
		return false;
	}
	if($$("userpwd").value.Trim()==""){
		alert("请输入密码");
		return false;
	}
	return true;
}
// function getUserName(){

// 	var name =  getCookie("nickname");
// 	if(name!=""){
// 		name = name.replace(new RegExp("\\+","gm")," ");
// 		//return name;
// 		return decodeURI(name)
// 	}else{

// 		return "";
// 	}
// }
function getUserName(){
	var loginInfo = getCookie("login_info");
	var name = '';
	if(loginInfo != ""){
		loginInfo = JSON.parse(loginInfo);
		name = loginInfo.nickname;
		if(name!=""){
			name = name.replace(new RegExp("\\+","gm")," ");
			name = name.replace(/_/g,'%');
			name = name.replace(/-/g,'%');
			//return name;
			return decodeURI(name)
		}else{

			return "";
		}
	}else{

		return "";
	}
	
}
var uflag = true;

function checkLogin(rFlag)
{

	var nickname = getUserName();
	if(nickname!=""){
		$$("divUser_1").style.display = "block";
		$$("divUser_2").style.display = "none";
		$$("spnTimePart").innerHTML = getTimePart();
		if(nickname.length < 7){
			$$("lnkUser").innerHTML = nickname;
		}else{
			$$("lnkUser").innerHTML = nickname.substr(0,6)+"…";
		}
		$$("lnkUser").href ="//accounts.7m.com.cn/personal.html?lang=gb&url="+window.location.href;
		$$("divLogin").style.display ="none";	
	}else{
		$$("divUser_1").style.display = "none";
		$$("divUser_2").style.display = "block";
		
		if(typeof(rFlag)!="undefined" || uflag){
			$$("frameLogin").src = "//passport.7m.com.cn/checkforlogin.php?url=" + encodeURIComponent("//" + location.host + "/login_ok.php") + "&f=" + new Date().valueOf();
			uflag = false;
			//openTip();
			//closeTip(8000);
		
		}		
	}
}

function getTimePart(){
	var hour = new Date().getHours();
	if(hour<=4) return "夜深了";
	else if(hour<=11) return "早上好";
	else if(hour<=13) return "中午好";
	else if(hour<=18) return "下午好";
	else return "晚上好";
}
function logout(){
	// $$("frameLogin").src = "//passport.7m.com.cn/logout.php?f=" + new Date().valueOf() + "&url=" + encodeURIComponent("//" + location.host + "/logout.php?f=" + new Date().valueOf()) ;;
	var ajax_data = {
        'plat': 4,
        'lan': 'gb',
        'token':JSON.parse(getCookie('login_info')).token
    };
	jQuery.ajax({
        type: 'get',
        url:  '//txt-api.7m.com.cn/tips/user/logout',
        data: ajax_data,
        dataType: 'json',
        success: function (json) {
            if (json['status'] == 1) {
                delCookie('login_info');
                location.reload();
            }
        },
        error: function (json) {
        }
    });
}
$$("frmLogin").action = "//passport.7m.com.cn/login.php?success=" + encodeURIComponent("//" + location.host + "/login_ok.php") ;
$$("userid").value = getCookie("ulid");

var timerTip ;
function closeTip(ms){
	timerTip = setTimeout("$$('divTip').style.display = 'none';clearTimeout(timerTip);",ms);
}

function openTip(){
	clearTimeout(timerTip);
	//$$("divTip").style.display ="block"
}


function weibologin(){
	var url = "//" + location.host + "/login_extend_callback.shtml";
	weibo_login(url,'gb');
}

function qqlogin(){
	var url = "//" + location.host + "/login_extend_callback.shtml";
	qq_login(url,'gb');

}








