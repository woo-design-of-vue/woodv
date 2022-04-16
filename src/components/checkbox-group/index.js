import "material-design-icons-iconfont";
export default {
    name:"WCheckboxGroup",
    model:{
        props: "value",
        event:"change"
    },
    data(){
        return{
            model:{
                value:[]
            }
        };
    },
    provide:function(){
        return {
            provideDisabled: this.disabled,
            provideValue:this.model,
            provideIsItem:true,
            provideColor:this.color,
        };
    },
    props:{
        value:{
            type:Array,
            required:false,
            default:()=>{
                return [];
            }
        },
        option:{
            type:Array,
            required:false,
            default:()=>{
                return [];
            }
        },
        color:{
            type:String,
            required:false,
            default:""
        },
        disabled:{
            type:Boolean,
            required:false,
            default:false
        }
    },
    watch:{
        value(value){
            this.model.value = value;
            this.$emit("change", this.model.value);
        }
    },
    created:function(){
        this.model.value = this.value;
    },
    render:function (h) {
        return h(
            "div",
            {
                class:{
                    "woo-checkbox-group":true
                }
            },
            this.$slots.default
        );
    }
};