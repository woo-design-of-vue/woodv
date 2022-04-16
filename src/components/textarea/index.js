export default {
    name:"WTextarea",
    model:{
        prop: "value",
        event: "change"
    },
    props:{
        value:{
            type:[String, Number],
            required:false,
            default:""
        },
        placeholder:{
            type:String,
            required:false,
            default:""
        },
        type:{
            type:String,
            required:false,
            default:"text"
        },
        disabled:{
            type:Boolean,
            required:false,
            default:false
        },
        rows:{
            type:[String, Number],
            required:false,
            default:"2"
        }
    },
    methods:{
        change(e){
            this.$emit("change", e.target.value);
        }
    },
    render:function (h) {
        return h(
            "div",
            {
                class:{
                    "woo-textarea-group":true
                },
                on:{
                    input:(e)=>{
                        this.$emit("change", e.target.value);
                    }
                }
            },
            [
                h(
                    "textarea",
                    {
                        class: {
                            "woo-textarea":true
                        },
                        attrs:{
                            rows:this.rows
                        }
                    },
                    [
                        this.value
                    ]
                )
            ]
        );
    }
};