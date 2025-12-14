jQuery(function($){
	// search
	for (var i=0;i<global_search_option.length;i++) {
		$('#' + global_search_option[i][0]).mouseover(function(){
			$('#search li').each(function(){
				$(this).html('<a href="javascript:">'+global_search_option[$(this).attr('index')][1]+'</a>');
			});
			var index = $(this).attr('index');
			$(this).html(global_search_option[index][1]);
			$('#t_1 input[type="hidden"]').val('');
			$('#t_1 input[index="'+index+'"]').val('on');
			$('#t_1 div[type="key"]').hide();
			$('#t_1 div[index="'+index+'"]').show();
			$('#searchVal').val(index);
			if ( index == 0 ) {
				$("#bdcs-search-form").show();
				$("#search_form").hide();
			} else {
				$("#bdcs-search-form").hide();
				$("#search_form").show();
			}
		});
	}
	$("#search_form").attr("target", "_blank");
	$("#search_form").submit(function() {
		var keyText = $("#key").val();
		if (keyText == "" || keyText == "7m站内搜索，请输入相关文字") {
			$("#key").focus();
			return false;	
		}
		return true;
	});
	$("#bdcs-search-form").submit(function() {
		var keyText = $.trim($("#bdcs-search-form-input").val());
		if (keyText == ""){
			$("#bdcs-search-form-input").focus();
			return false;	
		}
		$("#bdcs-search-form-s").val("13413958429287951139");
		$("#bdcs-search-form-entry").val("1");
		return true;
	});
});
var global_search_option = [
	['search_news','新&nbsp;闻'],
	['search_team','球&nbsp;队'],
	['search_player','球&nbsp;员']
];
var search = function(key,index) {
	$('#t_1 input[type="hidden"]').val('');
	$('#t_1 input[index="'+index+'"]').val('on');
	$('#key').val(key);
	$('#search_form').submit();
}
function searchBlur(){
	var keyVal = $("#key").val();
	var keyTip = $("#key").attr("tip");
	if(keyVal=='') { $("#key").val(keyTip); }
}
function searchFocus(){
	var keyVal = $("#key").val();
	var keyTip = $("#key").attr("tip");
	if(keyVal==keyTip) { $("#key").val(""); }
}