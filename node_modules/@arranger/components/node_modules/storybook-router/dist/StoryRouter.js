'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _global = require('global');

var _react = require('./react');

var _react2 = _interopRequireDefault(_react);

var _vue = require('./vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StoryRouter = _global.window.STORYBOOK_ENV === 'vue' ? _vue2.default : _react2.default;

exports.default = StoryRouter;