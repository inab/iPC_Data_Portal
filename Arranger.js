"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _columnsToGraphql = _interopRequireDefault(require("@arranger/mapping-utils/dist/utils/columnsToGraphql"));

var _api = _interopRequireDefault(require("../utils/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Arranger =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Arranger, _React$Component);

  function Arranger(props) {
    var _this;

    _classCallCheck(this, Arranger);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Arranger).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "fetchData", function (projectId) {
      return function (options) {
        console.log("triggered")

        var _this$props$api = _this.props.api,
            api = _this$props$api === void 0 ? _api.default : _this$props$api;

        // A. Link between Arranger and Search component: Fetch data including all columns.
        
        // A.1. First make a deep clone of options object.

        let showAll = _lodash.cloneDeep(options)
        var i = 0
        for (i = 0; i < showAll.config.columns.length; i++) { 
          showAll.config.columns[i]["show"] = true
        }

        // A.2. Fetch Arranger API.
        api({
          endpoint: "/".concat(projectId, "/graphql"),
          body: (0, _columnsToGraphql.default)(showAll)
          
        }).then(function (r) {
          console.log("r")
          var hits = (0, _lodash.get)(r, "data.".concat(showAll.config.type, ".hits")) || {};
          var data = (0, _lodash.get)(hits, 'edges', []).map(function (e) {
            return e.node;
          });
          var total = hits.total || 0;
          // Binding between Arranger component and portal Search page.
          _this.props.arrangerHandler(data);

        });

        // B. Fetch Arranger API using options for showing only selected columns.
        return api({
          endpoint: "/".concat(projectId, "/graphql"),
          body: (0, _columnsToGraphql.default)(options)
          
        }).then(function (r) {
          var hits = (0, _lodash.get)(r, "data.".concat(options.config.type, ".hits")) || {};
          var data = (0, _lodash.get)(hits, 'edges', []).map(function (e) {
            return e.node;
          });
          var total = hits.total || 0;

          return {
            total: total,
            data: data
          };
        });
      };
    });

    _this.state = {
      selectedTableRows: [],
      sqon: null
    };
    return _this;
  }

  _createClass(Arranger, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var hasChildren = this.props.children && _react.default.Children.count(this.props.children) !== 0;

      if (this.props.component && this.props.render) {
        console.warn('You should not use <Arranger component> and <Arranger render> in the same arranger; <Arranger render> will be ignored');
      }

      if (this.props.component && hasChildren) {
        console.warn('You should not use <Arranger component> and <Arranger children> in the same arranger; <Arranger children> will be ignored');
      }

      if (this.props.render && hasChildren) {
        console.warn('You should not use <Arranger render> and <Arranger children> in the same arranger; <Arranger children> will be ignored');
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          index = _this$props.index,
          graphqlField = _this$props.graphqlField,
          projectId = _this$props.projectId,
          children = _this$props.children,
          render = _this$props.render,
          component = _this$props.component,
          _this$props$api2 = _this$props.api,
          api = _this$props$api2 === void 0 ? _api.default : _this$props$api2;
      var _this$state = this.state,
          sqon = _this$state.sqon,
          selectedTableRows = _this$state.selectedTableRows;
      var childProps = {
        api: api,
        sqon: sqon,
        selectedTableRows: selectedTableRows,
        projectId: projectId,
        index: index,
        graphqlField: graphqlField,
        fetchData: this.fetchData,
        setSQON: function setSQON(sqon) {
          return _this2.setState({
            sqon: sqon
          });
        },
        setSelectedTableRows: function setSelectedTableRows(selectedTableRows) {
          return _this2.setState({
            selectedTableRows: selectedTableRows
          });
        }
      };

      if (component) {
        return _react.default.createElement(component, childProps);
      } else if (render) {
        return render(childProps);
      } else if (children) {
        return typeof children === 'function' ? children(childProps) : children;
      } else {
        return null;
      }
    }
  }]);

  return Arranger;
}(_react.default.Component);

var _default = Arranger;
exports.default = _default;