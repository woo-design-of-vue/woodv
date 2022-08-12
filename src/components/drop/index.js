import "material-design-icons-iconfont";
export default {
    name: "WDrop",
    model: {
        prop: "value",
        event: "change"
    },
    props: {
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
    updated(){
        if(this.$refs["woo-drop-body"]){
            this.$nextTick(()=>{
                if(this.$slots.default.length){
                    const dropActive = this.$slots.default[0].children.find(item=>item.elm.id === "woo-select-drop-active");

                    if(dropActive){
                        this.$refs["woo-drop-body"].scroll(0, dropActive.elm.offsetTop - this.$refs["woo-drop-body"].offsetHeight / 2);
                    }
                }
            });

        }
    },
    render: function (h) {
        if(this.visible){
            return h(
                "div",
                {
                    class:{
                        "woo-drop":true
                    },
                    style:{
                        top:this.offsetY +(this.isExceedY? -this.$el.offsetHeight-10:10)+ "px",
                        width:this.offsetWidth + "px",
                        left:this.offsetX + "px"
                    }
                },
                [
                    h(
                        "div",
                        {
                            class:{
                                "woo-drop-body":true
                            },
                            ref:"woo-drop-body"
                        },
                        this.$slots.default
                    )
                ]
            );
        }
        return null;
    }
};
