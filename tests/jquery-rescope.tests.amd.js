/*globals module,test,window*/
(function () {
	'use strict';
	var $, rescope;

	module('jquery-rescope AMD support', {
		setup: function () {
			$ = function () {
				return $;
			};
			$.fn = $.prototype;
		}
	});

	test('module creation returns/exports a value', function () {
		rescope = window.createModule('jquery-rescope', $);
		
		notEqual(typeof rescope, 'undefined', 'returned module object is defined');
	});

	test('module depends on jquery', function () {
		var foundJQuery = false,
			dependencies = window.getModule().dependencies;
			
		for(var i in dependencies) {
			foundJQuery |= dependencies[i] === 'jquery';
		}
		
		ok(foundJQuery, 'jquery among rescope dependencies');
	});
})();