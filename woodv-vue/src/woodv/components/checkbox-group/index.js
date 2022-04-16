"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("material-design-icons-iconfont");

var _default2 = {
  name: "WCheckboxGroup",
  model: {
    props: "value",
    event: "change"
  },

  data() {
    return {
      model: {
        value: []
      }
    };
  },

  provide: function provide() {
    return {
      provideDisabled: this.disabled,
      provideValue: this.model,
      provideIsItem: true,
      provideColor: this.color
    };
  },
  props: {
    value: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    },
    option: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    },
    color: {
      type: String,
      required: false,
      default: ""
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    value(value) {
      this.model.value = value;
      this.$emit("change", this.model.value);
    }

  },
  created: function created() {
    this.model.value = this.value;
  },
  render: function render(h) {
    return h("div", {
      class: {
        "woo-checkbox-group": true
      }
    }, this.$slots.default);
  }
};
exports.default = _default2;