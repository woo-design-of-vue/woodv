"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("material-design-icons-iconfont");

var _default = {
  name: "WIcon",
  functional: true,
  props: {
    size: {
      type: [Number, String],
      required: false,
      default: 24
    },
    color: {
      type: String,
      required: false,
      default: "#000000"
    }
  },
  render: function render(h, context) {
    return h("span", {
      class: {
        "material-icons": true,
        "woo-not-select": true
      },
      style: {
        fontSize: context.props.size + "px",
        color: context.props.color
      },
      on: context.listeners
    }, context.children);
  }
};
exports.default = _default;