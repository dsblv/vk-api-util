# vk-api-util [![Build Status](https://travis-ci.org/dsblv/vk-api-util.svg?branch=master)](https://travis-ci.org/dsblv/vk-api-util)

> Utility methods for working with [VK API](http://vk.com/dev/main)


## Install

```
$ npm install --save vk-api-util
```


## Usage

```js
var vkUtil = require('vk-api-util');

vkUtil.bitMask(['friends', 'photos']);
//=> 6
```


## API

### vkUtil.isMethod(method) → `boolean`

Returns true if given metod is mentioned in VK API [docs](http://vk.com/dev/methods).

#### method

*Required*  
Type: `string`


### vkUtil.isOpenMethod(method) → `boolean`

Returns true if given method doesn't require authentication.

#### method

*Required*  
Type: `string`


### vkUtil.bitMask(scope) → `number`

Returns [bit mask](http://vk.com/dev/permissions) for given scope.

#### scope

*Required*  
Type: `string`, `array` or `number`

Pass a string of [scopes](http://vk.com/dev/permissions) divided by comma (`,`) or array of scopes. If number is passed it assumed to be a bit mask itself and returned without changes.


### vkUtil.checkScope(area, scope) → `boolean`

Returns true if given area is visible within given scope.

#### area

*Required*  
Type: `string`, `array` or `number`

#### scope

*Required*  
Type: `string`, `array` or `number`

`area` and `scope` arguments are same as `scope` in aforementioned `vkUtil.bitMask()` method.

## Related

- [vk-api-all-methods](https://github.com/dsblv/vk-api-all-methods) — List of all VK API methods
- [vk-api-open-methods](https://github.com/dsblv/vk-api-open-methods) — List of VK API methods that don't require authentication
- [vk-api-scopes](https://github.com/dsblv/vk-api-scopes) — Hash of VK API access permission codes

## License

MIT © [Dmitriy Sobolev](http://vk.com/sobo13v)
