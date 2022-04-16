import "material-design-icons-iconfont";

export default {
    name: "WRate",
    model: {
        prop: "value",
        event: "change"
    },
    props: {
        allowHalf:{
            type: Boolean,
            required: false,
            default: false
        },
        value: {
            type: [String, Number],
            required: false,
            default: 0
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        size:{
            type: [String, Number],
            required: false,
            default: 0
        },
        count: {
            type: Number,
            required: false,
            default: 5
        },
        icon:{
            type: String,
            required: false,
            default: "star"
        },
        text:{
            type: String,
            required: false,
            default: null
        },
        color:{
            type: String,
            required: false,
            default: ""
        }
    },
    methods: {
        change(e) {
            this.$emit("change", e.target.value);
        }
    },
    render: function (h) {
        const slot = Array.from(Array(this.count).keys()).map(item => {
            return h(
                "div",
                {
                    class: "woo-rate-item"
                },
                [
                    h(
                        "div",
                        {
                            class: "woo-rate-before",
                            on:{
                                mouseenter:(e)=>{
                                    const parentNode = e.target.parentNode;

                                    parentNode.style.transform = "scale(1.1)";
                                    if(this.allowHalf){
                                        this.$emit("change", item+0.5);
                                    }else{
                                        this.$emit("change", item+1);
                                    }
                                },
                                mouseleave:(e)=>{
                                    const parentNode = e.target.parentNode;

                                    parentNode.style.transform = "scale(1)";
                                }
                            }
                        },
                        [
                            h(
                                "span",
                                {
                                    class: {
                                        "material-icons": this.text?false:true,
                                        "woo-rate-text": true,
                                        "woo-not-select": true
                                    },
                                    style: {
                                        fontSize: this.size + "px",
                                        color:(item + 0.5) <= this.value?this.color:"#f0f0f0"
                                    }
                                },
                                [
                                    this.text?this.text:this.icon
                                ]
                            )
                        ]
                    ),
                    h(
                        "div",
                        {
                            class: "woo-rate-after",
                            on:{
                                mouseenter:(e)=>{
                                    const parentNode = e.target.parentNode;

                                    parentNode.style.transform = "scale(1.1)";
                                    this.$emit("change", item+1);
                                },
                                mouseleave:(e)=>{
                                    const parentNode = e.target.parentNode;

                                    parentNode.style.transform = "scale(1)";
                                }
                            }
                        },
                        [
                            h(
                                "span",
                                {
                                    class: {
                                        "material-icons": this.text?false:true,
                                        "woo-rate-text": true,
                                        "woo-not-select": true
                                    },
                                    style: {
                                        fontSize: this.size + "px",
                                        color:(item + 1) <= this.value?this.color:"#f0f0f0"
                                    }
                                },
                                [
                                    this.text?this.text:this.icon
                                ]
                            )
                        ]
                    )
                ]
            );
        });

        return h(
            "div",
            {
                class: {
                    "woo-rate": true
                },
            },
            slot
        );
    }
};