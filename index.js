var methods = require('vk-api-all-methods');
var openMethods = require('vk-api-open-methods');
var scopedMethods = require('vk-api-scoped-methods');
var scopes = require('vk-api-scopes');

exports.isMethod = function (method) {
	if (typeof method !== 'string') {
		return false;
	}
	return (method.split('.')[0] === 'execute') || (methods.indexOf(method) !== -1);
};

exports.isOpenMethod = function (method) {
	if (typeof method !== 'string') {
		return false;
	}
	return (openMethods.indexOf(method) !== -1);
};

exports.bitMask = function (scope) {
	if (typeof scope === 'number') {
		return scope;
	}

	if (typeof scope === 'undefined') {
		return 0;
	}

	var mask = 0;

	if (typeof scope === 'string') {
		scope = scope.split(',');
	}

	scope.forEach(function (area) {
		if (scopes.hasOwnProperty(area)) {
			mask += scopes[area];
		}
	});

	return mask;
};

exports.checkScope = function (areas, scope) {
	areas = exports.bitMask(areas);
	scope = exports.bitMask(scope);

	return areas === (scope & areas);
};

exports.isMethodInScope = function (method, scope) {
	scope = scope || 0;

	if (!exports.isMethod(method)) {
		return false;
	}

	if (!scopedMethods.hasOwnProperty(method)) {
		return true;
	}

	return exports.checkScope(scopedMethods[method], scope);
};
