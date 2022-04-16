export default {
    name: "WInput",
    model: {
        prop: "value",
        event: "change"
    },
    props: {
        value: {
            type: [String, Number],
            required: false,
            default: ""
        },
        placeholder: {
            type: String,
            required: false,
            default: ""
        },
        type: {
            type: String,
            required: false,
            default: "text"
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        change(e) {
            this.$emit("change", e.target.value);
        }
    },
    render: function (h) {
        const slots = {
            prepend: h("div", {
                class: {
                    "woo-input-prepend": true,
                    "woo-input-disabled": this.disabled
                },
                attrs: {
                    disabled: this.disabled
                },
                on: {
                    click: (e) => {
                        if (this.disabled) {
                            return;
                        }
                        e.stopPropagation();
                        this.$emit("prependClick", this.value);
                    }
                }
            }, this.$slots.prepend),
            input: h(
                "input",
                {
                    class: {
                        "woo-input": true,
                        "woo-input-disabled": this.disabled
                    },
                    attrs: {
                        value:this.value,
                        placeholder: this.placeholder,
                        type: this.type,
                        disabled: this.disabled
                    },
                    on: {
                        input: this.change,
                        keyup: (e) => {
                            if (e.key === "Enter" || e.keyCode === 13) {
                                this.$emit("search", e.target.value);
                            }
                        }
                    }
                }
            ),
            append: h("div", {
                class: {
                    "woo-input-append": true,
                    "woo-input-disabled": this.disabled
                },
                on: {
                    click: (e) => {
                        if (this.disabled) {
                            return;
                        }
                        e.stopPropagation();
                        this.$emit("prependClick", this.value);
                    }
                }
            }, this.$slots.append),
        };
        // h() arg1 tagName  arg2 option  arg slot ||  children

        return h(
            "div",
            {
                class: {
                    "woo-input-group": true
                },
            },
            Object.keys(slots).map(item => {
                if (this.$slots[item] || item === "input") {
                    return slots[item];
                }
            })
        );
    }
};