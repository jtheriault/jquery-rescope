// These tests written using the references at:
// http://learn.jquery.com/plugins/basic-plugin-creation/
// http://learn.jquery.com/plugins/advanced-plugin-concepts/
/*globals module,test*/
(function () {
	'use strict';
	var $, plugin;
	
	module('jquery-rescope jQuery plugin requirements', {
		setup: function () {
			// Define jQuery class mock
			$ = function () {
				return $;
			};
			
			$.fn = $.prototype = {
				constructor: $
			};
		}
	});

	// Basic Plug-in Authoring
	test('attached to prototype', function () {
		plugin = window.createModule('jquery-rescope', $);
		
		notEqual(typeof $.fn.rescope, 'undefined', 'plugin is defined on the jQuery prototype');
		equal($.fn.rescope, plugin, 'plugin on the jQuery prototype same as object returned by module');
	});

	// Chaining
	test('returns a jQuery object', function () {
		plugin = window.createModule('jquery-rescope', $);

		equal(plugin.constructor.name, $.constructor.name, 'invoking plugin returns an object of the same type as the jQuery mock');	
	});

	// TODO: Test 'Protecting the $ Alias and Adding Scope' using a custom define function as an IIFE 

	// Minimizing Plug-in Footprint
	test('plugin only attaches a single property to fn', function () {
		var prePropertyCounter = 0,
			postPropertyCounter = 0;
		
		prePropertyCounter = Object.keys($.fn).length;
		
		plugin = window.createModule('jquery-rescope', $);
		
		postPropertyCounter = Object.keys($.fn).length;
		
		equal(postPropertyCounter, prePropertyCounter + 1, '$.fn grew by 1 after module registration');
	});

	// Provide Public Access to Default Plug-in Settings
	test('plugin provides default options as property', function () {
		plugin = window.createModule('jquery-rescope', $);
		
		notEqual(typeof $.fn.rescope.defaults, 'undefined', 'defaults are defined on the jQuery prototype');		
	});
})();