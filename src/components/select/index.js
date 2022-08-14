import "material-design-icons-iconfont";
import WDrop from "../drop";
import SelectOption from "../select-option"
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
        }
    },
    mounted(){

    },
    created(){
        this.model.value = this.value;
        this.label = this.value;
    },
    methods:{
        closeVisible(){
            this.visible=false;
        }
    },
    render: function (h) {
        let slots = [];
        let isFilterLabel = false;
        if(this.options.length){
            slots = this.options.map(item=>{
                if(item.value === this.value && !isFilterLabel){
                    this.label = item.label;
                    isFilterLabel = true;
                }
                return h(
                    SelectOption,
                    {
                        attrs:{
                            value:item.value
                        },
                        on:{
                            selectSelected:(e)=>{
                                this.$emit("change",e);
                                this.visible = false;
                            }
                        }

                    },
                    [item.label]
                )
            })
        }else{
            this.$slots.default.map(item=>{
                if(item.componentOptions.propsData.value === this.value&& !isFilterLabel){
                    this.label = item.componentOptions?.children[0]?.text || "";
                    isFilterLabel = true;
                }
                item.componentOptions.listeners = {
                    selectSelected:(e)=>{
                        this.$emit("change",e);
                        this.visible = false;
                    }
                };
            });
            slots = this.$slots.default;
        }

        return h(
            "div",
            {
                class: {
                    "woo-select": true,
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
                        },
                        on:{
                            closeVisible:this.closeVisible
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
                            slots
                        )
                    ]
                )
            ]
        );
    }
};
