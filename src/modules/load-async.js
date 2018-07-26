/**
 * @author Deux Huit Huit
 *
 */
(function ($, undefined) {

	'use strict';

	var win = $(window);
	var site = $('#site');
	
	var isLoading = false;
	
	var CLASS_LOADING = 'is-loading';
	var CLASS_LOADED = 'is-loaded';

	var load = function (key, data) {
		if (!!$(data.item).length && !!data.url && !data.item.hasClass(CLASS_IS_LOADING)) {
			data.item.addClass(CLASS_IS_LOADING);
			
			Loader.load({
				url: url,
				success: function () {
					data.item.removeClass(CLASS_IS_LOADING)
						.addClass(CLASS_LOADED);
					App.callback(data.successCallback);
				},
				error: function () {
					data.item.removeClass(CLASS_IS_LOADING);
					App.console.log('Error loading async');
				},
				giveup: function (e) {
					data.item.removeClass(CLASS_IS_LOADING);
					App.console.log('Gave up loading async');
				}
			});
		}
	};

	var actions = function () {
		return {
			loadAsync: {
				load: load
			}
		};
	};

	App.modules.exports('load-async', {
		init: init,
		actions: actions
	});

})(jQuery);
