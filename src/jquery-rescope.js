(function (global) {
	function rescopeModule($) {
		'use strict';
		// Plug-in definition
		var rescope = function (options) {
			var body,
				optns = $.extend($.fn.rescope.defaults, options),
				iframe = $('<iframe />').css(optns.css).appendTo('body');
 
			// For IE (head missing immediately on iframe add)
			if (iframe.contents().find('head').length === 0) {
				iframe.contents()[0].write('<head>');
			}
			 
			// For IE (body missing immediately on iframe add)
			if (iframe.contents().find('body').length === 0) {
				iframe.contents()[0].write('<body>');
			}
			 
			body = iframe.contents().find('body').eq(0);

			body.append(this);

			return $.extend(
				function (selector) {
					return body.parent().find(selector);
				},
				iframe);
		};
		
		// Attach plug-in to jQuery
		$.fn.rescope = rescope;
		
		$.fn.rescope.defaults = {
			css: {
				display: 'none',
				height: '100%',
				width: '100%'
			}
		};
		
		// Return the plug-in object like a good AMD module
		return rescope;
	}
	
	if('undefined' !== typeof global.define) {
		define(['jquery'], rescopeModule);
	} else {
		rescopeModule(global.jQuery);
	}	
})(this);