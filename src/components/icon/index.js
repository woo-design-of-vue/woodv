import "material-design-icons-iconfont";
import {strToNum} from "../../util/tool";
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
                class:Object.assign({
                    "material-icons":true,
                    "woo-not-select":true
                }, context.data.class),
                style:Object.assign({
                    fontSize:strToNum(context.props.size) +"px",
                    color: context.props.color
                }, context.data.style),
                attrs:context.attrs,
                on:context.listeners
            },
            context.children
        );
    }
};