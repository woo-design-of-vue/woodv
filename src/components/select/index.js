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
            isExceedY:false,
            model:{
                value:""
            },
            label:"",
            localOptions:[]
        };
    },
    provide(){
      return{
          provideValue:this.model
      }
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
        options:{
            type:Array,
            required:false,
            default:()=>[]
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        placeholder: {
            type: String,
            required: false,
            default: ""
        },
        appendParent:{
            type:Function,
            required:false,
            default:()=>{
                // eslint-disable-next-line no-undef
                return document.body;
            }
        },
    },
    watch:{
        "value"(){
            this.model.value = this.value;
        },
        options(){
            this.init();
        }
    },
    created(){
        this.model.value = this.value;
    },

    render: function (h) {
        this.$slots.default.map(item=>{
            if(item.componentOptions.propsData.value === this.value){
                this.label = item.componentOptions?.children[0]?.text || ""
            }
            item.componentOptions.listeners = {
                selectSelected:(e)=>{
                    this.$emit("change",e);
                    this.visible = false;
                }
            };
        });
        return h(
            "div",
            {
                class: {
                    "woo-select": true
                },
                on:{
                    click:()=>{
                        const el = this.$el;

                        this.offsetX = el.offsetLeft;
                        this.isExceedY =this.appendParent().offsetHeight <= el.offsetTop + el.offsetHeight;
                        this.offsetWidth = el.offsetWidth;
                        if(this.isExceedY){
                            this.offsetY = el.offsetTop;
                        }else{
                            this.offsetY = el.offsetTop + el.offsetHeight;
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
                        }
                    },
                    [
                        h(
                            "div",
                            {
                                class: {
                                    "woo-select-label": true,
                                    "woo-select-placeholder":!!!this.label
                                },
                            },
                            [this.label || this.placeholder]
                        ),
                        h(
                            "span",
                            {
                                class:{
                                    "material-icons":true,
                                    "woo-select-icon-open":this.visible
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
                    },
                    [
                        h(
                            "div",
                            {
                                class:{
                                    "woo-select-option-group":true
                                }
                            },
                            this.$slots.default.map(item=>{
                                item.componentOptions.listeners = {
                                    selectSelected:(e)=>{
                                        this.$emit("change",e);
                                        this.visible = false;
                                    }
                                };
                                return item
                            })
                        )
                    ]
                )
            ]
        );
    }
};
