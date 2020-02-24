'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.init = init;
exports.setOptions = setOptions;

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _shared = require('../shared');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// init function will be executed once when the storybook loads for the
// first time. This is a good place to add global listeners on channel.
function init() {
  // NOTE nothing to do here
}

function regExpStringify(exp) {
  if (typeof exp === 'string') return exp;
  if (Object.prototype.toString.call(exp) === '[object RegExp]') return exp.source;
  return null;
}

function hasOwnProp(object, propName) {
  return Object.prototype.hasOwnProperty.call(object, propName);
}

function withRegexProp(object, propName) {
  return hasOwnProp(object, propName) ? (0, _defineProperty3.default)({}, propName, regExpStringify(object[propName])) : {};
}

// setOptions function will send Storybook UI options when the channel is
// ready. If called before, options will be cached until it can be sent.
function setOptions(newOptions) {
  var channel = _addons2.default.getChannel();
  if (!channel) {
    throw new Error('Failed to find addon channel. This may be due to https://github.com/storybooks/storybook/issues/1192.');
  }

  // since 'undefined' and 'null' are the valid values we don't want to
  // override the hierarchySeparator or hierarchyRootSeparator if the prop is missing
  var options = (0, _extends3.default)({}, newOptions, withRegexProp(newOptions, 'hierarchySeparator'), withRegexProp(newOptions, 'hierarchyRootSeparator'));

  channel.emit(_shared.EVENT_ID, { options: options });
}