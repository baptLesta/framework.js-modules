/**
 *  @author Deux Huit Huit
 *
 *  Auto screen height
 */
(function ($, undefined) {

	'use strict';
	
	var win = $(window);
	
	var mobileHeight = 0;
	
	var getPage = function () {
		return $('.page:visible');
	};
	
	var platforms = {
		all: true,
		desktop: !App.device.mobile,
		tablette: App.device.tablet,
		mobile: App.device.mobile,
		phone: $.phone
	};
	
	var getOffsetTotal = function (itemsArray, globalTargetProperty) {
		var total = 0;

		if (itemsArray) {
			var its = itemsArray.split(',');
			$.each(its, function (i, value) {
				var item = $(value);
				var targetProperty =
				item.attr('data-screen-height-property-to-target')
				? item.attr('data-screen-height-property-to-target')
				: globalTargetProperty;
				total += strategies[targetProperty](item);
			});
		}
		return total;
	};
	
	var processPlatforms = function (itemsArray) {
		var result = false;
		
		if (itemsArray) {
		
			var its = itemsArray.split(',');
			$.each(its, function (i, value) {
				if (platforms[value]) {
					result = true;
				}
			});
		}
		return result;
	};
	
	var resizeItem = function () {
		var t = $(this);
		var ratio = t.attr('data-height-ratio') || 1;
		var fx = t.attr('data-height-property') || 'minHeight';
		var targetProperty = t.attr('data-height-target-property') || 'height';
		var offset = getOffsetTotal(t.attr('data-height-offset'), targetProperty);
		var newHeight = (win.height() - offset) * ratio;
		var platformsVal = processPlatforms(t.attr('data-screen-height-platform') || 'all');
		var minWidth = t.attr('data-screen-height-min-width') || 0;
		var useMediaQuery = t.data('data-screen-height-use-media-query') || true;
		var useJitImage = t.attr('data-screen-height-jitimage') || true;
		
		//test platforms
		if (platformsVal &&
			!useMediaQuery &&
			win.width() > minWidth) {
				
			t.css(fx, newHeight);
			
		} else if (platformsVal &&
			useMediaQuery &&
			window.matchMedia('(min-width: ' + minWidth + 'px)').matches) {
			t.css(fx, newHeight);
		} else {
			t.css(fx, '');
		}
		if (useJitImage) {
			$('img[data-src-format]', t).jitImage();
		}
	};
	
	var onResize = function (e) {
		var p = getPage();
		if ((App.device.mobile && Math.abs(mobileHeight - win.height()) > 120) ||
			!App.device.mobile) {
			p.filter('.js-auto-screen-height')
				.add($('.js-auto-screen-height', p))
				.each(resizeItem);
			mobileHeight = win.height();
		}
	};
	
	var onEnter = function () {
		mobileHeight = 0;
		onResize();
		if (App.device.mobile) {
			mobileHeight = win.height();
		}
		
		setTimeout(onResize, 100);
	};
	
	var init = function () {
		onResize();
		if (App.device.mobile) {
			mobileHeight = win.height();
		}
	};

	var getByProperty = function (property) {
		var getValue = function (item) {
			return item[property]();
		}
		return getValue;
	};

	var getByStyle = function (property) {
		var getValue = function (item) {
			return parseInt(item.css(property), 10);
		}
		return getValue;
	}

	var strategies = {
		outerHeight: getByProperty('outerHeight'),
		height: getByProperty('height'),
		paddingTop: getByStyle('padding-top')
	};

	var actions = function () {
		return {
			site: {
				resize: onResize
			},
			page: {
				enter: onEnter
			},
			autoScreenHeight: {
				update: onResize
			},
			articleChanger: {
				entering: onResize
			}
		};
	};

	App.modules.exports('auto-screen-height', {
		init: init,
		actions: actions
	});
	
})(jQuery);
