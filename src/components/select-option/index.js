export default {
    name:"WSelectOption",
    props:{
        value:{
            type:[String, Number],
            required:true,
            default:""
        },
    },
    inject:{
        provideValue:{
            type:Object,
            default:{
                value:""
            }
        }
    },
    render:function (h) {
        return h(
            "div",
            {

                class: {
                    "woo-select-option-item":true,
                    "woo-select-option-item-active":this.value === this.provideValue.value,
                },
                attrs:{
                    id:this.value === this.provideValue.value?"woo-select-drop-active":""
                },
                on:{
                    click:()=>{
                        this.$emit("selectSelected", this.value);
                    }
                },
                slot: "WSelect",
            },
            this.$slots.default
        );
    }
};
