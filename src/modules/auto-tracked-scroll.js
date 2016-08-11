/**
 * @author Deux Huit Huit
 *
 * Auto Tracked Page module
 *
 */

(function ($, global, undefined) {

	'use strict';
	
	var page;
	var tracker = App.components.create('checkpoint-event', {
		category: 'Lecture',
		checkPoints: [25, 50, 75, 90, 100]
	});
	var win = $(window);
	var winH = win.height();
	var body = $('body');
	var bodyH = body.height();
	var scrollH = bodyH - winH;
	
	var onEnter = function (next, data) {
		page = $(data.page.key());
		tracker.init();
		App.callback(next);
		setTimeout(onResize, 100);
	};
	
	var onLeave = function (next, data) {
		tracker.reset();
		App.callback(next);
	};
	
	var onResize = function () {
		winH = win.height();
		bodyH = body.height();
		scrollH = bodyH - winH;
	};
	
	var onScroll = function () {
		if (scrollH > 0) {
			tracker.track(win.scrollTop() / scrollH * 100);
		}
	}
	
	var init = function () {
		
	};
	
	var actions = function () {
		return {
			page: {
				enter: onEnter,
				leave: onLeave
			},
			site: {
				scroll: onScroll,
				resize: onResize
			}
		};
	};
	
	App.modules.exports('auto-tracked-scroll', {
		init: init,
		actions: actions
	});
	
})(jQuery, window);