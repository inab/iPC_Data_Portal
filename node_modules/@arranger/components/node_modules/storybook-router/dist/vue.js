'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _addonActions = require('@storybook/addon-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

var storyRouterDecorator = function storyRouterDecorator() {
  var links = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var routerProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function (story) {
    var router = new _vueRouter2.default(routerProps);
    router.replace(routerProps.initialEntry ? routerProps.initialEntry : '/');

    var getLocation = function getLocation(location) {
      // The location can be a simple string if you are using directly one of the
      // Router methods (https://router.vuejs.org/en/api/router-instance.html#methods)
      // or it can be an object, having the name or the path depending if you
      // are using named routes or not.
      if ((typeof location === 'undefined' ? 'undefined' : _typeof(location)) === 'object') {
        return location.path ? location.path : 'name: ' + location.name;
      }
      return location;
    };

    var replaced = void 0;

    // We want to log every action performed on the navigation router with the only
    // exception of links replaced with the linkTo callback.
    // Unfortunately VueRouter does not perform any action if the target route is
    // the same of the current one (see the code at the url https://goo.gl/gGVxzq).
    // Replacing the original push / replace router methods workaround the issue
    // with the assumption that the afterEach global guard is called from those
    // methods.
    var originalPush = router.push.bind(router);

    router.push = function (location, success, abort) {
      replaced = false;
      originalPush(location, success, abort);

      if (!replaced) {
        (0, _addonActions.action)('PUSH')(getLocation(location));
      }
    };

    var originalReplace = router.replace.bind(router);

    router.replace = function (location, success, abort) {
      replaced = false;
      originalReplace(location, success, abort);

      if (!replaced) {
        (0, _addonActions.action)('REPLACE')(getLocation(location));
      }
    };

    if (routerProps.globalBeforeEach) {
      router.beforeEach(routerProps.globalBeforeEach);
    }

    router.afterEach(function (to) {
      for (var link in links) {
        if (to.fullPath === link) {
          links[link](to.fullPath);
          replaced = true;
          return;
        }
      }
    });

    var WrappedComponent = story();
    return _vue2.default.extend({
      router: router,
      components: { WrappedComponent: WrappedComponent },
      template: '<wrapped-component/>',
      beforeDestroy: function beforeDestroy() {
        // Remove the afterEach callback from the router list to not
        // accumulate callbacks called for every route action (in practice
        // this means that without this the action is executed as many
        // times as the VueRouter instance has been created)
        this.$options.router.afterHooks = [];
      }
    });
  };
};

exports.default = storyRouterDecorator;