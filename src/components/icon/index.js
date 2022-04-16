import "material-design-icons-iconfont";
export default {
    name:"WIcon",
    functional:true,
    props:{
        size:{
            type:[Number, String],
            required:false,
            default:24
        },
        color:{
            type:String,
            required:false,
            default:"#000000"
        }
    },
    render:function (h, context) {
        return h(
            "span",
            {
                class:{
                    "material-icons":true,
                    "woo-not-select":true
                },
                style:{
                    fontSize:context.props.size +"px",
                    color: context.props.color
                },
                on:context.listeners
            },
            context.children
        );
    }
};