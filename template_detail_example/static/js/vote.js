/*********检查投票****************/
function checkVote(str,val)
{
	var CookieVal = getCookie("7MVote"+str);
	if(CookieVal!=null||!check){
		alert("您已投过票,感谢您的参与!");
	}else{
		check=false;
		ajaxVote(str,val);
	}
}
/*******投票**********************************************************************************/
var check=true;
function ajaxVote(str,val){
	 $.ajax({
	   type: "post",
	   url: "/include/1.1/NewsVote.php",
	   data: {KeyWord1:str,KeyWord2:val,Type:1 },
	   beforeSend: function(XMLHttpRequest){
		   $("#VoteItem").attr({"disabled":"disabled"})
	   },
	   success: function(data, textStatus){
		   $("#VoteItem").html(data);
		   setCookie("7MVote"+str,val);
	   },
	   complete: function(XMLHttpRequest, textStatus){
		    $("#VoteItem").attr({"disabled":""})
	   },
	   error: function(xhr,status,errMsg){
	　　	 //alert("错误<br/>"+errMsg);
	   }
	 });
}
/*********内页检查投票****************/
function checkNewsVote(str,val){
	var CookieVal = getCookie("7MBVote"+str);
	if(CookieVal!=null||!check){
		alert("您已投过票,感谢您的参与!");
	}else{
		check=false;
		$.ajax({
			type: "post",
			url: "/include/1.1/NewsVote.php",
			data: {KeyWord1:str,KeyWord2:val,Type:2 },
			beforeSend: function(XMLHttpRequest){
			   	$("#NewsVoteTable").attr({"disabled":"disabled"})
			},
			success: function(data, textStatus){
				maxNum = parseInt($("span.max_people").html())+1;
				$("span.max_people").html(maxNum);
				$("#NewsVoteTable").html(data);
				setCookie("7MBVote"+str,val);
			},
			complete: function(XMLHttpRequest, textStatus){
			  	alert('投票成功!')
				$("#NewsVoteTable").attr({"disabled":""})
			},
			error: function(xhr,status,errMsg){
			　　	 //alert("错误<br/>"+errMsg);
			}
		});
	}
}
function showVote(){
	$("#vote_display").show();
	$("#vote_show_a").hide();
	$("#vote_hide_a").show();
}
function hideVote(){
	$("#vote_display").hide();
	$("#vote_show_a").show();
	$("#vote_hide_a").hide();
}