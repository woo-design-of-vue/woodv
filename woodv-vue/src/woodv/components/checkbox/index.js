"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.string.includes.js");

var _default2 = {
  name: "WCheckbox",
  model: {
    prop: "model",
    event: "change"
  },
  inject: {
    provideDisabled: {
      default: false
    },
    provideValue: {
      value: [],
      default: () => {
        return {
          value: []
        };
      }
    },
    provideIsItem: {
      default: false
    },
    provideColor: {
      default: false
    }
  },
  props: {
    value: {
      type: [String, Number],
      required: false,
      default: ""
    },
    model: {
      type: Boolean,
      required: false,
      default: false
    },
    color: {
      type: String,
      required: false,
      default: ""
    },
    size: {
      type: String,
      required: false,
      default: ""
    },
    icon: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  render: function render(h) {
    return h("div", {
      class: {
        "woo-checkbox": true,
        "woo-checkbox-box-checked": this.model || this.provideValue.value.includes(this.value),
        "woo-checkbox-box-disabled": this.disabled || this.provideDisabled
      }
    }, [h("div", {
      class: {
        "woo-checkbox-box": true
      }
    }, [h("div", {
      class: {
        "woo-checkbox-box-color": true
      },
      style: {
        backgroundColor: this.color || this.provideColor
      }
    }, [h("span", {
      class: {
        "material-icons": true,
        "woo-not-select": true,
        "woo-not-select-check": true
      },
      style: {
        fontSize: this.size + "px"
      }
    }, ["check"]), h("input", {
      class: {
        "woo-checkbox-input": true
      },
      attrs: {
        type: "checkbox",
        value: this.value,
        disabled: this.disabled || this.provideDisabled,
        checked: this.provideValue.value.includes(this.value)
      },
      style: {
        position: "absolute",
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "0px",
        height: "16px",
        width: "16px",
        opacity: 0,
        margin: 0
      },
      on: {
        change: e => {
          if (this.provideIsItem) {
            const valueIndex = this.provideValue.value.indexOf(this.value);

            if (valueIndex > -1) {
              this.provideValue.value.splice(valueIndex, 1);
            } else {
              this.provideValue.value.push(this.value);
            }
          } else {
            this.$emit("change", e.target.checked);
          }
        }
      }
    }, ["check"])])]), h("div", {
      class: {
        "woo-check-box-label": true
      },
      on: {
        click: () => {
          if (this.disabled || this.provideDisabled) {
            return;
          }

          if (this.provideIsItem) {
            const valueIndex = this.provideValue.value.indexOf(this.value);

            if (valueIndex > -1) {
              this.provideValue.value.splice(valueIndex, 1);
            } else {
              this.provideValue.value.push(this.value);
            }
          } else {
            this.$emit("change", !this.model);
          }
        }
      }
    }, this.$slots.default)]);
  }
};
exports.default = _default2;