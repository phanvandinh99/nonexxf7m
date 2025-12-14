(function() {
	'use strict';
	
	var picWidth = [0, 360, 720, 510];
	var targetPos = 0;
	var Photo_Ctn = null;
	var lnkphotos = [];
	var PhotoTimer1 = null;
	var PhotoTimer2 = null;
	var animationFrameId = null;
	
	var IsScroll = false;
	var IsAuto = true;
	var curPhotoIndex = 0;
	var PhotoAutoFlag = true;
	
	// Initialize when DOM is ready
	function init() {
		// Check if elements exist
		if (typeof $$ !== 'function') {
			console.warn('pic_list.js: $$ function not found');
			return;
		}
		
		Photo_Ctn = $$("photos_show");
		if (!Photo_Ctn) {
			console.warn('pic_list.js: photos_show element not found');
			return;
		}
		
		// Get photo links
		lnkphotos = [
			$$("lnkphoto0"),
			$$("lnkphoto1"),
			$$("lnkphoto2")
		].filter(function(el) { return el !== null; });
		
		if (lnkphotos.length === 0) {
			console.warn('pic_list.js: No photo link elements found');
			return;
		}
		
		// Start auto scroll
		if (IsAuto) {
			PhotoTimer2 = setInterval(AutoScroll, 8000);
		}
	}
	
	function changePhotoPos(index) {
		// Validate index
		if (index < 0 || index >= lnkphotos.length) {
			return;
		}
		
		// Clear existing animation
		if (PhotoTimer1) {
			clearInterval(PhotoTimer1);
			PhotoTimer1 = null;
		}
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}
		
		curPhotoIndex = index;
		
		// Update class names safely
		for (var i = 0; i < lnkphotos.length; i++) {
			if (lnkphotos[i]) {
				lnkphotos[i].className = (i === index) ? "on" : "";
			}
		}
		
		if (index >= 0 && index < picWidth.length) {
			targetPos = picWidth[index];
			IsScroll = true;
			goPhotoPos();
		}
	}
	
	function goPhotoPos() {
		if (!Photo_Ctn) {
			IsScroll = false;
			return;
		}
		
		var curPos = parseInt(Photo_Ctn.scrollLeft) || 0;
		var diff = targetPos - curPos;
		
		if (Math.abs(diff) < 1) {
			Photo_Ctn.scrollLeft = targetPos;
			IsScroll = false;
			return;
		}
		
		// Smooth scrolling using requestAnimationFrame for better performance
		var step = diff * 0.15; // Easing factor
		if (Math.abs(step) < 1) {
			step = diff > 0 ? 1 : -1;
		}
		
		Photo_Ctn.scrollLeft = curPos + step;
		
		if (IsScroll) {
			animationFrameId = requestAnimationFrame(goPhotoPos);
		}
	}
	
	function AutoScroll() {
		if (!IsAuto || IsScroll || lnkphotos.length === 0) {
			return;
		}
		
		var maxIndex = lnkphotos.length - 1;
		
		if (PhotoAutoFlag) {
			curPhotoIndex = curPhotoIndex + 1;
			if (curPhotoIndex > maxIndex) {
				curPhotoIndex = maxIndex;
				PhotoAutoFlag = false;
			}
		} else {
			if (curPhotoIndex === maxIndex) {
				curPhotoIndex = 0;
			} else {
				curPhotoIndex = curPhotoIndex - 1;
			}
			
			if (curPhotoIndex < 0) {
				curPhotoIndex = 1;
				PhotoAutoFlag = true;
			}
		}
		
		changePhotoPos(curPhotoIndex);
	}
	
	// Cleanup function
	function cleanup() {
		if (PhotoTimer1) {
			clearInterval(PhotoTimer1);
			PhotoTimer1 = null;
		}
		if (PhotoTimer2) {
			clearInterval(PhotoTimer2);
			PhotoTimer2 = null;
		}
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}
	}
	
	// Expose changePhotoPos globally if needed
	if (typeof window !== 'undefined') {
		window.changePhotoPos = changePhotoPos;
		
		// Initialize when DOM is ready
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', init);
		} else {
			init();
		}
		
		// Cleanup on page unload
		window.addEventListener('beforeunload', cleanup);
	}
})();
