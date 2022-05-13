import WTableBodyTr from "./table-body-tr.js";
import WTableTd from "./table-td.js";
import WCheckbox from "../../checkbox";
import WIcon from "../../icon";
import {setTableTrChildClose, sortDataSourceMap} from "../../../util/function/build-table";

export default {
    name: "WTableBodyGroup",
    components: {
        WTableTd,
        WCheckbox,
        WIcon,
        WTableBodyTr
    },
    data(){
        return{
            dataSourceMap:{}
        };
    },
    created(){
        this.dataSourceMap = sortDataSourceMap(this.dataSource);
    },
    props: {
        columns: {
            type: Array,
            required: true,
            default: () => {
                return [];
            }
        },
        dataSource: {
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
        rowKey: {
            type: String,
            required: false,
            default: ""
        }
    },
    methods:{
        openTrChild(index, row){
            row.wooTableTargetIsShow = !row.wooTableTargetIsShow;

            for(const childIndex in row.children){
                const item = row.children[childIndex];

                if(this.dataSourceMap[item.wooTableIndex]){
                    this.dataSourceMap[item.wooTableIndex].wooTableIsShow = !row.wooTableTargetIsShow;
                    this.dataSourceMap[item.wooTableIndex].wooTableTargetIsShow = !row.wooTableTargetIsShow;
                    if(item.children&&item.children.length){
                        setTableTrChildClose( item);
                    }
                }else{
                    item.wooTableIsShow = true;
                    this.dataSourceMap[item.wooTableIndex] = item;
                    this.dataSource.splice(Number(index)+Number(childIndex)+1, 0, this.dataSourceMap[item.wooTableIndex]);
                }
            }
        }
    },
    render: function (h) {
        const tableTrList = [];

        for (const index in this.dataSource) {
            const item = this.dataSource[index];

            tableTrList.push(
                h(
                    "WTableBodyTr",
                    {
                        attrs:{
                            rowKey: this.rowKey,
                            selection:this.selection,
                            columns:this.columns,
                            dataSource:item,
                            index:index,
                            isShow:item.wooTableIsShow
                        }
                    }
                )
            );
        }

        return h(
            "thead",
            {
                "woo-table-thead": true
            },
            tableTrList
        );
    }
};