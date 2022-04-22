"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style/base.less");

var _input = _interopRequireDefault(require("./components/input"));

var _checkbox = _interopRequireDefault(require("./components/checkbox"));

var _icon = _interopRequireDefault(require("./components/icon"));

var _button = _interopRequireDefault(require("./components/button"));

var _checkboxGroup = _interopRequireDefault(require("./components/checkbox-group"));

var _rate = _interopRequireDefault(require("./components/rate"));

var _textarea = _interopRequireDefault(require("./components/textarea"));

var _table = _interopRequireDefault(require("./components/table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const components = [_input.default, _icon.default, _button.default, _checkbox.default, _checkboxGroup.default, _rate.default, _textarea.default, _table.default];

var _default = Vue => {
  components.map(item => {
    Vue.component(item.name, item);
  });
};

exports.default = _default;