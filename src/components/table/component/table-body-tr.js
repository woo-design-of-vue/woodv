import WTableTd from "./table-td.js";
import WCheckbox from "../../checkbox";
import WIcon from "../../icon";
import {renderChildren} from "../../../util/function/build-table";

export default {
    name: "WTableBodyTr",
    components: {
        WTableTd,
        WCheckbox,
        WIcon
    },
    props: {
        dataSource: {
            type: Object,
            required: true,
            default: () => {
                return {};
            }
        },
        rowKey: {
            type: String,
            required: false,
            default: ""
        },
        columns: {
            type: Array,
            required: true,
            default: () => {
                return [];
            }
        },
        selection: {
            type: Boolean,
            required: false,
            default: false
        },
        index:{
            type:[Number, String],
            required:true,
            default:0
        },
        isShow: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods:{
        openTrChild(index, e){
            this.$parent.openTrChild(index, e);
        }
    },
    render: function (h) {
        const dataSource = this.dataSource;
        const columns = this.columns;
        const selection = this.selection;
        const index = this.index;
        const tableThGroup = [];

        for (const childIndex in columns) {
            const child = columns[childIndex];
            let columnItemNode = {};

            if(selection && childIndex==="0"){
                columnItemNode = h(
                    "WCheckbox",
                    {
                        class:{
                            "woo-table-checkbox":true
                        },
                        attrs:{
                            model:dataSource.wooTableChecked
                        },
                        on:{
                            change:(e)=>{
                                dataSource.wooTableChecked = e;
                                this.$parent.$parent.changeBodyChecked(dataSource);
                            }
                        }
                    }
                );
            }else{
                if(child.slots && this.$parent.$parent.$scopedSlots[child.slots]){
                    columnItemNode = renderChildren(
                        dataSource.wooTableIsChildren,
                        selection,
                        dataSource,
                        index,
                        childIndex,
                        this.$parent.$parent.$scopedSlots[child.slots]({
                            text:dataSource[child.dataIndex],
                            row:dataSource,
                            index:dataSource,
                            config:child
                        }),
                        this.openTrChild,
                        h
                    );
                }
                else if(child.render){
                    columnItemNode = renderChildren(
                        dataSource.wooTableIsChildren,
                        selection,
                        dataSource,
                        index,
                        childIndex,
                        child.render(dataSource[child.dataIndex], dataSource, index, child),
                        this.openTrChild,
                        h
                    );
                }else{
                    columnItemNode = renderChildren(
                        dataSource.wooTableIsChildren,
                        selection,
                        dataSource,
                        index,
                        childIndex,
                        dataSource[child.dataIndex],
                        this.openTrChild,
                        h
                    );
                }
            }

            tableThGroup.push(
                h(
                    "WTableTd",
                    {
                        attrs: {
                            column: child,
                            source:dataSource,
                            selection: selection,
                            index:childIndex
                        }
                    },
                    [columnItemNode]
                )
            );
        }
        return  h(
            "tr",
            {
                class: {
                    "woo-table-tr": true,
                    ["woo-table-target-" + dataSource.wooTableIndex]: true,
                },
                style: {
                    display:this.isShow ? "table-row" : "none"
                },
                key: dataSource[this.rowKey] || dataSource.wooTableIndex || index
            },
            tableThGroup
        );
    }
};