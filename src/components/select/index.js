import "material-design-icons-iconfont";
import WDrop from "../drop";
export default {
    name: "WSelect",
    data(){
        return{
            visible:false,
            offsetX:0,
            offsetY:0,
            offsetWidth:0,
            isExceedX:false,
            isExceedY:false
        };
    },
    model: {
        prop: "value",
        event: "change"
    },
    props: {
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
        appendParent:{
            type:Function,
            required:false,
            // eslint-disable-next-line no-undef
            default:()=>{
                return document.body;
            }
        },
    },
    methods: {
        change(e) {
            this.$emit("change", e.target.value);
        }
    },
    mounted(){

    },
    render: function (h) {
        return h(
            "div",
            {
                class: {
                    "woo-select": true
                },
                on:{
                    click:(e)=>{
                        console.log(e);
                        this.offsetX = e.target.offsetLeft;
                        this.isExceedY =this.appendParent().offsetHeight <= e.target.offsetTop + e.target.offsetHeight;
                        this.offsetWidth = e.target.offsetWidth;
                        if(this.isExceedY){
                            this.offsetY = e.target.offsetTop;
                        }else{
                            this.offsetY = e.target.offsetTop + e.target.offsetHeight;
                        }
                        this.visible = !this.visible;
                    }
                }
            },
            [
                h(
                    "div",
                    {
                        class: {
                            "woo-select-group": true
                        },
                    },
                    [
                        h(
                            "div",
                            {
                                class: {
                                    "woo-select-value": true
                                },
                            },
                            ["value"]
                        ),
                        h(
                            "span",
                            {
                                class:{
                                    "material-icons":true
                                },
                                style:{
                                    fontSize:"24px",
                                }
                            },
                            [
                                "expand_more"
                            ]
                        )
                    ]
                ),
                h(
                    WDrop,
                    {
                        attrs:{
                            visible:this.visible,
                            offsetX:this.offsetX,
                            offsetY:this.offsetY,
                            offsetWidth:this.offsetWidth,
                            isExceedY:this.isExceedY
                        }
                    }
                )
            ]
        );
    }
};
