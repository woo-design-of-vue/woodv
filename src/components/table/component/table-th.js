import WCheckbox from "../../checkbox";
import WTableSorter from "./table-sorter";
import {getTitleNode} from "../../../util/function/build-table";
export default {
    name: "WTableTh",
    props:{
        column:{
            type:Object,
            required:true,
            default:()=>{
                return {};
            }
        },
        selection:{
            type:Boolean,
            required:true,
            default:false
        },
        isHeaderChecked:{
            type: Boolean,
            required: false,
            default: false
        }
    },
    components:{
        WCheckbox,
        WTableSorter
    },
    render: function (h) {
        const column = this.column;

        return h(
            "th",
            {
                class: {
                    "woo-table-th": true,
                    "woo-table-ellipsis": column.ellipsis||false,
                    "woo-table-fixed-start":column.fixed === "start",
                    "woo-table-fixed-end": column.fixed && column.fixed === "end"
                },
                style: {
                    textAlign: column.align,
                    position: column.fixed && column.fixed ? "sticky" : "",
                    left: column.fixed && column.fixed === "start" ? column.wooTableStartWidth +"px": "",
                    right: column.fixed && column.fixed === "end" ? column.wooTableEndWidth+"px" : ""
                },
                attrs: {
                    rowspan: column.wooTableRowSpan,
                    colspan: column.wooTableColSpan
                }
            },
            [
                column.wooTableType==="checkbox"?h(
                    "WCheckbox",
                    {
                        class:{
                            "woo-table-checkbox":true
                        },
                        attrs:{
                            model:this.isHeaderChecked
                        },
                        on:{
                            change: (e)=>{
                                this.$parent.$parent.changeHeaderChecked(e);
                            }
                        }
                    }
                ):getTitleNode(column, h, ()=>{
                    this.$parent.$parent.changeSorter(column);
                })
            ]
        );
    }
};
