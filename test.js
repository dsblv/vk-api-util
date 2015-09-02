'use strict';
var assert = require('assert');
var vkApiUtil = require('./');

describe('#isMethod()', function () {
	it('should return TRUE for existing method', function () {
		assert(vkApiUtil.isMethod('users.get'));
	});
	it('should return FALSE for non-existing method', function () {
		assert(!vkApiUtil.isMethod('users.sayHi'));
	});
	it('should return TRUE for any execute.* method', function () {
		assert(vkApiUtil.isMethod('execute.sayHi'));
	});
});

describe('#isOpenMethod()', function () {
	it('should return TRUE for existing open method', function () {
		assert(vkApiUtil.isOpenMethod('users.get'));
	});
	it('should return FALSE for non-existing method', function () {
		assert(!vkApiUtil.isOpenMethod('users.sayHi'));
	});
	it('should return FALSE for existing secure method', function () {
		assert(!vkApiUtil.isOpenMethod('wall.post'));
	});
});

describe('#bitMask()', function () {
	it('should return number', function () {
		assert.equal(typeof vkApiUtil.bitMask('friends'), 'number');
	});
	it('should return correct bit mask', function () {
		assert.equal(vkApiUtil.bitMask(['photos', 'audio']), 12);
		assert.equal(vkApiUtil.bitMask(['photos', 'audio', 'notes']), 2060);
	});
	it('should ignore non-existing scopes', function () {
		assert.equal(vkApiUtil.bitMask(['hello']), 0);
		assert.equal(vkApiUtil.bitMask(['photos', 'audio', 'hello']), 12);
	});
	it('should accept strings', function () {
		assert.equal(vkApiUtil.bitMask('photos,audio'), 12);
	});
	it('should accept numbers', function () {
		assert.equal(vkApiUtil.bitMask(12), 12);
	});
});

describe('#checkScope()', function () {
	it('should return TRUE if area is within scope', function () {
		assert(vkApiUtil.checkScope('friends', 2));
		assert(vkApiUtil.checkScope('friends', 10));
		assert(vkApiUtil.checkScope(['video', 'offers'], 50));
		assert(vkApiUtil.checkScope(['friends', 'video'], 4456466));
	});
	it('should return FALSE if area is out of scope', function () {
		assert(!vkApiUtil.checkScope('friends', 4));
		assert(!vkApiUtil.checkScope('friends', 139308));
		assert(!vkApiUtil.checkScope(['pages', 'links', 'notes'], 2));
		assert(!vkApiUtil.checkScope(8, 2));
	});
});

describe('#isMethodInScope()', function () {
	it('should return TRUE if method exists and in scope', function () {
		assert(vkApiUtil.isMethodInScope('wall.post', ['wall']));
		assert(vkApiUtil.isMethodInScope('newsfeed.getRecommended', 8198));
	});
	it('should return TRUE if method exists and doesn\'t require scope', function () {
		assert(vkApiUtil.isMethodInScope('users.get'));
		assert(vkApiUtil.isMethodInScope('users.get', ['wall']));
	});
	it('should return FALSE if method doesn\'t exist', function () {
		assert(!vkApiUtil.isMethodInScope('wall.destroy', ['wall']));
	});
	it('should return FALSE if method exists and out of scope', function () {
		assert(!vkApiUtil.isMethodInScope('wall.post', 2));
	});
});
