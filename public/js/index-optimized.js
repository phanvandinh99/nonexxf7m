(function() {
	'use strict';
	
	// Cookie management
	function initCookieReset() {
		if (typeof getCookie === 'function' && getCookie("resetCookie") === '') {
			var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
			if (keys) {
				for (var i = keys.length; i--;) {
					document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
				}
			}
		}
	}
	
	// Mobile redirect
	function initMobileRedirect() {
		if (typeof isIos === 'function' && typeof isAndroid === 'function') {
			if ((isIos() || isAndroid())) {
				if (location.search.indexOf("pad7m") === -1 && getCookie("topad") === "1") {
					top.location.href = "//pad.7m.com.cn";
				}
			}
		}
	}
	
	// Mobile first visit handler
	function handleMobileFirstVisit(event, url) {
		const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
		const hasVisited = localStorage.getItem('visited-in-mobi') === 'true';
		if (isMobile && !hasVisited) {
			event.preventDefault();
			localStorage.setItem('visited-in-mobi', 'true');
			window.location.href = url;
		}
	}
	
	// Initialize mobile link handlers
	function initMobileLinks() {
		var linkConfigs = [
			{ selector: '.to-mobile-link-fb-live', url: 'https://bf.7m.com.cn/select_big.html?balltype=1&tab=1' },
			{ selector: '.to-mobile-link-fb-future', url: 'https://bf.7m.com.cn/select_big.html?balltype=1&tab=2' },
			{ selector: '.to-mobile-link-fb-result', url: 'https://bf.7m.com.cn/select_big.html?balltype=1&tab=4' },
			{ selector: '.to-mobile-link-fb-data', url: 'https://bf.7m.com.cn/select_big.html?balltype=1&tab=3' },
			{ selector: '.to-mobile-link-bb-live', url: 'https://bf.7m.com.cn/select_big.html?balltype=2&tab=1' },
			{ selector: '.to-mobile-link-bb-future', url: 'https://bf.7m.com.cn/select_big.html?balltype=2&tab=2' },
			{ selector: '.to-mobile-link-bb-result', url: 'https://bf.7m.com.cn/select_big.html?balltype=2&tab=4' },
			{ selector: '.to-mobile-link-bb-data', url: 'https://bf.7m.com.cn/select_big.html?balltype=2&tab=3' }
		];
		
		linkConfigs.forEach(function(config) {
			var links = document.querySelectorAll(config.selector);
			links.forEach(function(link) {
				link.addEventListener('click', function(e) {
					handleMobileFirstVisit(e, config.url);
				});
			});
		});
	}
	
	// Box bottom class toggle
	function initBoxScrollToggle() {
		var box = document.querySelector('.box');
		if (!box) return;
		
		function updateBoxClass() {
			var winH = document.documentElement.clientHeight;
			var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
			box.className = (winH + scrollH > 900) ? 'box boxBottom' : 'box';
		}
		
		updateBoxClass();
		
		var ticking = false;
		window.addEventListener('scroll', function() {
			if (!ticking) {
				window.requestAnimationFrame(function() {
					updateBoxClass();
					ticking = false;
				});
				ticking = true;
			}
		});
	}
	
	// Initialize on DOM ready
	function init() {
		initCookieReset();
		initMobileRedirect();
		initMobileLinks();
		initBoxScrollToggle();
	}
	
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
