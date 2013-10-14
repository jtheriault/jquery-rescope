/*globals module*/
(function($) {'use strict';
	module('jquery-rescope functional requirements', {
		setup: function() {
			$.fn.rescope = undefined;
		},
		teardown: function() {
			$.fn.rescope = undefined;
		}
	});

	test('rescope contains rescoped elements', function() {
		var html = '<div><span>&nsbp;</span><div><span>&nsbp;</span></div></div><div><span>&nsbp;</span></div>', 
			result;

		window.createModule('jquery-rescope', $);

		result = $(html).rescope();

		equal(result('div').length, 3, 'The expected number of divs was found');
		equal(result('span').length, 3, 'The expected number of spans was found');
		equal(result('body').children().length, 2, 'The expected number of children of the body was found');
		equal(result('body > div').length, 2, 'The expected number of child divs was found');
	});

	test('scope persists across multiple calls until remove', function() {
		var html = '<span id="selectme">&nbsp;</span>', 
			first, 
			second;

		window.createModule('jquery-rescope', $);

		first = $(html).rescope();
		second = $(html).rescope();

		notEqual( typeof first('#selectme')[0], 'undefined', 'element found');
		notEqual(first('#selectme')[0], second('#selectme')[0], 'different elements found for same HTML in different scopes');
	});

	test('recoped document is different', function() {
		var html = '<div>&nbsp;</div>';

		window.createModule('jquery-rescope', $);

		notEqual($(html).rescope()('*')[0].ownerDocument, document, 'document in scope is different from host document');
	});

	test('remove acts accordingly on the iframe', function() {
		var html = '<div>&nbsp;</div>', 
			element, 
			iframe;

		window.createModule('jquery-rescope', $);

		element = $(html).rescope();
		iframe = $('body > iframe:last')[0];

		element.remove();

		notEqual($('body > iframe:last')[0], iframe, 'iframe missing from DOM after calling remove on returned element');
	});

	test('default options', function() {
		window.createModule('jquery-rescope', $);

		// visibility
		equal($.fn.rescope.defaults.css.display, 'none', 'default display option is none');

		// frame size
		equal($.fn.rescope.defaults.css.height, '100%', 'default height option is 100%');
		equal($.fn.rescope.defaults.css.width, '100%', 'default width option is 100%');
	});

	test('applying default options', function() {
		var foundCss, o;

		o = $.fn.css;
		$.fn.css = function(css) {
			foundCss = css;
			return this;
		};

		window.createModule('jquery-rescope', $);

		$('<div />').rescope();

		$.fn.css = o;
		deepEqual(foundCss, $.fn.rescope.defaults.css, 'CSS defaults applied when no options are provided');
	});

	test('applying option overrides', function() {
		var html = '<div>&nbsp;</div>', element;

		window.createModule('jquery-rescope', $);

		element = $(html).rescope({
			css: {
				display: 'block',
				height: '42px',
				width: '42px'
			}
		});

		equal(element.css('display'), 'block', 'CSS display option set');
		equal(element.css('height'), '42px', 'CSS height option set');
		equal(element.css('width'), '42px', 'CSS width option set');
	});
})(jQuery);
