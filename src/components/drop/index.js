import "material-design-icons-iconfont";
export default {
    name: "WDrop",
    model: {
        prop: "value",
        event: "change"
    },
    props: {
        options:{
            type:Array,
            required:false,
            default:()=>{}
        },
        offsetX:{
            type:Number,
            required:true,
            default:0
        },
        offsetY:{
            type:Number,
            required:true,
            default:0
        },
        offsetWidth:{
            type:Number,
            required:true,
            default:0
        },
        isExceedY:{
            type:Boolean,
            required:true,
            default:false
        },
        appendParent:{
            type:Function,
            required:false,
            // eslint-disable-next-line no-undef
            default:()=>{
                return document.body;
            }
        },
        visible:{
            type:Boolean,
            required:true,
            default:false
        }
    },
    mounted(){
        // eslint-disable-next-line no-undef
        this.appendParent().appendChild(this.$mount().$el);
    },
    methods: {

    },
    render: function (h) {
        if(this.visible){
            return h(
                "div",
                {
                    style:{
                        position:"absolute",
                        top:this.offsetY +(this.isExceedY? -this.$el.offsetHeight-10:10)+ "px",
                        width:this.offsetWidth + "px",
                        left:this.offsetX + "px",
                        zIndex:999
                    }
                },
                [
                    h(
                        "div",
                        {
                            style:{
                                height:"200px",
                                boxShadow:"0 0 5px rgba(0,0,0,.3)"
                            }
                        },
                        ["123"]
                    )
                ]
            );
        }
        return null;
    }
};
