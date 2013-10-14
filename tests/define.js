// TODO: Rename file jquery-rescope.tests.amd-setup.js
(function (global) {
	'use strict';
	global.modules = [];
	
	global.define = function () {
		// The last two arguments are dependencies and the factory method
		var args = [].slice.call(arguments, -2);
		
		args[1].dependencies = args[0];
		global.modules.push(args[1]);
	};
	global.createModule = function () {	
		return global.getModule().apply(this, [].slice.call(arguments, 1));
	};
	global.getModule = function () {
		return global.modules.slice(-1)[0];
	};
})(this);