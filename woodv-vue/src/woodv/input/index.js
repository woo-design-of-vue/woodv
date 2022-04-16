"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./input.less");

var _default = {
  name: "WInput",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: [String, Number],
      required: true,
      default: ""
    }
  },
  methods: {
    change(e) {
      this.$emit("change", e.target.value);
    }

  },
  render: function render(createElement) {
    const h = createElement;
    const slots = {
      prepend: h("div", {
        class: {
          "woo-input-prepend": true
        },
        on: {}
      }, this.$slots.prepend),
      input: h("input", {
        class: {
          "woo-input": true
        },
        on: {
          input: this.change
        }
      }),
      append: h("div", {
        class: {
          "woo-input-append": true
        },
        on: {}
      }, this.$slots.append)
    };
    return h("div", {
      class: {
        "woo-input-group": true
      }
    }, Object.keys(slots).map(item => {
      if (this.$slots[item] || item === "input") {
        return slots[item];
      }
    }));
  }
};
exports.default = _default;