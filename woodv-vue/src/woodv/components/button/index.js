"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: "WBtn",
  functional: true,
  props: {
    color: {
      type: String,
      required: false,
      default: ""
    },
    type: {
      type: String,
      required: false,
      default: ""
    },
    size: {
      type: String,
      required: false,
      default: ""
    },
    round: {
      type: Boolean,
      required: false,
      default: false
    },
    block: {
      type: Boolean,
      required: false,
      default: false
    },
    icon: {
      type: Boolean,
      required: false,
      default: false
    },
    link: {
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
  render: function render(h, context) {
    return h("button", {
      class: {
        "woo-btn": true,
        "woo-btn-primary": context.props.type === "primary",
        "woo-btn-warn": context.props.type === "warn",
        "woo-btn-danger": context.props.type === "danger",
        "woo-btn-lg": context.props.size === "large",
        "woo-btn-sm": context.props.size === "small",
        "woo-btn-xs": context.props.size === "mini",
        "woo-btn-round": context.props.round,
        "woo-btn-block": context.props.block,
        "woo-btn-icon": context.props.icon,
        "woo-btn-link": context.props.link,
        "woo-btn-disabled": context.props.disabled
      },
      style: {
        backgroundColor: context.props.color
      },
      attrs: {
        disabled: context.props.disabled
      },
      on: context.listeners
    }, context.children);
  }
};
exports.default = _default;