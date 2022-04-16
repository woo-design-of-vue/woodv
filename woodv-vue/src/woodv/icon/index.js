"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("material-design-icons-iconfont");

var _default = {
  name: "WIcon",
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
  render: function render(createElement) {
    const h = createElement;
    return h("span", {
      class: {
        "material-icons": true,
      },
      style: {
        fontSize: this.size + "px",
        color: this.color
      }
    }, this.$slots.default);
  }
};
exports.default = _default;