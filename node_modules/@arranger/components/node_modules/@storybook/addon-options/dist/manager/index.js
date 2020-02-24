'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _shared = require('../shared');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// init function will be executed once when the storybook loads for the
// first time. This is a good place to add channel listeners and panels.
function init() {
  _addons2.default.register(_shared.ADDON_ID, function (api) {
    var channel = _addons2.default.getChannel();
    channel.on(_shared.EVENT_ID, function (data) {
      api.setOptions(data.options);
    });
  });
}