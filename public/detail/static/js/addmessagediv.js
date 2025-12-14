
var browser={    
	versions:function(){            
		var u = navigator.userAgent, app = navigator.appVersion;            
		return {                
			trident: u.indexOf('Trident') > -1, //IE内核                
			presto: u.indexOf('Presto') > -1, //opera内核                
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核                
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核                
			mobile: !!u.match(/AppleWebKit.*Mobile.*/),//||!!u.match(/AppleWebKit/), //是否为移动终端                
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端                
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器                
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器                
			iPad: u.indexOf('iPad') > -1, //是否iPad                
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部            
		};
	}()
} 

var showMessageType = "v";

///加载留言面板
function addMessageDiv()
{
	try
	{
		var promptStr = {"top_gb":"返回顶部","top_big":"返回頂部","top_en":"Top","top_vn":"Top","top_th":"Top","top_kr":"맨 위로","top_ms":"Top","top_jp":"トップ","top_fr":"Top","top_es":"Top","top_id":"Top"};
		var msgStr = {"msg_gb":"意见反馈","msg_big":"意見反饋","msg_en":"Feedback","msg_vn":"Ý kiến phản hồi","msg_th":"ข้อเสนอแนะ","msg_kr":"피드백","msg_ms":"Maklum Balas","msg_jp":"ご意見募集","msg_fr":"Rapport de bogue","msg_es":"Realimentación","msg_id":"Laporkan Kesalahan"};
		
		var spt_message = document.getElementById("spt_message").src;
		
		var lang;
		var paramStr="";
		if(spt_message.indexOf('?') > 0){
			paramStr = spt_message.substr(spt_message.indexOf('?') + 1);
			
			
			var params = paramStr.split('&');		
			if(params.length == 1){
				lang = params[0].split('=')[1];
			}else{
				for(var i=0; i<params.length;i++){
					var paramItems = params[i].split('=');
					if(paramItems[0]=="l"){
						lang = paramItems[1];
					}else{
						showMessageType = paramItems[1];
					}
				}
			}
		}
		
		var div_id = "msgDiv";
		var div_class = "";
		
		if(showMessageType=="v"){
			div_class = "fixedbar";
		}else{
			div_class = "fixedwrap";
		}
		
		var msgDiv = '<div id="' + div_id + '" class="' + div_class + '">';
		var s=document.createElement("link");   		
		
		s.rel="stylesheet";   
		s.type="text/css";   
		if(showMessageType=="v"){
			s.href="//www.7m.com.cn/css/backtop2.css";
		}else{
			s.href="//www.7m.com.cn/css/backtop.css";
		}
		document.getElementsByTagName("head")[0].appendChild(s);   

		var help_url = "https://help."+"7m"+".com.cn";
		switch(lang){
			case 'en':
				help_url="https://help."+"7m"+"sport"+".com";
				break;
			case 'kr':
				help_url="https://help."+"7m"+"sport"+".com";
				break;
			case 'th':
				help_url="https://help."+"7m"+"th"+".com";
				break;
			case 'vn':
				help_url="https://help."+"7m"+"vn"+".com";
				break;
			case 'jp':
				help_url="https://help."+"7m"+"saka"+".com";
				break;
			case 'fr':
				help_url="https://help."+"7m"+"fr"+".com";
				break;
			case 'es':
				help_url="https://help."+"7m"+"futbol"+".com";
				break;
			case 'id':
				help_url="https://help."+"7m"+"bola"+".com";
				break;
		}

		var url = window.location.href;
		var appHtml='';
		if(url.indexOf("vn.7msport.com") >= 0 ) { //比分
			appHtml='<a href="https://api.7mvn.com/app/api/version/1_1/hitsStats/index?page=1&&button=4" target="_blank" class="backtop_app" title="Ứng dụng"></a>'
		}
		if(url.indexOf("data.7mvn.com/goaldata/vn") >= 0 ) { //比赛内页
			appHtml='<a href="https://api.7mvn.com/app/api/version/1_1/hitsStats/index?page=1&&button=6" target="_blank" class="backtop_app" title="Ứng dụng"></a>'
		}
		if(url.indexOf("data.7mvn.com/result/default_vn") >= 0 ) { //赛果
			appHtml='<a href="https://api.7mvn.com/app/api/version/1_1/hitsStats/index?page=1&&button=8" target="_blank" class="backtop_app" title="Ứng dụng"></a>'
		}
		if(url.indexOf("data.7mvn.com/fixture/") >= 0 ) { //赛程
			appHtml='<a href="https://api.7mvn.com/app/api/version/1_1/hitsStats/index?page=1&&button=10" target="_blank" class="backtop_app" title="Ứng dụng"></a>'
		}
		if(url.indexOf("data.7mvn.com/database/") >= 0 ) { //资料库首页
			appHtml='<a href="https://api.7mvn.com/app/api/version/1_1/hitsStats/index?page=1&&button=12" target="_blank" class="backtop_app" title="Ứng dụng"></a>'
		}
		if(url.indexOf("data.7mvn.com/matches_data/") >= 0 ) { //赛事主页
			appHtml='<a href="https://api.7mvn.com/app/api/version/1_1/hitsStats/index?page=1&&button=14" target="_blank" class="backtop_app" title="Ứng dụng"></a>'
		}
		if(url.indexOf("team.7msport.com/") >= 0 ) { //球队主页
			appHtml='<a href="https://api.7mvn.com/app/api/version/1_1/hitsStats/index?page=1&&button=16" target="_blank" class="backtop_app" title="Ứng dụng"></a>'
		}
		if(url.indexOf("player.7msport.com/") >= 0 ) { //球员主页
			appHtml='<a href="https://api.7mvn.com/app/api/version/1_1/hitsStats/index?page=1&&button=18" target="_blank" class="backtop_app" title="Ứng dụng"></a>'
		}

		

		if (window.location.href.includes('.7m.hk')) {
			if(showMessageType=="v"){ 
				msgDiv += '<div><a href="javascript:scroll(0,0)" class="backtop_'+lang+'" title="'+promptStr["top_"+lang]+'"></a></div><div><a href="javascript:" onclick="window.open(\'//help.7mdt.com/jump.aspx?l=' + lang + '&page=sentmessage&t=0&hk=1\',\'\',\'width=450,height=588,scrollbars=yes\');" class="feedback_'+lang+'" ></a>'+appHtml+'</div>';
			}else{
				msgDiv += '<a href="javascript:scroll(0,0)" class="backtop" title="'+promptStr["top_"+lang]+'"></a><a href="javascript:" onclick="window.open(\'//help.7mdt.com/jump.aspx?l=' + lang + '&page=sentmessage&t=0&hk=1\',\'\',\'width=450,height=588,scrollbars=yes\');" class="feedback" title="'+msgStr["msg_"+lang]+'"></a>'+appHtml;
			}
		} else {
			if(showMessageType=="v"){
				msgDiv += '<div><a href="javascript:scroll(0,0)" class="backtop_'+lang+'" title="'+promptStr["top_"+lang]+'"></a></div><div><a href="javascript:" onclick="window.open(\''+help_url+'/jump.aspx?l=' + lang + '&page=sentmessage&t=0\',\'\',\'width=450,height=588,scrollbars=yes\');" class="feedback_'+lang+'" ></a>'+appHtml+'</div>';
			}else{
				
				msgDiv += '<a href="javascript:scroll(0,0)" class="backtop" title="'+promptStr["top_"+lang]+'"></a><a href="javascript:" onclick="window.open(\''+help_url+'/jump.aspx?l=' + lang + '&page=sentmessage&t=0\',\'\',\'width=450,height=588,scrollbars=yes\');" class="feedback" title="'+msgStr["msg_"+lang]+'"></a>'+appHtml;
			}
		}




	
		
		
		msgDiv += '</div>';
		document.write(msgDiv);
	}catch(e){}
}

if(!browser.versions.mobile){
	addMessageDiv();
}

