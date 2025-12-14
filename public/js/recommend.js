(function() {
	function initRecommend() {
		if (typeof $$ !== 'function') {
			setTimeout(initRecommend, 100);
			return;
		}
		
		var go_scroll = true;
		var Mar = $$("recom_l");
		if (!Mar) {
			return;
		}
		
		var child_div = Mar.getElementsByTagName("li");
		var picH = 30; //移动高度
		var scrollstep = 3; //移动步幅,越大越快
		var scrollinterval = 30; //移动频率，毫秒，越小越平滑
		var scrollTimer = null;
		
		function scrollDiv() {
			if (go_scroll) {
				var scrollTop = Mar.scrollTop;
				if (scrollTop >= picH * (child_div.length - 1)) {
					Mar.scrollTop = 0;
				} else {
					Mar.scrollTop += scrollstep;
				}
			}
		}
		
		if (scrollTimer) {
			clearInterval(scrollTimer);
		}
		scrollTimer = setInterval(scrollDiv, scrollinterval);
	}
	
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initRecommend);
	} else {
		initRecommend();
	}
})();
